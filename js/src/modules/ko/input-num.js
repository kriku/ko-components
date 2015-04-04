/**
 * Created by gkrikun on 03.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'utils', 'text!./templates/input-num.html'], function(ko, utils, htmlString) {
	function InputNumModel (params) {
		var self = this;
		this.name = params.name;
		this.label = params.label;
		this.value = params.value;
		this.required = params.required;
		this.minLength = params.minLength;
		this.maxLength = params.maxLength;
		this.error = params.error;
		this.increment = function () {
			var _value = parseInt(self.value(), 10);
			self.value(isNaN(_value)? 0 : _value + 1);
		};
		this.decrement = function () {
			var _value = parseInt(self.value(), 10);
			self.value(isNaN(_value)? 0 : _value - 1);
		};
		this.check = function (data, event) {
			event = utils.events.getEvent(event);
			var charCode = utils.events.getCharCode(event);
			if (!(/\d/.test(String.fromCharCode(charCode)))) {
				utils.events.preventDefault(event);
			}
			return true;
		};
		this.selfError = ko.computed(function () {
			self.error('');
			if (self.required && self.value().length === 0 ) {
				self.error('Require field');
			}
			if (self.value().length < self.minLength) {
				self.error('Minimum length - ' + self.minLength);
			}
			return self.error();
		}, this);
	}

	// Return component definition
	return { viewModel: InputNumModel, template: htmlString };
});
