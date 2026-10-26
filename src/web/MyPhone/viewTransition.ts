import { flushSync } from 'react-dom';
import { prefersReducedMotion } from './motion';

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => {
		finished: Promise<void>;
	};
};

export function runLauncherMinimizeTransition(appId: string, update: () => void) {
	const transitionDocument = document as ViewTransitionDocument;
	if (!transitionDocument.startViewTransition || prefersReducedMotion()) {
		update();
		return;
	}

	document.documentElement.dataset.launcherMinimize = appId;
	const clearTransitionState = () => {
		delete document.documentElement.dataset.launcherMinimize;
	};

	try {
		const transition = transitionDocument.startViewTransition(() => {
			flushSync(update);
		});
		void transition.finished.then(clearTransitionState, clearTransitionState);
	} catch {
		clearTransitionState();
		update();
	}
}
