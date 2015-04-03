define(['utils'], function (utils) {
	var _borderDiff = 5;

	var Navbar = function (el, ctrl, position) {
		this.el = el;
		this.ctrl = ctrl;
		this.height = this.ctrl.clientHeight;
		this.ul = el.getElementsByTagName('UL')[0];
		this.lis = this.ul.getElementsByTagName('LI');
		this.ulhide = document.createElement('UL');
		this.ulhide.className = 'hide-menu clearfix';
		this.el.appendChild(this.ulhide);
		this.isOpen = false;
		this.justNow = false;
		this.className = 'fa fa-bars';
		this.init();
		this.show();
		if (position) {
			this.fixedTop(position);
		}
	};

	Navbar.prototype.changeIcon = function (el) {
		el.className = (this.isOpen) ? 'fa fa-close' : this.className;
	};

	Navbar.prototype.shift = function () {
		var tempLi = null;
		if ((this.ulhide.childNodes.length > 0) && (this.ul.clientHeight <= this.height + _borderDiff)) {
			while (this.ulhide.firstChild) {
				tempLi = this.ulhide.removeChild(this.ulhide.firstChild);
				this.ul.appendChild(tempLi);
			}
		}
		while (this.ul.clientHeight > this.height + _borderDiff) {
			tempLi = this.ul.removeChild(this.lis[this.lis.length - 1]);
			this.ulhide.insertBefore(tempLi, this.ulhide.firstChild);
		}
	};

	Navbar.prototype.show = function () {
		this.shift();
		if (this.ulhide.childNodes.length > 0) {
			utils.classie.remove(this.ctrl, 'hidden');
		} else {
			utils.classie.add(this.ctrl, 'hidden');
		}
	};

	Navbar.prototype.open = function () {
		utils.classie.add(this.el, 'show-full');
		this.isOpen = true;
		this.changeIcon(this.ctrl.getElementsByTagName('I')[0]);
	};

	Navbar.prototype.close = function () {
		utils.classie.remove(this.el, 'show-full');
		this.isOpen = false;
		this.changeIcon(this.ctrl.getElementsByTagName('I')[0]);
	};

	Navbar.prototype.init = function () {
		var that = this;

		utils.events.addHandler(that.ctrl, 'click', function () {
			if (that.isOpen) {
				that.close();
			} else {
				that.open();
			}
			that.justNow = true;
		}, true);
		utils.events.addHandler(window, 'resize', function () { that.show(); });
		utils.events.addHandler(window.document, 'click', function () {
			if (!that.justNow&&that.isOpen) {
				that.close();
			}
			that.justNow = false;
		}, false);
		utils.events.addHandler(window.document, 'load', function () {
			that.show();
		}, true);
	};

	Navbar.prototype.fixedTop = function (position) {
		var that = this,
			fixed = false;
		utils.events.addHandler(window, 'scroll', function () {
			var y = utils.Scroll.y();
			if (y > position) {
				if (!fixed) {
					utils.classie.add(that.el, 'fixed-top');
					fixed = true;
				}
			} else {
				if (fixed) {
					utils.classie.remove(that.el, 'fixed-top');
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

	// transport
	return {
		Sidebar: Sidebar,
		Navbar: Navbar
	};
});


