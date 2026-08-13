import type { CSSProperties } from 'react';

type AnimatedRollingNumberProps = {
	value: number;
	decimals?: number;
	className?: string;
};

const DIGITS = Array.from({ length: 10 }, (_, digit) => digit);

// Web adaptation of the reel technique used by
// https://github.com/BouarourMohammed/react-native-animated-rolling-numbers.
function formatFrequency(value: number, decimals: number) {
	const [integer, fraction] = value.toFixed(decimals).split('.');
	return `${integer.padStart(3, '0')}.${fraction}`;
}

export function AnimatedRollingNumber({
	value,
	decimals = 1,
	className,
}: AnimatedRollingNumberProps) {
	const formattedValue = formatFrequency(value, decimals);

	return (
		<span className={className} aria-label={value.toFixed(decimals)}>
			{Array.from(formattedValue).map((character, index) => {
				if (character === '.') {
					return <span className="rolling-number__separator" aria-hidden="true" key={`separator-${index}`}>.</span>;
				}

				const digit = Number(character);
				return (
					<span className="rolling-number__digit" aria-hidden="true" key={`digit-${index}`}>
						<span
							className="rolling-number__reel"
							style={{ '--rolling-digit': digit } as CSSProperties}
						>
							{DIGITS.map((reelDigit) => <span key={reelDigit}>{reelDigit}</span>)}
						</span>
					</span>
				);
			})}
		</span>
	);
}
