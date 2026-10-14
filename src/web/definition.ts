import type { ComponentType } from 'react';

export type ScreenScenario = 'browse' | 'search' | 'inspect' | 'preview';

export type AppScreenDefinition = {
	id: string;
	title: string;
	scenario: ScreenScenario;
	businessGoal: string;
	Component: ComponentType;
};

export type AppFlowDefinition = {
	id: string;
	title: string;
	businessGoal: string;
	screens: readonly AppScreenDefinition[];
};

export type AppDefinition = {
	id: string;
	title: string;
	businessGoal: string;
	flows: readonly AppFlowDefinition[];
};

export type AppScreenEntry = {
	app: AppDefinition;
	flow: AppFlowDefinition;
	screen: AppScreenDefinition;
	path: string;
};

export function defineApp<TDefinition extends AppDefinition>(definition: TDefinition) {
	return definition;
}

export function defineFlow<TDefinition extends AppFlowDefinition>(definition: TDefinition) {
	return definition;
}

export function defineScreen<TDefinition extends AppScreenDefinition>(definition: TDefinition) {
	return definition;
}

export function createAppScreenPath(appId: string, screenId: string) {
	return `/app/${appId}/${screenId}`;
}

export function flattenAppScreens(apps: readonly AppDefinition[]) {
	return apps.flatMap((app) =>
		app.flows.flatMap((flow) =>
			flow.screens.map((screen) => ({
				app,
				flow,
				screen,
				path: createAppScreenPath(app.id, screen.id),
			})),
		),
	);
}

export function getDefaultAppScreenPath(apps: readonly AppDefinition[]) {
	return flattenAppScreens(apps)[0]?.path;
}

export function findAppScreen(
	apps: readonly AppDefinition[],
	appId?: string,
	screenId?: string,
) {
	return flattenAppScreens(apps).find(
		(entry) => entry.app.id === appId && entry.screen.id === screenId,
	);
}
