import { useEffect, useRef, useState, type ComponentType } from 'react';
import { FlowPage } from '../FlowPage';
import StatusBarAppColorPage from './app-color';
import StatusBarBlurPage from './blur';
import StatusBarFullscreenImagePage from './fullscreen-image';
import StatusBarLivePage from './live';
import StatusBarScrollPage from './scroll';
import StatusBarStatesPage from './states';
import './hub.scss';

type Scene = {
	id: string;
	label: string;
	/** Сцена на весь экран: бары лежат поверх неё, без шапки и отступов. */
	fullBleed: boolean;
	Component: ComponentType;
};

const scenes: ReadonlyArray<Scene> = [
	{ id: 'states', label: 'Состояния', fullBleed: false, Component: StatusBarStatesPage },
	{ id: 'live', label: 'Живой бар', fullBleed: false, Component: StatusBarLivePage },
	{ id: 'app-color', label: 'Цвет приложения', fullBleed: true, Component: StatusBarAppColorPage },
	{ id: 'blur', label: 'Блюр', fullBleed: true, Component: StatusBarBlurPage },
	{ id: 'scroll', label: 'Скролл под баром', fullBleed: true, Component: StatusBarScrollPage },
	{ id: 'image', label: 'Изображение', fullBleed: true, Component: StatusBarFullscreenImagePage },
];

const COLLAPSE_DISTANCE = 58;

/**
 * Крупный заголовок, который при прокрутке уменьшается, теряет отступ сверху
 * и прижимается к верху под статус-баром (sticky внутри прокручиваемой области).
 */
function CollapsingTitle({ title }: { title: string }) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = ref.current;
		const viewport = element?.closest('.ui-screen-scaffold__viewport');
		if (!element || !viewport) {
			return;
		}
		const update = () => {
			element.style.setProperty('--sb-collapse', String(Math.min(1, viewport.scrollTop / COLLAPSE_DISTANCE)));
		};
		update();
		viewport.addEventListener('scroll', update, { passive: true });
		return () => viewport.removeEventListener('scroll', update);
	}, []);

	return (
		<div className="sb-title" ref={ref}>
			<h1 className="sb-title__text">{title}</h1>
		</div>
	);
}

/**
 * Одно приложение про статус-бар и навбар: все состояния и сцены переключаются
 * внутри одного экрана, без отдельных страниц.
 */
export default function StatusBarHub() {
	const [sceneId, setSceneId] = useState('states');
	const scene = scenes.find((item) => item.id === sceneId) ?? scenes[0];
	const SceneComponent = scene.Component;

	return (
		<div className="sb-hub">
			<div className="sb-hub__scene">
				{scene.fullBleed ? (
					<SceneComponent />
				) : (
					<FlowPage key={scene.id} topActions={<CollapsingTitle title={scene.label} />}>
						<SceneComponent />
					</FlowPage>
				)}
			</div>
			<div className="sb-hub__tabs" role="tablist" aria-label="Сцена">
				{scenes.map((item) => (
					<button
						key={item.id}
						type="button"
						role="tab"
						aria-selected={item.id === sceneId}
						className={`sb-hub__tab${item.id === sceneId ? ' is-active' : ''}`}
						onClick={(event) => {
							setSceneId(item.id);
							event.currentTarget.scrollIntoView?.({ inline: 'center', block: 'nearest', behavior: 'smooth' });
						}}
					>
						{item.label}
					</button>
				))}
			</div>
		</div>
	);
}
