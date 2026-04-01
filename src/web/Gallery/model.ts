export type GalleryPhoto = {
	id: string;
	title: string;
	takenAtLabel: string;
	albumIds: string[];
	favorite?: boolean;
	width: number;
	height: number;
	imageSrc: string;
};

export type GalleryAlbum = {
	id: string;
	title: string;
	description: string;
	countLabel: string;
	coverPhotoIds: string[];
	photoIds: string[];
};

type PhotoScene =
	| 'worker'
	| 'train'
	| 'badge'
	| 'document'
	| 'machine'
	| 'ridge'
	| 'chart'
	| 'desert'
	| 'island'
	| 'corridor'
	| 'crane'
	| 'rails'
	| 'abstract'
	| 'sunset'
	| 'peak'
	| 'snow';

type ScenePalette = {
	top: string;
	mid: string;
	bottom: string;
	accent: string;
	accentStrong: string;
	neutral: string;
	neutralDark: string;
	highlight: string;
};

type PhotoSeed = {
	id: string;
	title: string;
	takenAtLabel: string;
	scene: PhotoScene;
	palette: ScenePalette;
	albumIds: string[];
	favorite?: boolean;
};

const PORTRAIT_WIDTH = 1080;
const PORTRAIT_HEIGHT = 1440;

export const galleryRoutes = {
	all: '/app/Gallery/all',
	albums: '/app/Gallery/albums',
} as const;

export const galleryTotalCountLabel = '203 фото';

