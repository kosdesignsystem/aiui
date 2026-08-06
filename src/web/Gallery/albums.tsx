import { type KeyboardEvent, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Icon, type IconName } from '../../ui/Icon';
import {
	favoritePhotos,
	galleryAlbums,
	galleryCategories,
	galleryRoutes,
	getPhotoCountLabel,
	type GalleryCategoryId,
} from './model';
import { GalleryHeader } from './header';
import { GalleryNav } from './nav';
import { PhotoScreen } from './screen';
import './screen.scss';
import './albums.scss';

const categoryIcons: Record<GalleryCategoryId, IconName> = {
	photos: 'photo-outline',
	videos: 'video-outline',
	screenshots: 'image-outline',
	records: 'open-in-full',
	downloads: 'download',
};

export function AlbumsScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const swipeStartRef = useRef<number | null>(null);
	const swipedRef = useRef(false);
	const [favoriteIndex, setFavoriteIndex] = useState(0);
	const listPath = `${galleryRoutes.albums}?view=list`;
	const favoritesPath = `${galleryRoutes.albums}?view=favorites`;
	const album = galleryAlbums.find((item) => item.id === searchParams.get('album'));

	const moveFavorite = (step: number) => {
		setFavoriteIndex(
			(current) => (current + step + favoritePhotos.length) % favoritePhotos.length,
		);
	};

	const handleFavoriteKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			moveFavorite(-1);
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			moveFavorite(1);
		}
	};

	if (album) {
		const backTo = (location.state as { backTo?: string } | null)?.backTo ?? listPath;

		return (
			<PhotoScreen
				title={album.title}
				photos={album.photos}
				cover={album.photos[0]}
				onBack={() => navigate(backTo)}
			/>
		);
	}

	if (searchParams.get('view') === 'favorites') {
		return (
			<PhotoScreen
				title="Избранное"
				photos={favoritePhotos}
				cover={favoritePhotos[0]}
				initialPhotoId={searchParams.get('photo') ?? undefined}
				onBack={() => navigate(galleryRoutes.albums)}
				onViewerClose={
					searchParams.has('photo')
						? () => navigate(galleryRoutes.albums, { replace: true })
						: undefined
				}
			/>
		);
	}

	if (searchParams.get('view') === 'list') {
		return (
			<App>
				<div className="gallery-screen gallery-albums">
					<div className="gallery-screen__surface">
						<GalleryHeader
							title="Мои альбомы"
							showCreate
							onBack={() => navigate(galleryRoutes.albums)}
						/>
						<main className="gallery-screen__scroll gallery-albums__list-scroll">
							<div className="album-grid" role="list" aria-label="Мои альбомы">
								{galleryAlbums.map((item) => (
									<button
										key={item.id}
										type="button"
										className="album-slider__card"
										onClick={() =>
											navigate(`${galleryRoutes.albums}?album=${item.id}`, {
												state: { backTo: listPath },
											})
										}
										role="listitem"
										aria-label={`${item.title}, ${getPhotoCountLabel(item.photos.length)}`}
									>
										<img src={item.photos[0].imageSrc} alt="" aria-hidden="true" />
										<span className="gallery-cover__shade" />
										<span className="gallery-cover__copy">
											<Text as="span" variant="medium-16">
												{item.title}
											</Text>
											<Text as="span" variant="regular-12">
												{getPhotoCountLabel(item.photos.length)}
											</Text>
										</span>
									</button>
								))}
							</div>
						</main>
						<div className="gallery-screen__nav gallery-screen__nav--bottom">
							<GalleryNav active="albums" />
						</div>
					</div>
				</div>
			</App>
		);
	}

	return (
		<App>
			<div className="gallery-screen gallery-albums">
				<div className="gallery-screen__surface">
					<GalleryHeader title="Альбомы" showCreate />

					<main className="gallery-screen__scroll gallery-albums__scroll">
						<section className="gallery-albums__section" aria-label="Избранное">
							<button
								type="button"
								className="gallery-albums__section-head"
								onClick={() => navigate(favoritesPath)}
							>
								<Text as="div" variant="semiBold-20">
									Избранное
								</Text>
								<Icon name="chevron-right" width={24} height={24} aria-hidden="true" />
							</button>

							<div
								className="favorite-slider"
								tabIndex={0}
								onKeyDown={handleFavoriteKeyDown}
								onPointerDown={(event) => {
									swipeStartRef.current = event.clientX;
									swipedRef.current = false;
								}}
								onPointerUp={(event) => {
									if (swipeStartRef.current === null) {
										return;
									}

									const distance = event.clientX - swipeStartRef.current;
									swipeStartRef.current = null;
									if (Math.abs(distance) > 36) {
										swipedRef.current = true;
										moveFavorite(distance > 0 ? -1 : 1);
									}
								}}
								onPointerCancel={() => {
									swipeStartRef.current = null;
								}}
								aria-label="Слайдер избранных фотографий"
							>
								{favoritePhotos.map((photo, index) => {
									const offset =
										(index - favoriteIndex + favoritePhotos.length) % favoritePhotos.length;
									const layer = offset === 0 ? 'front' : offset === 1 ? 'middle' : 'back';
									const hidden = offset > 2;

									return (
										<button
											key={photo.id}
											type="button"
											className={`favorite-slider__card is-${layer}${hidden ? ' is-hidden' : ''}`}
											onClick={() => {
												if (swipedRef.current) {
													swipedRef.current = false;
													return;
												}

												navigate(`${favoritesPath}&photo=${photo.id}`);
											}}
											tabIndex={offset === 0 ? 0 : -1}
											aria-hidden={hidden ? true : undefined}
											aria-label={`Избранное: ${photo.title}, ${index + 1} из ${favoritePhotos.length}`}
										>
											<img src={photo.imageSrc} alt="" aria-hidden="true" draggable={false} />
										</button>
									);
								})}
							</div>
						</section>

						<section className="gallery-albums__section" aria-label="Мои альбомы">
							<button
								type="button"
								className="gallery-albums__section-head"
								onClick={() => navigate(listPath)}
							>
								<Text as="div" variant="semiBold-20">
									Мои альбомы
								</Text>
								<Icon name="chevron-right" width={24} height={24} aria-hidden="true" />
							</button>

							<div
								className="album-slider"
								aria-label="Слайдер моих альбомов"
							>
								{galleryAlbums.map((item) => (
									<button
										key={item.id}
										type="button"
										className="album-slider__card"
										onClick={() =>
											navigate(`${galleryRoutes.albums}?album=${item.id}`, {
												state: { backTo: galleryRoutes.albums },
											})
										}
										aria-label={`${item.title}, ${getPhotoCountLabel(item.photos.length)}`}
									>
										<img src={item.photos[0].imageSrc} alt="" aria-hidden="true" draggable={false} />
										<span className="gallery-cover__shade" />
										<span className="gallery-cover__copy">
											<Text as="span" variant="medium-16">
												{item.title}
											</Text>
											<Text as="span" variant="regular-12">
												{getPhotoCountLabel(item.photos.length)}
											</Text>
										</span>
									</button>
								))}
							</div>
						</section>

						<section className="gallery-albums__section" aria-label="Категории">
							<div className="gallery-albums__section-head">
								<Text as="div" variant="semiBold-20">
									Категории
								</Text>
								<Icon name="chevron-right" width={24} height={24} aria-hidden="true" />
							</div>
							<div className="gallery-categories" role="list">
								{galleryCategories.map((category) => (
									<div key={category.id} className="gallery-categories__item" role="listitem">
										<Icon
											name={categoryIcons[category.id]}
											width={24}
											height={24}
											aria-hidden="true"
										/>
										<Text as="span" variant="medium-16">
											{category.title}
										</Text>
										<Text as="span" variant="regular-14" color="secondary" className="gallery-categories__count">
											{category.count.toLocaleString('ru-RU')}
										</Text>
									</div>
								))}
							</div>
						</section>
					</main>

					<div className="gallery-screen__nav gallery-screen__nav--bottom">
						<GalleryNav active="albums" />
					</div>
				</div>
			</div>
		</App>
	);
}
