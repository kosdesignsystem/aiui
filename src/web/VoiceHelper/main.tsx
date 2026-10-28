import { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import { FlowPage, FlowPageList } from '../FlowPage';
import { joinTranscripts, microphoneError, serviceUrl, VoiceCapture, type TranscriptEvent } from './capture';

type Phase = 'idle' | 'connecting' | 'recording' | 'finalizing' | 'error';
type Service = 'checking' | 'loading' | 'ready' | 'offline' | 'error';

export function VoiceHelperMainScreen() {
	const [phase, setPhase] = useState<Phase>('idle');
	const [service, setService] = useState<Service>('checking');
	const [serviceError, setServiceError] = useState('');
	const [error, setError] = useState('');
	const [segments, setSegments] = useState<Record<number, TranscriptEvent>>({});
	const [copied, setCopied] = useState(false);
	const captureRef = useRef<VoiceCapture | null>(null);
	const mounted = useRef(true);
	const busy = phase === 'connecting' || phase === 'recording' || phase === 'finalizing';
	const entries = Object.values(segments).sort((a, b) => a.segment - b.segment);
	const text = joinTranscripts(entries.map((entry) => entry.text));
	const interim = entries.some((entry) => !entry.final);
	const latency = entries[entries.length - 1]?.latencyMs;

	useEffect(() => {
		mounted.current = true;
		let cancelled = false;
		let timer: number;
		let controller: AbortController | undefined;
		async function check() {
			controller = new AbortController();
			const timeout = window.setTimeout(() => controller?.abort(), 4000);
			try {
				const response = await fetch(serviceUrl('health'), { signal: controller.signal });
				const data = await response.json();
				if (cancelled) return;
				if (!['ready', 'loading', 'error'].includes(data.status)) throw new Error('Некорректный ответ сервиса.');
				setService(data.status); setServiceError(data.message || '');
			} catch {
				if (!cancelled) { setService('offline'); setServiceError('Сервис GigaAM недоступен. Запустите сервис распознавания.'); }
			} finally {
				window.clearTimeout(timeout);
				if (!cancelled) timer = window.setTimeout(check, 5000);
			}
		}
		void check();
		return () => {
			cancelled = true; mounted.current = false;
			controller?.abort(); window.clearTimeout(timer);
			captureRef.current?.dispose(); captureRef.current = null;
		};
	}, []);

	const start = async () => {
		if (captureRef.current) return;
		setError(''); setCopied(false); setPhase('connecting');
		const capture = new VoiceCapture({
			transcript: (event) => {
				if (mounted.current) setSegments((current) => current[event.segment]?.final && !event.final ? current : { ...current, [event.segment]: event });
			},
			done: () => { if (mounted.current) { captureRef.current = null; setPhase('idle'); } },
			error: (failure) => { if (mounted.current) { captureRef.current = null; setPhase('error'); setError(microphoneError(failure)); } },
		});
		captureRef.current = capture;
		try {
			await capture.start();
			if (mounted.current && captureRef.current === capture) { setSegments({}); setPhase('recording'); }
		} catch (failure) {
			capture.dispose();
			if (mounted.current && captureRef.current === capture) { captureRef.current = null; setPhase('error'); setError(microphoneError(failure)); }
		}
	};
	const stop = () => { setPhase('finalizing'); captureRef.current?.stop(); };
	const cancel = () => { captureRef.current?.dispose(); captureRef.current = null; setPhase('idle'); };
	const copy = async () => {
		try { await navigator.clipboard.writeText(text); setCopied(true); }
		catch { setError('Браузер не разрешил копирование. Выделите текст вручную.'); }
	};
	const status = phase === 'recording' ? 'Слушаю вас' : phase === 'connecting' ? 'Подключаю микрофон…' : phase === 'finalizing' ? 'Завершаю расшифровку…' : phase === 'error' ? 'Запись прервана' : 'Готов к записи';
	const serviceLabel = service === 'ready' ? 'Модель готова' : service === 'loading' ? 'Модель загружается…' : service === 'checking' ? 'Проверяю подключение…' : service === 'error' ? 'Модель не загружена' : 'Сервис недоступен';

	return (
		<FlowPage title="VoiceHelper">
			<FlowPageList>
				<List title="Голос в текст">
					<Cell title="GigaAM · русский язык" subtitle="Нажмите кнопку и говорите. Текст будет появляться фрагментами по мере распознавания." leading={<Icon name="microphone-outline" width={28} height={28} />} />
					<Cell title={serviceLabel} subtitle={serviceError || 'Распознавание на вашем сервере, без облачного API.'} />
					<Cell title={<span role="status" aria-live="polite">{status}</span>} subtitle={phase === 'recording' ? 'Запись до 2 минут. Нажмите «Остановить», чтобы получить итоговый текст.' : undefined} />
					<Cell title={phase === 'recording'
						? <Button variant="danger" leftIcon={<Icon name="microphone-off-outline" />} onClick={stop}>Остановить</Button>
						: phase === 'connecting' || phase === 'finalizing'
							? <Button variant="secondary" onClick={cancel}>Отменить запись</Button>
							: <Button disabled={service !== 'ready'} leftIcon={<Icon name="microphone-outline" />} onClick={() => void start()}>Начать запись</Button>} />
					{error && <div role="alert"><Cell title="Не удалось выполнить действие" subtitle={error} /></div>}
				</List>
				<List title={interim ? 'Промежуточный текст' : 'Распознанный текст'}>
					<Cell title={<div role="log" aria-label="Распознанный текст" aria-live="polite" aria-atomic="true">{text || (phase === 'recording' ? 'Ожидаю речь…' : 'Здесь появится ваша речь.')}</div>} subtitle={latency !== undefined ? `Последний фрагмент: ${(latency / 1000).toFixed(1)} с` : undefined} />
					<Cell title={<Button size={32} variant="secondary" disabled={!text || busy} onClick={() => void copy()}>{copied ? 'Скопировано' : 'Копировать текст'}</Button>} trailing={<Button size={32} variant="secondary" disabled={!text || busy} onClick={() => { setSegments({}); setCopied(false); }}>Очистить</Button>} />
				</List>
			</FlowPageList>
		</FlowPage>
	);
}
