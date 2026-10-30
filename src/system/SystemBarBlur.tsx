import './system-bar-blur.scss';

/*
 * Прогрессивный блюр под системными барами (docs/system-bars/README.md).
 * Верх: размытие растёт от нижней границы зоны к верхней (до 24 px у статус-бара).
 * Низ: растёт от верхней границы навбара к нижней (до 8 px).
 * Слои с нарастающим blur и масками дают плавный градиент размытия.
 * Включается режимом «наложение» (data-status-bar-mode / data-nav-bar-mode = overlay).
 */
const topLayers = [1, 2, 3, 4, 5] as const;
const bottomLayers = [1, 2, 3] as const;

export function SystemBarBlur() {
	return (
		<>
			<div className="system-blur system-blur--top" aria-hidden="true">
				{topLayers.map((step) => (
					<span className={`system-blur__layer system-blur__layer--${step}`} key={step} />
				))}
			</div>
			<div className="system-blur system-blur--bottom" aria-hidden="true">
				{bottomLayers.map((step) => (
					<span className={`system-blur__layer system-blur__layer--${step}`} key={step} />
				))}
			</div>
		</>
	);
}
