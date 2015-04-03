/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )

 * classie.change( elem, 'old-class', 'new-class' )

 expand by kriku

 + Ajax

 + onEvent

 + window.Size { w: function () { return widnow width }, h: function () { return window height } }

 + window.Scroll { x: function () { return widnow scroll x }, y: function () { return window scroll y } }

 + setLimit(function () {}, n) - limit the rate at which this function can be called to n times in second
 // if n equal zero function will start just one time

 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg(className) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ('classList' in document.documentElement) {
		hasClass = function (elem, c) {
			return elem.classList.contains(c);
		};
		addClass = function (elem, c) {
			elem.classList.add(c);
		};
		removeClass = function (elem, c) {
			elem.classList.remove(c);
		};
	}
	else {
		hasClass = function (elem, c) {
			return classReg(c).test(elem.className);
		};
		addClass = function (elem, c) {
			if (!hasClass(elem, c)) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function (elem, c) {
			elem.className = elem.className.replace(classReg(c), ' ');
		};
	}

	var toggleClass = function (elem, c) {
		var fn = hasClass(elem, c) ? removeClass : addClass;
		fn(elem, c);
	};

	var changeClass = function (elem, c1, c2) {
		removeClass(elem, c1);
		addClass(elem, c2);
	};

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		changeClass: changeClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass,
		change: changeClass
	};

	// XMLHttpRequest
	// http://en.wikipedia.org/wiki/XMLHttpRequest
	var Ajax = function () {
		if (typeof XMLHttpRequest === 'undefined') {
			XMLHttpRequest = function () {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.6.0");
				}
				catch (e) {
				}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.3.0");
				}
				catch (e) {
				}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
				}
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {
				}
				throw new Error("This browser does not support XMLHttpRequest.");
			};
		}
		return new XMLHttpRequest();
	};

	/**
	 * Cross-Browser Event Handlers
	 * all in one function (detach can be something like 'detach')
	 */

	var onEvent = function (el, ev, fn, capturing, detach) {
		if (!detach) {
			if (el) {
				if (el.addEventListener) {
					el.addEventListener(ev, fn, capturing);
				} else {
					if (el.attachEvent) {
						el.attachEvent('on' + ev, fn);
					} else {
						el['on' + ev] = fn;
					}
				}
			}
		} else {
			if (el) {
				if (el.removeEventListener) {
					el.removeEventListener(ev, fn, capturing);
				} else {
					if (el.detachEvent) {
						el.detachEvent('on' + ev, fn);
					} else {
						el['on' + ev] = null;
					}
				}
			}
		}
	};


	/**
	 * Return actual size of window
	 * @object {w(), h()}
	 * @returns {Number}
	 * @returns {Number}
	 */


	var Size = {
		w: function () {
			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		},
		h: function () {
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		}
	};

	var getLocation = function (el) {
		var location = 0;
		if (el.offsetParent) {
			do {
				location += el.offsetTop;
				el = el.offsetParent;
			} while (el);
		}
		return location;
	};

	/**
	 * Calculate how far to scroll
	 * @private
	 * @param {Element} anchor The anchor element to scroll to
	 * @param {Number} headerHeight Height of a fixed header, if any
	 * @param {Number} offset Number of pixels by which to offset scroll
	 * @returns {Number}
	 */

	var Scroll = {
		y: function () {
			return window.pageYOffset || window.document.documentElement.scrollTop
		},
		x: function () {
			return window.pageXOffset || window.document.documentElement.scrollLeft
		}
	};

	var setLimit = function (fn, n) {
		var locked = false;
		return function () {
			if (locked) return;
			fn.apply(this, arguments);
			locked = true;
			n && setTimeout(function () {
				locked = false
			}, 1000 / n); //escape division by zero
		}
	};

	/**
	 * Animated scroll function
	 * @param {Number} endLocation
	 * @param {Number} time
	 * @param {Function} callback
	 */

	var animateScroll = function (endLocation, time, callback) {
		var animationInterval = null,
				timeLapsed = 0,
				startLocation = Scroll.y(),
				distance = endLocation - startLocation;

		var stopAnimateScroll = function (position, endLocation, animationInterval) {
			var currentLocation = Scroll.y();
			if (position == endLocation || currentLocation == endLocation) {
				clearInterval(animationInterval);
				callback();
			}
		};

		/**
		 * Loop scrolling animation
		 * @private
		 */
		var percentage;

		var loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / time );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			// EasyInOut, cubic
			percentage = percentage < 0.5 ? 2 * percentage * percentage : -1 + (4 - 2 * percentage) * percentage;
			var position = Math.floor(startLocation + ( distance * percentage ));
			window.scrollTo(0, position);
			stopAnimateScroll(position, endLocation, animationInterval);
		};

		percentage = null;

		/**
		 * Set interval timer
		 * @private
		 */
		var startAnimateScroll = function () {
			animationInterval = setInterval(loopAnimateScroll, 16);
		};

		/**
		 * Reset position to fix weird iOS bug
		 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
		 */
		if (window.pageYOffset === 0) {
			window.scrollTo(0, 0);
		}

		// Start scrolling animation

		startAnimateScroll();
	};


	var delConfirm = function (text, value, action, key, keyId) {
		if (confirm(text + (value == "" ? "" : (" '" + value + "'")) + " ?")) {
			if (key == null) {
				key = value;
			}
			if (keyId == null) {
				keyId = "del";
			}
			location.href = action + ".do?" + keyId + "=" + key;
		}
	};

	var delConfirm2 = function (text, value, action, key, specialKey, specialParam) {
		if (confirm(text + (value == "" ? "" : (" '" + value + "'")) + " ?")) {
			if (key == null) {
				key = value;
			}
			location.href = action + ".do?del" + specialKey + "=" + key + "&" + specialParam;
		}
	};

	var getElementTop = function (element) {
		var actualTop = element.offsetTop;
		var current = element.offsetParent;

		while (current !== null){
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}

		return actualTop;
	};

	var _watchResize = false;
	var resizeIframe = function (iframe) {
		var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		var docHeight = null;
		if (!_watchResize) {
			iframe.height = 0;
			docHeight = iframeDoc.documentElement.scrollHeight;
			iframeDoc.documentElement.style.overflowY = "hidden";
			iframe.height = docHeight + "px";
			onEvent(window, 'resize', function () {
				resizeIframe(iframe);
			});
			_watchResize = true;
		}
		docHeight =  docHeight || iframeDoc.documentElement.scrollHeight;
		var diffHeight = docHeight - iframeDoc.documentElement.clientHeight;
		if (diffHeight) {
			docHeight += diffHeight;
			iframe.height = docHeight + "px";
		}
	};

	var openIframeInNewWindow = function (iframeId) {
		window.open(document.getElementById(iframeId).src);
	};

	function clearForm(pageUrl) {
		document.location.href = './' + pageUrl + '?clearForm=true';
		return true;
	}

	var submitted = false;
	function lockForm() {
		if (!submitted) {
			submitted = true;
			return true;
		}
		alert('Пожалуйста подождите, Ваш запрос выполняется.');
		return false;
	}

	// Cross Browser Event Utility
	// Nicholas Zakas, Professional JavaScript for Web Developers p.441
	var EventUtil = {
		addHandler: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getEvent: function (event) {
			return event ? event : window.event;
		},
		getTarget: function (event) {
			return event.target || event.srcElement;
		},
		preventDefault: function (event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else { event.returnValue = false; }
		},
		removeHandler: function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else { element["on" + type] = null; }
		},
		stopPropagation: function (event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else { event.cancelBubble = true; }
		},
		getCharCode: function (event) {
			if (typeof event.charCode == 'number') {
				return event.charCode;
			} else {
				return event.keyCode;
			}
		}
	};

	// transport
	if (typeof define === 'function' && define.amd) {
		// AMD
		var utils = {
			classie: classie,
			Ajax: Ajax,
			onEvent: onEvent,
			Size: Size,
			Scroll: Scroll,
			setLimit: setLimit,
			delConfirm: delConfirm,
			delConfirm2: delConfirm2,
			resizeIframe: resizeIframe,
			getLocation: getLocation,
			animateScroll: animateScroll,
			clearForm: clearForm,
			lockForm: lockForm,
			getElementTop: getElementTop,
			events: EventUtil
		};
		define(utils);

	} else {
		// browser global
		window.classie = window.classie || classie;
		window.Ajax = window.Ajax || Ajax;
		window.Size = window.Size || Size;
		window.Scroll = window.Scroll || Scroll;
		window.setLimit = window.setLimit || setLimit;
		window.onEvent = window.onEvent || onEvent;
		window.delConfirm = window.delConfirm || delConfirm;
		window.delConfirm2 = window.delConfirm2 || delConfirm2;
		window.resizeIframe = window.resizeIframe || resizeIframe;
		window.openIframeInNewWindow = window.openIframeInNewWindow || openIframeInNewWindow;
		window.getLocation = window.getLocation || getLocation;
		window.animateScroll = window.animateScroll || animateScroll;
		window.clearForm = window.clearForm || clearForm;
		window.lockForm = window.lockForm || lockForm;
		window.getElementTop = window.getElementTop || getElementTop;
		window.EventUtil = window.EventUtil || EventUtil;
	}

})(window);
