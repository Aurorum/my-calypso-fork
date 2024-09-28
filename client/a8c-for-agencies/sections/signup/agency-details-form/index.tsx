import { Button, Gridicon, FormLabel, SearchableDropdown } from '@automattic/components';
import { useLocalizeUrl } from '@automattic/i18n-utils';
import clsx from 'clsx';
import { useTranslate } from 'i18n-calypso';
import { useCallback, useState, useMemo, ChangeEvent, useEffect } from 'react';
import LayoutBanner from 'calypso/a8c-for-agencies/components/layout/banner';
import TextPlaceholder from 'calypso/a8c-for-agencies/components/text-placeholder';
import FormFieldset from 'calypso/components/forms/form-fieldset';
import FormSelect from 'calypso/components/forms/form-select';
import FormTextInput from 'calypso/components/forms/form-text-input';
import MultiCheckbox, { ChangeList } from 'calypso/components/forms/multi-checkbox';
import { useDispatch } from 'calypso/state';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { Option as CountryOption, useCountriesAndStates } from './hooks/use-countries-and-states';
import useSignupFormValidation from './hooks/use-signup-form-validation';
import { AgencyDetailsPayload } from './types';
import type { FormEventHandler } from 'react';

import './style.scss';

function getCountry( country: string, options: CountryOption[] ): string {
	if ( options.length < 1 ) {
		return country;
	}

	for ( let i = 0; i < options.length; i++ ) {
		if ( options[ i ].value === country ) {
			return country;
		}
	}

	return options[ 0 ].value;
}

interface Props {
	includeTermsOfService?: boolean;
	isLoading: boolean;
	onSubmit: ( payload: AgencyDetailsPayload ) => void;
	referer?: string | null;
	initialValues?: AgencyDetailsPayload;
	submitLabel: string;
}

