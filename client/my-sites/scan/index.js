/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import config from 'config';

import { navigation, siteSelection, sites } from 'my-sites/controller';
import { makeLayout, render as clientRender } from 'controller';
import isJetpackCloud from 'lib/jetpack/is-jetpack-cloud';
import wrapInSiteOffsetProvider from 'lib/jetpack/wrap-in-site-offset';
import wpcomBusinessAtController from 'lib/jetpack/wpcom-business-at-controller';
import wpcomUpsellController from 'lib/jetpack/wpcom-upsell-controller';
import {
	showUpsellIfNoScan,
	showUpsellIfNoScanHistory,
	scan,
	scanHistory,
} from 'my-sites/scan/controller';
import WPCOMScanUpsellPage from 'my-sites/scan/wpcom-upsell';
import WPCOMBusinessAT from 'components/jetpack/wpcom-business-at';

export default function () {
	if ( isJetpackCloud() || config.isEnabled( 'jetpack/features-section' ) ) {
		page( '/scan', siteSelection, sites, navigation, makeLayout, clientRender );
		page(
			'/scan/:site',
			siteSelection,
			navigation,
			scan,
			wrapInSiteOffsetProvider,
			showUpsellIfNoScan,
			wpcomUpsellController( WPCOMScanUpsellPage ),
			wpcomBusinessAtController( WPCOMBusinessAT ),
			makeLayout,
			clientRender
		);

		page(
			'/scan/history/:site/:filter?',
			siteSelection,
			navigation,
			scanHistory,
			wrapInSiteOffsetProvider,
			showUpsellIfNoScanHistory,
			wpcomUpsellController( WPCOMScanUpsellPage ),
			wpcomBusinessAtController( WPCOMBusinessAT ),
			makeLayout,
			clientRender
		);

		page(
			'/scan/:site/:filter?',
			siteSelection,
			navigation,
			scan,
			wrapInSiteOffsetProvider,
			showUpsellIfNoScan,
			wpcomUpsellController( WPCOMScanUpsellPage ),
			wpcomBusinessAtController( WPCOMBusinessAT ),
			makeLayout,
			clientRender
		);
	} else {
		page( '/scan*', () => page.redirect( '/' ) );
	}
}
