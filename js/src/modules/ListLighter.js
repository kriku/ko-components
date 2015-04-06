/**
 * Created by gkrikun on 01.04.2015.
 */
(function (window) {

	function loadStyleString (css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		try {
			style.appendChild(document.createTextNode(css));
		} catch (ex) {
			style.styleSheet.cssText = css;
		}
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(style);
	}

	var ListLighter = function (el) {
		if (el) {
			this.el = el;
			this.init();
		}
	};

	ListLighter.prototype.max = 40;

	ListLighter.prototype.toggle = function(index) {
		classie.toggle(this.el, 'light-' + index);
	};

	ListLighter.prototype.init = function() {
		var that = this;
		EventUtil.addHandler(this.el, 'click', function () {
			var event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			while (target.tagName !== 'DIV') {
				target = target.parentNode;
			}
			var code = target.getElementsByTagName('CODE')[0];
			console.log(code);
			that.toggle(code.innerHTML);
		});
		this.addStyles();
	};

	ListLighter.prototype.addStyles = function () {
		var styleSelector = '';
		for (var i=1; i<=this.max; i++) {
			styleSelector += '.light-' + i + ' .item-' + i + '>span';
			styleSelector += (i==this.max)? ' ' : ',';
		}
		loadStyleString( styleSelector + '{background: #FFF9C4!important;}' );
	};

	//transport
	window.ListLighter = ListLighter;

})(window);