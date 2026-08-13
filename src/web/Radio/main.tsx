import { useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import './screen.scss';

type RadioBrowserStation = {
	stationuuid: string;
	name: string;
	url_resolved: string;
	favicon: string;
	tags: string;
};

type Station = RadioBrowserStation & { frequency: number };

const API_BASE = 'https://all.api.radio-browser.info/json';
const FALLBACK_STATIONS: RadioBrowserStation[] = [
	{ stationuuid: 'groovesalad', name: 'Groove Salad', url_resolved: 'https://ice2.somafm.com/groovesalad-128-mp3', favicon: '', tags: 'ambient' },
	{ stationuuid: 'secretagent', name: 'Secret Agent', url_resolved: 'https://ice2.somafm.com/secretagent-128-mp3', favicon: '', tags: 'downtempo' },
	{ stationuuid: 'dronezone', name: 'Drone Zone', url_resolved: 'https://ice2.somafm.com/dronezone-128-mp3', favicon: '', tags: 'ambient' },
	{ stationuuid: 'indiepop', name: 'Indie Pop Rocks!', url_resolved: 'https://ice2.somafm.com/indiepop-128-mp3', favicon: '', tags: 'indie' },
];

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
	const [stations, setStations] = useState(() => addFrequencies(FALLBACK_STATIONS));
	const [stationIndex, setStationIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const station = stations[stationIndex] ?? stations[0];
	const tunerPosition = useMemo(() => ((station.frequency - 87.5) / 20.5) * 100, [station.frequency]);

	useEffect(() => {
		const controller = new AbortController();
		fetch(`${API_BASE}/stations/topclick/30?hidebroken=true&order=clickcount&reverse=true`, {
			signal: controller.signal,
		})
			.then((response) => response.ok ? response.json() as Promise<RadioBrowserStation[]> : Promise.reject())
			.then((result) => {
				const playable = addFrequencies(result);
				if (playable.length) {
					setStations(playable);
					setStationIndex(0);
				}
			})
			.catch(() => undefined);
		return () => controller.abort();
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.pause();
		audio.load();
		setIsPlaying(false);
		setIsLoading(false);
		setHasError(false);
	}, [station.stationuuid]);

	const tune = (nextIndex: number) => {
		setStationIndex((nextIndex + stations.length) % stations.length);
		setIsFavorite(false);
	};

	const togglePlayback = async () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!audio.paused) {
			audio.pause();
			return;
		}
		setIsLoading(true);
		setHasError(false);
		try {
			await audio.play();
			if (station.stationuuid.includes('-')) {
				void fetch(`${API_BASE}/url/${station.stationuuid}`, { method: 'POST' });
			}
		} catch {
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

			<header className="radio-header">
				<IconButton variant="ghost" aria-label="Предыдущая станция" onClick={() => tune(stationIndex - 1)}>
					<Icon name="chevron-left" alt="" aria-hidden="true" />
				</IconButton>
				<Text variant="semiBold-16" className="radio-header__station">Radio</Text>
				<div className="radio-band" aria-label="Диапазон FM"><b>FM</b><span>AM</span></div>
			</header>

			<section className="radio-frequency" aria-live="polite">
				<div><span>{station.frequency.toFixed(1).slice(0, 2)}</span>{station.frequency.toFixed(1).slice(2)}</div>
				<Text variant="regular-16" className="radio-frequency__name">{station.name}</Text>
			</section>

			<div className="radio-actions">
				<IconButton variant="ghost" aria-label="Избранное" onClick={() => setIsFavorite((value) => !value)}>
					<Icon name={isFavorite ? 'star-100' : 'star-0'} colorToken={isFavorite ? '#ff4141' : '#ffffff'} alt="" aria-hidden="true" />
				</IconButton>
				<Text variant="medium-12">{station.tags.split(',')[0] || 'Live radio'}</Text>
				<IconButton variant="ghost" aria-label="Поделиться станцией" onClick={() => void navigator.share?.({ title: station.name, url: station.url_resolved })}>
					<Icon name="share-outline" alt="" aria-hidden="true" />
				</IconButton>
			</div>

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
