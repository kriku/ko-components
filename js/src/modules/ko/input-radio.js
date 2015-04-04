/**
 * Created by gkrikun on 03.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'text!./templates/input-radio.html'], function(ko, htmlString) {
	function InputRadioModel (params) {
		var self = this;
		this.name = params.name;
		this.options = params.options;
		this.value = params.value;
		this.check = function () {
			self.value(this.value);
			return true;
		};
	}

	// Return component definition
	return { viewModel: InputRadioModel, template: htmlString };
});
