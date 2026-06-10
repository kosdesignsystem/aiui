import type { CSSProperties } from 'react';
import { useId } from 'react';
import { cn } from '../../ui/lib/cn';
import './HexagonLoader.scss';

export type HexagonLoaderDirection = 'clockwise' | 'counterclockwise';

export type HexagonLoaderShape = {
	color?: string;
	size?: number;
	strokeWidth?: number;
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

const hexagonPoints = '12 2.2 20.49 7.1 20.49 16.9 12 21.8 3.51 16.9 3.51 7.1';

const defaultShapes: readonly [ResolvedHexagonLoaderShape, ResolvedHexagonLoaderShape] = [
	{
		color: '#2a83f2',
		size: 24,
		strokeWidth: 2.4,
		direction: 'clockwise',
		speed: 1,
		opacity: 1,
		delay: 0,
	},
	{
		color: '#75b6ff',
		size: 18,
		strokeWidth: 2,
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
					<linearGradient
						id={`${gradientId}-shape-0`}
						x1="11.9999962"
						x2="11.9999924"
						y1="24"
						y2="-3.81469727e-06"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={resolvedShapes[0].color} offset="0" stopOpacity="0" />
						<stop stopColor={resolvedShapes[0].color} offset="0.666626155" stopOpacity="0.2" />
						<stop stopColor={resolvedShapes[0].color} offset="1" stopOpacity="1" />
					</linearGradient>
					<linearGradient
						id={`${gradientId}-shape-1`}
						x1="11.9999962"
						x2="11.9999924"
						y1="24"
						y2="-3.81469727e-06"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={resolvedShapes[1].color} offset="0" stopOpacity="0" />
						<stop stopColor={resolvedShapes[1].color} offset="0.666626155" stopOpacity="0.2" />
						<stop stopColor={resolvedShapes[1].color} offset="1" stopOpacity="1" />
					</linearGradient>
				</defs>
				{resolvedShapes.map((shape, index) => {
					const shapeScale = shape.size / loaderSize;
					const shapeStyle: LoaderStyle = {
						'--hexagon-loader-shape-color': shape.color,
						'--hexagon-loader-shape-scale': shapeScale,
						'--hexagon-loader-shape-duration': `${1 / shape.speed}s`,
						'--hexagon-loader-shape-delay': `${shape.delay}s`,
						'--hexagon-loader-shape-opacity': shape.opacity,
					};
					const strokeWidth = (shape.strokeWidth * 24) / shape.size;

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
							<polygon
								points={hexagonPoints}
								fill="none"
								stroke={`url(#${gradientId}-shape-${index})`}
								strokeWidth={strokeWidth}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					);
				})}
			</svg>
		</span>
	);
}
