/**
 * @jest-environment jsdom
 */
import { RedirectOnboardingUserAfterPublishingPost } from '../redirect-onboarding-user-after-publishing-post';

beforeAll( () => {} );

const mockUnSubscribe = jest.fn();
const mockClosePublishSidebar = jest.fn();
const mockCloseSidebar = jest.fn();
const mockSubscribeFunction = {};
const mockUseEffectFunctions = [];
let mockSubscribeFunctionDescriptor = '';
let mockIsSaving = false;
let mockPostType = 'post';
let mockLaunchpadScreen = 'full';

jest.mock( 'react', () => ( {
	useEffect: ( userFunction ) => {
		mockUseEffectFunctions.push( userFunction );
	},
} ) );

jest.mock( '../use-launchpad-screen', () => ( {
	__esModule: true,
	default: () => {
		return {
			launchpad_screen: mockLaunchpadScreen,
		};
	},
} ) );

jest.mock( '../use-site-intent', () => ( {
	__esModule: true,
	default: () => {
		return {
			siteIntent: 'start-writing',
		};
	},
} ) );

jest.mock( '@wordpress/data', () => ( {
	subscribe: ( userFunction ) => {
		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] = userFunction;

		return mockUnSubscribe;
	},
	select: ( item ) => {
		if ( item === 'core/editor' ) {
			return {
				isSavingPost: () => mockIsSaving,
				isCurrentPostPublished: () => true,
				getCurrentPostRevisionsCount: () => 1,
				isCurrentPostScheduled: () => true,
				getCurrentPostType: () => mockPostType,
			};
		}

		if ( item === 'core/preferences' ) {
			return {
				get: () => true,
			};
		}
	},
	dispatch: () => {
		return {
			closePublishSidebar: () => {
				mockClosePublishSidebar();
			},
			closeGeneralSidebar: () => {
				mockCloseSidebar();
			},
		};
	},
} ) );

describe( 'RedirectOnboardingUserAfterPublishingPost', () => {
	it( 'should NOT redirect while saving the post', () => {
		mockIsSaving = true;
		mockSubscribeFunctionDescriptor = 'no_redirect_while_saving_post';
		delete global.window;
		global.window = {
			sessionStorage: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).not.toBe( undefined );
		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ]();

		expect( mockUnSubscribe ).not.toHaveBeenCalled();
		expect( global.window.location.href ).toBe( undefined );
	} );

	it( 'should redirect the user to the launchpad when a post is published and the start-writing query parameter is "true"', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockSubscribeFunctionDescriptor = 'redirect_to_launchpad_post';
		delete global.window;

		global.window = {
			sessionStorage: {
				getItem: jest.fn( () => 'https://calypso.localhost:3000' ),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).not.toBe( null );
		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ]();

		expect( mockUnSubscribe ).toHaveBeenCalledTimes( 1 );
		expect( mockClosePublishSidebar ).toHaveBeenCalledTimes( 1 );
		expect( global.window.location.href ).toBe(
			'https://calypso.localhost:3000/setup/start-writing/launchpad?siteSlug=wordpress.com'
		);
	} );

	it( 'should NOT redirect the user to the launchpad when a post is published and the start-writing query parameter is present but not "true"', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockSubscribeFunctionDescriptor = 'no_redirect_to_launchpad_bad_start_writing_param';
		delete global.window;

		global.window = {
			sessionStorage: {
				getItem: jest.fn( () => 'https://calypso.localhost:3000' ),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=test&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).toBe( undefined );
		expect( mockClosePublishSidebar ).not.toHaveBeenCalled();
		expect( global.window.location.href ).toBe( undefined );
	} );

	it( 'should NOT redirect the user to the launchpad when a post is published, the start-writing query parameter is present, and the launchpad_screen is skipped', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockLaunchpadScreen = 'skipped';
		mockSubscribeFunctionDescriptor = 'no_redirect_to_launchpad_skipped_launchpad_screen';
		delete global.window;

		global.window = {
			sessionStorage: {
				getItem: jest.fn( () => 'https://calypso.localhost:3000' ),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).toBe( undefined );
		expect( mockClosePublishSidebar ).not.toHaveBeenCalled();
		expect( global.window.location.href ).toBe( undefined );

		mockLaunchpadScreen = 'full';
	} );

	it( 'should NOT redirect the user to the launchpad when a page is published and the start-writing query parameter is present', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockPostType = 'page';
		mockSubscribeFunctionDescriptor = 'no_redirect_page_published';
		delete global.window;

		global.window = {
			sessionStorage: {
				getItem: jest.fn( () => 'https://calypso.localhost:3000' ),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).not.toBe( null );

		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ]();

		expect( mockUnSubscribe ).toHaveBeenCalledTimes( 1 );
		expect( mockClosePublishSidebar ).not.toHaveBeenCalled();
		expect( global.window.location.href ).toBe( undefined );
	} );

	it( 'should NOT redirect the user to the launchpad when a template is published', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockPostType = 'template';
		mockSubscribeFunctionDescriptor = 'no_redirect_template_published';
		delete global.window;

		global.window = {
			sessionStorage: {
				getItem: jest.fn( () => 'https://calypso.localhost:3000' ),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).not.toBe( null );

		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ]();

		expect( mockUnSubscribe ).toHaveBeenCalledTimes( 1 );
		expect( mockClosePublishSidebar ).not.toHaveBeenCalled();
		expect( global.window.location.href ).toBe( undefined );
	} );

	it( 'should close the sidebar once isComplementaryAreaVisible === true', () => {
		jest.clearAllMocks();
		mockIsSaving = false;
		mockSubscribeFunctionDescriptor = 'close_sidebar';
		delete global.window;
		global.window = {
			sessionStorage: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			location: {
				search: '?start-writing=true&origin=https://calypso.localhost:3000',
				hostname: 'wordpress.com',
			},
		};

		RedirectOnboardingUserAfterPublishingPost();

		expect( mockSubscribeFunction[ mockSubscribeFunctionDescriptor ] ).not.toBe( null );

		mockSubscribeFunction[ mockSubscribeFunctionDescriptor ]();
		mockUseEffectFunctions[ 0 ]();

		expect( mockCloseSidebar ).toHaveBeenCalledTimes( 1 );
	} );
} );
