+function(t){"use strict";function s(e,o){var i,r=t.proxy(this.process,this);this.$element=t(t(e).is("body")?window:e),this.$body=t("body"),this.$scrollElement=this.$element.on("scroll.bs.scrollspy",r),this.options=t.extend({},s.DEFAULTS,o),this.selector=(this.options.target||(i=t(e).attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=t([]),this.targets=t([]),this.activeTarget=null,this.refresh(),this.process()}s.DEFAULTS={offset:80},s.prototype.refresh=function(){var s=this.$element[0]==window?"offset":"position";this.offsets=t([]),this.targets=t([]);var e=this;this.$body.find(this.selector).map(function(){var o=t(this),i=o.data("target")||o.attr("href"),r=/^#./.test(i)&&t(i);return r&&r.length&&r.is(":visible")&&[[r[s]().top+(!t.isWindow(e.$scrollElement.get(0))&&e.$scrollElement.scrollTop()),i]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},s.prototype.process=function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,e=this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight),o=(e-this.$scrollElement.height(),this.offsets),i=this.targets,r=this.activeTarget;if(r&&s<=o[0])return r!=(t=i[0])&&this.activate(t);for(t=o.length;t--;)r!=i[t]&&s>=o[t]&&(!o[t+1]||s<=o[t+1])&&this.activate(i[t])},s.prototype.activate=function(s){this.activeTarget=s,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var e=this.selector+'[data-target="'+s+'"],'+this.selector+'[href="'+s+'"]',o=t(e).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")};var e=t.fn.scrollspy;t.fn.scrollspy=function(e){return this.each(function(){var o=t(this),i=o.data("bs.scrollspy"),r="object"==typeof e&&e;i||o.data("bs.scrollspy",i=new s(this,r)),"string"==typeof e&&i[e]()})},t.fn.scrollspy.Constructor=s,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=e,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var s=t(this);s.scrollspy(s.data())})})}(jQuery);