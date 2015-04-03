var CAPICOM_CURRENT_USER_STORE = 2,
		CAPICOM_STORE_OPEN_READ_ONLY = 0,
		CAPICOM_ENCODE_BASE64 = 0,
		CAPICOM_ENCODE_BINARY = 1,
		CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0,
		CAPICOM_E_SIGN_NOT_SIGNED = 0x80880262;

function capicom_detached_sign_internal(comment_id, data, callback_url, button_id, hourglass_id) {
	try {
		$('#' + comment_id).text('\u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f \u043a\u0440\u0438\u043f\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0438...');
		var store = new ActiveXObject("CAPICOM.Store");
		var utils = new ActiveXObject("CAPICOM.Utilities");
		var signer = new ActiveXObject("CAPICOM.Signer");
		var signedData;
		$('#' + comment_id).text('\u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435...');
		var binary = utils.HexToBinary(data);
		signedData = new ActiveXObject("CAPICOM.SignedData");
		signedData.Content = binary;
		$('#' + comment_id).text('\u0432\u044b\u0431\u043e\u0440 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u0430...');
		store.Open(CAPICOM_CURRENT_USER_STORE, 'My', CAPICOM_STORE_OPEN_READ_ONLY);
		var certs = store.Certificates.Select('\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435\u0020\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442.', "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435\u0020\u043E\u0434\u0438\u043D\u0020\u0438\u0437\u0020\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432", false);
		signer.Certificate = certs.Item(1);
		$('#' + comment_id).text('\u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043d\u0438\u0435...');
		var result = signedData.Sign(signer, true);
		$('#' + comment_id).text('\u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430...');
		wicketAjaxPost(callback_url, 'data=' + Wicket.Form.encode(result));
	} catch (e) {
		$('#' + comment_id).text($('#' + comment_id).text() + ' \u043e\u0448\u0438\u0431\u043a\u0430: ' + e.description + " (" + e.number + ")");
		$('#' + button_id).removeAttr("disabled");
		$('#' + hourglass_id).css('display', 'none');
	}
}
function capicom_detached_sign(comment_id, file_url, callback_url, button_id, hourglass_id) {
	$('#' + button_id).attr("disabled", "true");
	$('#' + hourglass_id).css('display', 'inline');
	$('#' + comment_id).text('loading file...');
	$.get(file_url, function (data) {
		capicom_detached_sign_internal(comment_id, data, callback_url, button_id, hourglass_id);
	});
}