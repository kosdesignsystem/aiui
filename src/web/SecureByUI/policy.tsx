import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { SecurePolicySheetContent } from './policySheetContent';
import './screen.scss';

export default function SecureByUIPolicyPage() {
	return (
		<App>
			<section className="secure-ui" aria-label="Secure by UI - policy sheet">
				<div className="secure-ui__mock-content" aria-hidden="true">
					<div className="secure-ui__mock-header">
						<Text variant="semiBold-40" color="primary">
							Шторка
						</Text>
					</div>
				</div>

				<div className="secure-ui__policy-backdrop is-visible secure-ui__policy-backdrop--static">
					<div className="secure-ui__policy-sheet">
						<SecurePolicySheetContent onCancel={() => undefined} />
					</div>
				</div>
			</section>
		</App>
	);
}
