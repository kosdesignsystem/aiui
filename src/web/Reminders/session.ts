let hasShownGoalSetupModalFallback = false;
let storedPlanGoalFallback: number | undefined;
let storedSelectedDaysFallback: number[] | undefined;
let storedCompletedReminderIdsFallback: string[] = [];

const goalSetupSessionKey = 'reminders:goal-setup-modal-shown';
const planGoalSessionKey = 'reminders:plan-goal';
const selectedDaysSessionKey = 'reminders:selected-days';
const completedReminderIdsSessionKey = 'reminders:completed-reminder-ids';

export const defaultSelectedGoalDays = [0, 3];

export const goalSetupModalResetEventName = 'reminders:goal-setup-modal-reset';

function readSessionStorageValue(key: string) {
	if (typeof window === 'undefined') {
		return null;
	}

	try {
		return window.sessionStorage.getItem(key);
	} catch {
		return null;
	}
}

function writeSessionStorageValue(key: string, value: string) {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		window.sessionStorage.setItem(key, value);
	} catch {
		// Fallback values keep the session behavior working when storage is unavailable.
	}
}

function removeSessionStorageValue(key: string) {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		window.sessionStorage.removeItem(key);
	} catch {
		// Fallback values are reset by callers before storage is touched.
	}
}

function parseNumberArray(value: string | null) {
	if (!value) {
		return undefined;
	}

	try {
		const parsed = JSON.parse(value);

		if (!Array.isArray(parsed)) {
			return undefined;
		}

		return parsed.filter((item): item is number => Number.isInteger(item));
	} catch {
		return undefined;
	}
}

function parseStringArray(value: string | null) {
	if (!value) {
		return undefined;
	}

	try {
		const parsed = JSON.parse(value);

		if (!Array.isArray(parsed)) {
			return undefined;
		}

		return parsed.filter((item): item is string => typeof item === 'string');
	} catch {
		return undefined;
	}
}

function normalizeSelectedDays(days: number[]) {
	return Array.from(new Set(days))
		.filter((day) => day >= 0 && day <= 6)
		.sort((left, right) => left - right);
}

export function hasShownGoalSetupModalInSession() {
	if (typeof window === 'undefined') {
		return hasShownGoalSetupModalFallback;
	}

	try {
		return window.sessionStorage.getItem(goalSetupSessionKey) === 'true';
	} catch {
		return hasShownGoalSetupModalFallback;
	}
}

export function markGoalSetupModalShownInSession() {
	hasShownGoalSetupModalFallback = true;

	if (typeof window === 'undefined') {
		return;
	}

	try {
		window.sessionStorage.setItem(goalSetupSessionKey, 'true');
	} catch {
		// The in-memory flag above keeps the behavior stable if storage is unavailable.
	}
}

export function getStoredPlanGoal(defaultGoal: number): number {
	const storedValue = readSessionStorageValue(planGoalSessionKey);
	const parsedValue = storedValue ? Number(storedValue) : storedPlanGoalFallback;

	return Number.isFinite(parsedValue) ? Number(parsedValue) : defaultGoal;
}

export function savePlanGoalInSession(goal: number) {
	storedPlanGoalFallback = goal;
	writeSessionStorageValue(planGoalSessionKey, String(goal));
}

export function getStoredSelectedDays() {
	const storedDays = parseNumberArray(readSessionStorageValue(selectedDaysSessionKey));
	const selectedDays = storedDays ?? storedSelectedDaysFallback ?? defaultSelectedGoalDays;

	return normalizeSelectedDays(selectedDays);
}

export function saveSelectedDaysInSession(days: number[]) {
	const normalizedDays = normalizeSelectedDays(days);

	storedSelectedDaysFallback = normalizedDays;
	writeSessionStorageValue(selectedDaysSessionKey, JSON.stringify(normalizedDays));
}

export function getStoredCompletedReminderIds() {
	const storedIds = parseStringArray(readSessionStorageValue(completedReminderIdsSessionKey));

	return storedIds ?? storedCompletedReminderIdsFallback;
}

export function saveCompletedReminderIdsInSession(reminderIds: string[]) {
	storedCompletedReminderIdsFallback = reminderIds;
	writeSessionStorageValue(completedReminderIdsSessionKey, JSON.stringify(reminderIds));
}

export function resetGoalSetupModalSessionState() {
	hasShownGoalSetupModalFallback = false;
	storedPlanGoalFallback = undefined;
	storedSelectedDaysFallback = undefined;
	storedCompletedReminderIdsFallback = [];

	if (typeof window === 'undefined') {
		return;
	}

	removeSessionStorageValue(goalSetupSessionKey);
	removeSessionStorageValue(planGoalSessionKey);
	removeSessionStorageValue(selectedDaysSessionKey);
	removeSessionStorageValue(completedReminderIdsSessionKey);

	window.dispatchEvent(new Event(goalSetupModalResetEventName));
}
