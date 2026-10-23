import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Header } from '../../ui/Header';
import { List } from '../../ui/List';
import { FlowPage, FlowPageList } from '../FlowPage';
import wallpaper from '../../assets/launcher/wallpaper.png';
import contacts from '../../assets/launcher/icons/Contacts.png';
import maps from '../../assets/launcher/icons/Maps.png';
import weather from '../../assets/launcher/icons/Weather.png';
import clock from '../../assets/launcher/icons/Сlock.png';
import phone from '../../assets/launcher/icons/Phone.png';
import messages from '../../assets/launcher/icons/Messenger.png';
import calendar from '../../assets/launcher/icons/Calendar.png';
import settings from '../../assets/launcher/icons/Settings.png';
import { useVoiceControl } from './overlay';
import './main.scss';

const apps = [
	{ title: 'Контакты', icon: contacts }, { title: 'Карты', icon: maps },
	{ title: 'Погода', icon: weather }, { title: 'Часы', icon: clock },
	{ title: 'Телефон', icon: phone }, { title: 'Сообщения', icon: messages },
	{ title: 'Календарь', icon: calendar }, { title: 'Настройки', icon: settings },
];

export function VoiceControlMainScreen() {
	const [activeApp, setActiveApp] = useState<string | null>(null);
	const { open } = useVoiceControl();
	if (activeApp) {
		return (
			<FlowPage header={<Header title={activeApp} action={<Button variant="secondary" size={32} onClick={() => setActiveApp(null)}>Назад</Button>} />}>
				<FlowPageList>
					<List title="Предпросмотр приложения">
						<Cell title={activeApp} subtitle="Помощник доступен и на этом экране. После закрытия вы останетесь здесь." />
						<Cell title={<Button onClick={open}>Открыть помощника</Button>} />
					</List>
				</FlowPageList>
			</FlowPage>
		);
	}
	return (
		<section className="vc-home" aria-label="Рабочий стол VoiceControl" style={{ backgroundImage: `url(${wallpaper})` }}>
			<div className="vc-home__clock"><time>13:52</time><span>Понедельник, 24 июня</span></div>
			<div className="vc-home__hint"><span>VoiceControl</span><p>Ваш голос. Ваши возможности.</p></div>
			<div className="vc-home__apps">
				{apps.map((app) => <button key={app.title} type="button" onClick={() => setActiveApp(app.title)}>
					<img src={app.icon} alt="" draggable={false} /><span>{app.title}</span>
				</button>)}
			</div>
		</section>
	);
}
