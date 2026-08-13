import { useMemo, useState } from 'react';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type Station = {
	id: string;
	name: string;
	genre: string;
	frequency: string;
	accent: string;
	art: string;
};

const stations: Station[] = [
	{ id: 'pulse', name: 'Pulse FM', genre: 'Electronic', frequency: '98.4', accent: '#ff6b45', art: 'P' },
	{ id: 'groove', name: 'The Groove', genre: 'Soul & Funk', frequency: '101.7', accent: '#7b61ff', art: 'G' },
	{ id: 'indie', name: 'Indie Waves', genre: 'Alternative', frequency: '105.2', accent: '#2b9b78', art: 'W' },
	{ id: 'jazz', name: 'Night Jazz', genre: 'Jazz', frequency: '91.3', accent: '#3268c8', art: 'J' },
];

const bars = [18, 31, 24, 44, 35, 57, 42, 66, 49, 74, 58, 82, 65, 91, 72, 97, 78, 88, 63, 79, 55, 69, 47, 60, 39, 51, 30, 43, 25, 35, 20];

export default function RadioMainPage() {
	const [activeId, setActiveId] = useState(stations[0].id);
	const [isPlaying, setIsPlaying] = useState(true);
	const [favorites, setFavorites] = useState(() => new Set([stations[0].id]));
	const activeStation = useMemo(
		() => stations.find((station) => station.id === activeId) ?? stations[0],
		[activeId],
	);

	const selectStation = (station: Station) => {
		setActiveId(station.id);
		setIsPlaying(true);
	};

	const toggleFavorite = () => {
		setFavorites((current) => {
			const next = new Set(current);
			next.has(activeId) ? next.delete(activeId) : next.add(activeId);
			return next;
		});
	};

	return (
		<main className="radio-screen">
			<header className="radio-header">
				<div>
					<span className="radio-header__eyebrow">Live radio</span>
					<h1>Good afternoon</h1>
				</div>
				<button className="radio-icon-button" type="button" aria-label="Search stations">
					<Icon name="search" alt="" aria-hidden="true" />
				</button>
			</header>

			<section className="radio-player" style={{ '--station-color': activeStation.accent } as React.CSSProperties}>
				<div className="radio-player__glow" aria-hidden="true" />
				<div className="radio-player__topline">
					<span className="radio-live"><i /> ON AIR</span>
					<button className={`radio-favorite${favorites.has(activeId) ? ' is-active' : ''}`} type="button" onClick={toggleFavorite} aria-label="Toggle favorite">
						<Icon name={favorites.has(activeId) ? 'star-100' : 'star-0'} alt="" aria-hidden="true" />
					</button>
				</div>

				<div className="radio-player__identity">
					<div className="radio-player__art" aria-hidden="true"><span>{activeStation.art}</span></div>
					<div>
						<h2>{activeStation.name}</h2>
						<p>{activeStation.genre} · {activeStation.frequency} FM</p>
					</div>
				</div>

				<div className={`radio-wave${isPlaying ? ' is-playing' : ''}`} aria-hidden="true">
					{bars.map((height, index) => <i key={index} style={{ height: `${height}%`, animationDelay: `${index * -0.04}s` }} />)}
				</div>

				<div className="radio-track">
					<div><strong>Midnight City</strong><span>M83</span></div>
					<span className="radio-track__time">2:41</span>
				</div>

				<div className="radio-controls">
					<button type="button" aria-label="Previous station" onClick={() => {
						const index = stations.findIndex((station) => station.id === activeId);
						selectStation(stations[(index - 1 + stations.length) % stations.length]);
					}}><Icon name="arrow-left" alt="" aria-hidden="true" /></button>
					<button className="radio-controls__play" type="button" aria-label={isPlaying ? 'Pause' : 'Play'} onClick={() => setIsPlaying((value) => !value)}>
						<Icon name={isPlaying ? 'pause' : 'play'} alt="" aria-hidden="true" />
					</button>
					<button type="button" aria-label="Next station" onClick={() => {
						const index = stations.findIndex((station) => station.id === activeId);
						selectStation(stations[(index + 1) % stations.length]);
					}}><Icon name="arrow-right" alt="" aria-hidden="true" /></button>
				</div>
			</section>

			<section className="radio-stations">
				<div className="radio-section-heading"><h2>Popular stations</h2><button type="button">See all</button></div>
				<div className="radio-station-list">
					{stations.map((station) => (
						<button className={`radio-station${station.id === activeId ? ' is-active' : ''}`} type="button" key={station.id} onClick={() => selectStation(station)}>
							<span className="radio-station__art" style={{ background: station.accent }}>{station.art}</span>
							<span className="radio-station__copy"><strong>{station.name}</strong><small>{station.genre}</small></span>
							<span className="radio-station__frequency">{station.frequency}</span>
							<span className="radio-station__action"><Icon name={station.id === activeId && isPlaying ? 'volume-100' : 'play'} alt="" aria-hidden="true" /></span>
						</button>
					))}
				</div>
			</section>
		</main>
	);
}
