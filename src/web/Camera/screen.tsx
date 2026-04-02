import { useEffect, useMemo, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type CameraStatus = 'loading' | 'ready' | 'error';

type FaceOval = {
	id: string;
	left: number;
	top: number;
	width: number;
	height: number;
};

type RoiFocus = {
	left: number;
	top: number;
	width: number;
	height: number;
	key: number;
};

type MediaPipeFaceDetection = {
	boundingBox?: {
		originX: number;
		originY: number;
		width: number;
		height: number;
	};
};

type MediaPipeFaceDetector = {
	detectForVideo: (video: HTMLVideoElement, timestampMs: number) => { detections: MediaPipeFaceDetection[] };
	close?: () => void;
};

type MediaPipeVisionModule = {
	FilesetResolver: {
		forVisionTasks: (wasmPath: string) => Promise<unknown>;
	};
	FaceDetector: {
		createFromOptions: (
			vision: unknown,
			options: {
				baseOptions: { modelAssetPath: string; delegate?: 'GPU' | 'CPU' };
				runningMode: 'VIDEO';
				minDetectionConfidence?: number;
				minSuppressionThreshold?: number;
			},
		) => Promise<MediaPipeFaceDetector>;
	};
};

const FACE_FOCUS_COOLDOWN = 1200;

const flashModes = ['off', 'auto', 'on'] as const;
const whiteBalanceModes = ['Авто', 'День', 'Облачно'] as const;
const ratioModes = ['4:3', '16:9', '1:1'] as const;
const focusModes = ['AF', 'MF'] as const;

function cycleInList<T extends string>(list: readonly T[], value: T): T {
	const index = list.indexOf(value);
	return list[(index + 1) % list.length];
}

function mapFaceToPreview(
	box: DOMRectReadOnly,
	video: HTMLVideoElement,
	preview: HTMLDivElement,
): FaceOval {
	const containerWidth = preview.clientWidth;
	const containerHeight = preview.clientHeight;
	const sourceWidth = video.videoWidth;
	const sourceHeight = video.videoHeight;

	if (!containerWidth || !containerHeight || !sourceWidth || !sourceHeight) {
		return { id: '', left: 0, top: 0, width: 0, height: 0 };
	}

	const scale = Math.max(containerWidth / sourceWidth, containerHeight / sourceHeight);
	const renderWidth = sourceWidth * scale;
	const renderHeight = sourceHeight * scale;
	const offsetX = (containerWidth - renderWidth) / 2;
	const offsetY = (containerHeight - renderHeight) / 2;

	const rawWidth = box.width * scale;
	const rawHeight = box.height * scale;
	const ovalHeight = rawHeight * 1.12;
	const ovalWidth = rawWidth * 0.88;

	return {
		id: '',
		left: box.x * scale + offsetX + (rawWidth - ovalWidth) / 2,
		top: box.y * scale + offsetY - (ovalHeight - rawHeight) / 2,
		width: ovalWidth,
		height: ovalHeight,
	};
}

export function CameraScreen() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const previewRef = useRef<HTMLDivElement | null>(null);
	const lastFocusAtRef = useRef(0);
	const lastPhotoUrlRef = useRef<string | null>(null);
	const cameraRequestIdRef = useRef(0);

	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [flashMode, setFlashMode] = useState<(typeof flashModes)[number]>('off');
	const [isGridEnabled, setIsGridEnabled] = useState(true);
	const [focusMode, setFocusMode] = useState<(typeof focusModes)[number]>('AF');
	const [whiteBalance, setWhiteBalance] = useState<(typeof whiteBalanceModes)[number]>('Авто');
	const [ratio, setRatio] = useState<(typeof ratioModes)[number]>('4:3');
	const [brightnessBoost, setBrightnessBoost] = useState(false);
	const [cameraFacing, setCameraFacing] = useState<'rear' | 'front'>('rear');
	const [shotCount, setShotCount] = useState(0);
	const [isShutterActive, setIsShutterActive] = useState(false);
	const [latestPhotoUrl, setLatestPhotoUrl] = useState<string | null>(null);
	const [latestPhotoBlob, setLatestPhotoBlob] = useState<Blob | null>(null);
	const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);
	const [isCameraSwitchingBusy, setIsCameraSwitchingBusy] = useState(false);
	const [switchPhase, setSwitchPhase] = useState<'out' | 'in' | null>(null);
	const [roiFocus, setRoiFocus] = useState<RoiFocus | null>(null);
	const [shouldUseFlash, setShouldUseFlash] = useState(false);
	const [hasTorch, setHasTorch] = useState(false);

	const [cameraStatus, setCameraStatus] = useState<CameraStatus>('loading');
	const [cameraError, setCameraError] = useState('');

	const [faces, setFaces] = useState<FaceOval[]>([]);
	const [focusAnimationKey, setFocusAnimationKey] = useState(0);
	const [isFaceDetectionAvailable, setIsFaceDetectionAvailable] = useState(true);


	const statusText = useMemo(() => {
		const flashLabel = flashMode === 'off' ? 'Flash Off' : flashMode === 'auto' ? 'Flash Auto' : 'Flash On';
		const cameraFacingLabel = cameraFacing === 'rear' ? 'Основная камера' : 'Фронтальная камера';

		return `${cameraFacingLabel} · ${flashLabel} · ${focusMode} · WB ${whiteBalance} · ${ratio}`;
	}, [cameraFacing, flashMode, focusMode, ratio, whiteBalance]);

	useEffect(() => {
		return () => {
			streamRef.current?.getTracks().forEach((track) => track.stop());

			if (lastPhotoUrlRef.current) {
				URL.revokeObjectURL(lastPhotoUrlRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!navigator.mediaDevices?.getUserMedia) {
			setIsCameraSwitchingBusy(false);
			setCameraStatus('error');
			setCameraError('Браузер не поддерживает getUserMedia.');
			return;
		}

		let isCancelled = false;

		const startCamera = async () => {
			const requestId = ++cameraRequestIdRef.current;
			setCameraStatus('loading');
			setCameraError('');

			try {
				streamRef.current?.getTracks().forEach((track) => track.stop());

				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						facingMode: { ideal: cameraFacing === 'front' ? 'user' : 'environment' },
					},
				});

				if (isCancelled || requestId !== cameraRequestIdRef.current) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}

				streamRef.current = stream;

				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play().catch(() => undefined);
				}

				setCameraStatus('ready');
				setIsCameraSwitchingBusy(false);
			} catch (error) {
				if (requestId !== cameraRequestIdRef.current) {
					return;
				}

				setCameraStatus('error');
				setIsCameraSwitchingBusy(false);
				setCameraError(
					error instanceof Error
						? `Нет доступа к камере: ${error.message}`
						: 'Нет доступа к камере. Проверьте разрешения браузера.',
				);
			}
		};

		void startCamera();

		return () => {
			isCancelled = true;
		};
	}, [cameraFacing]);


	useEffect(() => {
		const track = streamRef.current?.getVideoTracks()[0];
		if (!track) {
			setHasTorch(false);
			return;
		}

		const capabilities = track.getCapabilities?.();
		setHasTorch(Boolean(capabilities && 'torch' in capabilities));
	}, [cameraStatus, cameraFacing]);

	useEffect(() => {
		if (cameraStatus !== 'ready' || !videoRef.current) {
			setShouldUseFlash(false);
			return;
		}

		let timer: number | null = null;
		const canvas = document.createElement('canvas');
		canvas.width = 24;
		canvas.height = 24;
		const context = canvas.getContext('2d', { willReadFrequently: true });

		const measureBrightness = () => {
			if (!videoRef.current || !context || videoRef.current.readyState < 2) {
				return;
			}

			context.drawImage(videoRef.current, 0, 0, 24, 24);
			const pixels = context.getImageData(0, 0, 24, 24).data;
			let luma = 0;
			for (let i = 0; i < pixels.length; i += 4) {
				luma += 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
			}
			const avg = luma / (pixels.length / 4);
			setShouldUseFlash(avg < 72);
		};

		measureBrightness();
		timer = window.setInterval(measureBrightness, 1100);

		return () => {
			if (timer !== null) {
				window.clearInterval(timer);
			}
		};
	}, [cameraStatus, cameraFacing]);

	useEffect(() => {
		const shouldEnableTorch = flashMode === 'on' || (flashMode === 'auto' && shouldUseFlash);
		if (!hasTorch) {
			return;
		}

		void applyTorchMode(shouldEnableTorch && flashMode === 'on');
	}, [flashMode, hasTorch, shouldUseFlash]);

	useEffect(() => {
		if (cameraStatus !== 'ready' || !videoRef.current || !previewRef.current) {
			setFaces([]);
			return;
		}

		let isCancelled = false;
		let frameHandle = 0;
		let detector: MediaPipeFaceDetector | null = null;
		let lastDetectionAt = 0;

		const runDetection = (timestamp: number) => {
			if (isCancelled || !videoRef.current || !previewRef.current || !detector) {
				return;
			}

			if (timestamp - lastDetectionAt < 230) {
				frameHandle = window.requestAnimationFrame(runDetection);
				return;
			}

			lastDetectionAt = timestamp;

			if (videoRef.current.readyState < 2) {
				frameHandle = window.requestAnimationFrame(runDetection);
				return;
			}

			try {
				const output = detector.detectForVideo(videoRef.current, timestamp);
				const nextFaces = (output.detections ?? [])
					.map((face, index) => {
						if (!face.boundingBox || !videoRef.current || !previewRef.current) {
							return null;
						}

						const mapped = mapFaceToPreview(
							new DOMRectReadOnly(
								face.boundingBox.originX,
								face.boundingBox.originY,
								face.boundingBox.width,
								face.boundingBox.height,
							),
							videoRef.current,
							previewRef.current,
						);

						return { ...mapped, id: `${index}` };
					})
					.filter((face): face is FaceOval => face !== null);

				setFaces(nextFaces);

				if (nextFaces.length > 0 && timestamp - lastFocusAtRef.current > FACE_FOCUS_COOLDOWN) {
					setFocusAnimationKey((value) => value + 1);
					lastFocusAtRef.current = timestamp;
				}
			} catch {
				setFaces([]);
			}

			frameHandle = window.requestAnimationFrame(runDetection);
		};

		const initMediaPipe = async () => {
			try {
				const visionModule = (await import(
					/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14'
				)) as MediaPipeVisionModule;
				const vision = await visionModule.FilesetResolver.forVisionTasks(
					'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm',
				);

				detector = await visionModule.FaceDetector.createFromOptions(vision, {
					baseOptions: {
						modelAssetPath:
							'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
						delegate: 'GPU',
					},
					runningMode: 'VIDEO',
					minDetectionConfidence: 0.52,
					minSuppressionThreshold: 0.3,
				});

				if (isCancelled || requestId !== cameraRequestIdRef.current) {
					detector?.close?.();
					return;
				}

				setIsFaceDetectionAvailable(true);
				frameHandle = window.requestAnimationFrame(runDetection);
			} catch {
				setFaces([]);
				setIsFaceDetectionAvailable(false);
			}
		};

		void initMediaPipe();

		return () => {
			isCancelled = true;
			window.cancelAnimationFrame(frameHandle);
			detector?.close?.();
		};
	}, [cameraStatus]);


	const switchCameraDevice = () => {
		if (isCameraSwitchingBusy) {
			return;
		}

		setIsCameraSwitchingBusy(true);
		setIsSwitchingCamera(true);
		setSwitchPhase('out');

		// Phase 1: squeeze animation (200ms), then switch facing mode for phase 2 expansion.
		window.setTimeout(() => {
			setCameraFacing((value) => (value === 'rear' ? 'front' : 'rear'));
		}, 200);
	};



	useEffect(() => {
		if (!isCameraSwitchingBusy || cameraStatus !== 'ready' || switchPhase !== 'out') {
			return;
		}

		setSwitchPhase('in');
		const timer = window.setTimeout(() => {
			setSwitchPhase(null);
			setIsCameraSwitchingBusy(false);
			setIsSwitchingCamera(false);
		}, 100);

		return () => window.clearTimeout(timer);
	}, [cameraStatus, isCameraSwitchingBusy, switchPhase]);

	const applyTorchMode = async (enabled: boolean) => {
		const track = streamRef.current?.getVideoTracks()[0];
		if (!track) {
			return;
		}

		try {
			await track.applyConstraints({ advanced: [{ torch: enabled }] as MediaTrackConstraintSet[] });
		} catch {
			// iOS/Safari may silently ignore torch constraints on unsupported hardware.
		}
	};

	const triggerHardwareFlash = async () => {
		if (!hasTorch) {
			return;
		}

		await applyTorchMode(true);
		await new Promise((resolve) => window.setTimeout(resolve, 120));
		await applyTorchMode(false);
	};

	const handlePreviewTapFocus = (event: React.PointerEvent<HTMLElement>) => {
		if (!previewRef.current) {
			return;
		}

		const rect = previewRef.current.getBoundingClientRect();
		const width = 132;
		const height = 96;
		const left = Math.min(Math.max(event.clientX - rect.left - width / 2, 8), rect.width - width - 8);
		const top = Math.min(Math.max(event.clientY - rect.top - height / 2, 8), rect.height - height - 8);

		setRoiFocus({ left, top, width, height, key: Date.now() });
		window.setTimeout(() => setRoiFocus(null), 900);
	};

	const updateThumbnail = (blob: Blob) => {
		const photoUrl = URL.createObjectURL(blob);

		if (lastPhotoUrlRef.current) {
			URL.revokeObjectURL(lastPhotoUrlRef.current);
		}

		lastPhotoUrlRef.current = photoUrl;
		setLatestPhotoBlob(blob);
		setLatestPhotoUrl(photoUrl);
	};

	const handleSaveLatestPhoto = () => {
		if (!latestPhotoBlob || !latestPhotoUrl) {
			return;
		}

		const shouldSave = window.confirm('Сохранить последний снимок на устройство?');
		if (!shouldSave) {
			return;
		}

		const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
		const link = document.createElement('a');
		link.href = latestPhotoUrl;
		link.download = `camera-shot-${timestamp}.jpg`;
		link.rel = 'noopener';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleTakePhoto = async () => {
		if (!videoRef.current || videoRef.current.readyState < 2) {
			return;
		}

		const video = videoRef.current;

		const shouldFlashNow = flashMode === 'on' || (flashMode === 'auto' && shouldUseFlash);
		if (shouldFlashNow) {
			await triggerHardwareFlash();
			setIsShutterActive(true);
		}

		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		const context = canvas.getContext('2d');
		if (!context) {
			return;
		}

		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		canvas.toBlob(
			(blob) => {
				if (!blob) {
					return;
				}

				updateThumbnail(blob);
				setShotCount((value) => value + 1);
				setIsShutterActive(true);
				window.setTimeout(() => setIsShutterActive(false), 170);
			},
			'image/jpeg',
			0.92,
		);
	};

	return (
		<App>
			<div className="camera-screen">
				<header className="camera-screen__top">
					<button
						type="button"
						aria-label="Показать или скрыть расширенные настройки"
						className={`camera-screen__icon-button${isPanelOpen ? ' is-active' : ''}`}
						onClick={() => setIsPanelOpen((value) => !value)}
					>
						<Icon name="settings-outline" width={22} height={22} alt="" aria-hidden="true" />
					</button>
					<div className="camera-screen__top-right">
						<button
							type="button"
							aria-label="Переключить вспышку"
							className={`camera-screen__icon-button${flashMode !== 'off' ? ' is-active' : ''}${flashMode === 'auto' && shouldUseFlash ? ' is-warning' : ''}`}
							onClick={() => setFlashMode((value) => cycleInList(flashModes, value))}
						>
							<Icon name="light-mode-100-outline" width={22} height={22} alt="" aria-hidden="true" />
						</button>
						<button
							type="button"
							aria-label="Показать или скрыть сетку"
							className={`camera-screen__icon-button${isGridEnabled ? ' is-active' : ''}`}
							onClick={() => setIsGridEnabled((value) => !value)}
						>
							<Icon name="apps" width={22} height={22} alt="" aria-hidden="true" />
						</button>
					</div>
				</header>

				<section
					className={`camera-screen__preview${switchPhase === "out" ? " is-switching-out" : ""}${switchPhase === "in" ? " is-switching-in" : ""}`}
					ref={previewRef}
					aria-label="Предпросмотр камеры"
					onPointerDown={handlePreviewTapFocus}
				>
					<video ref={videoRef} className="camera-screen__video" autoPlay muted playsInline />
						{switchPhase ? <div className="camera-screen__switch-overlay" aria-hidden="true" /> : null}
					{roiFocus ? (
						<div
							key={roiFocus.key}
							className="camera-screen__roi-focus"
							style={{ left: `${roiFocus.left}px`, top: `${roiFocus.top}px`, width: `${roiFocus.width}px`, height: `${roiFocus.height}px` }}
						/>
					) : null}
					{faces.map((face) => (
						<div
							key={`${face.id}-${focusAnimationKey}`}
							className="camera-screen__face-oval"
							style={{ left: `${face.left}px`, top: `${face.top}px`, width: `${face.width}px`, height: `${face.height}px` }}
						/>
					))}
					{cameraStatus === 'loading' ? (
						<div className="camera-screen__overlay">
							<Text variant="regular-14" color="primary">Поиск камеры...</Text>
						</div>
					) : null}
					{cameraStatus === 'error' ? (
						<div className="camera-screen__overlay is-error">
							<Text variant="regular-14" color="primary">{cameraError}</Text>
						</div>
					) : null}
					{isShutterActive ? <div className="camera-screen__flash" aria-hidden="true" /> : null}
					{isGridEnabled ? <div className="camera-screen__grid" /> : null}
					<div className="camera-screen__status-pill">
						<Text variant="regular-12" color="primary">{statusText}</Text>
						{!isFaceDetectionAvailable ? (
							<Text as="p" variant="regular-12" color="secondary">Face detection недоступен в этом браузере</Text>
						) : null}
					</div>
				</section>

				{isPanelOpen ? (
					<div className="camera-screen__quick-settings" role="list">
						<button type="button" className="camera-screen__chip" role="listitem" aria-label="Фокус AF/MF" onClick={() => setFocusMode((value) => cycleInList(focusModes, value))}>
							<Icon name="cursor-outline" width={16} height={16} alt="" aria-hidden="true" />
						</button>
						<button type="button" className="camera-screen__chip" role="listitem" aria-label="Баланс белого" onClick={() => setWhiteBalance((value) => cycleInList(whiteBalanceModes, value))}>
							<Icon name="light-mode-50-outline" width={16} height={16} alt="" aria-hidden="true" />
						</button>
						<button type="button" className={`camera-screen__chip${brightnessBoost ? ' is-active' : ''}`} role="listitem" aria-label="Свет" onClick={() => setBrightnessBoost((value) => !value)}>
							<Icon name="brightness-outline" width={16} height={16} alt="" aria-hidden="true" />
						</button>
						<button type="button" className="camera-screen__chip" role="listitem" aria-label="Соотношение сторон" onClick={() => setRatio((value) => cycleInList(ratioModes, value))}>
							<Icon name="open-in-full" width={16} height={16} alt="" aria-hidden="true" />
						</button>
					</div>
				) : null}

				<footer className="camera-screen__controls">
					{latestPhotoUrl ? (
						<button
							type="button"
							className="camera-screen__thumb"
							aria-label="Сохранить последнюю фотографию"
							title={`Сделано фото: ${shotCount}`}
							onClick={handleSaveLatestPhoto}
						>
							<img src={latestPhotoUrl} alt="Последний снимок" />
						</button>
					) : (
						<div className="camera-screen__thumb-placeholder" aria-hidden="true" />
					)}
					<button type="button" className="camera-screen__shutter" aria-label="Сделать фото" onClick={() => void handleTakePhoto()} />
					<button
						type="button"
						className={`camera-screen__switch${isSwitchingCamera ? ' is-rotating' : ''}`}
						aria-label="Переключить камеру"
						onClick={switchCameraDevice}
						disabled={isCameraSwitchingBusy}
					>
						<Icon name="arrow-loop" width={30} height={30} alt="" aria-hidden="true" />
					</button>
				</footer>

			</div>
		</App>
	);
}
