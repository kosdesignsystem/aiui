import { Icon } from '../ui/Icon';
import { useNavigate } from 'react-router-dom';
import './navbar.scss';

export function NavBar() {
	const navigate = useNavigate();

	return (
		<div className="device-navbar">
			<button
				className="nav-button"
				type="button"
				aria-label="Назад"
				onClick={() => navigate(-1)}
			>
				<Icon
					colorToken="content-secondary"
					width={24}
					height={24}
					name={'mobile-back-outline'}
				/>
			</button>
			<div className="nav-button">
				<Icon colorToken="content-secondary" width={24} height={24} name={'mobile-home'} />
			</div>
		</div>
	);
}
