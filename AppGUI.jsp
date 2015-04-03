<%--
  Created by IntelliJ IDEA.
  User: gkrikun
  Date: 24.03.2015
  Time: 11:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="windows-1251" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>

<html:html>
<head>
	<title>GUI</title>
	<jsp:include page="Head.jsp"/>
	<script data-main="js/dist/main" src="js/require.js"></script>
</head>
<body>
<jsp:include page="NewHeader.jsp"/>

<div id="mainMenu" class="nav-side left-menu hidden-xs hidden-sm">
	<div class="container-fluid">
		<div class="row" id="scrollspy">
			<ul class="nav">
				<li><a href="#typography">Типографика</a>
				<li><a href="#koInputText">KO - Input Text</a>
			</ul>
		</div>
	</div>
</div>

<div id="mainContainer">
	<div id="typography" class="area">
		<div class="container-fluid">
			<div class="page-header">
				<p class="lead">Типографика</p>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<h1>H1 header</h1>
					<h2>H2 header</h2>
					<h3>H3 header</h3>
					<h4>H4 header</h4>
					<h5>H5 header</h5>
					<h6>H6 header</h6>
				</div>
				<div class="col-sm-6">
					<p class="lead">Paragraph lead</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam animi at aut cum dignissimos earum ex illo itaque laudantium pariatur perferendis praesentium quae qui quibusdam, sapiente sunt tempora tenetur?
					</p>
					<span class="text-success">Text success</span><br/>
					<span class="text-info">Text info</span><br/>
					<span class="text-warning">Text warning</span><br/>
					<span class="text-danger">Text danger</span><br/>
				</div>
			</div>
		</div>
	</div>
	<div id="koInputText" class="area">
		<div class="container-fluid">
			<p class="page-header lead">Knockout components</p>
			<p class="lead small">ko-form</p>
			<div class="row">
				<div class="col-md-4">
					<div data-bind='component: {
						name: "ko-form",
						params: {
							form: formSrc,
							action: "some-action",
							method: "post",
							data: data
						}
					}'></div>
				</div>
				<div class="col-md-4">
					Form data
					<pre data-bind="text: ko.toJSON($root.data, null, 2)"></pre>
					Form source
					<pre data-bind="text: ko.toJSON($root.formSrc, null, 2)"></pre>
				</div>
				<div class="col-md-4">
					Model
					<pre data-bind="text: ko.toJSON($root, null, 2)"></pre>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	require(['main'], function() {
		// Configuration loaded now, safe to do other require calls
		// that depend on that config.
		require(['knockout'], function(ko) {
//			var Input = function (params) {
//				this.type = params.type;
//				this.name = params.name;
//				this.label = params.label;
//				this.value = ko.observable(params.value);
//				this.minLength = params.minLength;
//				this.required = params.required;
//				this.maxLength = params.maxLength;
//				this.error = ko.observable(null);
//			};

			var _form = [
				{
					type: 'input-text',
					name: 'firstName',
					label: 'First name',
					value: '',
					minLength: 5,
					required: true
				},
				{
					type: 'input-text',
					name: 'secondName',
					label: 'Second name',
					value: '',
					required: true
				},
				{
					type: 'input-text',
					name: 'age',
					label: 'Age 1',
					value: '1'
				},
				{
					type: 'input-num',
					name: 'age',
					label: 'Age 2',
					value: '2',
					required: true
				},
				{
					type: 'input-num',
					name: 'age',
					label: 'Age 3',
					value: '3',
					required: true
				}
			];

			var Model = function () {
				var self = this;
				this.fields = ko.observableArray([]);
				this.formSrc = _form;
				this.data = ko.observable();
//				var len = _form.length;
//				for (var i=0; i<len; i++) {
//					this.fields.push(new Input({
//						type: _form[i].type,
//						name: _form[i].name,
//						label: _form[i].label,
//						value: _form[i].value,
//						required: _form[i].required,
//						minLength: _form[i].minLength,
//						maxLength: _form[i].maxLength
//					}));
//				}
//				this.form = ko.computed(function () {
//					var result = {};
//					for (var i = 0, len = self.fields().length; i<len; i++) {
//						if (!result.hasOwnProperty(self.fields()[i].name)) {
//							result[self.fields()[i].name] = self.fields()[i].value;
//						} else {
//							if (result[self.fields()[i].name] instanceof Array) {
//								result[self.fields()[i].name].push(self.fields()[i].value);
//							} else {
//								result[self.fields()[i].name] = new Array(result[self.fields()[i].name]);
//								result[self.fields()[i].name].push(self.fields()[i].value);
//							}
//						}
//					}
//					return result;
//				}, this);
			};

			ko.components.register('ko-form', { require: 'ko/ko-form' });
//			ko.components.register('input-text', { require: 'ko/input-text' });
			var model = new Model();
			ko.applyBindings(model);
		});
	});

</script>

<jsp:include page="NewFooter.jsp"/>
<%--<script src="js/jquery-1.11.1.min.js"></script>--%>
<%--<script src="js/bootstrap.min.js"></script>--%>
</body>
</html:html>
