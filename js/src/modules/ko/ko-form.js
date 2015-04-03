/**
 * Created by gkrikun on 03.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'text!./templates/ko-form.html'], function(ko, htmlString) {
	var Input = function (params) {
		this.type = params.type;
		this.name = params.name;
		this.label = params.label;
		this.value = ko.observable(params.value);
		this.minLength = params.minLength;
		this.required = params.required;
		this.maxLength = params.maxLength;
		this.error = ko.observable(null);
	};

	function inputTextModel (params) {
		ko.components.register('input-text', { require: 'ko/input-text' });
		ko.components.register('input-num', { require: 'ko/input-num' });
		var self = this;
		this.action = params.action;
		this.form = params.form;
		this.method = params.method;
		this.data = params.data;
		this.fields = ko.observableArray([]);
		var len = this.form.length;
		for (var i=0; i<len; i++) {
			this.fields.push(new Input({
				type: this.form[i].type,
				name: this.form[i].name,
				label: this.form[i].label,
				value: this.form[i].value,
				required: this.form[i].required,
				minLength: this.form[i].minLength,
				maxLength: this.form[i].maxLength
			}));
		}
		this.disabled = ko.computed(function () {
			for (var i = 0, len = self.fields().length; i < len; i++) {
				if (self.fields()[i].error()) return true;
			}
			return false;
		}, this);
		this.innerData = ko.computed(function () {
			return this.prepareForm(self.fields());
		}, this) ;

	}

	inputTextModel.prototype.prepareForm = function (data) {
		var result = {};
		for (var i = 0, len = data.length; i<len; i++) {
			if (!result.hasOwnProperty(this.fields()[i].name)) {
				result[data[i].name] = data[i].value;
			} else {
				if (result[data[i].name] instanceof Array) {
					result[data[i].name].push(data[i].value);
				} else {
					result[data[i].name] = new Array(result[data[i].name]);
					result[data[i].name].push(data[i].value);
				}
			}
		}
		this.data(result);
		return result;
	};

	// Return component definition
	return { viewModel: inputTextModel, template: htmlString };
});