import { Icon } from "../ui/Icon";
import "./navbar.scss";

export function NavBar() {
	return (
		<div className="device-navbar" aria-hidden="true">
			<div className="nav-button" ><Icon name={'mobile-down'}/></div>
			<div className="nav-button" ><Icon name={'mobile-home'}/></div>
		</div>
	);
}
