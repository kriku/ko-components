define(["knockout","text!./templates/input-text.html"],function(e,t){function n(t){var n=this;this.name=t.name,this.label=t.label,this.value=t.value,this.required=t.required,this.minLength=t.minLength,this.maxLength=t.maxLength,this.error=t.error,this.selfError=e.computed(function(){return n.error(""),n.required&&n.value().length===0&&n.error("Required field"),n.value().length<n.minLength&&n.error("Minimum length - "+n.minLength),n.error()},this)}return{viewModel:n,template:t}});