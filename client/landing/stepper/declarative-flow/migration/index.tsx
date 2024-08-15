import { PLAN_MIGRATION_TRIAL_MONTHLY } from '@automattic/calypso-products';
import { MIGRATION_FLOW, SITE_SETUP_FLOW } from '@automattic/onboarding';
import { translate } from 'i18n-calypso';
import { useSearchParams } from 'react-router-dom';
import { HOSTING_INTENT_MIGRATE } from 'calypso/data/hosting/use-add-hosting-trial-mutation';
import { goToCheckout } from 'calypso/landing/stepper/utils/checkout';
import { addQueryArgs } from 'calypso/lib/url';
import { HOW_TO_MIGRATE_OPTIONS } from '../../constants';
import { stepsWithRequiredLogin } from '../../utils/steps-with-required-login';
import { STEPS } from '../internals/steps';
import type { ProvidedDependencies } from '../internals/types';
import type {
	Flow,
	Navigate,
	StepperStep,
} from 'calypso/landing/stepper/declarative-flow/internals/types';
import type { Primitive } from 'utility-types';

const {
	PLATFORM_IDENTIFICATION,
	PROCESSING,
	SITE_CREATION_STEP,
	SITE_MIGRATION_UPGRADE_PLAN,
	MIGRATION_HOW_TO_MIGRATE,
	MIGRATION_SOURCE_URL,
	SITE_MIGRATION_INSTRUCTIONS,
	SITE_MIGRATION_STARTED,
	SITE_MIGRATION_ASSISTED_MIGRATION,
} = STEPS;

const useCreateStepHandlers = ( navigate: Navigate< StepperStep[] >, flowObject: Flow ) => {
	const [ query ] = useSearchParams();

	const getFromPropsOrUrl = ( key: string, props?: ProvidedDependencies ): Primitive => {
		const value = props?.[ key ] || query.get( key );
		return typeof value === 'object' ? undefined : ( value as Primitive );
	};

	return {
		[ PLATFORM_IDENTIFICATION.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const platform = getFromPropsOrUrl( 'platform', props ) as string;

				const args: { platform: string | undefined; next?: string } = {
					platform,
				};

				if ( platform !== 'wordpress' ) {
					args.next = props?.url as string;
				}

				return navigate( addQueryArgs( args, SITE_CREATION_STEP.slug ) );
			},
		},
		[ SITE_CREATION_STEP.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const platform = getFromPropsOrUrl( 'platform', props );
				const next = getFromPropsOrUrl( 'next', props );

				return navigate( addQueryArgs( { platform, next }, PROCESSING.slug ) );
			},
		},
		[ PROCESSING.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const next = getFromPropsOrUrl( 'next', props );
				const siteId = getFromPropsOrUrl( 'siteId', props );
				const siteSlug = getFromPropsOrUrl( 'siteSlug', props );

				if ( next ) {
					return window.location.assign(
						addQueryArgs( { siteId, siteSlug }, `/setup/${ SITE_SETUP_FLOW }/${ next.toString() }` )
					);
				}

				return navigate( addQueryArgs( { siteId, siteSlug }, SITE_MIGRATION_UPGRADE_PLAN.slug ) );
			},
		},
		[ SITE_MIGRATION_UPGRADE_PLAN.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const siteId = getFromPropsOrUrl( 'siteId', props );
				const siteSlug = getFromPropsOrUrl( 'siteSlug', props ) as string;
				const flowPath = ( flowObject.variantSlug ?? flowObject.name ) as string;
				const plan = props?.plan as string;

				if ( props?.goToCheckout ) {
					const redirectAfterCheckout = MIGRATION_HOW_TO_MIGRATE.slug;
					const destination = addQueryArgs(
						{ siteId, siteSlug },
						`/setup/${ flowPath as string }/${ redirectAfterCheckout }`
					);

					const extraQueryParams =
						props?.sendIntentWhenCreatingTrial && plan === PLAN_MIGRATION_TRIAL_MONTHLY
							? { hosting_intent: HOSTING_INTENT_MIGRATE }
							: undefined;

					return goToCheckout( {
						flowName: flowPath,
						stepName: SITE_MIGRATION_UPGRADE_PLAN.slug,
						siteSlug,
						destination: destination,
						plan,
						cancelDestination: `/setup/${ flowPath }/${
							STEPS.SITE_MIGRATION_UPGRADE_PLAN.slug
						}?${ query.toString() }`,
						extraQueryParams,
					} );
				}
			},
		},
		[ MIGRATION_HOW_TO_MIGRATE.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const how = getFromPropsOrUrl( 'how', props );
				const siteId = getFromPropsOrUrl( 'siteId', props );
				const siteSlug = getFromPropsOrUrl( 'siteSlug', props );

				if ( how === HOW_TO_MIGRATE_OPTIONS.DO_IT_MYSELF ) {
					return navigate( addQueryArgs( { siteId, siteSlug }, SITE_MIGRATION_INSTRUCTIONS.slug ) );
				}

				return navigate( addQueryArgs( { siteId, siteSlug }, MIGRATION_SOURCE_URL.slug ) );
			},
		},
		[ SITE_MIGRATION_INSTRUCTIONS.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const siteId = getFromPropsOrUrl( 'siteId', props );
				const siteSlug = getFromPropsOrUrl( 'siteSlug', props );

				return navigate( addQueryArgs( { siteId, siteSlug }, SITE_MIGRATION_STARTED.slug ) );
			},
		},
		[ MIGRATION_SOURCE_URL.slug ]: {
			submit: ( props?: ProvidedDependencies ) => {
				const siteId = getFromPropsOrUrl( 'siteId', props );
				const siteSlug = getFromPropsOrUrl( 'siteSlug', props );
				const from = getFromPropsOrUrl( 'from', props );

				return navigate(
					addQueryArgs( { siteId, siteSlug, from }, SITE_MIGRATION_ASSISTED_MIGRATION.slug )
				);
			},
		},
	};
};

export default {
	name: MIGRATION_FLOW,
	get title() {
		return translate( 'Site Migration' );
	},
	isSignupFlow: false,
	useSteps() {
		return stepsWithRequiredLogin( [
			PLATFORM_IDENTIFICATION,
			SITE_CREATION_STEP,
			PROCESSING,
			SITE_MIGRATION_UPGRADE_PLAN,
			MIGRATION_HOW_TO_MIGRATE,
			MIGRATION_SOURCE_URL,
			SITE_MIGRATION_INSTRUCTIONS,
			SITE_MIGRATION_STARTED,
			SITE_MIGRATION_ASSISTED_MIGRATION,
		] );
	},

	useStepNavigation( currentStep, navigate ) {
		const stepHandlers = useCreateStepHandlers( navigate, this );

		return stepHandlers[ currentStep ];
	},
} satisfies Flow;