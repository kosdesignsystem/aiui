import './blur.scss';

const days = ['Сегодня', 'Завтра', 'Пт, 31 окт', 'Сб, 1 ноя', 'Вс, 2 ноя', 'Пн, 3 ноя', 'Вт, 4 ноя', 'Ср, 5 ноя'];
const hours = ['сейчас', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

/**
 * Прогрессивный блюр при скролле: контент уходит под статус-бар с шапкой (96 px)
 * и под навбар (48 px). Размытие у верха до 24 px и убывает к нижней границе зоны,
 * у навбара до 8 px и убывает к его верхней границе.
 */
export default function StatusBarBlurPage() {
	return (
		<div
			className="sb-blur"
			data-status-bar-mode="overlay"
			data-status-bar-blur="header"
			data-status-bar-icons="light"
			data-nav-bar-mode="overlay"
			data-nav-bar-icons="light"
		>
			<header className="sb-blur__header">
				<span className="sb-blur__menu" aria-hidden="true" />
				<span className="sb-blur__dots" aria-hidden="true">
					<i className="is-active" />
					<i />
					<i />
					<i />
				</span>
				<span className="sb-blur__refresh" aria-hidden="true" />
			</header>
			<div className="sb-blur__scroll">
				<section className="sb-blur__hero">
					<p className="sb-blur__updated">Обновлено в 12:30</p>
					<p className="sb-blur__city">МОСКВА</p>
					<p className="sb-blur__temp">+30°</p>
					<p className="sb-blur__feels">Ощущается как +29°</p>
					<p className="sb-blur__sky">Ясно</p>
				</section>
				<section className="sb-blur__card">
					<div className="sb-blur__hours">
						{hours.map((hour) => (
							<div key={hour}>
								<span>{hour}</span>
								<b>+12°</b>
							</div>
						))}
					</div>
				</section>
				<section className="sb-blur__card">
					<p className="sb-blur__card-title">ПРОГНОЗ НА 7 ДНЕЙ</p>
					{days.map((day, index) => (
						<div className="sb-blur__day" key={day}>
							<span>{day}</span>
							<span>2 м/с</span>
							<b>+{13 - index}°</b>
							<span>+{12 - index}°</span>
						</div>
					))}
				</section>
				<section className="sb-blur__card sb-blur__card--tall">
					<p className="sb-blur__card-title">ВЕТЕР И ДАВЛЕНИЕ</p>
					<p className="sb-blur__note">Порывы до 6 м/с, давление 752 мм рт. ст., влажность 48%.</p>
				</section>
			</div>
		</div>
	);
}
