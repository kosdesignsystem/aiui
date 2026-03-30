import { useEffect, useMemo, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type AdvancedConfig = {
	iso: '100' | '200' | '400' | '800';
	ev: '-1' | '0' | '+1';
	timer: 'Off' | '3s' | '10s';
	hdr: 'Off' | 'Auto' | 'On';
	grid: '3×3' | '4×4' | 'Off';
	raw: 'Off' | 'On';
};

type CameraStatus = 'loading' | 'ready' | 'error';

type FaceOval = {
	id: string;
	left: number;
	top: number;
	width: number;
	height: number;
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

const PANEL_PEEK = 34;
const PANEL_HEIGHT = 236;
const SWIPE_THRESHOLD = 0.28;
const FACE_FOCUS_COOLDOWN = 1200;

const flashModes = ['off', 'auto', 'on'] as const;
const whiteBalanceModes = ['Авто', 'День', 'Облачно'] as const;
const ratioModes = ['4:3', '16:9', '1:1'] as const;
const focusModes = ['AF', 'MF'] as const;

const initialAdvanced: AdvancedConfig = {
	iso: '100',
	ev: '0',
	timer: 'Off',
	hdr: 'Auto',
	grid: '3×3',
	raw: 'Off',
};

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

function cycleInList<T extends string>(list: readonly T[], value: T): T {
	const index = list.indexOf(value);
	return list[(index + 1) % list.length];
}

function getPreferredDeviceId(
	devices: MediaDeviceInfo[],
	cameraFacing: 'rear' | 'front',
	currentDeviceId: string | null,
) {
	if (devices.length === 0) {
		return null;
	}

	if (currentDeviceId && devices.some((item) => item.deviceId === currentDeviceId)) {
		return currentDeviceId;
	}

	const priorityKeywords = cameraFacing === 'front'
		? ['front', 'user', 'facetime']
		: ['back', 'rear', 'environment'];

	const foundDevice = devices.find((device) => {
		const label = device.label.toLowerCase();
		return priorityKeywords.some((keyword) => label.includes(keyword));
	});

	return foundDevice?.deviceId ?? devices[0].deviceId;
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

	return {
		id: '',
		left: box.x * scale + offsetX,
		top: box.y * scale + offsetY,
		width: box.width * scale,
		height: box.height * scale,
	};
}

export function CameraScreen() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const previewRef = useRef<HTMLDivElement | null>(null);
	const lastFocusAtRef = useRef(0);

	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [dragStartY, setDragStartY] = useState<number | null>(null);

	const [flashMode, setFlashMode] = useState<(typeof flashModes)[number]>('off');
	const [isGridEnabled, setIsGridEnabled] = useState(true);
	const [focusMode, setFocusMode] = useState<(typeof focusModes)[number]>('AF');
	const [whiteBalance, setWhiteBalance] = useState<(typeof whiteBalanceModes)[number]>('Авто');
	const [ratio, setRatio] = useState<(typeof ratioModes)[number]>('4:3');
	const [brightnessBoost, setBrightnessBoost] = useState(false);
	const [cameraFacing, setCameraFacing] = useState<'rear' | 'front'>('rear');
	const [shotCount, setShotCount] = useState(0);
	const [isShutterActive, setIsShutterActive] = useState(false);
	const [advanced, setAdvanced] = useState<AdvancedConfig>(initialAdvanced);

	const [cameraStatus, setCameraStatus] = useState<CameraStatus>('loading');
	const [cameraError, setCameraError] = useState('');
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

	const [faces, setFaces] = useState<FaceOval[]>([]);
	const [focusAnimationKey, setFocusAnimationKey] = useState(0);
	const [isFaceDetectionAvailable, setIsFaceDetectionAvailable] = useState(true);

	const hiddenOffset = PANEL_HEIGHT - PANEL_PEEK;
	const panelOffset = useMemo(() => {
		if (dragStartY !== null) {
			const baseOffset = isPanelOpen ? 0 : hiddenOffset;
			return clamp(baseOffset + dragOffset, 0, hiddenOffset);
		}

		return isPanelOpen ? 0 : hiddenOffset;
	}, [dragOffset, dragStartY, hiddenOffset, isPanelOpen]);

	const cameraLabel = useMemo(() => {
		if (!selectedDeviceId) {
			return 'Авто';
		}

		const device = videoDevices.find((item) => item.deviceId === selectedDeviceId);
		return device?.label || 'Камера';
	}, [selectedDeviceId, videoDevices]);

	const statusText = useMemo(() => {
		const flashLabel = flashMode === 'off' ? 'Flash Off' : flashMode === 'auto' ? 'Flash Auto' : 'Flash On';
		const cameraFacingLabel = cameraFacing === 'rear' ? 'Основная камера' : 'Фронтальная камера';

		return `${cameraFacingLabel} · ${flashLabel} · ${focusMode} · WB ${whiteBalance} · ${ratio}`;
	}, [cameraFacing, flashMode, focusMode, ratio, whiteBalance]);

	useEffect(() => {
		return () => {
			streamRef.current?.getTracks().forEach((track) => track.stop());
		};
	}, []);

	useEffect(() => {
		if (!navigator.mediaDevices?.getUserMedia) {
			setCameraStatus('error');
			setCameraError('Браузер не поддерживает getUserMedia.');
			return;
		}

		let isCancelled = false;

		const startCamera = async () => {
			setCameraStatus('loading');
			setCameraError('');

			try {
				streamRef.current?.getTracks().forEach((track) => track.stop());

				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: selectedDeviceId
						? { deviceId: { exact: selectedDeviceId } }
						: { facingMode: { ideal: cameraFacing === 'front' ? 'user' : 'environment' } },
				});

				if (isCancelled) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}

				streamRef.current = stream;

				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play().catch(() => undefined);
				}

				const devices = await navigator.mediaDevices.enumerateDevices();
				const cameras = devices.filter((item) => item.kind === 'videoinput');
				setVideoDevices(cameras);

				setSelectedDeviceId((current) => getPreferredDeviceId(cameras, cameraFacing, current));
				setCameraStatus('ready');
			} catch (error) {
				setCameraStatus('error');
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
	}, [cameraFacing, selectedDeviceId]);

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

				if (isCancelled) {
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

	const handleDragStart = (clientY: number) => {
		setDragStartY(clientY);
		setDragOffset(0);
	};

	const handleDragMove = (clientY: number) => {
		if (dragStartY === null) {
			return;
		}

		setDragOffset(clientY - dragStartY);
	};

	const handleDragEnd = () => {
		if (dragStartY === null) {
			return;
		}

		const baseOffset = isPanelOpen ? 0 : hiddenOffset;
		const currentOffset = clamp(baseOffset + dragOffset, 0, hiddenOffset);
		const progress = currentOffset / hiddenOffset;

		setIsPanelOpen(progress < 1 - SWIPE_THRESHOLD);
		setDragOffset(0);
		setDragStartY(null);
	};

	const handleTakePhoto = () => {
		setShotCount((value) => value + 1);
		setIsShutterActive(true);
		window.setTimeout(() => setIsShutterActive(false), 170);
	};

	const updateAdvanced = <K extends keyof AdvancedConfig>(key: K, nextValue: AdvancedConfig[K]) => {
		setAdvanced((current) => ({ ...current, [key]: nextValue }));
	};

	const switchCameraDevice = () => {
		if (videoDevices.length > 1) {
			const currentIndex = videoDevices.findIndex((item) => item.deviceId === selectedDeviceId);
			const nextDevice = videoDevices[(currentIndex + 1) % videoDevices.length] ?? videoDevices[0];
			setSelectedDeviceId(nextDevice.deviceId);
			return;
		}

		setCameraFacing((value) => (value === 'rear' ? 'front' : 'rear'));
	};

	return (
		<App>
			<div className="camera-screen">
				<header className="camera-screen__top">
					<button
						type="button"
						aria-label="Открыть расширенные настройки"
						className="camera-screen__icon-button"
						onClick={() => setIsPanelOpen(true)}
					>
						<Icon name="settings-outline" width={22} height={22} alt="" aria-hidden="true" />
					</button>
					<div className="camera-screen__top-right">
						<button
							type="button"
							aria-label="Переключить вспышку"
							className={`camera-screen__icon-button${flashMode !== 'off' ? ' is-active' : ''}`}
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

				<section className="camera-screen__preview" ref={previewRef} aria-label="Предпросмотр камеры">
					<video ref={videoRef} className="camera-screen__video" autoPlay muted playsInline />
					{faces.map((face) => (
						<div
							key={`${face.id}-${focusAnimationKey}`}
							className="camera-screen__face-oval"
							style={{
								left: `${face.left}px`,
								top: `${face.top}px`,
								width: `${face.width}px`,
								height: `${face.height}px`,
							}}
						/>
					))}
					{cameraStatus === 'loading' ? (
						<div className="camera-screen__overlay">
							<Text variant="regular-14" color="primary">
								Поиск камеры...
							</Text>
						</div>
					) : null}
					{cameraStatus === 'error' ? (
						<div className="camera-screen__overlay is-error">
							<Text variant="regular-14" color="primary">
								{cameraError}
							</Text>
						</div>
					) : null}
					{isShutterActive ? <div className="camera-screen__flash" aria-hidden="true" /> : null}
					{isGridEnabled ? <div className="camera-screen__grid" /> : null}
					<div className="camera-screen__status-pill">
						<Text variant="regular-12" color="primary">
							{statusText}
						</Text>
						{!isFaceDetectionAvailable ? (
							<Text as="p" variant="regular-12" color="secondary">
								FaceDetector API недоступен в этом браузере
							</Text>
						) : null}
					</div>
				</section>

				<div className="camera-screen__quick-settings" role="list">
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setFocusMode((value) => cycleInList(focusModes, value))}
					>
						<Icon name="cursor-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{focusMode}</span>
					</button>
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setWhiteBalance((value) => cycleInList(whiteBalanceModes, value))}
					>
						<Icon name="light-mode-50-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{whiteBalance}</span>
					</button>
					<button
						type="button"
						className={`camera-screen__chip${brightnessBoost ? ' is-active' : ''}`}
						role="listitem"
						onClick={() => setBrightnessBoost((value) => !value)}
					>
						<Icon name="brightness-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{brightnessBoost ? 'Свет+' : 'Свет'}</span>
					</button>
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setRatio((value) => cycleInList(ratioModes, value))}
					>
						<Icon name="open-in-full" width={16} height={16} alt="" aria-hidden="true" />
						<span>{ratio}</span>
					</button>
				</div>

				<footer className="camera-screen__controls">
					<button
						type="button"
						className="camera-screen__thumb"
						aria-label="Открыть галерею"
						title={`Сделано фото: ${shotCount}`}
					>
						<Text variant="regular-12" color="primary">
							{shotCount}
						</Text>
					</button>
					<button type="button" className="camera-screen__shutter" aria-label="Сделать фото" onClick={handleTakePhoto} />
					<button
						type="button"
						className="camera-screen__switch"
						aria-label="Переключить камеру"
						onClick={switchCameraDevice}
					>
						<Icon name="switches" width={30} height={30} alt="" aria-hidden="true" />
					</button>
				</footer>

				<section
					className="camera-screen__panel"
					style={{ transform: `translateY(${panelOffset}px)` }}
					onTouchStart={(event) => handleDragStart(event.touches[0]?.clientY ?? 0)}
					onTouchMove={(event) => handleDragMove(event.touches[0]?.clientY ?? 0)}
					onTouchEnd={handleDragEnd}
					onPointerDown={(event) => {
						event.currentTarget.setPointerCapture(event.pointerId);
						handleDragStart(event.clientY);
					}}
					onPointerMove={(event) => handleDragMove(event.clientY)}
					onPointerUp={handleDragEnd}
				>
					<button
						type="button"
						className="camera-screen__panel-handle"
						aria-label={isPanelOpen ? 'Скрыть дополнительные настройки' : 'Показать дополнительные настройки'}
						onClick={() => setIsPanelOpen((value) => !value)}
					/>
					<Text as="p" variant="medium-16" color="primary">
						Дополнительные настройки
					</Text>
					<Text as="p" variant="regular-12" color="secondary">
						{cameraLabel}
					</Text>
					<div className="camera-screen__panel-grid">
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('iso', cycleInList(['100', '200', '400', '800'], advanced.iso))}
						>
							<Icon name="light-mode-0-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>ISO</span>
							<strong>{advanced.iso}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('ev', cycleInList(['-1', '0', '+1'], advanced.ev))}
						>
							<Icon name="plus-minus" width={16} height={16} alt="" aria-hidden="true" />
							<span>Эксп.</span>
							<strong>{advanced.ev}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('timer', cycleInList(['Off', '3s', '10s'], advanced.timer))}
						>
							<Icon name="clock-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>Таймер</span>
							<strong>{advanced.timer}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('hdr', cycleInList(['Off', 'Auto', 'On'], advanced.hdr))}
						>
							<Icon name="image-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>HDR</span>
							<strong>{advanced.hdr}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => {
								const next = cycleInList(['3×3', '4×4', 'Off'], advanced.grid);
								updateAdvanced('grid', next);
								setIsGridEnabled(next !== 'Off');
							}}
						>
							<Icon name="apps" width={16} height={16} alt="" aria-hidden="true" />
							<span>Сетка</span>
							<strong>{advanced.grid}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('raw', cycleInList(['Off', 'On'], advanced.raw))}
						>
							<Icon name="file-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>RAW</span>
							<strong>{advanced.raw}</strong>
						</button>
					</div>
					<Text as="p" variant="regular-12" color="secondary">
						Свайп вверх — показать, свайп вниз — скрыть
					</Text>
				</section>
			</div>
		</App>
	);
}
