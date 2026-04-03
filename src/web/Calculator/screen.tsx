import { App } from '../../ui/App';
import { Header } from '../../ui/Header';
import { Text } from '../../ui/Fonts';
import { View } from '../../ui/View';
import './screen.scss';

type CalculatorScreenProps = {
	display: string;
	expression: string;
	onKeyPress: (key: string) => void;
	lastActionLabel: string;
};

export function CalculatorScreen({ display, expression, onKeyPress, lastActionLabel }: CalculatorScreenProps) {
	return (
		<App>
			<div className="calculator-screen">
				<Header title="Калькулятор" />
				<View>
					<div className="calculator-screen__content">
						<section className="calculator-screen__display" aria-live="polite">
							<Text variant="regular-14" color="secondary">
								{expression || '0'}
							</Text>
							<Text variant="medium-36" color="primary">
								{display}
							</Text>
							<Text variant="regular-14" color="secondary">
								{lastActionLabel}
							</Text>
						</section>

						<section className="calculator-screen__keys" aria-label="Кнопки калькулятора">
							{[
								['C', '±', '%', '÷'],
								['7', '8', '9', '×'],
								['4', '5', '6', '-'],
								['1', '2', '3', '+'],
								['0', '.', '='],
							].map((row, rowIndex) => (
								<div className="calculator-screen__row" key={`row-${rowIndex}`}>
									{row.map((key) => (
										<button
											type="button"
											key={key}
											className={`calculator-screen__key${key === '0' ? ' is-wide' : ''}${['÷', '×', '-', '+', '='].includes(key) ? ' is-accent' : ''}`}
											onClick={() => onKeyPress(key)}
										>
											<Text variant="medium-24" color="primary">
												{key}
											</Text>
										</button>
									))}
								</div>
							))}
						</section>
					</div>
				</View>
			</div>
		</App>
	);
}
