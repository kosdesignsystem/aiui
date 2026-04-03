const operators = ['+', '-', '×', '÷'] as const;

type Operator = (typeof operators)[number];

type Token = number | Operator;

function isOperator(value: string): value is Operator {
	return operators.includes(value as Operator);
}

function toRawOperator(value: Operator): '+' | '-' | '*' | '/' {
	if (value === '×') return '*';
	if (value === '÷') return '/';
	return value;
}

function tokenize(expression: string): Token[] {
	const tokens: Token[] = [];
	let current = '';

	for (let index = 0; index < expression.length; index += 1) {
		const char = expression[index];

		if (char === ' ') {
			continue;
		}

		if (isOperator(char)) {
			if (current) {
				tokens.push(Number(current));
				current = '';
			}

			tokens.push(char);
			continue;
		}

		if (char === '.' || /\d/.test(char)) {
			current += char;
			continue;
		}

		throw new Error('unsupported_char');
	}

	if (current) {
		tokens.push(Number(current));
	}

	return tokens;
}

function applyOperation(left: number, right: number, operator: Operator): number {
	switch (toRawOperator(operator)) {
		case '+':
			return left + right;
		case '-':
			return left - right;
		case '*':
			return left * right;
		case '/':
			if (right === 0) {
				throw new Error('division_by_zero');
			}
			return left / right;
	}
}

function precedence(operator: Operator): number {
	if (operator === '×' || operator === '÷') {
		return 2;
	}

	return 1;
}

export function evaluateExpression(expression: string): string {
	const tokens = tokenize(expression);

	if (tokens.length === 0) {
		return '0';
	}

	const values: number[] = [];
	const ops: Operator[] = [];

	for (const token of tokens) {
		if (typeof token === 'number') {
			if (!Number.isFinite(token)) {
				throw new Error('invalid_number');
			}
			values.push(token);
			continue;
		}

		while (ops.length > 0 && precedence(ops[ops.length - 1]) >= precedence(token)) {
			const operator = ops.pop();
			const right = values.pop();
			const left = values.pop();
			if (operator === undefined || right === undefined || left === undefined) {
				throw new Error('invalid_expression');
			}
			values.push(applyOperation(left, right, operator));
		}

		ops.push(token);
	}

	while (ops.length > 0) {
		const operator = ops.pop();
		const right = values.pop();
		const left = values.pop();
		if (operator === undefined || right === undefined || left === undefined) {
			throw new Error('invalid_expression');
		}
		values.push(applyOperation(left, right, operator));
	}

	if (values.length !== 1) {
		throw new Error('invalid_expression');
	}

	const result = values[0];
	if (!Number.isFinite(result)) {
		throw new Error('invalid_result');
	}

	const rounded = Number(result.toFixed(10));
	return String(rounded);
}
