import { useNavigate } from 'react-router-dom';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { Nav } from '../../ui/Nav';
import { galleryRoutes } from './model';

type GalleryNavProps = {
	active: 'all' | 'albums';
};

export function GalleryNav({ active }: GalleryNavProps) {
	const navigate = useNavigate();

	return (
		<Nav
			ariaLabel="Разделы галереи"
			items={[
				{
					id: 'all',
					active: active === 'all',
					onClick: () => navigate(galleryRoutes.all),
					icon: (
						<Icon name="photo-outline" alt="" aria-hidden="true" width={24} height={24} />
					),
					label: (
						<Text as="span" variant="medium-12">
							Все фото
						</Text>
					),
				},
				{
					id: 'albums',
					active: active === 'albums',
					onClick: () => navigate(galleryRoutes.albums),
					icon: (
						<Icon name="folder-outline" alt="" aria-hidden="true" width={24} height={24} />
					),
					label: (
						<Text as="span" variant="medium-12">
							Альбомы
						</Text>
					),
				},
			]}
		/>
	);
}
