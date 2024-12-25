import { __ } from '@wordpress/i18n';
import CardHeading from 'calypso/components/card-heading';

type SubpageWrapperParamsType = {
	subPageKey: string;
	title: string;
	subtitle?: string;
	[ key: string ]: unknown;
};

// Subpage keys
export const ADD_FOWARDING_EMAIL = 'add-forwarding-email';
export const EDIT_CONTACT_INFO = 'edit-contact-info';

// Subpage params map
const SUBPAGE_TO_PARAMS_MAP: Record< string, SubpageWrapperParamsType > = {
	[ ADD_FOWARDING_EMAIL ]: {
		subPageKey: ADD_FOWARDING_EMAIL,
		title: __( 'Add new email forwarding' ),
		subtitle: __( 'Seamlessly redirect your messages to where you need them.' ),
		showPageHeader: false,
		formHeader: <CardHeading>{ __( 'New email forwarding address' ) }</CardHeading>,
	},
	[ EDIT_CONTACT_INFO ]: {
		subPageKey: EDIT_CONTACT_INFO,
		title: __( 'Contact information' ),
		subtitle: __( "Manage your domain's contact details." ),
	},
};

export const getSubpageParams = ( subPageKey: string ): SubpageWrapperParamsType => {
	return SUBPAGE_TO_PARAMS_MAP[ subPageKey ];
};
