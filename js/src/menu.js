
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

console.log(hljs);
	hljs.initHighlighting();
});