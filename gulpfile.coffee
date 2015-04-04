gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
connect = require 'gulp-connect'
# concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
# convert = require 'gulp-convert-encoding'
# rjs = require 'gulp-requirejs'
header = require 'gulp-header'

# Paths to project libraries
# modules - for requirejs modules
paths = {
	js: {
		src: 'js/src'
		dist: 'js/dist'
		modules: '/modules'
		base: 'js/src/menu.js' # can add more with concat
		main: 'main.js'
	}
	css: 'css'
}
# to paths.js.base file prepend config header
# and save as paths.js.main
config = (baseUrl) ->
	"""
	require.config({
		baseUrl: '#{baseUrl}',
		paths: {
			knockout: '../knockout'
		}
	});
	"""
# By default load any module IDs from #{baseUrl}
# so for distribution baseUrl = 'js/dist/modules'
# and for development baseUrl = 'js/src/modules'
# except, if the module ID starts with "knockout",
# load it from the ../ directory. paths
# config is relative to the baseUrl, and
# never includes a ".js" extension since
# the paths config could be for a directory.

# So for src and dist version write different configs
gulp.task 'write-main-src', ->
	gulp.src paths.js.base
	.pipe header config (paths.js.src + paths.js.modules)
	.pipe rename paths.js.main
	.pipe gulp.dest paths.js.src

gulp.task 'write-main-dist', ->
	gulp.src paths.js.base
	.pipe header config (paths.js.dist + paths.js.modules)
	.pipe do uglify
	.pipe rename paths.js.main
	.pipe gulp.dest paths.js.dist

gulp.task 'write-main', ['write-main-src', 'write-main-dist']

# and keep different version for dist and developement
gulp.task 'copy-knockout', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest paths.js.dist

gulp.task 'copy-knockout-debug', ->
	gulp.src 'node_modules/knockout/build/output/knockout-latest.debug.js'
	.pipe rename 'knockout.js'
	.pipe gulp.dest paths.js.src

#may be start just once
gulp.task 'copy-ko', ['copy-knockout', 'copy-knockout-debug']

# without optimization
# todo: make inline strings in components dist modules
# so not need require['text!.....template.html'] and double request
gulp.task 'copy-templates', ->
	gulp.src (paths.js.src + paths.js.modules + '/**/*.html')
	.pipe gulp.dest (paths.js.dist + paths.js.modules)

#main 
gulp.task 'js-modules', ['copy-templates'], ->
	# all js modules
	gulp.src [
		"#{paths.js.src}#{paths.js.modules}/**/*.js"
		paths.js.base
	]
	.pipe do uglify
#	.pipe convert to: 'cp1251'
	.pipe gulp.dest (paths.js.dist + paths.js.modules)

gulp.task 'bootstrap-less', ->
	gulp.src 'node_modules/bootstrap/less/bootstrap.less'
	.pipe do less # compress: off
	.pipe gulp.dest paths.css

gulp.task 'connect', ->
	connect.server
		port: 8000
		livereload: on
		root: ''

gulp.task 'update', ->
	gulp.src '*.html'
	.pipe do connect.reload

gulp.task 'watch-html', ->
	gulp.watch '**/*.html', ['update']

gulp.task 'watch-modules', ->
	gulp.watch "#{paths.js.src}#{paths.js.modules}/**/*.js", ['js-modules', 'update']

gulp.task 'watch', ['watch-html', 'watch-modules']

gulp.task 'default', ['write-main', 'js-modules', 'connect', 'watch']
