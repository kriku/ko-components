function delConfirm(text, value, action, key, keyId) {
	if (confirm(text + (value == "" ? "" : (" '" + value + "'")) + " ?")) {
		if (key == null) {
			key = value;
		}
		if (keyId == null) {
			keyId = "del";
		}
		location.href = action + ".do?" + keyId + "=" + key;
	}
}

function delConfirm2(text, value, action, key, specialKey, specialParam) {
	if (confirm(text + (value == "" ? "" : (" '" + value + "'")) + " ?")) {
		if (key == null) {
			key = value;
		}
		location.href = action + ".do?del" + specialKey + "=" + key + "&" + specialParam;
	}
}