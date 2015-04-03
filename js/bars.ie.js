(function (window, classie) {

	var Navbar = function (el, ctrl, position) {
		this.el = el;
		this.ctrl = ctrl;
		this.ul = el.getElementsByTagName('UL')[0];
		this.open = false;
		if (!classie.has(this.ul,'show-full')) {
			classie.add(this.ul, 'show-full');
			this.open = true;
		}
		this.className = 'fa fa-bars';
		this.init();
		this.show();
		if (position) {
			this.fixedTop(position);
		}
	};

	Navbar.prototype.changeIcon = function (el) {
		el.className = (this.open) ? 'fa fa-close' : this.className;
	};

	Navbar.prototype.show = function () {
		if (!this.open) {
			if (this.el.clientHeight - this.ul.clientHeight < -10) {
				classie.remove(this.ctrl, 'hidden');
			} else {
				classie.add(this.ctrl, 'hidden');
			}
		}
	};

	Navbar.prototype.init = function () {
		var that = this;

		onEvent(that.ctrl, 'click', function () {
			classie.toggle(that.el, 'show-full');
			that.open = !that.open;
			that.changeIcon(that.ctrl.getElementsByTagName('I')[0]);
		});
		onEvent(window, 'resize', function () {
			that.show();
		});
	};

	Navbar.prototype.fixedTop = function (position) {
		var that = this,
			fixed = false;
		onEvent(window, 'scroll', function () {
			var y = Scroll.y();
			if (y > position) {
				if (!fixed) {
					classie.add(that.el, 'fixed-top');
					fixed = true;
				}
			} else {
				if (fixed) {
					classie.remove(that.el, 'fixed-top');
					fixed = false;
				}
			}
		});
	};

	var Sidebar = function (el, position) {
		this.el = el;
		if (position) {
			this.fixedTop(position);
		}
	};

	Sidebar.prototype.fixedTop = Navbar.prototype.fixedTop;

	var bars = {
		Sidebar: Sidebar,
		Navbar: Navbar
	};

// transport
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(bars);
	} else {
		// browser global
		window.bars = bars;
	}


})(window, window.classie);

// init

var mainNav = document.getElementById('mainNav'),
	mainNavCtrl = document.getElementById('mainNavCtrl');

var mainMenu = document.getElementById('mainMenu'),
	mainContainer = document.getElementById('mainContainer');

var mainNavbar, sidebar, anchors, anchor,target;

// var sizing = function (pushEl, popEl) {
// 	console.log("pushEl.clientWidth : ", pushEl.clientWidth);
// 	if ( Size.w() - pushEl.clientWidth > 600 ) {
// 		popEl.style.marginLeft = pushEl.clientWidth + 20;
// 		pushEl.style.left = 0;
// 	} else {
// 		popEl.style.marginLeft = null;
// 		pushEl.style.left = null;
// 	}
// };

if ( mainNav && mainNavCtrl ) {
	mainNavbar = new bars.Navbar( mainNav, mainNavCtrl, 0 );
}

if ( mainMenu ) {
	sidebar = new bars.Sidebar( mainMenu, 0 );
}

if ( mainMenu && mainContainer ) {
	// sizing(mainMenu, mainContainer);
	// onEvent(window, 'resize', function () {	sizing(mainMenu, mainContainer) });
	// onEvent(window, 'load', function () { sizing(mainMenu, mainContainer) });

	//mapping animate scroll function
	anchors = mainMenu.getElementsByTagName('A');
	for (var i = anchors.length; i; i--) {
		anchor = anchors[i-1];
		target = anchor.getAttribute('href');
		if ( target.charAt(0) === "#" ) {
			(function ( toEl ) {
				onEvent(anchor, 'click', function (event) {
					if (event.preventDefault) {
						event.preventDefault();
						animateScroll( getLocation(document.getElementById( toEl )), 100, function () {
							location.href = '#' + toEl;
						});
					}
				});
			})( target.substr(1) );
		}
	}
}

