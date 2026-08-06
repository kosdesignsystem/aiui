import type { ReactNode } from 'react';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';

type GalleryHeaderProps = {
	title: string;
	showCreate: boolean;
	onBack?: () => void;
};

type GalleryControlsProps = {
	children?: ReactNode;
	className?: string;
	onBack: () => void;
};

export function GalleryControls({ children, className, onBack }: GalleryControlsProps) {
	return (
		<div className={`gallery-controls${className ? ` ${className}` : ''}`}>
			<IconButton
				variant="primary"
				className="gallery-controls__button"
				aria-label="Назад"
				onClick={onBack}
			>
				<Icon name="arrow-left" width={24} height={24} aria-hidden="true" />
			</IconButton>
			<div className="gallery-controls__content">{children}</div>
			<IconButton variant="primary" className="gallery-controls__button" aria-label="Ещё">
				<Icon name="more-vertical" width={24} height={24} aria-hidden="true" />
			</IconButton>
		</div>
	);
}

export function GalleryHeader({ title, showCreate, onBack }: GalleryHeaderProps) {
	return (
		<header className="gallery-header">
			<div className="gallery-header__title">
				{onBack ? (
					<button type="button" onClick={onBack} aria-label="Назад">
						<Icon name="arrow-left" width={24} height={24} aria-hidden="true" />
					</button>
				) : null}
				<Text as="div" variant={onBack ? 'semiBold-24' : 'semiBold-32'}>
					{title}
				</Text>
			</div>
			<div className="gallery-header__actions">
				{showCreate ? (
					<IconButton variant="accent" aria-label="Создать альбом">
						<Icon width={24} height={24} name="add" aria-hidden="true" />
					</IconButton>
				) : null}
				<IconButton variant="primary" aria-label="Ещё">
					<Icon width={24} height={24} name="more-vertical" aria-hidden="true" />
				</IconButton>
			</div>
		</header>
	);
}
