/**
 * Created by gkrikun on 25.03.2015.
 */
(function (root){
	'use strict';
	var EditableTable = function(el, data) {
		var that = this;
		this.models = [];
		this.el = el;
		this.data = data;
		this.init();
		EventUtil.addHandler(this.el, 'click', function (event) {
			var target = EventUtil.getTarget(EventUtil.getEvent(event));
			console.log(target);
		});
	};

	EditableTable.prototype.edit = function() {

	};

	EditableTable.prototype.init = function() {
		var i = 0, len = this.data.length;
		var currentData = {};
		var resultHtml = '';
		for (i=0; i<len; i++) {
			currentData = this.data[i];
			resultHtml += '<tr><td>' + currentData.label + '</td>';
			//console.log(typeof currentData.value);
			if (typeof currentData.value == 'string') {
				resultHtml += '<td>';
				resultHtml += '<span>'+ currentData.value + '</span>';
				resultHtml += '<input type="text" value="' + currentData.value + '" name="' + currentData.name + '"></input>';
				resultHtml += '</td>';
			} else {
				resultHtml += '<td>';
				if (currentData.value.length) {
					var lastItem = currentData.value[currentData.value.length-1];
					if (lastItem.current) {
						lastItem = currentData.value.pop();
						resultHtml += '<span>' + lastItem.current.name + '</span>';
					}
					resultHtml += '<select name="' + currentData.name + '">';
					for (var j=0, lenSelect = currentData.value.length; j<lenSelect; j++ ) {
						resultHtml += '<option value="' + currentData.value[j].value + '"';
						if (lastItem.current) {
							resultHtml += (currentData.value[j].value == lastItem.current.value)? ' selected="selected"' : '';
						}
						resultHtml += '">' + currentData.value[j].name + '</option>';
					}
					resultHtml += '</select>';
				}
				resultHtml += '</td>';
			}
			resultHtml += '</tr>';
		}
		console.log(resultHtml);
		this.el.innerHTML = resultHtml;
	};

	root.EditableTable = EditableTable;
})(this);