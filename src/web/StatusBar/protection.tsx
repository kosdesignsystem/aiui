import './protection.scss';

type BarProtectionProps = {
	enabled: boolean;
};

/**
 * Защита значков баров (P3): тёмный градиент под статус-баром и навбаром.
 * Значки фиксированные (#FFFFFF), цвет контента их не меняет, читаемость
 * держит градиент. Высота = зона бара (40 / 52) + 56 на плавный спад.
 */
export function BarProtection({ enabled }: BarProtectionProps) {
	return (
		<>
			<div className={`sb-protect sb-protect--top${enabled ? ' is-on' : ''}`} aria-hidden="true" />
			<div className={`sb-protect sb-protect--bottom${enabled ? ' is-on' : ''}`} aria-hidden="true" />
		</>
	);
}
