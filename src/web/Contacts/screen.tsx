import { CSSProperties, PointerEvent, UIEvent, useEffect, useMemo, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { cn } from '../../ui/lib/cn';
import {
	contactCatalogs,
	getContactsByIds,
	type ContactCatalog,
	type ContactEntry,
} from './model';
import './screen.scss';

const actionCatalogs = contactCatalogs.filter((catalog) =>
	['favorites', 'organization', 'blocked'].includes(catalog.id),
);
const deckCatalogs = contactCatalogs.slice(0, 3);
const initialCatalogOrder = deckCatalogs.map((catalog) => catalog.id);
const catalogPromoteDurationMs = 760;
const catalogReturnDurationMs = 520;
const catalogHeaderPullDistance = 112;

const navItems: Array<{ id: string; label: string; icon: IconName; active?: boolean }> = [
	{ id: 'calls', label: 'Вызовы', icon: 'phone-outline' },
	{ id: 'contacts', label: 'Контакты', icon: 'persone', active: true },
	{ id: 'dialpad', label: 'Набор', icon: 'dialpad' },
];

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function getCatalogLayout(index: number, activeIndex: number, collapse: number) {
	const relation = index - activeIndex;
	const absRelation = Math.abs(relation);
	const lowerDepth = Math.max(0, relation);
	const baseTop = 18 + index * 58;
	const collapsedTop =
		relation < 0
			? 8 + index * 14
			: relation === 0
				? 18
				: 42 + lowerDepth * 14;
	const lowerTopOffset = lowerDepth * (34 + lowerDepth * 10);
	const top = baseTop + lowerTopOffset + (collapsedTop - baseTop) * collapse;
	const depth =
		relation === 0
			? 36 + collapse * 18
			: relation > 0
				? 64 + lowerDepth * 28
				: Math.max(-42, 18 - absRelation * 20) - collapse * 10;
	const scale =
		relation > 0
			? 1 + Math.min(lowerDepth * 0.065, 0.16)
			: relation === 0
				? 1
				: 1 - Math.min(collapse * 0.012, 0.02);
	const rotate = relation * (0.42 - collapse * 0.26);
	const handleHeight = relation === 0 ? 70 - collapse * 18 : 70 - collapse * 48;
	const sideInset =
		relation > 0
			? Math.max(-18, -8 - lowerDepth * 8)
			: relation === 0
				? 0
				: 8 + absRelation * 6 - collapse * 4;
	const zIndex = relation === 0 ? 28 : 34 - absRelation;

	return {
		top,
		depth,
		scale,
		rotate,
		handleHeight,
		sideInset,
		zIndex,
	};
}

function getActiveCatalogBodyInset(activeIndex: number, collapse: number, catalogCount: number) {
	const activeLayout = getCatalogLayout(activeIndex, activeIndex, collapse);
	const activeTop = activeLayout.top;
	const bodyStart = Array.from({ length: catalogCount }).reduce((maxBottom, _, index) => {
		if (index < activeIndex) {
			return maxBottom;
		}

		const layout = getCatalogLayout(index, activeIndex, collapse);

		return Math.max(maxBottom, layout.top + layout.handleHeight);
	}, activeTop + activeLayout.handleHeight);

	return bodyStart - activeTop;
}

function getCatalogStyle(
	index: number,
	activeIndex: number,
	collapse: number,
	isActive: boolean,
	catalogCount: number,
): CSSProperties {
	const { top, depth, scale, rotate, handleHeight, sideInset, zIndex } = getCatalogLayout(
		index,
		activeIndex,
		collapse,
	);

	return {
		'--catalog-top': `${top}px`,
		'--catalog-side-inset': `${sideInset}px`,
		'--catalog-depth': `${depth}px`,
		'--catalog-scale': scale,
		'--catalog-rotate': `${rotate}deg`,
		'--catalog-handle-height': `${handleHeight}px`,
		'--catalog-body-inset': isActive
			? `${getActiveCatalogBodyInset(activeIndex, collapse, catalogCount)}px`
			: `${handleHeight}px`,
		'--catalog-collapse': collapse,
		zIndex,
	} as CSSProperties;
}

function getCatalogHitTargetStyle(index: number, activeIndex: number, collapse: number): CSSProperties {
	const { top, handleHeight, sideInset, scale, rotate } = getCatalogLayout(
		index,
		activeIndex,
		collapse,
	);

	return {
		'--catalog-hit-top': `${top}px`,
		'--catalog-hit-side-inset': `${sideInset}px`,
		'--catalog-hit-height': `${handleHeight}px`,
		'--catalog-hit-scale': scale,
		'--catalog-hit-rotate': `${rotate}deg`,
	} as CSSProperties;
}

function groupContacts(contacts: ContactEntry[]) {
	return contacts.reduce<Array<{ group: string; contacts: ContactEntry[] }>>((groups, contact) => {
		const lastGroup = groups[groups.length - 1];

		if (lastGroup?.group === contact.group) {
			lastGroup.contacts.push(contact);
			return groups;
		}

		groups.push({
			group: contact.group,
			contacts: [contact],
		});

		return groups;
	}, []);
}

function ContactAvatar({ contact }: { contact: ContactEntry }) {
	return (
		<Avatar size={44} className={cn('contacts-avatar', `contacts-avatar--${contact.tone}`)}>
			{contact.initials}
		</Avatar>
	);
}

function ContactRow({
	contact,
	selected,
	onToggle,
}: {
	contact: ContactEntry;
	selected: boolean;
	onToggle: () => void;
}) {
	return (
		<Cell
			className={cn('contacts-row', selected ? 'is-selected' : '')}
			onClick={onToggle}
			aria-pressed={selected}
			leading={<ContactAvatar contact={contact} />}
			title={
				<Text variant="medium-18" color="primary">
					<span className="contacts-row__name">{contact.name}</span>
				</Text>
			}
			subtitle={
				contact.role ? (
					<Text variant="regular-14" color="secondary">
						{contact.role}
					</Text>
				) : undefined
			}
			trailing={
				<IconButton
					size={38}
					variant={selected ? 'accent' : 'primary'}
					aria-label={`Позвонить: ${contact.name}`}
					onClick={(event) => event.stopPropagation()}
				>
					<Icon name="phone" width={18} height={18} alt="" aria-hidden="true" />
				</IconButton>
			}
		/>
	);
}

function CatalogPreview({ catalog }: { catalog: ContactCatalog }) {
	const previewContacts = getContactsByIds(catalog.contactIds).slice(0, 3);

	return (
		<div className="catalog-card__preview" aria-hidden="true">
			{previewContacts.length > 0 ? (
				previewContacts.map((contact) => (
					<span key={contact.id} className="catalog-card__preview-line">
						<ContactAvatar contact={contact} />
						<span />
					</span>
				))
			) : (
				<>
					<span className="catalog-card__preview-line is-empty" />
					<span className="catalog-card__preview-line is-empty" />
				</>
			)}
		</div>
	);
}

export function ContactsScreen() {
	const [activeCatalogId, setActiveCatalogId] = useState<ContactCatalog['id']>('all');
	const [catalogOrder, setCatalogOrder] =
		useState<Array<ContactCatalog['id']>>(initialCatalogOrder);
	const [catalogTransition, setCatalogTransition] = useState<{
		selectedCatalogId: ContactCatalog['id'];
		previousActiveCatalogId: ContactCatalog['id'];
		selectedStartIndex: number;
	} | null>(null);
	const [returningCatalogIds, setReturningCatalogIds] = useState<Array<ContactCatalog['id']>>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isMoveSheetOpen, setIsMoveSheetOpen] = useState(false);
	const [scrollCollapse, setScrollCollapse] = useState(0);
	const settleCatalogOrderTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const clearReturningCatalogsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const catalogHeaderDrag = useRef<{
		pointerId: number;
		startY: number;
		startCollapse: number;
		hasMoved: boolean;
	} | null>(null);
	const catalogsById = useMemo(
		() => new Map(deckCatalogs.map((catalog) => [catalog.id, catalog])),
		[],
	);
	const orderedCatalogs = useMemo(() => {
		return catalogOrder
			.map((catalogId) => catalogsById.get(catalogId))
			.filter((catalog): catalog is ContactCatalog => Boolean(catalog));
	}, [catalogOrder, catalogsById]);
	const activeCatalogSlot = Math.max(0, orderedCatalogs.length - 1);
	const foundActiveIndex = orderedCatalogs.findIndex((catalog) => catalog.id === activeCatalogId);
	const activeIndex = catalogTransition
		? activeCatalogSlot
		: foundActiveIndex >= 0
			? foundActiveIndex
			: orderedCatalogs.length - 1;
	const activeCatalog = catalogsById.get(activeCatalogId) ?? deckCatalogs[activeCatalogSlot];
	const activeContacts = useMemo(
		() => getContactsByIds(activeCatalog.contactIds),
		[activeCatalog.contactIds],
	);
	const groupedContacts = useMemo(() => groupContacts(activeContacts), [activeContacts]);
	const selectedCount = selectedIds.length;
	const hasCatalogStack = orderedCatalogs.length > 1;
	const isScrolled = hasCatalogStack && scrollCollapse > 0.08;

	useEffect(() => {
		return () => {
			if (settleCatalogOrderTimeout.current) {
				clearTimeout(settleCatalogOrderTimeout.current);
			}

			if (clearReturningCatalogsTimeout.current) {
				clearTimeout(clearReturningCatalogsTimeout.current);
			}
		};
	}, []);

	const handleContactListScroll = (event: UIEvent<HTMLDivElement>) => {
		setScrollCollapse(hasCatalogStack ? clamp(event.currentTarget.scrollTop / 116, 0, 1) : 0);
	};

	const handleCatalogHeaderPointerDown = (
		event: PointerEvent<HTMLButtonElement>,
		isVisuallyActive: boolean,
	) => {
		if (!isVisuallyActive || catalogTransition || !hasCatalogStack) {
			return;
		}

		catalogHeaderDrag.current = {
			pointerId: event.pointerId,
			startY: event.clientY,
			startCollapse: scrollCollapse,
			hasMoved: false,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handleCatalogHeaderPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
		const drag = catalogHeaderDrag.current;

		if (!drag || drag.pointerId !== event.pointerId) {
			return;
		}

		const deltaY = event.clientY - drag.startY;

		if (Math.abs(deltaY) < 4) {
			return;
		}

		drag.hasMoved = true;
		setScrollCollapse(clamp(drag.startCollapse - deltaY / catalogHeaderPullDistance, 0, 1));
		event.preventDefault();
	};

	const finishCatalogHeaderDrag = (event: PointerEvent<HTMLButtonElement>) => {
		const drag = catalogHeaderDrag.current;

		if (!drag || drag.pointerId !== event.pointerId) {
			return;
		}

		const deltaY = event.clientY - drag.startY;
		catalogHeaderDrag.current = null;

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (!drag.hasMoved) {
			return;
		}

		if (deltaY > 22) {
			setScrollCollapse(0);
			return;
		}

		if (deltaY < -22) {
			setScrollCollapse(1);
		}
	};

	const toggleContact = (contactId: string) => {
		setSelectedIds((current) =>
			current.includes(contactId)
				? current.filter((selectedId) => selectedId !== contactId)
				: [...current, contactId],
		);
	};

	const getCatalogSlotIndex = (catalogId: ContactCatalog['id'], fallbackIndex: number) => {
		if (!catalogTransition) {
			return fallbackIndex;
		}

		if (catalogId === catalogTransition.selectedCatalogId) {
			return activeCatalogSlot;
		}

		return fallbackIndex + (activeCatalogSlot - catalogTransition.selectedStartIndex);
	};

	const handleCatalogSelect = (catalog: ContactCatalog) => {
		if (catalogTransition || catalog.id === activeCatalogId) {
			return;
		}

		if (settleCatalogOrderTimeout.current) {
			clearTimeout(settleCatalogOrderTimeout.current);
		}

		if (clearReturningCatalogsTimeout.current) {
			clearTimeout(clearReturningCatalogsTimeout.current);
			clearReturningCatalogsTimeout.current = null;
		}

		const selectedStartIndex = catalogOrder.indexOf(catalog.id);
		const settledOrder = [
			...catalogOrder.slice(selectedStartIndex + 1),
			...catalogOrder.slice(0, selectedStartIndex),
			catalog.id,
		];
		const preservedCatalogs = catalogOrder.slice(0, selectedStartIndex);
		const returningCatalogs = settledOrder.filter(
			(catalogId) => catalogId !== catalog.id && !preservedCatalogs.includes(catalogId),
		);

		setReturningCatalogIds([]);
		setActiveCatalogId(catalog.id);
		setCatalogTransition({
			selectedCatalogId: catalog.id,
			previousActiveCatalogId: activeCatalogId,
			selectedStartIndex,
		});
		settleCatalogOrderTimeout.current = setTimeout(() => {
			setCatalogOrder(settledOrder);
			setReturningCatalogIds(returningCatalogs);
			setCatalogTransition(null);
			settleCatalogOrderTimeout.current = null;
			clearReturningCatalogsTimeout.current = setTimeout(() => {
				setReturningCatalogIds([]);
				clearReturningCatalogsTimeout.current = null;
			}, catalogReturnDurationMs);
		}, catalogPromoteDurationMs);
		setSelectedIds([]);
		setIsMoveSheetOpen(false);
		setScrollCollapse(0);
	};

	return (
		<App className={cn('contacts-concept', hasCatalogStack ? 'has-catalogs' : '', isScrolled ? 'is-scrolled' : '')}>
			<header className="contacts-concept__header">
				<div>
					<h1>Контакты</h1>
				</div>
			</header>

			<main className="contacts-concept__stage">
				<section className="contacts-deck" aria-label="Каталоги контактов">
					{orderedCatalogs.map((catalog, index) => {
						const isActive = catalog.id === activeCatalog.id;
						const isPromoting = catalogTransition?.selectedCatalogId === catalog.id;
						const isPreservedDuringTransition = Boolean(
							catalogTransition && index < catalogTransition.selectedStartIndex,
						);
						const isLeavingActive =
							catalogTransition?.previousActiveCatalogId === catalog.id && !isPromoting;
						const isVisuallyActive = isActive || isLeavingActive;
						const isTransitionHidden =
							Boolean(catalogTransition) && !isPromoting && !isPreservedDuringTransition;
						const isReturning = returningCatalogIds.includes(catalog.id);
						const catalogSlotIndex = getCatalogSlotIndex(catalog.id, index);
						const visibleContacts = isLeavingActive
							? getContactsByIds(catalog.contactIds)
							: activeContacts;
						const visibleGroupedContacts = isLeavingActive
							? groupContacts(visibleContacts)
							: groupedContacts;

						return (
							<article
								key={catalog.id}
								className={cn(
									'catalog-card',
									isVisuallyActive ? 'is-active' : '',
									isPromoting ? 'is-promoting' : '',
									isTransitionHidden ? 'is-transition-hidden' : '',
									isReturning ? 'is-returning' : '',
									scrollCollapse > 0.1 ? 'is-scroll-collapsed' : '',
									selectedCount > 0 && isActive ? 'is-selecting' : '',
								)}
								style={getCatalogStyle(
									catalogSlotIndex,
									activeIndex,
									scrollCollapse,
									isVisuallyActive,
									orderedCatalogs.length,
								)}
							>
								<button
									type="button"
									className="catalog-card__handle"
									onClick={() => handleCatalogSelect(catalog)}
									onPointerDown={(event) =>
										handleCatalogHeaderPointerDown(event, isVisuallyActive)
									}
									onPointerMove={handleCatalogHeaderPointerMove}
									onPointerUp={finishCatalogHeaderDrag}
									onPointerCancel={finishCatalogHeaderDrag}
									aria-label={`Открыть каталог: ${catalog.title}`}
									aria-current={isActive ? 'page' : undefined}
								>
									<span className="catalog-card__title">
										{catalog.title}
									</span>
									<span className="catalog-card__count">{catalog.count}</span>
								</button>

								{selectedCount > 0 && isActive ? (
									<div className="catalog-card__selection-cap">
										<span>Выбрано: {selectedCount}</span>
										<button
											type="button"
											aria-label="Снять выделение"
											onClick={() => {
												setSelectedIds([]);
												setIsMoveSheetOpen(false);
											}}
										>
											<Icon name="close" width={20} height={20} alt="" aria-hidden="true" />
										</button>
									</div>
								) : null}

								{isVisuallyActive ? (
									<div key={catalog.id} className="catalog-card__body">
										<div className="catalog-card__contact-list" onScroll={handleContactListScroll}>
											<ListContainer className="contacts-list">
												{visibleGroupedContacts.map((group) => (
													<List
														key={group.group}
														title={group.group}
														className="contacts-group"
													>
														{group.contacts.map((contact) => (
															<ContactRow
																key={contact.id}
																contact={contact}
																selected={selectedIds.includes(contact.id)}
																onToggle={() => toggleContact(contact.id)}
															/>
														))}
													</List>
												))}
											</ListContainer>
										</div>
									</div>
								) : (
									<CatalogPreview catalog={catalog} />
								)}

								{selectedCount > 0 && isActive ? (
									<div className="catalog-card__bulk-actions">
										<Button
											variant="primary"
											size={52}
											leftIcon={<Icon name="folder-send-outline" width={20} height={20} alt="" aria-hidden="true" />}
											onClick={() => setIsMoveSheetOpen(true)}
										>
											Перенести
										</Button>
										<Button
											variant="danger"
											size={52}
											leftIcon={<Icon name="delete-outline" width={20} height={20} alt="" aria-hidden="true" />}
											onClick={() => {
												setSelectedIds([]);
												setIsMoveSheetOpen(false);
											}}
										>
											Удалить
										</Button>
									</div>
								) : null}
							</article>
						);
					})}
					<div className="contacts-deck__hit-targets">
						{orderedCatalogs.map((catalog, index) => {
							const isActive = catalog.id === activeCatalog.id;
							const catalogSlotIndex = getCatalogSlotIndex(catalog.id, index);

							if (isActive || catalogTransition) {
								return null;
							}

							return (
								<button
									key={catalog.id}
									type="button"
									className="contacts-deck__hit-target"
									style={getCatalogHitTargetStyle(catalogSlotIndex, activeIndex, scrollCollapse)}
									onClick={() => handleCatalogSelect(catalog)}
									aria-label={`Открыть каталог: ${catalog.title}`}
								/>
							);
						})}
					</div>
				</section>
			</main>

			<Nav
				className="contacts-concept__tabs"
				ariaLabel="Разделы"
				items={navItems.map((item) => ({
					id: item.id,
					label: item.label,
					active: item.active,
					icon: <Icon name={item.icon} width={22} height={22} alt="" aria-hidden="true" />,
				}))}
			/>

			{isMoveSheetOpen ? (
				<div className="contacts-move-sheet" role="dialog" aria-modal="true">
					<button
						type="button"
						className="contacts-move-sheet__scrim"
						aria-label="Закрыть"
						onClick={() => setIsMoveSheetOpen(false)}
					/>
					<div className="contacts-move-sheet__panel">
						<div className="contacts-move-sheet__heading">
							<span className="contacts-move-sheet__icon">
								<Icon name="folder-send-outline" width={22} height={22} alt="" aria-hidden="true" />
							</span>
							<span>
								<strong>Выберите группу</strong>
								<small>Перенос {selectedCount} контактов</small>
							</span>
						</div>
						<div className="contacts-move-sheet__list">
							<button type="button">
								<Icon name="folder-add-outline" width={20} height={20} alt="" aria-hidden="true" />
								Добавить группу
							</button>
							{actionCatalogs.map((catalog) => (
								<button
									key={catalog.id}
									type="button"
									onClick={() => {
										setIsMoveSheetOpen(false);
										setSelectedIds([]);
										if (deckCatalogs.some((deckCatalog) => deckCatalog.id === catalog.id)) {
											handleCatalogSelect(catalog);
										}
									}}
								>
									<Icon name={catalog.icon} width={20} height={20} alt="" aria-hidden="true" />
									{catalog.title}
								</button>
							))}
						</div>
					</div>
				</div>
			) : null}
		</App>
	);
}
