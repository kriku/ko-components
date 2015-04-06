/**
 * Created by gkrikun on 03.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'utils', 'text!./templates/input-check.html'], function(ko, utils, htmlString) {
	function inputTextModel (params) {
		this.name = params.name;
		this.label = params.label;
		this.value = params.value;
	}

	// Return component definition
	return { viewModel: inputTextModel, template: htmlString };
});
