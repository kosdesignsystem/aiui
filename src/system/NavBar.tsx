import { Icon } from '../ui/Icon';
import './navbar.scss';

export function NavBar() {
	return (
		<div className="device-navbar" aria-hidden="true">
			<div className="nav-button">
				<Icon colorToken="content-secondary" width={24} height={24} name={'mobile-down'} />
			</div>
			<div className="nav-button">
				<Icon colorToken="content-secondary" width={24} height={24} name={'mobile-home'} />
			</div>
		</div>
	);
}
