import { CSSProperties, useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Header } from '../../ui/Header';
import { Text } from '../../ui/Fonts';
import { View } from '../../ui/View';
import { chatByContact, familyContacts, FamilyContact } from './model';
import './screen.scss';

export function KidCallsScreen() {
	const [activeContactId, setActiveContactId] = useState(familyContacts[0]?.id);
	const [chatContactId, setChatContactId] = useState<string | null>(null);
	const [callStatus, setCallStatus] = useState('');

	const activeContact = familyContacts.find((contact) => contact.id === activeContactId);
	const chatContact = familyContacts.find((contact) => contact.id === chatContactId);
	const chatMessages = useMemo(() => {
		if (!chatContactId) {
			return [];
		}

		return chatByContact[chatContactId] ?? [];
	}, [chatContactId]);

	const handleCardTap = (contact: FamilyContact) => {
		setActiveContactId(contact.id);
		setCallStatus(`Звоним: ${contact.name}...`);
	};

	if (chatContact) {
		return (
			<App>
				<div className="kid-calls-screen kid-calls-screen--chat">
					<Header title={`Чат: ${chatContact.name}`} button={<button type="button" className="kid-calls-screen__back" onClick={() => setChatContactId(null)}>Назад</button>} />
					<View>
						<div className="kid-calls-screen__chat-layout">
							<div className="kid-calls-screen__chat-list">
								{chatMessages.map((message) => (
									<div
										key={message.id}
										className={`kid-calls-screen__bubble${
											message.from === 'child' ? ' is-child' : ''
										}`}
									>
										<div>{message.text}</div>
										<span>{message.time}</span>
									</div>
								))}
							</div>

							<div className="kid-calls-screen__composer">
								<input type="text" value="Напиши сообщение..." readOnly />
								<button type="button">🎤</button>
							</div>
						</div>
					</View>
				</div>
			</App>
		);
	}

	return (
		<App>
			<div className="kid-calls-screen">
				<Header title="Мои контакты" />
				<View>
					<div className="kid-calls-screen__content">
						<div className="kid-calls-screen__contacts" role="list">
							{familyContacts.map((contact) => (
								<button
									key={contact.id}
									type="button"
									className={`kid-calls-screen__contact${
										activeContactId === contact.id ? ' is-active' : ''
									}`}
									onClick={() => handleCardTap(contact)}
									style={{ '--contact-color': contact.color } as CSSProperties}
								>
									<div className="kid-calls-screen__contact-main">
										<span className="kid-calls-screen__contact-emoji" aria-hidden="true">
											{contact.emoji}
										</span>
										<span className="kid-calls-screen__name">{contact.name}</span>
									</div>
									<div className="kid-calls-screen__card-actions">
										<button
											type="button"
											className="kid-calls-screen__mini-action"
											onClick={(event) => {
												event.stopPropagation();
												setCallStatus(`Видео звонок: ${contact.name}`);
											}}
										>
											📹 Видео
										</button>
										<button
											type="button"
											className="kid-calls-screen__mini-action"
											onClick={(event) => {
												event.stopPropagation();
												setChatContactId(contact.id);
											}}
										>
											💬 Чат
										</button>
									</div>
								</button>
							))}
						</div>

						{callStatus ? (
							<div className="kid-calls-screen__status">
								<Text variant="regular-14" color="primary">
									{callStatus}
								</Text>
							</div>
						) : null}

						<button type="button" className="kid-calls-screen__sos-button">
							🆘 SOS
						</button>
					</div>
				</View>
			</div>
		</App>
	);
}
