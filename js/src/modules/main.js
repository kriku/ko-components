require.config({
	baseUrl: 'js/src/modules',
	paths: {
		knockout: '../knockout'
	}
});
require(['bars', 'utils', 'knockout', 'highlight.pack'], function (bars, utils, ko, hljs) {

	// init on standard ids
	var mainNav = document.getElementById('mainNav'),
		mainNavCtrl = document.getElementById('mainNavCtrl');

	var mainMenu = document.getElementById('mainMenu'),
		mainContainer = document.getElementById('mainContainer');

	if ( mainNav && mainNavCtrl ) {
		var mainNavbar = new bars.Navbar(mainNav, mainNavCtrl, 87);
	}

	if ( mainMenu ) {
		var sidebar = new bars.Sidebar(mainMenu, 87);
	}

	if ( mainMenu && mainContainer ) {
		//mapping animate scroll function
		utils.events.addHandler(mainMenu, 'click', function () {
			var event = utils.events.getEvent(event);
			var target = utils.events.getTarget(event);
			var href = target.getAttribute('href');
			if (href.charAt(0) === '#') {
				utils.events.preventDefault(event);
				var goTo = document.getElementById(href.substr(1));
				if (goTo) {
					utils.animateScroll( utils.getLocation(goTo), 100, function () {
						location.href = href;
					});
				}
			}
		});
	}
	hljs.initHighlighting();

	var FormModel = function () {
		var self = this;
		this.formData = ko.observable();
	};

	ko.components.register('ko-form', { require: 'ko/ko-form' });

	var formModel = new FormModel();

	function htmlEscape (text) {
		return text.replace(/[<>"&]/g, function(match, pos, originalText) {
			switch (match) {
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case "&":
					return "&amp;";
				case "\"":
					return "&quot;";
			}
	 });
	}

	ko.bindingHandlers.highlight = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var value = ko.unwrap(valueAccessor());
			if (typeof value === 'string') {
					var ajax = new utils.Ajax();
					ajax.onreadystatechange = function () {
						if (ajax.readyState==4 && ajax.status==200)
						{
							element.innerHTML = htmlEscape(ajax.responseText);
							hljs.highlightBlock(element);
						}
					};
					ajax.open('GET', value, true);
					ajax.send();
			}
		},
		update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var value = ko.unwrap(valueAccessor());
			value = (value)? htmlEscape(value) : '';
			element.innerHTML = value;
			hljs.highlightBlock(element);
		}
	};

	ko.applyBindings(formModel);
});