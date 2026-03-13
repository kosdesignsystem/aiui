import { CSSProperties, useState } from 'react';
import { App } from '../../ui/App';
import { Header } from '../../ui/Header';
import { Text } from '../../ui/Fonts';
import { View } from '../../ui/View';
import { familyContacts, safetyActions } from './model';
import './screen.scss';

export function KidCallsScreen() {
	const [activeContactId, setActiveContactId] = useState(familyContacts[0]?.id);
	const activeContact = familyContacts.find((contact) => contact.id === activeContactId);

	return (
		<App>
			<div className="kid-calls-screen">
				<Header title="Позвонить родным" />
				<View>
					<div className="kid-calls-screen__content">
						<Text variant="regular-14" color="secondary">
							Нажми на лицо, чтобы позвонить
						</Text>

						<div className="kid-calls-screen__contacts" role="list">
							{familyContacts.map((contact) => (
								<button
									key={contact.id}
									type="button"
									className={`kid-calls-screen__contact${
										activeContactId === contact.id ? ' is-active' : ''
									}`}
									onClick={() => setActiveContactId(contact.id)}
									style={{ '--contact-color': contact.color } as CSSProperties}
								>
									<span className="kid-calls-screen__emoji" aria-hidden="true">
										{contact.emoji}
									</span>
									<span className="kid-calls-screen__name">{contact.name}</span>
									<span className="kid-calls-screen__hint">{contact.relation}</span>
								</button>
							))}
						</div>

						{activeContact ? (
							<div className="kid-calls-screen__call-panel">
								<div className="kid-calls-screen__active">Сейчас выбрано: {activeContact.name}</div>
								<button type="button" className="kid-calls-screen__call-button">
									📞 Позвонить
								</button>
							</div>
						) : null}

						<div className="kid-calls-screen__actions">
							{safetyActions.map((action) => (
								<button key={action.id} type="button" className="kid-calls-screen__action-pill">
									<span aria-hidden="true">{action.icon}</span>
									<span>{action.label}</span>
								</button>
							))}
						</div>
					</div>
				</View>
			</div>
		</App>
	);
}
