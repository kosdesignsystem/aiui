import { useMemo, useState } from 'react';
import { evaluateExpression } from './model';
import { CalculatorScreen } from './screen';

const operatorSet = new Set(['+', '-', '×', '÷']);

export default function CalculatorMainPage() {
	const [expression, setExpression] = useState('');
	const [display, setDisplay] = useState('0');
	const [lastActionLabel, setLastActionLabel] = useState('Готов к расчету');

	const canAppendDecimal = useMemo(() => {
		const chunks = expression.split(/[+\-×÷]/);
		const lastChunk = chunks[chunks.length - 1] ?? '';
		return !lastChunk.includes('.');
	}, [expression]);

	const handleClear = () => {
		setExpression('');
		setDisplay('0');
		setLastActionLabel('Очищено');
	};

	const handleEvaluate = () => {
		if (!expression) {
			return;
		}

		try {
			const nextDisplay = evaluateExpression(expression);
			setDisplay(nextDisplay);
			setExpression(nextDisplay);
			setLastActionLabel('Результат получен');
		} catch {
			setDisplay('Ошибка');
			setExpression('');
			setLastActionLabel('Неверное выражение');
		}
	};

	const handlePercent = () => {
		if (!display || display === 'Ошибка') {
			return;
		}

		const nextValue = String(Number(display) / 100);
		setDisplay(nextValue);
		setExpression(nextValue);
		setLastActionLabel('Процент');
	};

	const handleToggleSign = () => {
		if (!display || display === '0' || display === 'Ошибка') {
			return;
		}

		const nextValue = display.startsWith('-') ? display.slice(1) : `-${display}`;
		setDisplay(nextValue);
		setExpression(nextValue);
		setLastActionLabel('Смена знака');
	};

	const handleKeyPress = (key: string) => {
		if (key === 'C') {
			handleClear();
			return;
		}

		if (key === '=') {
			handleEvaluate();
			return;
		}

		if (key === '%') {
			handlePercent();
			return;
		}

		if (key === '±') {
			handleToggleSign();
			return;
		}

		if (key === '.') {
			if (!canAppendDecimal) {
				return;
			}

			const lastChar = expression[expression.length - 1];
			const base = !expression || operatorSet.has(lastChar) ? `${expression}0` : expression;
			const nextExpression = `${base}.`;
			setExpression(nextExpression);
			setDisplay(nextExpression.split(/[+\-×÷]/).at(-1) ?? '0');
			setLastActionLabel('Дробная часть');
			return;
		}

		if (operatorSet.has(key)) {
			if (!expression) {
				if (display !== '0' && display !== 'Ошибка') {
					setExpression(`${display}${key}`);
				}
				return;
			}

			const lastChar = expression[expression.length - 1];
			if (operatorSet.has(lastChar)) {
				setExpression(`${expression.slice(0, -1)}${key}`);
			} else {
				setExpression(`${expression}${key}`);
			}
			setLastActionLabel('Оператор');
			return;
		}

		const nextExpression = display === 'Ошибка' ? key : `${expression}${key}`;
		setExpression(nextExpression);
		setDisplay(nextExpression.split(/[+\-×÷]/).at(-1) ?? '0');
		setLastActionLabel('Ввод числа');
	};

	return (
		<CalculatorScreen
			display={display}
			expression={expression}
			onKeyPress={handleKeyPress}
			lastActionLabel={lastActionLabel}
		/>
	);
}
