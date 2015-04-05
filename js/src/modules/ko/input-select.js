/**
 * Created by gkrikun on 04.04.2015.
 */
// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['knockout', 'text!./templates/input-select.html'], function(ko, htmlString) {

//utils
  var map = function (arrayOfObjects) {
    var _result = [];
    for (var i=0, len=arrayOfObjects.length; i<len; i++) {
      _result.push(arrayOfObjects[i].value);
    }
    return _result;
  }
  var label = function (arrayOfObjects, value) {
    for (var i=0, len=arrayOfObjects.length; i<len; i++) {
      if (arrayOfObjects[i].value = value) return arrayOfObjects[i].label;
    }
  }
  function InputSelectModel (params) {
    var self = this;
    this.name = params.name;
    this.label = params.label;
    this.options = params.options;
    this.value = params.value;
    this.caption = params.caption;
    this.optionValues = ko.computed(function (){
      return map(self.options);
    }, this);
    this.optionLabels = function (value) {
      label(self.options, value);
    };
  }

  // Return component definition
  return { viewModel: InputSelectModel, template: htmlString };
});
