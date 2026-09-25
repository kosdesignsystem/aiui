import { useState } from 'react';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type WeatherKind = 'sun' | 'cloud' | 'sun-rain' | 'rain' | 'sunset';

const hourlyForecast: Array<{ time: string; kind: WeatherKind; temperature: string }> = [
	{ time: 'Сейчас', kind: 'sun', temperature: '+12°' },
	{ time: '9:00', kind: 'cloud', temperature: '+12°' },
	{ time: '12:00', kind: 'sun-rain', temperature: '+12°' },
	{ time: '15:45', kind: 'sunset', temperature: '+12°' },
	{ time: '18:00', kind: 'cloud', temperature: '+11°' },
];

const dailyForecast: Array<{ date: string; day: string; kind: WeatherKind }> = [
	{ date: '14 сентября', day: 'Сегодня', kind: 'sun' },
	{ date: '15 сентября', day: 'Вторник', kind: 'sun' },
	{ date: '16 сентября', day: 'Среда', kind: 'cloud' },
	{ date: '17 сентября', day: 'Четверг', kind: 'sun-rain' },
	{ date: '18 сентября', day: 'Пятница', kind: 'cloud' },
	{ date: '19 сентября', day: 'Суббота', kind: 'sun-rain' },
	{ date: '20 сентября', day: 'Воскресенье', kind: 'rain' },
	{ date: '21 сентября', day: 'Понедельник', kind: 'rain' },
	{ date: '22 сентября', day: 'Вторник', kind: 'sun' },
	{ date: '23 сентября', day: 'Среда', kind: 'sun-rain' },
];

function WeatherGlyph({ kind, large = false }: { kind: WeatherKind; large?: boolean }) {
	return (
		<span className={`weather-glyph weather-glyph--${kind}${large ? ' weather-glyph--large' : ''}`} aria-hidden="true">
			{kind === 'sun' ? '☀' : null}
			{kind === 'cloud' ? '☁' : null}
			{kind === 'sun-rain' ? <><span>🌤</span><i>╱╱╱</i></> : null}
			{kind === 'rain' ? <><span>☁</span><i>╱╱╱</i></> : null}
			{kind === 'sunset' ? <><span>🌤</span><i>↓</i></> : null}
		</span>
	);
}

export default function WeatherMainPage() {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const refresh = () => {
		setIsRefreshing(true);
		window.setTimeout(() => setIsRefreshing(false), 700);
	};

	return (
		<div className="weather-screen">
			<header className="weather-header">
				<button type="button" className="weather-header__button" aria-label="Открыть меню">
					<Icon name="menu" width={26} height={26} aria-hidden="true" />
				</button>
				<div className="weather-header__pages" aria-label="Первая из пяти страниц">
					<Icon name="place" width={19} height={19} aria-hidden="true" />
					<span className="is-active" /><span /><span /><span />
				</div>
				<button type="button" className={`weather-header__button${isRefreshing ? ' is-refreshing' : ''}`} aria-label="Обновить прогноз" onClick={refresh}>
					<Icon name="arrow-repeat" width={28} height={28} aria-hidden="true" />
				</button>
			</header>

			<main className="weather-content">
				<section className="weather-current">
					<p className="weather-current__updated">Обновлено в 12:30</p>
					<h1>Москва</h1>
					<div className="weather-current__temperature"><strong>+30°</strong><WeatherGlyph kind="sun" large /></div>
					<p className="weather-current__feels">Ощущается как +29°</p>
					<p className="weather-current__state">Ясно</p>
					<ul className="weather-facts">
						<li><span aria-hidden="true">≋</span>Ветер: 1 м/с, СЗ</li>
						<li><span aria-hidden="true">◴</span>Давление: 744 мм рт. ст.</li>
						<li><span aria-hidden="true">♧</span>Влажность: 63%</li>
					</ul>
				</section>

				<section className="weather-card weather-card--hourly">
					<h2>Прогноз на 24 часа</h2>
					<div className="weather-hours">
						{hourlyForecast.map((item) => <div className="weather-hour" key={item.time}><span>{item.time}</span><WeatherGlyph kind={item.kind} /><strong>{item.temperature}</strong></div>)}
					</div>
				</section>

				<section className="weather-card weather-card--daily">
					<h2>Прогноз на 7 дней</h2>
					<div className="weather-days">
						{dailyForecast.map((item) => (
							<div className="weather-day" key={`${item.date}-${item.day}`}>
								<div><span>{item.date}</span><strong>{item.day}</strong></div>
								<b>2 м/с</b><WeatherGlyph kind={item.kind} /><b>+13°</b><span className="weather-day__low">+13°</span>
							</div>
						))}
					</div>
				</section>

				<footer className="weather-footer">Данные получены с <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap</a></footer>
			</main>
		</div>
	);
}
