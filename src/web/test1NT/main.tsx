import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { List } from '../../ui/List';
import { FlowPage, FlowPageList } from '../FlowPage';

export function Test1NTMainScreen() {
	const [count, setCount] = useState(0);

	return (
		<FlowPage title="test1NT">
			<FlowPageList>
				<List title="Добро пожаловать">
					<Cell
						title="Ваше тестовое приложение"
						subtitle="Нажмите кнопку, чтобы проверить работу счётчика."
					/>
				</List>
				<List title="Проверка взаимодействий">
					<Cell
						title="Количество нажатий"
						trailing={<output aria-label="Количество нажатий" aria-live="polite">{count}</output>}
					/>
					<Cell
						title={<Button onClick={() => setCount((current) => current + 1)}>Увеличить</Button>}
					/>
					<Cell
						title={
							<Button variant="secondary" disabled={count === 0} onClick={() => setCount(0)}>
								Сбросить
							</Button>
						}
					/>
				</List>
			</FlowPageList>
		</FlowPage>
	);
}
