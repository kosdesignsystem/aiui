import type { CSSProperties } from 'react';

export type CssToken = string;

export function resolveCssTokenValue(token: CssToken) {
	if (
		token === 'currentColor' ||
		token.startsWith('var(') ||
		token.startsWith('#') ||
		token.startsWith('rgb') ||
		token.startsWith('hsl')
	) {
		return token;
	}

	if (token.startsWith('--')) {
		return `var(${token})`;
	}

	return `var(--${token})`;
}

export function createCssVarStyle(
	variableName: `--${string}`,
	token?: CssToken,
): CSSProperties | undefined {
	if (!token) {
		return undefined;
	}

	return { [variableName]: resolveCssTokenValue(token) } as CSSProperties;
}
