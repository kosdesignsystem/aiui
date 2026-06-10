import { App } from '../../ui/App';
import clockIcon from '../../assets/icons/loading-clock.svg';
import './LoadingScreen.scss';

const hexagonVisual = {
	color: 'hsl(210, 50%, 50%)',
	blur: 80,
	opacity: 0.6,
};

export function LoadingAppScreen() {
	return (
		<App className="loading-screen" aria-label="Loading App">
			<div className="loading-screen__stage">
				<div className="loading-screen__clock-wrap" aria-hidden="true">
					<img className="loading-screen__clock" src={clockIcon} alt="" />
				</div>

				<div className="loading-screen__pulse" aria-hidden="true">
					<svg
						className="loading-screen__hex"
						viewBox="0 0 998 1059"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<filter
								id="loading-screen-hex-blur"
								width="998"
								height="1059"
								x="0"
								y="0"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feBlend
									result="shape"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									mode="normal"
								/>
								<feGaussianBlur
									stdDeviation={hexagonVisual.blur}
									result="effect_layerBlur_1"
								/>
							</filter>
						</defs>
						<g opacity={hexagonVisual.opacity} filter="url(#loading-screen-hex-blur)">
							<path
								d="M429.291 178.66C472.427 153.78 525.573 153.78 568.709 178.66L768.291 293.771C811.427 318.651 838 364.63 838 414.388L838 644.612C838 694.37 811.427 740.349 768.291 765.229L568.709 880.341C525.573 905.22 472.427 905.22 429.291 880.341L229.709 765.229C186.573 740.349 160 694.37 160 644.612L160 414.388C160 364.63 186.573 318.651 229.709 293.771L429.291 178.66Z"
								fill={hexagonVisual.color}
								fillRule="nonzero"
							/>
						</g>
					</svg>
				</div>
			</div>
		</App>
	);
}