function svgUrl(body: string, width = PORTRAIT_WIDTH, height = PORTRAIT_HEIGHT) {
	const svg = [
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">`,
		body,
		'</svg>',
	].join('');

	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderScene(scene: PhotoScene, palette: ScenePalette) {
	const background = `
		<defs>
			<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="${palette.top}" />
				<stop offset="58%" stop-color="${palette.mid}" />
				<stop offset="100%" stop-color="${palette.bottom}" />
			</linearGradient>
			<linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="${palette.highlight}" stop-opacity="0.78" />
				<stop offset="100%" stop-color="${palette.highlight}" stop-opacity="0" />
			</linearGradient>
		</defs>
		<rect width="1080" height="1440" fill="url(#bg)" />
		<rect width="1080" height="1440" fill="url(#shine)" />
	`;

	switch (scene) {
		case 'worker':
			return `
				${background}
				<rect x="0" y="640" width="1080" height="800" fill="${palette.bottom}" opacity="0.28" />
				<ellipse cx="510" cy="360" rx="460" ry="180" fill="${palette.neutralDark}" opacity="0.84" />
				<ellipse cx="670" cy="360" rx="360" ry="138" fill="${palette.highlight}" opacity="0.22" />
				<ellipse cx="812" cy="360" rx="170" ry="170" fill="none" stroke="${palette.neutral}" stroke-width="42" opacity="0.86" />
				<ellipse cx="924" cy="360" rx="132" ry="132" fill="none" stroke="${palette.neutralDark}" stroke-width="32" opacity="0.9" />
				<ellipse cx="1030" cy="360" rx="92" ry="92" fill="none" stroke="${palette.neutral}" stroke-width="28" opacity="0.82" />
				<rect x="0" y="780" width="1080" height="660" fill="${palette.bottom}" opacity="0.25" />
				<rect x="736" y="778" width="220" height="310" fill="${palette.accentStrong}" opacity="0.22" />
				<rect x="176" y="778" width="540" height="280" fill="${palette.accent}" opacity="0.16" />
				<circle cx="516" cy="756" r="86" fill="${palette.accent}" />
				<rect x="408" y="820" width="220" height="408" rx="112" fill="${palette.accentStrong}" />
				<rect x="378" y="886" width="282" height="340" rx="40" fill="#ef7a27" />
				<rect x="378" y="1028" width="282" height="30" fill="#c4c7cc" opacity="0.78" />
				<rect x="378" y="1110" width="282" height="30" fill="#c4c7cc" opacity="0.72" />
				<rect x="332" y="860" width="108" height="380" rx="54" fill="${palette.accentStrong}" />
				<rect x="620" y="860" width="108" height="334" rx="54" fill="${palette.accentStrong}" />
			`;

		case 'train':
			return `
				${background}
				<path d="M0 1060C180 910 340 810 520 746C680 688 848 646 1080 600V1440H0V1060Z" fill="${palette.neutralDark}" opacity="0.94" />
				<path d="M0 990C190 850 346 772 548 706C726 648 900 614 1080 594V1440H0V990Z" fill="${palette.neutral}" opacity="0.9" />
				<path d="M0 1110L420 790L790 790L1080 1110V1440H0V1110Z" fill="${palette.accent}" opacity="0.26" />
				<path d="M130 1148L566 904L906 904L1006 1018L650 1200H130V1148Z" fill="#b12629" />
				<rect x="578" y="938" width="210" height="120" rx="24" fill="${palette.highlight}" opacity="0.58" />
				<rect x="200" y="1060" width="620" height="28" fill="#555e67" />
				<rect x="170" y="1120" width="672" height="22" fill="#9099a4" />
			`;

		case 'badge':
			return `
				${background}
				<rect x="160" y="220" width="760" height="980" rx="56" fill="#f6f1ea" />
				<rect x="214" y="276" width="652" height="164" rx="28" fill="${palette.accent}" opacity="0.24" />
				<rect x="240" y="502" width="272" height="356" rx="34" fill="${palette.highlight}" />
				<circle cx="376" cy="616" r="76" fill="${palette.accentStrong}" opacity="0.6" />
				<rect x="284" y="702" width="184" height="104" rx="26" fill="${palette.accentStrong}" opacity="0.42" />
				<rect x="568" y="512" width="214" height="34" rx="17" fill="${palette.neutral}" opacity="0.76" />
				<rect x="568" y="576" width="194" height="26" rx="13" fill="${palette.neutral}" opacity="0.48" />
				<rect x="568" y="628" width="224" height="26" rx="13" fill="${palette.neutral}" opacity="0.48" />
				<rect x="568" y="690" width="172" height="26" rx="13" fill="${palette.neutral}" opacity="0.48" />
				<circle cx="708" cy="920" r="126" fill="none" stroke="#bf5a5a" stroke-width="18" opacity="0.72" />
				<path d="M620 920C652 954 686 974 742 982" stroke="#bf5a5a" stroke-width="18" stroke-linecap="round" />
				<path d="M648 1008C712 1018 760 1000 802 962" stroke="#bf5a5a" stroke-width="18" stroke-linecap="round" />
			`;

		case 'document':
			return `
				${background}
				<rect x="130" y="176" width="540" height="760" rx="38" fill="#ffffff" />
				<rect x="404" y="252" width="510" height="860" rx="42" fill="#f8f9fb" />
				<rect x="210" y="280" width="298" height="24" rx="12" fill="${palette.neutral}" opacity="0.8" />
				<rect x="210" y="336" width="336" height="16" rx="8" fill="${palette.neutral}" opacity="0.34" />
				<rect x="210" y="382" width="296" height="16" rx="8" fill="${palette.neutral}" opacity="0.34" />
				<rect x="210" y="476" width="382" height="16" rx="8" fill="${palette.neutral}" opacity="0.22" />
				<rect x="460" y="332" width="230" height="22" rx="11" fill="${palette.accent}" opacity="0.18" />
				<rect x="476" y="420" width="322" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.24" />
				<rect x="476" y="470" width="280" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.24" />
				<rect x="476" y="520" width="300" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.24" />
				<rect x="476" y="620" width="352" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.18" />
				<rect x="476" y="668" width="322" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.18" />
				<rect x="476" y="716" width="286" height="18" rx="9" fill="${palette.neutralDark}" opacity="0.18" />
				<circle cx="774" cy="892" r="88" fill="none" stroke="${palette.accentStrong}" stroke-width="14" opacity="0.42" />
			`;

		case 'machine':
			return `
				${background}
				<rect x="0" y="860" width="1080" height="580" fill="${palette.bottom}" opacity="0.26" />
				<rect x="168" y="428" width="208" height="532" rx="36" fill="${palette.neutral}" opacity="0.92" />
				<rect x="430" y="366" width="470" height="686" rx="44" fill="${palette.highlight}" opacity="0.92" />
				<rect x="470" y="420" width="156" height="120" rx="24" fill="${palette.accentStrong}" opacity="0.4" />
				<rect x="658" y="420" width="186" height="120" rx="24" fill="${palette.accent}" opacity="0.44" />
				<rect x="470" y="580" width="376" height="34" rx="17" fill="${palette.neutralDark}" opacity="0.5" />
				<rect x="470" y="650" width="336" height="34" rx="17" fill="${palette.neutralDark}" opacity="0.32" />
				<rect x="470" y="720" width="376" height="34" rx="17" fill="${palette.neutralDark}" opacity="0.32" />
				<circle cx="272" cy="690" r="128" fill="${palette.accentStrong}" opacity="0.26" />
				<circle cx="272" cy="690" r="76" fill="${palette.accent}" opacity="0.5" />
			`;

		case 'ridge':
			return `
				${background}
				<path d="M0 1090C120 1020 260 960 440 920C620 880 814 860 1080 848V1440H0V1090Z" fill="${palette.accent}" opacity="0.32" />
				<path d="M0 1040C210 920 362 860 534 828C742 786 888 790 1080 812V1440H0V1040Z" fill="${palette.neutral}" opacity="0.56" />
				<path d="M0 1000L210 794L400 914L592 676L792 892L958 746L1080 900V1440H0V1000Z" fill="${palette.neutralDark}" opacity="0.92" />
				<path d="M208 794L400 914L592 676L650 736L516 950L286 960L164 888Z" fill="#ffffff" opacity="0.22" />
			`;

		case 'chart':
			return `
				${background}
				<rect x="114" y="170" width="852" height="1100" rx="48" fill="#f9fafc" />
				<path d="M214 1010H864" stroke="${palette.neutral}" stroke-width="8" opacity="0.42" />
				<path d="M214 930H864" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M214 850H864" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M214 770H864" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M214 690H864" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M300 1074V562" stroke="${palette.neutral}" stroke-width="8" opacity="0.28" />
				<path d="M430 1074V562" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M560 1074V562" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M690 1074V562" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M820 1074V562" stroke="${palette.neutral}" stroke-width="8" opacity="0.22" />
				<path d="M230 956L356 882L470 912L604 748L716 784L844 650" stroke="${palette.accentStrong}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
				<circle cx="356" cy="882" r="18" fill="${palette.accentStrong}" />
				<circle cx="470" cy="912" r="18" fill="${palette.accentStrong}" />
				<circle cx="604" cy="748" r="18" fill="${palette.accentStrong}" />
				<circle cx="716" cy="784" r="18" fill="${palette.accentStrong}" />
				<circle cx="844" cy="650" r="18" fill="${palette.accentStrong}" />
			`;

		case 'desert':
			return `
				${background}
				<circle cx="780" cy="340" r="128" fill="${palette.highlight}" opacity="0.42" />
				<path d="M0 1034C180 934 348 900 552 894C760 888 940 952 1080 1026V1440H0V1034Z" fill="${palette.accent}" opacity="0.42" />
				<path d="M0 1160C196 1040 398 1020 596 1042C796 1064 954 1120 1080 1212V1440H0V1160Z" fill="${palette.accentStrong}" opacity="0.54" />
				<path d="M0 1270C220 1186 420 1194 632 1240C812 1278 948 1328 1080 1400V1440H0V1270Z" fill="${palette.neutralDark}" opacity="0.48" />
			`;

		case 'island':
			return `
				${background}
				<rect x="0" y="760" width="1080" height="680" fill="${palette.accent}" opacity="0.38" />
				<path d="M236 1014C326 874 454 820 590 820C724 820 856 884 912 1030C852 1062 744 1096 590 1102C424 1108 308 1074 236 1014Z" fill="${palette.neutralDark}" opacity="0.88" />
				<circle cx="622" cy="630" r="136" fill="${palette.highlight}" opacity="0.36" />
				<path d="M576 936L608 764L646 936" stroke="${palette.highlight}" stroke-width="20" stroke-linecap="round" />
				<path d="M608 774C564 812 528 850 500 892" stroke="${palette.highlight}" stroke-width="20" stroke-linecap="round" />
				<path d="M612 774C654 812 688 846 724 892" stroke="${palette.highlight}" stroke-width="20" stroke-linecap="round" />
			`;

		case 'corridor':
			return `
				${background}
				<path d="M154 1440L360 0H720L928 1440H154Z" fill="${palette.highlight}" opacity="0.22" />
				<path d="M312 1440L446 0H634L768 1440H312Z" fill="${palette.neutral}" opacity="0.4" />
				<path d="M196 244H884" stroke="${palette.accent}" stroke-width="20" opacity="0.22" />
				<path d="M182 420H898" stroke="${palette.accent}" stroke-width="20" opacity="0.22" />
				<path d="M164 622H916" stroke="${palette.accent}" stroke-width="20" opacity="0.22" />
				<path d="M144 852H936" stroke="${palette.accent}" stroke-width="20" opacity="0.22" />
				<path d="M136 1120H944" stroke="${palette.accent}" stroke-width="20" opacity="0.22" />
				<circle cx="540" cy="726" r="62" fill="${palette.accentStrong}" opacity="0.5" />
			`;

		case 'crane':
			return `
				${background}
				<path d="M0 1080C176 930 398 864 632 860C814 856 960 896 1080 962V1440H0V1080Z" fill="${palette.neutral}" opacity="0.34" />
				<path d="M690 1110V342" stroke="${palette.accentStrong}" stroke-width="28" stroke-linecap="round" />
				<path d="M430 526H914" stroke="${palette.accentStrong}" stroke-width="24" stroke-linecap="round" />
				<path d="M436 528L700 348" stroke="${palette.accentStrong}" stroke-width="18" stroke-linecap="round" />
				<path d="M694 348L848 524" stroke="${palette.accentStrong}" stroke-width="18" stroke-linecap="round" />
				<path d="M804 524L804 804" stroke="${palette.accentStrong}" stroke-width="14" stroke-linecap="round" />
				<rect x="778" y="804" width="58" height="94" rx="14" fill="${palette.accentStrong}" />
				<path d="M690 1112L438 1440" stroke="${palette.accentStrong}" stroke-width="18" stroke-linecap="round" opacity="0.52" />
			`;

		case 'rails':
			return `
				${background}
				<path d="M184 1440L410 0" stroke="${palette.neutralDark}" stroke-width="54" />
				<path d="M896 1440L670 0" stroke="${palette.neutralDark}" stroke-width="54" />
				<path d="M308 1440L500 0" stroke="${palette.neutral}" stroke-width="22" />
				<path d="M772 1440L580 0" stroke="${palette.neutral}" stroke-width="22" />
				<path d="M136 1210H944" stroke="${palette.accent}" stroke-width="22" opacity="0.3" />
				<path d="M188 1032H892" stroke="${palette.accent}" stroke-width="18" opacity="0.3" />
				<path d="M236 884H844" stroke="${palette.accent}" stroke-width="18" opacity="0.3" />
				<path d="M286 760H794" stroke="${palette.accent}" stroke-width="18" opacity="0.3" />
				<path d="M340 648H740" stroke="${palette.accent}" stroke-width="18" opacity="0.3" />
			`;

		case 'abstract':
			return `
				${background}
				<path d="M0 1180C140 960 308 844 494 838C646 834 810 902 1080 1120V1440H0V1180Z" fill="${palette.accentStrong}" opacity="0.46" />
				<circle cx="280" cy="492" r="192" fill="${palette.highlight}" opacity="0.26" />
				<circle cx="770" cy="786" r="250" fill="${palette.accent}" opacity="0.24" />
				<path d="M128 864C288 760 394 764 496 848C606 938 680 956 842 894" stroke="${palette.neutralDark}" stroke-width="28" stroke-linecap="round" opacity="0.68" />
			`;

		case 'sunset':
			return `
				${background}
				<circle cx="558" cy="494" r="188" fill="${palette.highlight}" opacity="0.34" />
				<path d="M0 1080C170 952 342 892 554 892C764 892 934 964 1080 1088V1440H0V1080Z" fill="${palette.accent}" opacity="0.34" />
				<path d="M0 1204C232 1074 442 1036 620 1056C812 1078 960 1134 1080 1218V1440H0V1204Z" fill="${palette.accentStrong}" opacity="0.5" />
				<path d="M514 1440L538 1028L560 1440" fill="${palette.neutralDark}" />
				<path d="M398 1280L540 1088L678 1280" fill="${palette.neutralDark}" opacity="0.52" />
			`;

		case 'peak':
			return `
				${background}
				<path d="M0 1180L318 720L492 968L676 604L914 1028L1080 864V1440H0V1180Z" fill="${palette.neutralDark}" opacity="0.92" />
				<path d="M318 720L492 968L676 604L742 704L606 1106L440 1104L340 954Z" fill="#ffffff" opacity="0.28" />
				<path d="M0 1254C180 1162 400 1134 612 1160C804 1184 954 1236 1080 1312V1440H0V1254Z" fill="${palette.accent}" opacity="0.26" />
			`;

		case 'snow':
			return `
				${background}
				<path d="M0 1144C172 1016 348 964 584 968C804 972 952 1034 1080 1124V1440H0V1144Z" fill="${palette.neutral}" opacity="0.28" />
				<path d="M0 1296C192 1206 394 1192 596 1222C776 1248 938 1298 1080 1364V1440H0V1296Z" fill="#ffffff" opacity="0.42" />
				<path d="M218 1138L468 724L618 988L794 664L944 1000L1080 890V1440H0V1244L218 1138Z" fill="${palette.neutralDark}" opacity="0.9" />
				<path d="M468 724L618 988L794 664L844 748L716 1108L566 1112L490 962Z" fill="#ffffff" opacity="0.3" />
			`;
	}
}

function createPhoto(seed: PhotoSeed): GalleryPhoto {
	return {
		id: seed.id,
		title: seed.title,
		takenAtLabel: seed.takenAtLabel,
		albumIds: seed.albumIds,
		favorite: seed.favorite,
		width: PORTRAIT_WIDTH,
		height: PORTRAIT_HEIGHT,
		imageSrc: svgUrl(renderScene(seed.scene, seed.palette)),
	};
}

const photoSeeds: PhotoSeed[] = [
	{
		id: 'p01',
		title: 'Станок №4',
		takenAtLabel: '29 июля 2023 19:20',
		scene: 'worker',
		albumIds: ['favorites', 'production'],
		favorite: true,
		palette: {
			top: '#f1f5f9',
			mid: '#d5dce6',
			bottom: '#6b7d8f',
			accent: '#4c6878',
			accentStrong: '#22415c',
			neutral: '#9caab7',
			neutralDark: '#2f3944',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p02',
		title: 'Ночной рейс',
		takenAtLabel: '29 июля 2023 18:05',
		scene: 'train',
		albumIds: ['travel'],
		palette: {
			top: '#e7edf5',
			mid: '#b7c7d8',
			bottom: '#516376',
			accent: '#dfe86e',
			accentStrong: '#8f1f25',
			neutral: '#6a7a89',
			neutralDark: '#354150',
			highlight: '#fff2c8',
		},
	},
	{
		id: 'p03',
		title: 'Пропуск',
		takenAtLabel: '28 июля 2023 17:46',
		scene: 'badge',
		albumIds: ['documents'],
		palette: {
			top: '#fff8ef',
			mid: '#f2e4d3',
			bottom: '#dbc2aa',
			accent: '#a46b46',
			accentStrong: '#6f4b36',
			neutral: '#8b776a',
			neutralDark: '#57473f',
			highlight: '#f8d7aa',
		},
	},
	{
		id: 'p04',
		title: 'Подписанные документы',
		takenAtLabel: '28 июля 2023 15:14',
		scene: 'document',
		albumIds: ['favorites', 'documents'],
		favorite: true,
		palette: {
			top: '#f7f9fc',
			mid: '#e8edf4',
			bottom: '#d2dae8',
			accent: '#8eb7ff',
			accentStrong: '#4f73b8',
			neutral: '#98a3b3',
			neutralDark: '#58616f',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p05',
		title: 'Турбина',
		takenAtLabel: '27 июля 2023 16:42',
		scene: 'machine',
		albumIds: ['production'],
		palette: {
			top: '#eef6fa',
			mid: '#cde1ea',
			bottom: '#7a9aaa',
			accent: '#8fd0f1',
			accentStrong: '#3c7a9e',
			neutral: '#7b95a5',
			neutralDark: '#36505e',
			highlight: '#ebf8ff',
		},
	},
	{
		id: 'p06',
		title: 'Скалистый хребет',
		takenAtLabel: '26 июля 2023 12:08',
		scene: 'ridge',
		albumIds: ['travel'],
		palette: {
			top: '#deebfa',
			mid: '#c0d3ea',
			bottom: '#7f95b1',
			accent: '#8bb2d7',
			accentStrong: '#5a7597',
			neutral: '#7f8ca1',
			neutralDark: '#354153',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p07',
		title: 'Сменный отчёт',
		takenAtLabel: '24 июля 2023 11:10',
		scene: 'chart',
		albumIds: ['documents'],
		palette: {
			top: '#f7f7fa',
			mid: '#e4e6ee',
			bottom: '#c9ceda',
			accent: '#f2a65a',
			accentStrong: '#d36f2c',
			neutral: '#8d94a3',
			neutralDark: '#576071',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p08',
		title: 'Оранжевая смена',
		takenAtLabel: '24 июля 2023 09:52',
		scene: 'worker',
		albumIds: ['production'],
		palette: {
			top: '#eef0f4',
			mid: '#cfd7df',
			bottom: '#6d7a85',
			accent: '#58727f',
			accentStrong: '#243643',
			neutral: '#95a2b0',
			neutralDark: '#29343c',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p09',
		title: 'Высота',
		takenAtLabel: '22 июля 2023 08:40',
		scene: 'snow',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		palette: {
			top: '#eff6ff',
			mid: '#d8e7ff',
			bottom: '#9bb7d7',
			accent: '#c1e0ff',
			accentStrong: '#4d6d8f',
			neutral: '#8fa6bc',
			neutralDark: '#324965',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p10',
		title: 'Песчаный ветер',
		takenAtLabel: '20 июля 2023 14:12',
		scene: 'desert',
		albumIds: ['travel'],
		palette: {
			top: '#ffd1a8',
			mid: '#f7b98f',
			bottom: '#d97857',
			accent: '#f7d598',
			accentStrong: '#d28b45',
			neutral: '#a36649',
			neutralDark: '#7a4937',
			highlight: '#fff0c8',
		},
	},
	{
		id: 'p11',
		title: 'Остров',
		takenAtLabel: '18 июля 2023 16:48',
		scene: 'island',
		albumIds: ['travel'],
		palette: {
			top: '#7ed0ff',
			mid: '#5fa8ff',
			bottom: '#2f63b4',
			accent: '#50d7de',
			accentStrong: '#1f7b69',
			neutral: '#3fa1d9',
			neutralDark: '#1d4c66',
			highlight: '#f7ffba',
		},
	},
	{
		id: 'p12',
		title: 'Коридор цеха',
		takenAtLabel: '18 июля 2023 09:01',
		scene: 'corridor',
		albumIds: ['production'],
		palette: {
			top: '#eff8ff',
			mid: '#d7e9fb',
			bottom: '#8aaed2',
			accent: '#8ae1ff',
			accentStrong: '#4f81c1',
			neutral: '#88a7c6',
			neutralDark: '#345b85',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p13',
		title: 'Стрела крана',
		takenAtLabel: '16 июля 2023 17:35',
		scene: 'crane',
		albumIds: ['production'],
		palette: {
			top: '#ffe1cc',
			mid: '#ffbf97',
			bottom: '#ff8b5a',
			accent: '#ffd6a8',
			accentStrong: '#f37c26',
			neutral: '#f6ab79',
			neutralDark: '#9c4d28',
			highlight: '#fff4e3',
		},
	},
	{
		id: 'p14',
		title: 'Линия рельс',
		takenAtLabel: '14 июля 2023 18:12',
		scene: 'rails',
		albumIds: ['travel'],
		palette: {
			top: '#edf7c9',
			mid: '#cfe37c',
			bottom: '#728a3e',
			accent: '#d0bb86',
			accentStrong: '#8f7b52',
			neutral: '#97a47a',
			neutralDark: '#485338',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p15',
		title: 'Ночное небо',
		takenAtLabel: '12 июля 2023 22:11',
		scene: 'abstract',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		palette: {
			top: '#131d4f',
			mid: '#2d3278',
			bottom: '#060913',
			accent: '#ffd66e',
			accentStrong: '#ff9a3d',
			neutral: '#7c88e8',
			neutralDark: '#11173a',
			highlight: '#dbe1ff',
		},
	},
	{
		id: 'p16',
		title: 'Красный закат',
		takenAtLabel: '11 июля 2023 20:42',
		scene: 'sunset',
		albumIds: ['travel'],
		palette: {
			top: '#ffb36b',
			mid: '#ff7f59',
			bottom: '#cf3e4f',
			accent: '#ffb55f',
			accentStrong: '#ff6a2e',
			neutral: '#7a3340',
			neutralDark: '#4f1e29',
			highlight: '#ffe7a8',
		},
	},
	{
		id: 'p17',
		title: 'Архив',
		takenAtLabel: '10 июля 2023 13:21',
		scene: 'document',
		albumIds: ['documents'],
		palette: {
			top: '#faf9f5',
			mid: '#ece7dc',
			bottom: '#d4cbbe',
			accent: '#c9d1db',
			accentStrong: '#7c8999',
			neutral: '#9a907f',
			neutralDark: '#675d4f',
			highlight: '#ffffff',
		},
	},
	{
		id: 'p18',
		title: 'Острая вершина',
		takenAtLabel: '09 июля 2023 07:06',
		scene: 'peak',
		albumIds: ['travel'],
		palette: {
			top: '#e3ecff',
			mid: '#adc8ff',
			bottom: '#5b72b3',
			accent: '#d0d8ff',
			accentStrong: '#8fa4ff',
			neutral: '#91a0cf',
			neutralDark: '#2f3f77',
			highlight: '#ffffff',
		},
	},
];

export const galleryPhotos = photoSeeds.map(createPhoto);

const favorites = galleryPhotos.filter((photo) => photo.favorite).map((photo) => photo.id);
const production = galleryPhotos
	.filter((photo) => photo.albumIds.includes('production'))
	.map((photo) => photo.id);
const travel = galleryPhotos.filter((photo) => photo.albumIds.includes('travel')).map((photo) => photo.id);
const documents = galleryPhotos
	.filter((photo) => photo.albumIds.includes('documents'))
	.map((photo) => photo.id);

export const galleryAlbums: GalleryAlbum[] = [
	{
		id: 'favorites',
		title: 'Избранное',
		description: 'Отмеченные кадры и быстрый доступ к лучшим снимкам.',
		countLabel: '32 фото',
		coverPhotoIds: favorites.slice(0, 4),
		photoIds: favorites,
	},
	{
		id: 'production',
		title: 'Производство',
		description: 'Цех, станки, смены и инспекция оборудования.',
		countLabel: '86 фото',
		coverPhotoIds: production.slice(0, 4),
		photoIds: production,
	},
	{
		id: 'travel',
		title: 'Поездки',
		description: 'Рельсы, горы, пустыня и вечерние маршруты.',
		countLabel: '54 фото',
		coverPhotoIds: travel.slice(0, 4),
		photoIds: travel,
	},
	{
		id: 'documents',
		title: 'Документы',
		description: 'Сканы, графики и служебные документы.',
		countLabel: '31 фото',
		coverPhotoIds: documents.slice(0, 4),
		photoIds: documents,
	},
];

