'use strict';

var gulp = require('gulp');
var symlink = require('gulp-sym');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var del = require('del');
var fs = require('fs');
var gulp_jspm = require('gulp-jspm');
var rename = require("gulp-rename");

///////////////////////////////////////////////////////////////////////////////////////
// Configuration
///////////////////////////////////////////////////////////////////////////////////////
var PORT = 9001;           
var WEB_DIRECTORY = 'web';
var BUNDLE_FILE = 'test.min.js';
var BUNDLE_DIRECTORY = 'bundle';
var DIST_DIRECTORY = 'dist';

///////////////////////////////////////////////////////////////////////////////////////
// Development tasks
///////////////////////////////////////////////////////////////////////////////////////
/**
 * Start the development server.
 */
gulp.task('develop', [], function(callback)
{
    gulp.src(['Application.js'], {base: './'}).pipe(gulp.dest(WEB_DIRECTORY));
    gulp.src(['index-dev.html'], {base: './'}).pipe(rename('index.html')).pipe(gulp.dest(WEB_DIRECTORY));
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(serveStatic(WEB_DIRECTORY))
        .use(serveIndex(WEB_DIRECTORY));
    require('http').createServer(app).listen(PORT);
});

///////////////////////////////////////////////////////////////////////////////////////
// Bundle tasks
//
// This will bundle whatever exists in WEB_DIRECTORY and throw the file into
// BUNDLE_DIRECTORY.
///////////////////////////////////////////////////////////////////////////////////////
/**
 * Cleans out bundle.
 */
gulp.task('bundle:clean', function()
{
    return del([BUNDLE_DIRECTORY]);
});

/**
 * Make bundle directory.
 */
gulp.task('bundle:mkdir', ['bundle:clean'], function()
{
    return fs.mkdir(BUNDLE_DIRECTORY);
});


/**
 * Bundles source JS that exists in the web directory.
 */
gulp.task('bundle', ['bundle:mkdir'], function()
{
    return gulp.src(WEB_DIRECTORY + '/Application.js')
               .pipe(gulp_jspm({selfExecutingBundle: true/*, minify: true*/}))
               .pipe(rename(BUNDLE_FILE))
               .pipe(gulp.dest(BUNDLE_DIRECTORY));
});

///////////////////////////////////////////////////////////////////////////////////////
// Distribution tasks
//
// NOTE: this does not start a server. Rather, it simply "dists" the web application
// such that it can easily be deployed on a web server.
///////////////////////////////////////////////////////////////////////////////////////
/**
 * Clean dist.
 */
gulp.task('dist:clean', function(callback)
{
    return del([DIST_DIRECTORY]);
});

/**
 * Make dist directory.
 */
gulp.task('dist:mkdir', ['dist:clean'], function()
{
    return fs.mkdir(DIST_DIRECTORY);
});

/**
 * Creates the JS bundle, transpiles, and copies to DIST_DIRECTORY.
 */
gulp.task('dist:build', ['dist:mkdir', 'bundle'], function()
{
    return gulp.src(BUNDLE_DIRECTORY + '/' + BUNDLE_FILE).pipe(gulp.dest(DIST_DIRECTORY));
});

/**
 * Make distribution.
 */
gulp.task('dist', ['dist:build'], function(callback)
{
    gulp.src(['index.html'], {base: './'}).pipe(gulp.dest(DIST_DIRECTORY));
    callback();
});

/**
 * Test the dist in a server.
 */
gulp.task('dist:server', ['dist'], function(callback)
{
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(serveStatic(DIST_DIRECTORY))
        .use(serveIndex(DIST_DIRECTORY));
    require('http').createServer(app).listen(PORT);
});

///////////////////////////////////////////////////////////////////////////////////////
// Master tasks
///////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', function(callback)
{
    gulp.start('develop');
    callback();
});
