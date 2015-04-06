/**
 * Created by gkrikun on 03.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'utils', 'text!./templates/ko-form.html'],
function(ko, utils, htmlString) {

	var Input = function (params) {
		this.type = params.type;
		this.name = params.name;
		this.label = params.label;
		this.value = ko.observable(params.value);
		this.required = params.required;
		this.minLength = params.minLength;
		this.maxLength = params.maxLength;
		this.error = ko.observable(null);
	};

	var Check = function (params) {
		this.type = params.type;
		this.name = params.name;
		this.label = params.label;
		this.value = ko.observable(params.value);
		this.required = params.required;
	};

	var Radio = function (params) {
		this.type = params.type;
		this.name = params.name;
		this.label = params.label;
		this.options = params.options;
		this.value = ko.observable(params.value);
		this.inline = params.inline;
		this.required = params.required;
		this.error = ko.observable(null);
	;}

	var Select = function (params) {
		this.type = params.type;
		this.name = params.name;
		this.label = params.label;
		this.options = params.options;
		this.value = ko.observable(params.value);
		this.required = params.required;
		this.error = ko.observable(null);
	};

	function KoFormModel (params) {
		ko.components.register('input-text', { require: 'ko/input-text' });
		ko.components.register('input-num', { require: 'ko/input-num' });
		ko.components.register('input-check', { require: 'ko/input-check' });
		ko.components.register('input-radio', { require: 'ko/input-radio' });
		ko.components.register('input-select', { require: 'ko/input-select' });
		var self = this;

		this.action = params.action;
		this.form = params.form;
		this.method = params.method;
		this.data = params.data;
		this.reset = params.reset;
		this.submit = params.submit;

		this.fields = ko.observableArray([]);

		if (this.form instanceof Array) {
			this.bindFields();
		}

		if (typeof this.form === 'string') {
			this.getForm(this.form);
		}

		this.resetForm = function () {
			this.bindFields();
		};

		this.disabled = ko.computed(function () {
			// check for errors
			for (var i = 0, len = self.fields().length; i < len; i++) {
				if (typeof self.fields()[i].error == 'function') {
					if (self.fields()[i].error()) return true;
				}
			}
			return false;
		}, this);

		this.innerData = ko.computed(function () {
			return self.prepareForm(self.fields());
		}, this);

	}

	KoFormModel.prototype.getForm = function (url) {
		var self = this;
		var ajax = utils.Ajax();
		ajax.onreadystatechange = function () {
			if (ajax.readyState==4 && ajax.status==200)
			{
				self.form = JSON.parse(ajax.responseText);
				self.bindFields();
			}
		};
		ajax.open('GET', url, true);
		ajax.send();
	};


	KoFormModel.prototype.prepareForm = function (data) {
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

	KoFormModel.prototype.bindFields = function () {
		this.fields([]);
		var len = this.form.length;
		for (var i=0; i<len; i++) {
			switch (this.form[i].type) {
				case 'input-text':
				case 'input-num':
					this.fields.push(new Input({
						type: this.form[i].type,
						name: this.form[i].name,
						label: this.form[i].label,
						value: this.form[i].value,
						required: this.form[i].required,
						minLength: this.form[i].minLength,
						maxLength: this.form[i].maxLength
					}));
					break;
				case 'input-check':
					this.fields.push(new Check({
						type: this.form[i].type,
						name: this.form[i].name,
						label: this.form[i].label,
						value: this.form[i].value,
					}));
					break;
				case 'input-radio':
					this.fields.push(new Radio({
						type: this.form[i].type,
						name: this.form[i].name,
						label: this.form[i].label,
						inline: this.form[i].inline,
						options: this.form[i].options,
						value: this.form[i].value,
						required: this.form[i].required,
					}));
					break;
				case 'input-select':
					this.fields.push(new Select({
						type: this.form[i].type,
						name: this.form[i].name,
						label: this.form[i].label,
						options: this.form[i].options,
						value: this.form[i].value,
					}));
					break;
				default:
				break;
			}
		}
	}

	// Return component definition
	return { viewModel: KoFormModel, template: htmlString };
});