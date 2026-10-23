import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { GalleryHeader } from './header';
import { galleryRoutes, type GalleryPhoto } from './model';
import { hasAlbumGrant, revokeAlbumGrant } from './private-session';
import { PhotoScreen } from './screen';

export function ProtectedAlbumScreen() {
	const location = useLocation();
	const navigate = useNavigate();
	const grant = (location.state as { albumGrant?: unknown } | null)?.albumGrant;
	const [entry] = useState(() => ({ key: location.key, authorized: hasAlbumGrant(grant) }));
	const authorized = entry.authorized && entry.key === location.key;
	const [photos, setPhotos] = useState<GalleryPhoto[] | null>(null);
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		if (!authorized) return;
		let active = true;
		// Only request the demo assets after PIN entry. They are public build assets,
		// not encrypted files; see README.md for the production boundary.
		import('./protected-photos').then(
			(module) => { if (active) setPhotos(module.privatePhotos); },
			() => { if (active) setLoadError(true); },
		);
		return () => {
			active = false;
			revokeAlbumGrant(grant);
		};
	}, [authorized, grant]);

	if (!authorized) return <Navigate to={galleryRoutes.albums} replace />;
	if (!photos) {
		return (
			<App>
				<div className="gallery-screen">
					<GalleryHeader title="Объект 1" showCreate={false} showMore={false} onBack={() => navigate(galleryRoutes.albums)} />
					<Text as="p" color="secondary">{loadError ? 'Не удалось загрузить фотографии. Выйдите и попробуйте снова.' : 'Загрузка фотографий…'}</Text>
				</div>
			</App>
		);
	}
	return <PhotoScreen title="Объект 1" photos={photos} cover={photos[0]} showMarks={false} onBack={() => navigate(galleryRoutes.albums)} />;
}
