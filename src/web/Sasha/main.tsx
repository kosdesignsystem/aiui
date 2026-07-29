const screenStyle = {
	width: '100%',
	height: '100%',
	backgroundColor: '#ffdd00',
} as const;

export default function SashaMainPage() {
	return <main style={screenStyle} aria-label="Саша" />;
}
