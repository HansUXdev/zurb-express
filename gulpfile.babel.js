'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
// import nodemon       from 'gulp-nodemon';
import gulp          from 'gulp';
import yaml          from 'js-yaml';
import rimraf        from 'rimraf';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import ext           from 'gulp-ext-replace';
import octophant     from 'octophant';

// use this for console commands
const exec    = require('child_process').exec;

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);
// var argv         = require('yargs').argv;
// var isProduction = !!(argv.production);


// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(
    clean, 
    gulp.parallel(
      sass, 
      javascript, 
      images, 
      copy
      ), 
      blocks
  ));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the src/partials/building-blocks folder
function blocks(cb) {
  return gulp.src('src/partials/building-blocks/*')
    .pipe(ext('.handlebars'))
    .pipe(gulp.dest('views/partials/blocks'));
    cb();
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}


// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}



// Generate a style guide from the Markdown content and HTML template in styleguide/
// function styleGuide(done) {
//   sherpa('src/styleguide/index.md', {  }, done);
// }

// Compile Sass into CSS
// In production, the CSS is compressed
// gulp.task('sass', sass, watch)
gulp.task('sass',
  gulp.series(sass, watch) 
);
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // .pipe(
    //   $.pleeease({
    //     sass: true,
    //     autoprefixer: COMPATIBILITY,
    //     // includePaths: PATHS.sass,
    //     sourcemaps: PATHS.sourcemaps,
    //     mqpacker: true,
    //     // rem: false,
    //     pseudoElements: false,  // Converts ::before to :before
    //     opacity: true,          // Filter for IE 8
    //     minifier: isProduction ? true : false, 
    //   })
    // )
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
  rules: [
    {
      test: /.js$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]
}
// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream({module: webpackConfig}, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}


gulp.task('theme', scssTheme)
// Collects variables from SCSS files and ameks a settings file.
// Aka makes your (s)css maintainable

function scssTheme(cb) {
  var options = {
    title: 'Building-Blocks Settings',
    output: './src/assets/scss/_block-settings.scss',
    groups: {
      'app-dashboard-layout': 'The Dashboard',
      'dashboard-table': 'Dashboard Table',
      'contact-panel': 'Contact Panel',
      'login-box': 'Login',
      '_multilevel-offcanvas-menu':'Offcanvas-Menu',
      'topbar-responsive': 'Topbar',
      'marketing-site-three-up': 'Marketing',
      'todo-list-card': 'Todo List',
      'status-update-input-box':'Status Input',
    },

    sort: [
      'Dashboard',
      'Offcanvas-Menu',
      'Topbar',
      'Login & Sign up',
      'Contact Panel',
      'Status Input',
      'Todo List',
      'Marketing',
    ],
    /////
    // imports (Array): A series of strings which represent Sass libraries to import. 
    // These libraries are added as @import statements before the first section.
    /////
    // imports: ['util/util'],

    // _foundationShim: true
  }
  //parser(files [, options, cb])
  octophant('./src/assets/scss/components/building-blocks/', options, cb);
}


// Start a server with BrowserSync to preview the site in
// function nodemon() {
//   nodemon({
//     script: 'server.js', 
//     ext: 'js html',
//     env: { 'NODE_ENV': 'development' }
//   })
// }
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  // watch for when new building blocks are installed and move them over to the server
  gulp.watch('src/partials/building-blocks/**').on('all', gulp.series(blocks, browser.reload));
}

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', 
    // server, 
    watch)
);
