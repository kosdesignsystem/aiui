import { CSSProperties, useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Header } from '../../ui/Header';
import { Text } from '../../ui/Fonts';
import { View } from '../../ui/View';
import { chatByContact, familyContacts, FamilyContact } from './model';
import './screen.scss';

type ScreenMode = 'contacts' | 'chat' | 'call';

export function KidCallsScreen() {
	const [mode, setMode] = useState<ScreenMode>('contacts');
	const [selectedContactId, setSelectedContactId] = useState(familyContacts[0]?.id ?? '');
	const [callStatus, setCallStatus] = useState('');

	const selectedContact = familyContacts.find((contact) => contact.id === selectedContactId) ?? null;
	const chatMessages = useMemo(() => {
		if (!selectedContactId) {
			return [];
		}

		return chatByContact[selectedContactId] ?? [];
	}, [selectedContactId]);

	const handleCardTap = (contact: FamilyContact) => {
		setSelectedContactId(contact.id);
		setCallStatus(`Звоним: ${contact.name}...`);
		setMode('call');
	};

	if (mode === 'call' && selectedContact) {
		return (
			<App>
				<div className="kid-calls-screen kid-calls-screen--call">
					<div className="kid-calls-screen__call-photo-wrap">
						<img
							className="kid-calls-screen__call-photo"
							src={selectedContact.photo}
							alt={`Фото контакта ${selectedContact.name}`}
						/>
						<div className="kid-calls-screen__call-overlay">
							<Text variant="semi-20" color="primary">
								{selectedContact.name}
							</Text>
							<Text variant="regular-14" color="primary">
								{callStatus || 'Соединение...'}
							</Text>
							<div className="kid-calls-screen__call-actions">
								<button
									type="button"
									className="kid-calls-screen__overlay-button"
									onClick={() => setMode('contacts')}
								>
									Завершить
								</button>
								<button
									type="button"
									className="kid-calls-screen__overlay-button"
									onClick={() => setMode('chat')}
								>
									Открыть чат
								</button>
							</div>
						</div>
					</div>
				</div>
			</App>
		);
	}

	if (mode === 'chat' && selectedContact) {
		return (
			<App>
				<div className="kid-calls-screen kid-calls-screen--chat">
					<Header
						title={`Чат: ${selectedContact.name}`}
						button={
							<button type="button" className="kid-calls-screen__back" onClick={() => setMode('contacts')}>
								Назад
							</button>
						}
					/>
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
								<button type="button" aria-label="Записать голосовое">
									🎤
								</button>
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
								<article
									key={contact.id}
									className="kid-calls-screen__contact"
									style={{ '--contact-color': contact.color } as CSSProperties}
								>
									<button
										type="button"
										className="kid-calls-screen__card-main"
										onClick={() => handleCardTap(contact)}
									>
										<span className="kid-calls-screen__contact-emoji" aria-hidden="true">
											{contact.emoji}
										</span>
										<span className="kid-calls-screen__name">{contact.name}</span>
									</button>
									<div className="kid-calls-screen__card-actions">
										<button
											type="button"
											className="kid-calls-screen__mini-action"
											onClick={() => {
												setSelectedContactId(contact.id);
												setCallStatus(`Видео звонок: ${contact.name}`);
												setMode('call');
											}}
										>
											📹 Видео
										</button>
										<button
											type="button"
											className="kid-calls-screen__mini-action"
											onClick={() => {
												setSelectedContactId(contact.id);
												setMode('chat');
											}}
										>
											💬 Чат
										</button>
									</div>
								</article>
							))}
						</div>

						<button type="button" className="kid-calls-screen__sos-button">
							🆘 SOS
						</button>
					</div>
				</View>
			</div>
		</App>
	);
}
