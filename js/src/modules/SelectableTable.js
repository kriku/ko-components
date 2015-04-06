(function (window) {

	var SelectableTable = function (table) {
		this.table = table;
		this.ctrl = table.getElementsByTagName('INPUT')[0];
		this.attachCtrl();
		this.attachLines();
	};

	SelectableTable.prototype.attachLines = function () {
		var that = this;
		EventUtil.addHandler(this.table, 'click', function () {
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			if (target.tagName === 'TD'||target.tagName === 'INPUT') {
				var check = target.parentNode.getElementsByTagName('INPUT')[0];
				if (target.tagName !== 'INPUT') {
					check.checked = !check.checked;
				}
			}
			that.selectLine(target.parentNode, check);
			EventUtil.stopPropagation(event);
			(that.ctrl.checked) && (that.ctrl.checked = false);
		});
	};

	SelectableTable.prototype.attachCtrl = function () {
		var that = this, ctrl = this.ctrl;
		var lines = that.table.getElementsByTagName('TR');
		EventUtil.addHandler(this.ctrl, 'click', function () {
			var event = EventUtil.getEvent(event);
			var check, line, i, len = lines.length;
			// from 1 because of header tr
			for (i = 1; i<len; i++) {
				line = lines[i];
				check = line.getElementsByTagName('INPUT')[0];
				check.checked = ctrl.checked;
				that.selectLine(line, check);
			}
			EventUtil.stopPropagation(event);
		});
	};

	SelectableTable.prototype.selectLine = function (line, check) {
		if (classie.has(line, 'active') || classie.has(line, 'warning')) {
			(check.checked)? classie.change(line, 'warning', 'active') : classie.change(line, 'active', 'warning');
		} else {
			(check.checked)? classie.add(line, 'info') : classie.remove(line, 'info');
		}
	};

	// transport
	window.SelectableTable = SelectableTable;

})(window);
