export type PasswordOptions = {
	length: number;
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeDigits: boolean;
	includeSymbols: boolean;
};

export type SecurityLevel = 'weak' | 'medium' | 'strong';

export const defaultPasswordOptions: PasswordOptions = {
	length: 16,
	includeUppercase: true,
	includeLowercase: true,
	includeDigits: true,
	includeSymbols: false,
};

export const securityLevelPresets: Record<SecurityLevel, PasswordOptions> = {
	weak: {
		length: 8,
		includeUppercase: false,
		includeLowercase: true,
		includeDigits: true,
		includeSymbols: false,
	},
	medium: {
		length: 12,
		includeUppercase: true,
		includeLowercase: true,
		includeDigits: true,
		includeSymbols: false,
	},
	strong: {
		length: 16,
		includeUppercase: true,
		includeLowercase: true,
		includeDigits: true,
		includeSymbols: true,
	},
};

const CHARSETS = {
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	digits: '0123456789',
	symbols: '!@#$%^&*()-_=+[]{};:,.?/\\|',
};

const getRandomIndex = (max: number) => {
	const random = crypto.getRandomValues(new Uint32Array(1))[0];
	return random % max;
};

export function getSecurityLevel(options: PasswordOptions): SecurityLevel {
	if (options.length >= 14 && options.includeUppercase && options.includeLowercase && options.includeDigits && options.includeSymbols) {
		return 'strong';
	}

	if (options.length >= 10 && options.includeUppercase && options.includeLowercase && options.includeDigits) {
		return 'medium';
	}

	return 'weak';
}

export function generatePassword(options: PasswordOptions): string {
	const groups: string[] = [];

	if (options.includeUppercase) groups.push(CHARSETS.uppercase);
	if (options.includeLowercase) groups.push(CHARSETS.lowercase);
	if (options.includeDigits) groups.push(CHARSETS.digits);
	if (options.includeSymbols) groups.push(CHARSETS.symbols);

	if (groups.length === 0) {
		return '';
	}

	const allCharacters = groups.join('');
	const requiredCharacters = groups.map((group) => group[getRandomIndex(group.length)]);
	const randomCharacters = Array.from(
		{ length: Math.max(0, options.length - requiredCharacters.length) },
		() => allCharacters[getRandomIndex(allCharacters.length)],
	);

	const combined = [...requiredCharacters, ...randomCharacters];

	for (let index = combined.length - 1; index > 0; index -= 1) {
		const swapIndex = getRandomIndex(index + 1);
		[combined[index], combined[swapIndex]] = [combined[swapIndex], combined[index]];
	}

	return combined.join('');
}
