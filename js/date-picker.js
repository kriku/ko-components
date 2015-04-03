function findPos(obj) {
	var pos = new Object;
	pos.left = 0;
	pos.top = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
	} else if (obj.x) {
		pos.left = obj.x;
		pos.top = obj.y;
	}
	return pos;
}

function get_parent(widget) {
	if (widget.parentElement) {
		return widget.parentElement
	}
	if (widget.parentNode) {
		return widget.parentNode
	}
	if (widget.parent) {
		return widget.parent
	}
}

function show_calendar_widget(widget) {
	if (!document.getElementsByTagName) {
		return;
	}
	// find edit widget
	var edits = get_parent(widget).getElementsByTagName('input');
	if (edits.length > 1) {
		alert("More than one date edit field found within the enclosing element");
		return 0;
	} else if (edits.length == 0) {
		alert("No date edit field found within the enclosing element");
		return 0;
	}
	var date_edit = edits[0];
	// load date from edit widget
	var date = date_edit.value;
	// find/create calendar widget
	var calendar_widget = document.getElementById('calendar_widget');
	if (!calendar_widget) {
		calendar_widget = document.createElement('div');
		calendar_widget.id = 'calendar_widget';
		calendar_widget.className = 'calendar_widget';
		document.body.appendChild(calendar_widget);
		var iframe = document.createElement('iframe');
		iframe.id = 'calendar_widget_iframe';
		iframe.name = iframe.id;
		iframe.style.border = 'none';
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.src = 'calendar_widget.jsp';
		calendar_widget.appendChild(iframe);
	}
	// find lower edge of edit widget:
	pos = findPos(date_edit);
	if (date_edit.offsetHeight) {
		pos.top += date_edit.offsetHeight;
	} else {
		pos.top += date_edit.clientHeight;
	}
	// move calendar widget
	if (document.all) { // IE
		calendar_widget.style.posTop = pos.top;
		calendar_widget.style.posLeft = pos.left;
		calendar_widget.style.display = "block";
		// } else if (document.layers) {
		//  alert((pos.top + date_edit.clientHeight) + "px");
		//  calendar_widget.top = (pos.top + date_edit.clientHeight) + "px";
		//  calendar_widget.left = pos.left + "px";
	} else { // Mozilla
		calendar_widget.style.position = 'absolute';
		calendar_widget.style.top = pos.top + "px";
		calendar_widget.style.left = pos.left + "px";
		calendar_widget.style.display = "block";
	}
	// Now connect the current edit to the iframe:
	var iframeN = window.frames['calendar_widget_iframe'];
	iframeN.set_edit(date_edit);
}