var submitted = false;
function lockForm() {
	if (!submitted) {
		submitted = true;
		return true;
	}
	alert('���������� ���������, ��� ������ �����������.');
	return false;
}