import { ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Markdown from 'react-markdown';
import { useOdieAssistantContext } from '../../context';
import CustomALink from './custom-a-link';
import { uriTransformer } from './uri-transformer';
import WasThisHelpfulButtons from './was-this-helpful-buttons';
import type { Message } from '../../types/';

export const UserMessage = ( {
	message,
	onDislike,
	isDisliked = false,
}: {
	isDisliked?: boolean;
	message: Message;
	onDislike: () => void;
} ) => {
	const { extraContactOptions, navigateToContactOptions, trackEvent } = useOdieAssistantContext();
	const isRequestingHumanSupport = message.context?.flags?.forward_to_human_support;
	const hasFeedback = !! message?.rating_value;
	const isUser = message.role === 'user';
	const isPositiveFeedback =
		hasFeedback && message && message.rating_value && +message.rating_value === 1;
	const showExtraContactOptions =
		( hasFeedback && ! isPositiveFeedback ) || isRequestingHumanSupport;

	return (
		<>
			<Markdown
				urlTransform={ uriTransformer }
				components={ {
					a: CustomALink,
				} }
			>
				{ message.content }
			</Markdown>
			{ showExtraContactOptions && extraContactOptions }
			{ ! hasFeedback && ! isUser && (
				<WasThisHelpfulButtons
					message={ message }
					onDislike={ onDislike }
					isDisliked={ isDisliked }
				/>
			) }
			{ ! isUser && (
				<>
					{ ! showExtraContactOptions && (
						<div className="disclaimer">
							{ __( 'Feeling stuck?', __i18n_text_domain__ ) }{ ' ' }
							<button
								onClick={ () => {
									trackEvent( 'chat_message_direct_escalation_link_click', {
										message_id: message.message_id,
									} );
									if ( navigateToContactOptions ) {
										navigateToContactOptions();
									}
								} }
								className="odie-button-link"
							>
								{ __( 'Contact our support team.', __i18n_text_domain__ ) }
							</button>
						</div>
					) }
					<div className="disclaimer">
						{ __(
							"Generated by WordPress.com's Support AI. AI-generated responses may contain inaccurate information.",
							__i18n_text_domain__
						) }
						<ExternalLink href="https://automattic.com/ai-guidelines">
							{ ' ' }
							{ __( 'Learn more.', __i18n_text_domain__ ) }
						</ExternalLink>
					</div>
				</>
			) }
		</>
	);
};