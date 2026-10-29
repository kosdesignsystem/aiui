import './protection.scss';

type BarProtectionProps = {
	enabled: boolean;
};

/**
 * Градиент под навбаром по тому же рецепту, что у статус-бара: чёрный 40% → 0
 * на высоте бара. Статус-бар рисует свой градиент сам (system/StatusBar).
 */
export function BarProtection({ enabled }: BarProtectionProps) {
	return <div className={`sb-protect sb-protect--bottom${enabled ? ' is-on' : ''}`} aria-hidden="true" />;
}
