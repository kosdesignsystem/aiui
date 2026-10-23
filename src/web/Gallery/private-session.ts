// Demo UI gate only. Never use this module to protect real files or secrets.
// The PIN is not written to localStorage, sessionStorage, cookies or history.
let pendingGrant: string | null = null;

export function matchesDemoPin(pin: string) {
	return pin === '1234';
}

export function issueAlbumGrant() {
	pendingGrant = crypto.randomUUID();
	return pendingGrant;
}

export function hasAlbumGrant(grant: unknown) {
	return typeof grant === 'string' && pendingGrant !== null && grant === pendingGrant;
}

export function revokeAlbumGrant(grant: unknown) {
	if (grant === pendingGrant) pendingGrant = null;
}