export default function AgencyDetailsForm( {
	includeTermsOfService = false,
	isLoading,
	initialValues,
	onSubmit,
	referer,
	submitLabel,
}: Props ) {
	const translate = useTranslate();
	const dispatch = useDispatch();
	const localizeUrl = useLocalizeUrl();

	const { countryOptions, stateOptionsMap } = useCountriesAndStates();
	const showCountryFields = countryOptions.length > 0;

	const [ countryValue, setCountryValue ] = useState( initialValues?.country ?? '' );
	const [ city, setCity ] = useState( initialValues?.city ?? '' );
	const [ line1, setLine1 ] = useState( initialValues?.line1 ?? '' );
	const [ line2, setLine2 ] = useState( initialValues?.line2 ?? '' );
	const [ postalCode, setPostalCode ] = useState( initialValues?.postalCode ?? '' );
	const [ addressState, setAddressState ] = useState( initialValues?.state ?? '' );
	const [ agencyName, setAgencyName ] = useState( initialValues?.agencyName ?? '' );
	const [ firstName, setFirstName ] = useState( initialValues?.firstName ?? '' );
	const [ lastName, setLastName ] = useState( initialValues?.lastName ?? '' );
	const [ agencyUrl, setAgencyUrl ] = useState( initialValues?.agencyUrl ?? '' );
	const [ managedSites, setManagedSites ] = useState( initialValues?.managedSites ?? '1-5' );
	const [ userType, setUserType ] = useState( initialValues?.userType ?? 'agency_owner' );
	const [ servicesOffered, setServicesOffered ] = useState( initialValues?.servicesOffered ?? [] );
	const [ productsOffered, setProductsOffered ] = useState( initialValues?.productsOffered ?? [] );

	const { validate, validationError, updateValidationError } = useSignupFormValidation();

	const country = getCountry( countryValue, countryOptions );
	const stateOptions = stateOptionsMap[ country ];

	useEffect( () => {
		// Reset the value of state since our options have changed.
		setAddressState( stateOptions?.length ? stateOptions[ 0 ].value : '' );
	}, [ stateOptions ] );

	const payload: AgencyDetailsPayload = useMemo(
		() => ( {
			firstName,
			lastName,
			agencyName,
			agencyUrl,
			managedSites,
			userType,
			servicesOffered,
			productsOffered,
			city,
			line1,
			line2,
			country,
			postalCode,
			state: addressState,
			referer,
			...( includeTermsOfService ? { tos: 'consented' } : {} ),
		} ),
		[
			firstName,
			lastName,
			agencyName,
			agencyUrl,
			managedSites,
			userType,
			servicesOffered,
			productsOffered,
			city,
			line1,
			line2,
			country,
			postalCode,
			addressState,
			referer,
			includeTermsOfService,
		]
	);

	const handleSubmit = useCallback(
		( e: React.SyntheticEvent ) => {
			e.preventDefault();

			if ( ! showCountryFields || isLoading ) {
				return;
			}

			const error = validate( payload );
			if ( error ) {
				// Scrolling only for fields positioned on top
				if ( error.firstName || error.lastName || error.agencyName || error.agencyUrl ) {
					window?.scrollTo( { behavior: 'smooth', top: 0 } );
				}
				return;
			}

			onSubmit( payload );
		},
		[ showCountryFields, isLoading, onSubmit, payload, validate ]
	);

	const getServicesOfferedOptions = () => {
		return [
			{ value: 'strategy_consulting', label: translate( 'Strategy consulting' ) },
			{ value: 'website_design_development', label: translate( 'Website design & development' ) },
			{ value: 'performance_optimization', label: translate( 'Performance optimization' ) },
			{ value: 'digital_strategy_marketing', label: translate( 'Digital strategy & marketing' ) },
			{ value: 'maintenance_support_plans', label: translate( 'Maintenance & support plans' ) },
		];
	};

	const getProductsOfferedOptions = () => {
		return [
			{ value: 'WordPress.com', label: translate( 'WordPress.com' ) },
			{ value: 'WooCommerce', label: translate( 'WooCommerce' ) },
			{ value: 'Jetpack', label: translate( 'Jetpack' ) },
			{ value: 'Pressable', label: translate( 'Pressable' ) },
			{ value: 'WordPress VIP', label: translate( 'WordPress VIP' ) },
		];
	};

	// <FormSelect> complains if we "just" pass "setManagedSites" because it expects
	// React.FormEventHandler, so this wrapper function is made to satisfy everything
	// in an easily readable way.
	const handleSetManagedSites: FormEventHandler = ( { target } ) => {
		const value: string = ( target as HTMLSelectElement ).value;
		setManagedSites( value );
	};

	const handleSetUserType = ( event: ChangeEvent< HTMLSelectElement > ) => {
		if ( event.target.value === 'site_owner' ) {
			dispatch( recordTracksEvent( 'calypso_a4a_signup_user_type_site_owner_selected' ) );
		}
		setUserType( event.target.value );
	};

	const handleSetServicesOffered = ( services: ChangeList< string > ) => {
		setServicesOffered( services.value );
	};

	const handleSetProductsOffered = ( products: ChangeList< string > ) => {
		setProductsOffered( products.value );
	};

	const isUserSiteOwner = userType === 'site_owner';

	return (
		<div className="agency-details-form">
			<form onSubmit={ handleSubmit }>
				<div className="agency-details-form__fullname-container">
					<FormFieldset>
						<FormLabel htmlFor="firstName">{ translate( 'First name' ) }</FormLabel>
						<FormTextInput
							id="firstName"
							name="firstName"
							value={ firstName }
							isError={ !! validationError.firstName }
							onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
								setFirstName( event.target.value );
								updateValidationError( { firstName: undefined } );
							} }
							disabled={ isLoading }
						/>
						<div
							className={ clsx( 'agency-details-form__footer-error', {
								hidden: ! validationError?.firstName,
							} ) }
							role="alert"
						>
							{ validationError.firstName }
						</div>
					</FormFieldset>
					<FormFieldset>
						<FormLabel htmlFor="lastName">{ translate( 'Last name' ) }</FormLabel>
						<FormTextInput
							id="lastName"
							name="lastName"
							value={ lastName }
							isError={ !! validationError.lastName }
							onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
								setLastName( event.target.value );
								updateValidationError( { lastName: undefined } );
							} }
							disabled={ isLoading }
						/>
						<div
							className={ clsx( 'agency-details-form__footer-error', {
								hidden: ! validationError?.lastName,
							} ) }
							role="alert"
						>
							{ validationError.lastName }
						</div>
					</FormFieldset>
				</div>
				<FormFieldset>
					<FormLabel htmlFor="agencyName">{ translate( 'Agency name' ) }</FormLabel>
					<FormTextInput
						id="agencyName"
						name="agencyName"
						value={ agencyName }
						isError={ !! validationError.agencyName }
						onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
							setAgencyName( event.target.value );
							updateValidationError( { agencyName: undefined } );
						} }
						disabled={ isLoading }
					/>
					<div
						className={ clsx( 'agency-details-form__footer-error', {
							hidden: ! validationError?.agencyName,
						} ) }
						role="alert"
					>
						{ validationError.agencyName }
					</div>
				</FormFieldset>
				<FormFieldset>
					<FormLabel htmlFor="agencyUrl">{ translate( 'Business URL' ) }</FormLabel>
					<FormTextInput
						id="agencyUrl"
						name="agencyUrl"
						value={ agencyUrl }
						isError={ !! validationError.agencyUrl }
						onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
							setAgencyUrl( event.target.value );
							updateValidationError( { agencyUrl: undefined } );
						} }
						disabled={ isLoading }
					/>
					<div
						className={ clsx( 'agency-details-form__footer-error', {
							hidden: ! validationError?.agencyUrl,
						} ) }
						role="alert"
					>
						{ validationError.agencyUrl }
					</div>
				</FormFieldset>
				<FormFieldset>
					<FormLabel htmlFor="user_type">
						{ translate( 'How would you describe yourself?' ) }
					</FormLabel>
					<FormSelect
						name="user_type"
						id="user_type"
						value={ userType }
						onChange={ handleSetUserType }
					>
						<option value="agency_owner">{ translate( "I'm an agency owner" ) }</option>
						<option value="developer_at_agency">
							{ translate( "I'm a developer at an agency" ) }
						</option>
						<option value="sales_marketing_operations_at_agency">
							{ translate( "I'm in sales, marketing, or operations at an agency" ) }
						</option>
						<option value="freelancer">{ translate( "I'm a freelancer" ) }</option>
						<option value="site_owner">
							{ translate( "I do not work at an agency. I'm a site owner." ) }
						</option>
					</FormSelect>
				</FormFieldset>
				{ ! isUserSiteOwner ? (
					<>
						<FormFieldset>
							<FormLabel htmlFor="managed_sites">
								{ translate( 'How many sites do you manage?' ) }
							</FormLabel>
							<FormSelect
								name="managed_sites"
								id="managed_sites"
								value={ managedSites }
								onChange={ handleSetManagedSites }
							>
								<option value="1-5">{ translate( '1-5' ) }</option>
								<option value="6-20">{ translate( '6-20' ) }</option>
								<option value="21-50">{ translate( '21-50' ) }</option>
								<option value="51-100">{ translate( '51-100' ) }</option>
								<option value="101-500">{ translate( '101-500' ) }</option>
								<option value="500+">{ translate( '500+' ) }</option>
							</FormSelect>
						</FormFieldset>
						<FormFieldset>
							<FormLabel htmlFor="services_offered">
								{ translate( 'What services do you offer?', {
									comment:
										'Possible values are: "Strategy consulting", "Website design & development", "Performance optimization", "Digital strategy & marketing", "Maintenance & support plans".',
								} ) }
							</FormLabel>
							<MultiCheckbox
								id="services_offered"
								name="services_offered"
								checked={ servicesOffered }
								options={ getServicesOfferedOptions() }
								// // Using 'as any' to bypass TypeScript type checks due to a known and intentional type mismatch between
								// the expected custom event type for `onChange` and the standard event types.
								onChange={ handleSetServicesOffered as any }
							/>
						</FormFieldset>
						<FormFieldset>
							<FormLabel htmlFor="products_offered">
								{ translate( 'What Automattic products do you currently offer your customers?' ) }
							</FormLabel>
							<MultiCheckbox
								id="products_offered"
								name="products_offered"
								checked={ productsOffered }
								options={ getProductsOfferedOptions() }
								// // Using 'as any' to bypass TypeScript type checks due to a known and intentional type mismatch between
								// the expected custom event type for `onChange` and the standard event types.
								onChange={ handleSetProductsOffered as any }
							/>
						</FormFieldset>
						<FormFieldset>
							<FormLabel>{ translate( 'Country' ) }</FormLabel>
							{ showCountryFields && (
								<SearchableDropdown
									value={ countryValue }
									onChange={ ( value ) => {
										setCountryValue( value ?? '' );
										updateValidationError( { country: undefined } );
									} }
									options={ countryOptions }
									disabled={ isLoading }
								/>
							) }

							{ ! showCountryFields && <TextPlaceholder /> }
							<div
								className={ clsx( 'agency-details-form__footer-error', {
									hidden: ! validationError?.country,
								} ) }
								role="alert"
							>
								{ validationError.country }
							</div>
						</FormFieldset>
						{ showCountryFields && stateOptions && (
							<FormFieldset>
								<FormLabel>{ translate( 'State' ) }</FormLabel>
								<SearchableDropdown
									value={ addressState }
									onChange={ ( value ) => setAddressState( value ?? '' ) }
									options={ stateOptions }
									disabled={ isLoading }
									allowReset={ false }
								/>
							</FormFieldset>
						) }
						<FormFieldset className="agency-details-form__business-address">
							<FormLabel>{ translate( 'Business address' ) }</FormLabel>
							<FormTextInput
								id="line1"
								name="line1"
								placeholder={ translate( 'Street name and house number' ) }
								value={ line1 }
								isError={ !! validationError.line1 }
								onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
									setLine1( event.target.value );
									updateValidationError( { line1: undefined } );
								} }
								disabled={ isLoading }
							/>
							<div
								className={ clsx( 'agency-details-form__footer-error', {
									hidden: ! validationError?.line1,
									'line-separated': !! validationError?.line1,
								} ) }
								role="alert"
							>
								{ validationError.line1 }
							</div>
							<FormTextInput
								id="line2"
								name="line2"
								placeholder={ translate( 'Apartment, floor, suite or unit number' ) }
								value={ line2 }
								onChange={ ( event: ChangeEvent< HTMLInputElement > ) =>
									setLine2( event.target.value )
								}
								disabled={ isLoading }
							/>
						</FormFieldset>
						<FormFieldset>
							<FormLabel htmlFor="city">{ translate( 'City' ) }</FormLabel>
							<FormTextInput
								id="city"
								name="city"
								value={ city }
								isError={ !! validationError.city }
								onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
									setCity( event.target.value );
									updateValidationError( { city: undefined } );
								} }
								disabled={ isLoading }
							/>

							{ !! validationError?.city && (
								<div className="agency-details-form__footer-error" role="alert">
									{ validationError.city }
								</div>
							) }
						</FormFieldset>
						<FormFieldset>
							<FormLabel optional htmlFor="postalCode">
								{ translate( 'Postal code' ) }
							</FormLabel>
							<FormTextInput
								id="postalCode"
								name="postalCode"
								value={ postalCode }
								onChange={ ( event: ChangeEvent< HTMLInputElement > ) =>
									setPostalCode( event.target.value )
								}
								disabled={ isLoading }
							/>
						</FormFieldset>
						{ includeTermsOfService && (
							<div className="company-details-form__tos">
								<p>
									{ translate(
										"By clicking 'Continue', you agree to the{{break}}{{/break}}{{link}}Terms of the Automattic for Agencies Platform Agreement{{icon}}{{/icon}}{{/link}}.",
										{
											components: {
												break: <br />,
												link: (
													<a
														href={ localizeUrl(
															'https://automattic.com/for-agencies/platform-agreement/'
														) }
														target="_blank"
														rel="noopener noreferrer"
													></a>
												),
												icon: <Gridicon icon="external" size={ 18 } />,
											},
										}
									) }
								</p>
							</div>
						) }
						<div className="company-details-form__controls">
							<Button
								primary
								type="submit"
								className="company-details-form__submit"
								disabled={ ! showCountryFields || isLoading }
								busy={ isLoading }
							>
								{ submitLabel }
							</Button>
						</div>
					</>
				) : (
					<LayoutBanner
						hideCloseButton
						level="warning"
						title={ translate( 'Unable to Proceed with Application' ) }
					>
						<div>
							{ translate(
								'Automattic for Agencies is a program designed for agencies, developers, and freelancers who work with and provide services to their clients.' +
									' Thank you for your interest, but we will not be progressing your application now. If you chose this option in error, please select the appropriate option from the list.'
							) }
						</div>
					</LayoutBanner>
				) }
			</form>
		</div>
	);
}
