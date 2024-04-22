/* global gform_trello_admin_strings */
( function( $ ) {

	$( document ).ready( function() {

		/* Hide save plugin settings button. */
		$( '#tab_gravityformstrello #gform-settings-save' ).hide();

		/* De-Authorize Trello. */
		$( '#gform_trello_deauth_button' ).on( 'click', function( e ) {
			e.preventDefault();
			var deauthButton = $( this );
			deauthButton.attr( 'disabled', 'disabled' );

			// If using an old token, just delete it.
			if ( gform_trello_admin_strings.requires_reauth ) {
				$( 'input#authToken' ).val( '' );
				$( '#gform-settings-save' ).trigger( 'click' );
				return;
			}

			// De-Authorize.
			$.ajax(
				{
					async: true,
					url: ajaxurl,
					dataType: 'json',
					method: 'POST',
					data: {
						action: 'gf_trello_deauthorize',
						nonce: gform_trello_admin_strings.deauth_nonce,
					},
					success: function( response ) {
						if ( response.success && response.success == true ) {
							location.reload();
						} else {
							window.alert( response.data.message );
						}
					},
				}
			).fail(
				function( jqXHR, textStatus, error ) {
					window.alert( error );
				}
			).always(
				function () {
					deauthButton.removeAttr( 'disabled' );
				}
			);
		} );
	} );

} )( jQuery );
