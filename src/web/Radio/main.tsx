import { useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { AnimatedRollingNumber } from './AnimatedRollingNumber';
import './screen.scss';

type RadioBrowserStation = {
	stationuuid: string;
	name: string;
	url_resolved: string;
	favicon: string;
	tags: string;
	country: string;
};

type Station = RadioBrowserStation & { frequency: number };

const API_BASES = [
	'https://all.api.radio-browser.info/json',
	'https://de1.api.radio-browser.info/json',
	'https://nl1.api.radio-browser.info/json',
];
const FALLBACK_STATIONS: RadioBrowserStation[] = [
	{ stationuuid: 'groovesalad', name: 'Groove Salad', url_resolved: 'https://ice2.somafm.com/groovesalad-128-mp3', favicon: '', tags: 'ambient', country: 'United States' },
	{ stationuuid: 'secretagent', name: 'Secret Agent', url_resolved: 'https://ice2.somafm.com/secretagent-128-mp3', favicon: '', tags: 'downtempo', country: 'United States' },
	{ stationuuid: 'dronezone', name: 'Drone Zone', url_resolved: 'https://ice2.somafm.com/dronezone-128-mp3', favicon: '', tags: 'ambient', country: 'United States' },
	{ stationuuid: 'indiepop', name: 'Indie Pop Rocks!', url_resolved: 'https://ice2.somafm.com/indiepop-128-mp3', favicon: '', tags: 'indie', country: 'United States' },
	{ stationuuid: 'lush', name: 'Lush', url_resolved: 'https://ice2.somafm.com/lush-128-mp3', favicon: '', tags: 'electronic', country: 'United States' },
	{ stationuuid: 'fluid', name: 'Fluid', url_resolved: 'https://ice2.somafm.com/fluid-128-mp3', favicon: '', tags: 'instrumental hip-hop', country: 'United States' },
	{ stationuuid: 'bootliquor', name: 'Boot Liquor', url_resolved: 'https://ice2.somafm.com/bootliquor-128-mp3', favicon: '', tags: 'americana', country: 'United States' },
	{ stationuuid: 'sonicuniverse', name: 'Sonic Universe', url_resolved: 'https://ice2.somafm.com/sonicuniverse-128-mp3', favicon: '', tags: 'jazz', country: 'United States' },
];

async function fetchStations(signal: AbortSignal) {
	const path = '/stations/topclick/30?hidebroken=true&order=clickcount&reverse=true';
	for (const apiBase of API_BASES) {
		try {
			const response = await fetch(`${apiBase}${path}`, { signal });
			if (response.ok) return await response.json() as RadioBrowserStation[];
		} catch (error) {
			if (signal.aborted) throw error;
		}
	}
	throw new Error('Radio Browser is unavailable');
}

function addFrequencies(stations: RadioBrowserStation[]): Station[] {
	const unique = stations.filter((station, index, list) =>
		station.name.trim() && station.url_resolved && list.findIndex((item) => item.stationuuid === station.stationuuid) === index,
	);
	return unique.slice(0, 30).map((station, index, list) => ({
		...station,
		frequency: Number((87.5 + (20.5 * index) / Math.max(list.length - 1, 1)).toFixed(1)),
	}));
}

export default function RadioMainPage() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const shouldKeepPlayingRef = useRef(false);
	const [stations, setStations] = useState(() => addFrequencies(FALLBACK_STATIONS));
	const [stationIndex, setStationIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const station = stations[stationIndex] ?? stations[0];
	const tunerPosition = useMemo(() => ((station.frequency - 87.5) / 20.5) * 100, [station.frequency]);

	useEffect(() => {
		const controller = new AbortController();
		fetchStations(controller.signal)
			.then((result) => {
				const playable = addFrequencies(result);
				if (playable.length) {
					setStations(playable);
					setStationIndex(0);
				}
			})
			.catch(() => {
				setStations(addFrequencies(FALLBACK_STATIONS));
				setStationIndex(0);
			});
		return () => controller.abort();
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const shouldResume = shouldKeepPlayingRef.current;
		audio.load();
		setIsLoading(shouldResume);
		setHasError(false);
		if (shouldResume) {
			audio.play().catch(() => {
				setIsLoading(false);
				setHasError(true);
			});
		}
	}, [station.stationuuid]);

	const tune = (nextIndex: number) => {
		setStationIndex((nextIndex + stations.length) % stations.length);
	};

	const togglePlayback = async () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!audio.paused) {
			shouldKeepPlayingRef.current = false;
			audio.pause();
			return;
		}
		shouldKeepPlayingRef.current = true;
		setIsLoading(true);
		setHasError(false);
		try {
			await audio.play();
			if (station.stationuuid.includes('-')) {
					void fetch(`${API_BASES[0]}/url/${station.stationuuid}`, { method: 'POST' });
			}
		} catch {
			shouldKeepPlayingRef.current = false;
			setIsLoading(false);
			setHasError(true);
		}
	};

	return (
		<main className="radio-screen">
			<audio
				ref={audioRef}
				src={station.url_resolved}
				preload="none"
				onPlaying={() => { setIsPlaying(true); setIsLoading(false); }}
				onPause={() => setIsPlaying(false)}
				onWaiting={() => setIsLoading(true)}
				onCanPlay={() => setIsLoading(false)}
				onError={() => { setHasError(true); setIsLoading(false); setIsPlaying(false); }}
			/>
			<section className="radio-frequency" aria-live="polite">
				<AnimatedRollingNumber className="radio-frequency__number rolling-number" value={station.frequency} />
				<Text variant="regular-16" className="radio-frequency__name">{station.name}</Text>
				{station.country ? <Text variant="medium-12" className="radio-frequency__country">{station.country}</Text> : null}
			</section>

			<div className="radio-tuner">
				<div className="radio-tuner__ticks" aria-hidden="true">
					{Array.from({ length: 41 }, (_, index) => <i className={index % 5 === 0 ? 'is-major' : ''} key={index} />)}
				</div>
				<div className="radio-tuner__needle" style={{ left: `${tunerPosition}%` }} aria-hidden="true" />
				<input
					type="range"
					min="0"
					max={stations.length - 1}
					value={stationIndex}
					onChange={(event) => tune(Number(event.target.value))}
					aria-label="Настроить частоту"
				/>
				<div className="radio-tuner__labels"><span>88</span><span>92</span><span>96</span><span>100</span><span>104</span><span>108</span></div>
			</div>

			<div className="radio-now-playing">
				<Text variant="regular-14" color="secondary">Сейчас в эфире</Text>
				<Text variant="semiBold-24" className="radio-now-playing__title">{hasError ? 'Поток недоступен' : station.name}</Text>
			</div>

			<div className="radio-controls">
				<button type="button" aria-label="Предыдущая волна" onClick={() => tune(stationIndex - 1)}><Icon name="arrow-left" alt="" aria-hidden="true" /></button>
				<button className="radio-controls__main" type="button" onClick={togglePlayback}>
					<Text variant="semiBold-16">{isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}</Text>
				</button>
				<button type="button" aria-label="Следующая волна" onClick={() => tune(stationIndex + 1)}><Icon name="arrow-right" alt="" aria-hidden="true" /></button>
			</div>
		</main>
	);
}
