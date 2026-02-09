import "./navbar.scss";

export function NavBar() {
	return (
		<div className="device-navbar" aria-hidden="true">
			<span className="nav-button nav-back" />
			<span className="nav-button nav-home" />
			<span className="nav-button nav-overview" />
		</div>
	);
}
