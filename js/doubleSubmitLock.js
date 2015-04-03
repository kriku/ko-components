var submitted = false;
function lockForm() {
	if (!submitted) {
		submitted = true;
		return true;
	}
	alert('Пожалуйста подождите, Ваш запрос выполняется.');
	return false;
}