define(["knockout","text!./templates/input-text.html"],function(e,t){function r(t){var r=this;this.name=t.name,this.label=t.label,this.value=t.value,this.required=t.required,this.minLength=t.minLength,this.maxLength=t.maxLength,this.error=t.error,this.selfError=e.computed(function(){return r.error(""),r.required&&0===r.value().length&&r.error("Поле обязательное к заполнению"),r.value().length<r.minLength&&r.error("Минимальное количество символов - "+r.minLength),r.error()},this)}return{viewModel:r,template:t}});