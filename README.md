# Knockout Component with RequireJS

Based on this documentation

http://knockoutjs.com/documentation/component-overview.html

My reaction to angular formly.

I think it will be nice, generate forms from json declaration.
With different kind of elements and options like:

```
[
  {
  	type: 'input-text',
  	name: 'firstName',
  	label: 'First name',
  	value: 'Default name (or current)',
  	minLength: 5,
  	required: true
  },
  {
  	type: 'input-text',
  	name: 'secondName',
  	label: 'Second name',
  	value: 'Past from server',
  	required: true
  },
  {
  	type: 'input-text',
  	name: 'age',
  	label: 'Age',
  	value: '18'
  },
  {
  	type: 'input-num',
  	name: 'age',
  	label: 'Age 2 (can have multiply fields)',
  	value: '2'
  },
  {
  	type: 'input-num',
  	name: 'age',
  	label: 'Age 3 (for one name)',
  	value: '3'
  }
]
```

and bind like

```
	<div data-bind='component: {
		name: "ko-form",
		params: {
			form: formSrc,
			action: "some-action",
			method: "post",
			data: data
		}
	}'></div>
```

or `<ko-form params='...`
or another way

###So I build this structure :

```
├── js/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── ko/
│   │   │   │   ├── templates
│   │   │   │   |   ├── templates.html (equal component name)
│   │   │   │   |   ├── ko-form.html
│   │   │   │   |   ├── input-text.html
│   │   │   │   |   ├── ...
│   │   │   |   ├── ko-form.js
│   │   │   |   ├── input-text.js
│   │   │   |   ├── ...
│   │   │   |   ├── in this dir place ko-components
│   │   |   ├── ...
│   │   |   ├── place for another modules
│   │   ├── knockout.js
│   │   ├── main.js
│   ├── dist/
│   │   ├── modules/
│   │   │   ├── ko/
│   │   │   │   ├── templates
│   │   │   │   |   ├── todo: concat templates with components
│   │   │   │   |   ├── ko-form.html
│   │   │   │   |   ├── input-text.html
│   │   │   │   |   ├── ...
│   │   │   |   ├── ko-form.js
│   │   │   |   ├── input-text.js
│   │   │   |   ├── ...
│   │   │   |   ├── distributed components
│   │   |   ├── ...
│   │   |   ├── place for another modules
│   │   ├── knockout.js
│   │   ├── main.js
```

and write gulp tasks for distribution modules... but on coffee-script

###Install with

`npm install`

###Start with

`gulp`

(default task start gulp-connect and livereload server)
