const iconModules = import.meta.glob('../assets/icons/*.svg', {
	eager: true,
	import: 'default',
}) as Record<string, string>;

const icons = Object.entries(iconModules).reduce<Record<string, string>>((acc, [path, src]) => {
	const fileName = path.split('/').pop();
	if (!fileName) {
		return acc;
	}

	const iconName = fileName.replace(/\.svg$/i, '');
	acc[iconName] = src;
	return acc;
}, {});

export const iconNames = Object.keys(icons).sort();

export type IconName = string;

export type IconProps = {
	name: IconName;
	alt?: string;
	width?: number;
	height?: number;
	colorToken?: string;
	'aria-hidden'?: boolean | 'true' | 'false';
};

function resolveColorValue(colorToken: string) {
	if (colorToken.startsWith('var(') || colorToken.startsWith('#') || colorToken.startsWith('rgb') || colorToken.startsWith('hsl')) {
		return colorToken;
	}

	if (colorToken.startsWith('--')) {
		return `var(${colorToken})`;
	}

	return `var(--${colorToken})`;
}

export function Icon({
	name,
	alt,
	width = 20,
	height = 20,
	colorToken = 'content-primary',
	'aria-hidden': ariaHidden = false,
}: IconProps) {
	const src = icons[name] ?? icons.placeholder ?? null;

	if (!src) {
		return null;
	}

	const isAriaHidden = ariaHidden === true || ariaHidden === 'true';
	const resolvedAlt = alt ?? (isAriaHidden ? '' : name);
	const color = resolveColorValue(colorToken);

	return (
		<span
			style={{
				display: 'inline-block',
				width,
				height,
				backgroundColor: color,
				maskImage: `url(${src})`,
				maskRepeat: 'no-repeat',
				maskPosition: 'center',
				maskSize: 'contain',
				WebkitMaskImage: `url(${src})`,
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskPosition: 'center',
				WebkitMaskSize: 'contain',
			}}
			aria-hidden={isAriaHidden || resolvedAlt === '' ? true : undefined}
			role={isAriaHidden || resolvedAlt === '' ? undefined : 'img'}
			aria-label={isAriaHidden || resolvedAlt === '' ? undefined : resolvedAlt}
		/>
	);
}
