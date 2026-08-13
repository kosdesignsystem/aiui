import { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { FlowPage } from '../FlowPage';
import './main.scss';

const stations = [
	{
		id: 'groove',
		frequency: '94.4',
		name: 'Groove Salad',
		genre: 'Downtempo · San Francisco',
		url: 'https://ice5.somafm.com/groovesalad-128-mp3',
	},
	{
		id: 'drone',
		frequency: '98.7',
		name: 'Drone Zone',
		genre: 'Ambient · SomaFM',
		url: 'https://ice5.somafm.com/dronezone-128-mp3',
	},
	{
		id: 'defcon',
		frequency: '101.9',
		name: 'DEF CON Radio',
		genre: 'Electronic · SomaFM',
		url: 'https://ice5.somafm.com/defcon-128-mp3',
	},
] as const;

export function RadioScreen() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [stationIndex, setStationIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFavorite, setIsFavorite] = useState(true);
	const [status, setStatus] = useState('Прямой эфир');
	const station = stations[stationIndex];

	useEffect(() => {
		return () => audioRef.current?.pause();
	}, []);

	const play = async () => {
		const audio = audioRef.current;
		if (!audio) return;

		setStatus('Подключаемся…');
		try {
			await audio.play();
			setIsPlaying(true);
			setStatus('Прямой эфир');
		} catch {
			setIsPlaying(false);
			setStatus('Не удалось подключиться');
		}
	};

	const togglePlayback = () => {
		if (isPlaying) {
			audioRef.current?.pause();
			setIsPlaying(false);
			setStatus('Пауза');
			return;
		}
		void play();
	};

	const selectStation = (nextIndex: number) => {
		const shouldResume = isPlaying;
		audioRef.current?.pause();
		setStationIndex(nextIndex);
		setIsPlaying(false);
		setStatus('Прямой эфир');
		if (shouldResume) window.setTimeout(() => void play(), 0);
	};

	const skip = (direction: number) => {
		selectStation((stationIndex + direction + stations.length) % stations.length);
	};

	const share = async () => {
		const data = { title: station.name, text: `Слушаю ${station.name}`, url: station.url };
		if (navigator.share) {
			await navigator.share(data).catch(() => undefined);
		} else {
			await navigator.clipboard?.writeText(station.url);
			setStatus('Ссылка скопирована');
		}
	};

	return (
		<FlowPage>
			<main className="radio-screen">
				<audio
					ref={audioRef}
					src={station.url}
					preload="none"
					onPlaying={() => setIsPlaying(true)}
					onError={() => {
						setIsPlaying(false);
						setStatus('Станция временно недоступна');
					}}
				/>

				<header className="radio-screen__header">
					<div>
						<Text as="p" variant="semiBold-24">Радио</Text>
						<Text as="p" variant="regular-14" className="radio-screen__live">● {status}</Text>
					</div>
					<SegmentedTabs
						className="radio-screen__band"
						tabs={[{ id: 'online', label: 'ONLINE' }, { id: 'fm', label: 'FM' }]}
						value="online"
						onChange={() => setStatus('FM доступно через интернет')}
					/>
				</header>

				<section className="radio-screen__tuner" aria-label="Текущая станция">
					<Text as="p" family="clock" variant="semiBold-52" className="radio-screen__frequency">
						{station.frequency}
					</Text>
					<Text as="p" variant="semiBold-24">{station.name}</Text>
					<Text as="p" variant="regular-14" className="radio-screen__genre">{station.genre}</Text>

					<div className={`radio-screen__speaker${isPlaying ? ' is-playing' : ''}`} aria-hidden="true">
						{Array.from({ length: 7 }, (_, index) => <i key={index} />)}
					</div>

					<div className="radio-screen__scale" aria-hidden="true">
						<span>92</span><span>96</span><span>100</span><span>104</span>
					</div>
				</section>

				<div className="radio-screen__meta-actions">
					<IconButton size={60} variant="secondary" aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'} onClick={() => setIsFavorite(!isFavorite)}>
						<Icon name={isFavorite ? 'star-100' : 'star-0'} width={24} height={24} alt="" />
					</IconButton>
					<Text variant="medium-14">{stationIndex + 1} / {stations.length}</Text>
					<IconButton size={60} variant="secondary" aria-label="Поделиться" onClick={() => void share()}>
						<Icon name="share-outline" width={24} height={24} alt="" />
					</IconButton>
				</div>

				<div className="radio-screen__controls">
					<IconButton size={60} variant="secondary" aria-label="Предыдущая станция" onClick={() => skip(-1)}>
						<Icon name="chevron-left" width={28} height={28} alt="" />
					</IconButton>
					<Button className="radio-screen__play" size={60} onClick={togglePlayback} aria-label={isPlaying ? 'Поставить на паузу' : 'Слушать эфир'}>
						<span className={isPlaying ? 'radio-screen__pause' : 'radio-screen__play-icon'} aria-hidden="true" />
						{isPlaying ? 'Пауза' : 'Слушать'}
					</Button>
					<IconButton size={60} variant="secondary" aria-label="Следующая станция" onClick={() => skip(1)}>
						<Icon name="chevron-right" width={28} height={28} alt="" />
					</IconButton>
				</div>

				<div className="radio-screen__presets" aria-label="Станции">
					{stations.map((item, index) => (
						<button key={item.id} type="button" className={index === stationIndex ? 'is-active' : ''} onClick={() => selectStation(index)}>
							<strong>{item.frequency}</strong><span>{item.name}</span>
						</button>
					))}
				</div>
			</main>
		</FlowPage>
	);
}
