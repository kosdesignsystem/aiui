import type { CSSProperties } from 'react';
import { useId } from 'react';
import { cn } from '../../ui/lib/cn';
import './HexagonLoader.scss';

export type HexagonLoaderDirection = 'clockwise' | 'counterclockwise';

export type HexagonLoaderShape = {
	/** CSS background value: color, var(...), linear-gradient(...), radial-gradient(...). */
	color?: string;
	size?: number;
	strokeWidth?: number;
	cornerRadius?: number;
	pulse?: number;
	direction?: HexagonLoaderDirection;
	speed?: number;
	opacity?: number;
	delay?: number;
};

export type HexagonLoaderProps = {
	size?: number;
	shapes?: readonly [HexagonLoaderShape, HexagonLoaderShape];
	className?: string;
	ariaLabel?: string;
};

type LoaderStyle = CSSProperties & Record<`--${string}`, string | number>;
type ResolvedHexagonLoaderShape = Required<HexagonLoaderShape>;
type Point = {
	x: number;
	y: number;
};

const hexagonPoints: readonly Point[] = [
	{ x: 12, y: 2.2 },
	{ x: 20.49, y: 7.1 },
	{ x: 20.49, y: 16.9 },
	{ x: 12, y: 21.8 },
	{ x: 3.51, y: 16.9 },
	{ x: 3.51, y: 7.1 },
];

const defaultShapes: readonly [ResolvedHexagonLoaderShape, ResolvedHexagonLoaderShape] = [
	{
		color: 'currentColor',
		size: 24,
		strokeWidth: 2.4,
		cornerRadius: 0,
		pulse: 0,
		direction: 'clockwise',
		speed: 1,
		opacity: 1,
		delay: 0,
	},
	{
		color: 'currentColor',
		size: 18,
		strokeWidth: 2,
		cornerRadius: 0,
		pulse: 0,
		direction: 'counterclockwise',
		speed: 0.7,
		opacity: 0.72,
		delay: 0,
	},
];

function resolveShape(
	shape: HexagonLoaderShape | undefined,
	fallback: ResolvedHexagonLoaderShape,
): ResolvedHexagonLoaderShape {
	return {
		...fallback,
		...shape,
	};
}

function getDistance(from: Point, to: Point) {
	return Math.hypot(to.x - from.x, to.y - from.y);
}

function getPointBetween(from: Point, to: Point, distance: number) {
	const segmentLength = getDistance(from, to);
	const ratio = segmentLength === 0 ? 0 : distance / segmentLength;

	return {
		x: from.x + (to.x - from.x) * ratio,
		y: from.y + (to.y - from.y) * ratio,
	};
}

function formatPoint(point: Point) {
	return `${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
}

function getHexagonPath(cornerRadius: number) {
	const shortestEdge = Math.min(
		...hexagonPoints.map((point, index) =>
			getDistance(point, hexagonPoints[(index + 1) % hexagonPoints.length]),
		),
	);
	const radius = Math.max(0, Math.min(cornerRadius, shortestEdge / 2));

	if (radius === 0) {
		const [firstPoint, ...restPoints] = hexagonPoints;

		return [
			`M ${formatPoint(firstPoint)}`,
			...restPoints.map((point) => `L ${formatPoint(point)}`),
			'Z',
		].join(' ');
	}

	const path = hexagonPoints.flatMap((point, index) => {
		const previousPoint =
			hexagonPoints[(index - 1 + hexagonPoints.length) % hexagonPoints.length];
		const nextPoint = hexagonPoints[(index + 1) % hexagonPoints.length];
		const startPoint = getPointBetween(point, previousPoint, radius);
		const endPoint = getPointBetween(point, nextPoint, radius);

		return index === 0
			? [`M ${formatPoint(startPoint)}`, `Q ${formatPoint(point)} ${formatPoint(endPoint)}`]
			: [`L ${formatPoint(startPoint)}`, `Q ${formatPoint(point)} ${formatPoint(endPoint)}`];
	});

	return [...path, 'Z'].join(' ');
}

export function HexagonLoader({
	size,
	shapes,
	className,
	ariaLabel = 'Загрузка',
}: HexagonLoaderProps) {
	const gradientId = `hexagon-loader-${useId().replace(/:/g, '')}`;
	const resolvedShapes = [
		resolveShape(shapes?.[0], defaultShapes[0]),
		resolveShape(shapes?.[1], defaultShapes[1]),
	] as const;
	const loaderSize = size ?? Math.max(...resolvedShapes.map((shape) => shape.size));
	const style: LoaderStyle = {
		width: loaderSize,
		height: loaderSize,
	};

	return (
		<span
			className={cn('hexagon-loader', className)}
			style={style}
			role="status"
			aria-label={ariaLabel}
		>
			<svg
				className="hexagon-loader__svg"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				aria-hidden="true"
			>
				<defs>
					{resolvedShapes.map((shape, index) => {
						const strokeWidth = (shape.strokeWidth * 24) / shape.size;
						const cornerRadius = (shape.cornerRadius * 24) / shape.size;

						return (
							<mask
								key={index}
								id={`${gradientId}-shape-mask-${index}`}
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<path
									d={getHexagonPath(cornerRadius)}
									fill="none"
									stroke="white"
									strokeWidth={strokeWidth}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</mask>
						);
					})}
				</defs>
				{resolvedShapes.map((shape, index) => {
					const shapeScale = shape.size / loaderSize;
					const shapeStyle: LoaderStyle = {
						'--hexagon-loader-shape-background': shape.color,
						'--hexagon-loader-shape-scale': shapeScale,
						'--hexagon-loader-shape-pulse': shape.pulse,
						'--hexagon-loader-shape-duration': `${1 / shape.speed}s`,
						'--hexagon-loader-shape-delay': `${shape.delay}s`,
						'--hexagon-loader-shape-opacity': shape.opacity,
					};

					return (
						<g
							key={index}
							className={cn(
								'hexagon-loader__shape',
								shape.direction === 'clockwise'
									? 'hexagon-loader__shape--clockwise'
									: 'hexagon-loader__shape--counterclockwise',
							)}
							style={shapeStyle}
						>
							<g
								className={cn(
									'hexagon-loader__shape-pulse',
									shape.pulse > 0 && 'hexagon-loader__shape-pulse--enabled',
								)}
							>
								<foreignObject
									x="0"
									y="0"
									width="24"
									height="24"
									mask={`url(#${gradientId}-shape-mask-${index})`}
								>
									<div className="hexagon-loader__shape-background" />
								</foreignObject>
							</g>
						</g>
					);
				})}
			</svg>
		</span>
	);
}
