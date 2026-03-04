import { useState } from 'react';
import { App } from '../../../ui/App';
import { Cell } from '../../../ui/Cell';
import { Header } from '../../../ui/Header';
import { Icon } from '../../../ui/Icon';
import { IconButton } from '../../../ui/IconButton';
import { List, ListContainer } from '../../../ui/List';
import { Nav } from '../../../ui/Nav';
import { SegmentedTabs } from '../../../ui/SegmentedTabs';
import { SearchBar, SearchBarButton } from '../../../ui/SearchBar';
import { View } from '../../../ui/View';
import { Text } from '../../../ui/Fonts';
import { Avatar } from '../../../ui/Avatar';

export default function DefaultApp() {
	const [filterId, setFilterId] = useState('all');

	return (
		<App>
			<Header title="Default" />

			<SegmentedTabs
				tabs={[
					{ id: 'all', label: 'Все' },
					{ id: 'missed', label: 'Пропущенные' },
				]}
				value={filterId}
				onChange={setFilterId}
				variant="button-left"
				onButtonClick={() => {}}
			/>

			<View>
				<ListContainer>
					<List title="App">
						<Cell
							leading={
								<Avatar background="content-background" iconName="done"></Avatar>
							}
							title={
								<Text variant="regular-18" color="primary">
									+7 927 238-80-22 (3)
								</Text>
							}
							subtitle={
								<Text variant="regular-14" color="secondary">
									23:04
								</Text>
							}
							trailing={
								<IconButton size={44}>
									<Icon name={'info'} />
								</IconButton>
							}
						/>
					</List>
				</ListContainer>
			</View>

			<SearchBar
				placeholder="Поиск"
				leftButton={
					<SearchBarButton aria-label="Показать меню">
						<Icon name="more-horizontal" alt="" width={28} height={28} />
					</SearchBarButton>
				}
			/>

			<Nav
				items={[
					{
						id: 'home',
						label: <Text variant="regular-14">Home</Text>,
						icon: <Icon name="phone-received" width={20} height={20} alt="" />,
						active: true,
					},
					{
						id: 'files',
						label: <Text variant="regular-14">Files</Text>,
						icon: <Icon name="phone-received" width={20} height={20} alt="" />,
					},
					{
						id: 'profile',
						label: <Text variant="regular-14">Profile</Text>,
						icon: <Icon name="phone-received" width={20} height={20} alt="" />,
					},
				]}
			/>
		</App>
	);
}
