(function(e){var t=function(e){this.table=e,this.ctrl=e.getElementsByTagName("INPUT")[0],this.attachCtrl(),this.attachLines()};t.prototype.attachLines=function(){var e=this;EventUtil.addHandler(this.table,"click",function(){var t=EventUtil.getEvent(t),n=EventUtil.getTarget(t);if(n.tagName==="TD"||n.tagName==="INPUT"){var r=n.parentNode.getElementsByTagName("INPUT")[0];n.tagName!=="INPUT"&&(r.checked=!r.checked)}e.selectLine(n.parentNode,r),EventUtil.stopPropagation(t),e.ctrl.checked&&(e.ctrl.checked=!1)})},t.prototype.attachCtrl=function(){var e=this,t=this.ctrl,n=e.table.getElementsByTagName("TR");EventUtil.addHandler(this.ctrl,"click",function(){var r=EventUtil.getEvent(r),i,s,o,u=n.length;for(o=1;o<u;o++)s=n[o],i=s.getElementsByTagName("INPUT")[0],i.checked=t.checked,e.selectLine(s,i);EventUtil.stopPropagation(r)})},t.prototype.selectLine=function(e,t){classie.has(e,"active")||classie.has(e,"warning")?t.checked?classie.change(e,"warning","active"):classie.change(e,"active","warning"):t.checked?classie.add(e,"info"):classie.remove(e,"info")},e.SelectableTable=t})(window);