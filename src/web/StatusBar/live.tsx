import { useEffect, useRef, useState } from 'react';
import {
	resetStatusBarState,
	setStatusBarState,
	useStatusBarState,
	type StatusBarState,
} from '../../system/statusBarStore';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { List, ListContainer } from '../../ui/List';
import { Switch } from '../../ui/Switch';
import { FlowPage } from '../FlowPage';
import './live.scss';

type ToggleKey = keyof StatusBarState;

const toggles: ReadonlyArray<{ key: ToggleKey; title: string; subtitle: string }> = [
	{ key: 'call', title: 'Звонок', subtitle: 'Зелёный круг рядом со временем' },
	{ key: 'timer', title: 'Таймер', subtitle: 'Фиолетовый круг рядом со временем' },
	{ key: 'mute', title: 'Без звука', subtitle: 'Слева от сети' },
	{ key: 'alarm', title: 'Будильник', subtitle: 'Слева от сети' },
	{ key: 'gprs', title: 'Сеть GPRS', subtitle: 'Подпись вместо Wi-Fi' },
	{ key: 'airplane', title: 'Авиарежим', subtitle: 'Самолёт вместо сети и Wi-Fi' },
	{ key: 'hidden', title: 'Полный экран', subtitle: 'Бар скрыт, остаётся камера' },
];

type Step = { label: string; patch: Partial<StatusBarState> };

const STEP_MS = 1600;

const scenario: ReadonlyArray<Step> = [
	{ label: 'Обычное состояние', patch: {} },
	{ label: 'Входящий звонок принят', patch: { call: true } },
	{ label: 'Запущен таймер', patch: { timer: true } },
	{ label: 'Включён режим «без звука»', patch: { mute: true } },
	{ label: 'Поставлен будильник', patch: { alarm: true } },
	{ label: 'Звонок завершён', patch: { call: false } },
	{ label: 'Сеть упала до GPRS', patch: { gprs: true } },
	{ label: 'Включён авиарежим', patch: { gprs: false, airplane: true } },
	{ label: 'Полный экран: бар скрыт', patch: { hidden: true } },
	{ label: 'Выход из полного экрана', patch: { hidden: false } },
	{ label: 'Всё выключено', patch: { timer: false, mute: false, alarm: false, airplane: false } },
];

export default function StatusBarLivePage() {
	const state = useStatusBarState();
	const [stepIndex, setStepIndex] = useState<number | null>(null);
	const timerRef = useRef<number | null>(null);

	const stop = () => {
		if (timerRef.current !== null) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
		setStepIndex(null);
	};

	const play = () => {
		stop();
		resetStatusBarState();
		let index = 0;
		setStepIndex(0);
		timerRef.current = window.setInterval(() => {
			index += 1;
			if (index >= scenario.length) {
				stop();
				return;
			}
			setStatusBarState(scenario[index].patch);
			setStepIndex(index);
		}, STEP_MS);
	};

	useEffect(() => {
		resetStatusBarState();
		return () => {
			if (timerRef.current !== null) {
				window.clearInterval(timerRef.current);
			}
			resetStatusBarState();
		};
	}, []);

	const running = stepIndex !== null;

	return (
		<FlowPage title="Живой бар">
			<div className="sb-live" data-status-bar-icons="dark" data-nav-bar-icons="dark">
				<div className="sb-live__scenario">
					<Text as="p" variant="semiBold-16">
						Сценарий
					</Text>
					<Text as="p" variant="regular-14" color="secondary">
						{running ? `${stepIndex + 1} из ${scenario.length}: ${scenario[stepIndex].label}` : 'Бар вверху экрана меняется сам по шагам.'}
					</Text>
					<div className="sb-live__actions">
						<Button onClick={play} disabled={running}>
							Запустить
						</Button>
						<Button onClick={stop} disabled={!running}>
							Остановить
						</Button>
					</div>
				</div>
				<ListContainer>
					<List>
						{toggles.map((item) => (
							<Cell
								key={item.key}
								title={item.title}
								subtitle={item.subtitle}
								trailing={
									<Switch
										aria-label={item.title}
										checked={state[item.key]}
										onChange={(event) => {
											stop();
											setStatusBarState({ [item.key]: event.target.checked });
										}}
									/>
								}
							/>
						))}
					</List>
				</ListContainer>
			</div>
		</FlowPage>
	);
}
