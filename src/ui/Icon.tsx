import { useId } from 'react';
import { iconDefinitions, iconIdPrefixToken, type IconDefinition } from '../generated/icons';
import { resolveCssTokenValue, type CssToken } from './lib/styles';

export type IconName = string;

export type IconProps = {
	name: IconName;
	alt?: string;
	width?: number;
	height?: number;
	color?: CssToken;
	colorToken?: string;
	className?: string;
	style?: React.CSSProperties;
	'aria-hidden'?: boolean | 'true' | 'false';
};

export function Icon({
	name,
	alt,
	width = 20,
	height = 20,
	color,
	colorToken = 'currentColor',
	className,
	style,
	'aria-hidden': ariaHidden = false,
}: IconProps) {
	const definitions = iconDefinitions as Record<string, IconDefinition>;
	const definition = definitions[name] ?? null;

	if (!definition) {
		return null;
	}

	const isAriaHidden = ariaHidden === true || ariaHidden === 'true';
	const resolvedAlt = alt ?? (isAriaHidden ? '' : name);
	const resolvedColor = resolveCssTokenValue(color ?? colorToken);
	const iconIdPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const body = definition.body.split(iconIdPrefixToken).join(`${iconIdPrefix}-`);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={definition.viewBox}
			width={width}
			height={height}
			className={className}
			style={{
				display: 'inline-block',
				color: resolvedColor,
				flexShrink: 0,
				verticalAlign: 'middle',
				...style,
			}}
			focusable="false"
			aria-hidden={isAriaHidden || resolvedAlt === '' ? true : undefined}
			role={isAriaHidden || resolvedAlt === '' ? undefined : 'img'}
			aria-label={isAriaHidden || resolvedAlt === '' ? undefined : resolvedAlt}
			dangerouslySetInnerHTML={{ __html: body }}
		/>
	);
}
