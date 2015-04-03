/**
 * Created by gkrikun on 01.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'text!./templates/input-text.html'], function(ko, htmlString) {
	function inputTextModel (params) {
		var self = this;
		this.name = params.name;
		this.label = params.label;
		this.value = params.value;
		this.required = params.required;
		this.minLength = params.minLength;
		this.maxLength = params.maxLength;
		this.error = params.error;
		this.selfError = ko.computed(function () {
			self.error('');
			if (self.required && self.value().length === 0 ) {
				self.error('Поле обязательное к заполнению');
			}
			if (self.value().length < self.minLength) {
				self.error('Минимальное количество символов - ' + self.minLength);
			}
			return self.error();
		}, this);
	}

	// Return component definition
	return { viewModel: inputTextModel, template: htmlString };
});