gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
convert = require 'gulp-convert-encoding'
rjs = require 'gulp-requirejs'
header = require 'gulp-header'

#By default load any module IDs from js/dist/modules
#except, if the module ID starts with "knockout",
#load it from the ../ directory. paths
#config is relative to the baseUrl, and
#never includes a ".js" extension since
#the paths config could be for a directory.
config = (mode) ->
	"""
	require.config({
		baseUrl: 'js/#{mode}/modules',
		paths: {
			knockout: '../knockout'
		}
	});
	"""

paths = {
	js: {
		src: '../web/js/src'
		dist: '../web/js/dist'
		modules: '/modules'
		base: '../web/js/src/menu.js' # can add more with concat
		main: 'main.js'
	},
	css: '../web/css'
}

gulp.task 'bootstrap-less', ->
	gulp.src 'less/bootstrap.less'
	.pipe less compress: true
	.pipe gulp.dest paths.css

gulp.task 'bootstrap-js', ->
	gulp.src [
#		'js/jquerycheck.js'
		'js/scrollspy.js'
		'js/floatlabel.js'
		'js/floatlabels.js'
#		'js/tab.js'
#		'js/dropdown.js'
	]
	.pipe concat 'bootstrap.min.js'
	.pipe do uglify
	.pipe gulp.dest paths.js.dist

gulp.task 'copy-knockout', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest paths.js.dist

gulp.task 'copy-knockout-debug', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.debug.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest paths.js.src

gulp.task 'copy', ['copy-knockout']

gulp.task 'require-main', ['write-main-src', 'write-main-dist']

# write configs
gulp.task 'write-main-src', ->
	gulp.src paths.js.base
	.pipe header config 'src'
	.pipe rename paths.js.main
	.pipe gulp.dest paths.js.src

gulp.task 'write-main-dist', ->
	gulp.src paths.js.base
	.pipe header config 'dist'
	.pipe do uglify
	.pipe rename paths.js.main
	.pipe gulp.dest paths.js.dist

gulp.task 'js-modules', ['copy-templates'], ->
	# all js modules
	gulp.src [
		"#{paths.js.src}#{paths.js.modules}/**/*.js"
		paths.js.base
	]
	.pipe do uglify
#	.pipe convert to: 'cp1251'
	.pipe gulp.dest (paths.js.dist + paths.js.modules)

# without optimization
gulp.task 'copy-templates', ->
	gulp.src (paths.js.src + paths.js.modules + '/**/*.html')
	.pipe gulp.dest (paths.js.dist + paths.js.modules)


gulp.task 'datepicker-less', ->
	gulp.src 'datepicker/build/build_standalone3.less'
	.pipe less compress: true
	.pipe rename 'datepicker3.min.css'
	.pipe gulp.dest '../web/css/'

gulp.task 'datepicker-js', ->
	gulp.src ['js/datepicker.js']
	.pipe uglify output: ascii_only: true
	.pipe rename 'bootstrap-datepicker.min.js'
	.pipe gulp.dest '../web/js/'

gulp.task 'bootstrap-watch', ->
	gulp.watch 'less/**/*.less', ['bootstrap-less']
	gulp.watch 'js/**/*.js', ['bootstrap-js']

gulp.task 'datepicker-watch', ->
	gulp.watch 'js/datepicker.js', ['datepicker-js']

gulp.task 'bootstrap', ['bootstrap-less', 'bootstrap-js', 'bootstrap-watch']
gulp.task 'js', ['js-bars', 'js-utils', 'js-modules']
gulp.task 'default', ['bootstrap', 'js']
gulp.task 'datepicker', ['datepicker-less', 'datepicker-js']