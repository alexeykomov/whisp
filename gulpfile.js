/*
 * Copyright (c) 2015. Reflect, Alex K.
 */


/**
 * @fileoverview Build file.
 * @author alexeykcontact@gmail.com (Alex K)
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');
var closureCompiler = require('gulp-closure-compiler');
var jsxComp = require('gulp-react');
var gulpFilter = require('gulp-filter');
var hash = require('gulp-hash');
var size = require('gulp-size');
var duration = require('gulp-duration');
var clean = require('gulp-clean');
var merge = require('object-merge');
var deepClone = require('clone');
var jsx = require('gulp-jsx');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var appConfig = require('./app/js/config/appconfig');
var fs = require('fs');
var exec = require('gulp-exec');
var copy = require('gulp-copy');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var del = require('del');


const DEV_COMPILATION = argv.dev;
const PACK_BUILD = argv.zip;
const COMPILATION_WARNINGS_ENABLED = false//!argv.silent;

const COMPILE_MODE = {
  NONE: '',
  COMPILE_ONLY: 'compile-only',
  COMPILE_WORKER_ONLY: 'compile-worker-only',
  COMPILE_UI_ONLY: 'compile-ui-only'
}

var PATHS = {
  ES6: ['app/src/**/*.js'],
  ES5: 'app/js',
  // Must be absolute or relative to source map
  SOURCE_ROOT: path.join(__dirname, 'app/src'),
  CLIENT_SRC: [
    'src/react/react-0.13.1-build/react.js',
    'src/closure-library/**/*.js',
    'src/end-to-end/src/javascript/crypto/**/*.js',
    'src/zlib.js/**/*.js',
    'src/whisp/**/*.js',
    'src/reflect-common/**/*.js'
  ],
  LESS: ['less/combined.less'],
  COMPILER_UI: 'bin/compiler-react.jar',
  COMPILER_WORKER: 'bin/compiler.jar',
  JS_OUTPUT_UI: 'js/output-compiled-ui.js',
  JS_OUTPUT_WORKER: 'js/output-compiled-worker.js',
  JS: ['js/*.js', 'js/*.js.map', 'js/asset-hashes.json'],
  CSS: ['css/*.css', 'css/*.css.map', 'css/asset-hashes.json'],
  APP_JS: 'build/static/js',
  APP_CSS: 'build/static/css',
  APP_FONTS: 'app/static'
};
PATHS.CLIENT_SRC_WITHOUT_REACT = PATHS.CLIENT_SRC.slice(1);

const CLIENT_SRC_FILTER = function(file){
  return !(
      /.*test\.js$/.test(file.path) ||
      /.*gmonkeystub\.js$/.test(file.path) ||
      /.*[\/\\]demos[\/\\].*\.js$/.test(file.path)
  );
}

const CLIENT_COMPILER_OPTIONS = {
  compilerPath: '',
  fileName: '',
  compilerFlags: {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    debug: true,
    warning_level: COMPILATION_WARNINGS_ENABLED ? 'VERBOSE' : 'QUIET',
    language_in: 'ECMASCRIPT6',
    language_out: 'ECMASCRIPT5',
    tracer_mode: 'OFF',
    formatting: 'PRETTY_PRINT',
    closure_entry_point: [],
    jscomp_off: ['deprecated', 'deprecatedAnnotations'],
    externs: [
      'src/externs.js',
      //To silence warnings from Crypto library.
      'src/chrome_extensions.js'
    ],
    define: [
      "goog.DISALLOW_TEST_ONLY_CODE=true"
    ],
    warnings_whitelist_file: 'warnings_whitelist_file',
    output_wrapper: '(function(){%output%})();',
  }
}

const COMPILATION_UI = 'ui';
const COMPILATION_WORKER = 'worker';
const COMPILATION_LESS = 'less';

const CLIENT_COMPILER_OPTIONS_UI = merge(CLIENT_COMPILER_OPTIONS, {
  compilerPath: 'bin/compiler-react.jar',
  compilerFlags: {
    closure_entry_point: ['whisp.ui.EntryPoint']
  }
})

const CLIENT_COMPILER_OPTIONS_WORKER = merge(CLIENT_COMPILER_OPTIONS, {
  compilerPath: 'bin/compiler.jar',
  compilerFlags: {
    closure_entry_point: ['whisp.worker.EntryPoint']
  }
})

var jsUiCompileTasks = [];

function prepareCompileUiJsTasks(aCompilationPrefix) {
  var compileOnly = aCompilationPrefix != COMPILE_MODE.NONE;
  // These are compilation aTarget axises. So, total number of compilation
  // targets is product of array lengths.
  var LOCALES = !compileOnly ? appConfig.LOCALES : ['en'];
  var DEBUG = !compileOnly ? [true, false] : [true];
  var UI_TYPE = !compileOnly ? ['', 'MOBILE'] : ['MOBILE'];
  // Empty string means that user agent is not specified.
  var USER_AGENT = !compileOnly ?
      ['', 'IE', 'GECKO', 'WEBKIT', 'OPERA'] : [''];

  return prepareCompileJsTasks(LOCALES, DEBUG, UI_TYPE, USER_AGENT,
      aCompilationPrefix, COMPILATION_UI, CLIENT_COMPILER_OPTIONS_UI,
      PATHS.CLIENT_SRC, CLIENT_SRC_FILTER);
}

function prepareCompileWorkerJsTasks(aCompilationPrefix) {
  var compileOnly = aCompilationPrefix != COMPILE_MODE.NONE;
  // These are compilation aTarget axises. So, total number of compilation
  // targets is product of array lengths.
  var LOCALES = [''];
  var DEBUG = !compileOnly ? [true, false] : [true];
  var UI_TYPE = [''];
  // Empty string means that user agent is not specified.
  var USER_AGENT = [''];

  return prepareCompileJsTasks(LOCALES, DEBUG, UI_TYPE, USER_AGENT,
      aCompilationPrefix, COMPILATION_WORKER, CLIENT_COMPILER_OPTIONS_WORKER,
      PATHS.CLIENT_SRC_WITHOUT_REACT, CLIENT_SRC_FILTER);
}

function prepareCompileJsTasks(aLocales, aDebug, aUiType, aUserAgent,
    aCompilationPrefix, aCompilationName, aCompilerOptions, aSources,
    aSrcFilter) {
  var tasks = makeListOfCompileTargets(aLocales, aDebug, aUiType, aUserAgent).
      map(fillCompileTargetWithDefines.bind(null, aCompilationName)).
      map(targetToCompileOptionsMapper.bind(null, aCompilationName,
          aCompilerOptions)).
      map(jsCompileTaskPreparer.bind(null, aCompilationPrefix, aSources,
          aSrcFilter));

  return tasks;
}

function makeCompileJsTasks(aCompilationPrefix) {
  var tasks =
      (aCompilationPrefix != COMPILE_MODE.COMPILE_UI_ONLY ?
      prepareCompileWorkerJsTasks(aCompilationPrefix) :
      []).
      concat((aCompilationPrefix != COMPILE_MODE.COMPILE_WORKER_ONLY ?
          prepareCompileUiJsTasks(aCompilationPrefix) :
          [])).
      map(chainedCompileTaskCreator.bind(null, ['clean-js', 'compile-jsx']));

  return [tasks[tasks.length - 1]];
}

function makeCompileLessTasks(aCompilationOnly) {
  // These are compilation aTarget axises. So, total number of compilation
  // targets is product of array lengths.
  var LOCALES = [''];
  var DEBUG = [false];
  var UI_TYPE = !aCompilationOnly ? ['', 'MOBILE'] : ['MOBILE'];
  // Empty string means that user agent is not specified.
  var USER_AGENT = [''];

  var tasks = makeListOfCompileTargets(LOCALES, DEBUG, UI_TYPE, USER_AGENT).
      map(fillCompileTargetWithDefines.bind(null, COMPILATION_LESS)).
      map(lessCompileTaskPreparer.bind(null, aCompilationOnly)).
      map(chainedCompileTaskCreator.bind(null, ['clean-css']));

  return [tasks[tasks.length - 1]];
}

function fillCompileTargetWithDefines(aCompilationName, aTarget) {
  var target = merge(aTarget, {
    jsCompDefines: [],
    lessDefines: []
  });
  var isUiTarget = aCompilationName == COMPILATION_UI;
  var isLessTarget = aCompilationName == COMPILATION_LESS;

  // Locale.
  target.jsCompDefines.push("goog.LOCALE='" + target.locale + "'");
  // DEBUG.
  target.jsCompDefines.push("'goog.DEBUG=" + target.debug + "'");
  // UI type.
  if (isUiTarget) {
    target.jsCompDefines.push("whisp.UI_TYPE='" + target.uiType + "'");
  }
  if (isLessTarget) {
    target.lessDefines.push("UI_TYPE='" + target.uiType + "'");
  }
  // Assumptions on user agent.
  if (isUiTarget && target.userAgent) {
    target.jsCompDefines.push("'goog.userAgent.ASSUME_" + target.userAgent +
        "=true'");
  }

  return target;      
}

function makeListOfCompileTargets(aLocales, aDebug, aUiType, aUserAgent) {
  var targets = [];

  aLocales.forEach(function(locale) {
    aDebug.forEach(function(debug) {
      aUiType.forEach(function(uiType) {
        aUserAgent.forEach(function(userAgent) {
          targets.push({
            locale: locale,
            debug: debug,
            uiType: uiType,
            userAgent: userAgent
          });
        });
      });
    });
  });

  return targets;
}

function targetToCompileOptionsMapper(aCompilationName, aCompilerOptions,
    aTarget){
  var targetOptions = deepClone(aCompilerOptions);

  Array.prototype.push.apply(targetOptions.compilerFlags.define,
      aTarget.jsCompDefines);

  if (DEV_COMPILATION) {
    targetOptions.compilerFlags.define.push("'goog.DEBUG=true'");
    targetOptions.compilerFlags.formatting = ['PRETTY_PRINT',
        'PRINT_INPUT_DELIMITER'];
    targetOptions.compilerFlags.debug = true;
  } else {
    delete targetOptions.compilerFlags.formatting;
    targetOptions.compilerFlags.debug = false;
  }

  targetOptions.taskName =
      aCompilationName +
      (aTarget.locale ? '-' + aTarget.locale : '')  +
      (aTarget.userAgent ? '-' + aTarget.userAgent : '')  +
      (aTarget.uiType ? '-' + aTarget.uiType : '')  +
      (aTarget.debug ? '-debug' : '');
  targetOptions.fileName = 'js/' + 'outputcompiled-' + targetOptions.taskName +
      '.js';

  if (DEV_COMPILATION) {
    var sourceMapName = 'js/outputcompiled-' + targetOptions.taskName +
        '.js.map';
    targetOptions.compilerFlags.create_source_map = sourceMapName;
    targetOptions.compilerFlags.output_wrapper += '//# sourceMappingURL=' +
        sourceMapName;
  }

  return targetOptions;
}

function jsCompileTaskPreparer(aCompilationPrefix, aSources, aSrcFilter,
    aTarget) {
  var taskName = 'compilation-' +
      (aCompilationPrefix ? aCompilationPrefix + '-' : '') +
      aTarget.taskName;

  return {
    taskName: taskName,
    func: function() {
      var compilationTimer = duration(taskName);
      return gulp.src(aSources).
          pipe(gulpFilter(aSrcFilter)).
          once('data', compilationTimer.start).
          pipe(closureCompiler(aTarget)).
          pipe(compilationTimer).
          pipe(gulp.dest('.'));
    }
  }
}

/**
 * Creates tasks as side-effect. Each tasks takes previous as dependency.
 * @param {Array} aInitialDependencies What dependencies are needed for the very
 * first task in chain.
 * @param {Object} aTask Current task being processed.
 * @param {number} aIndex Number of current task being processed.
 * @param {Array} aArray All tasks.
 * @return {string} Task names.
 */
function chainedCompileTaskCreator(aInitialDependencies, aTask, aIndex,
    aArray) {
  if (aIndex > 0) {
    gulp.task(aTask.taskName, [aArray[aIndex - 1].taskName],
        aTask.func)
  } else {
    gulp.task(aTask.taskName, aInitialDependencies, aTask.func)
  }
  return aTask.taskName;
}

function lessCompileTaskPreparer(aCompilationOnly, aTarget) {
  var taskName = 'compilation-' + (aCompilationOnly ? 'only-' : '') +
      'less' +
      (aTarget.locale ? '-' + aTarget.locale : '') +
      (aTarget.userAgent ? '-' + aTarget.userAgent : '') +
      (aTarget.uiType ? '-' + aTarget.uiType : '') +
      (aTarget.debug ? '-debug' : '');
  var outputFileName = 'css/outputcompiled-' + taskName + '.css';

  var command = ['lessc', '--verbose']
      /*.concat(global.DEV_BUILD || global.DEV_COMPILATION ?
      ['--source-map=' + aSourceMapName] : [])*/
      .concat(DEV_COMPILATION ? [] : ['--compress'])
      .concat(PATHS.LESS).concat(['>', outputFileName])
      .concat(aTarget.lessDefines.map(function(aDefine){
    return '--modify-var="' + aDefine + '"';
  })).join(' ');

  return {
    taskName: taskName,
    func: function() {
      var compilationTimer = duration(taskName);
      return gulp.src(PATHS.LESS).
          once('data', compilationTimer.start).
          pipe(exec(command)).
          pipe(compilationTimer).
          pipe(gulp.dest('.'));
    }
  }
}

gulp.task('babel', function () {
  return gulp.src(PATHS.ES6)
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.', { SOURCE_ROOT: PATHS.SOURCE_ROOT }))
      .pipe(gulp.dest(PATHS.ES5));
});

gulp.task('watch', function() {
  gulp.watch(PATHS.ES6, ['babel']);
});

gulp.task('compile-jsx', ['clean-jsx'], function() {
  return gulp.src('src/whisp/**/*.jsx').
      pipe(jsx({
        factory: 'React.createElement'
      })).
      pipe(rename(function(path) {
        path.extname = '.jsx.js'
      })).
      pipe(gulp.dest(function(file){
        return file.base
      }));
});

gulp.task('compile-ui-js', makeCompileJsTasks(COMPILE_MODE.COMPILE_UI_ONLY));

gulp.task('compile-w-js', makeCompileJsTasks(COMPILE_MODE.COMPILE_WORKER_ONLY));

gulp.task('compile-js', makeCompileJsTasks(COMPILE_MODE.COMPILE_ONLY));

gulp.task('compile-js-for-build', makeCompileJsTasks(COMPILE_MODE.COMPILE_ONLY));

gulp.task('clean-js', function() {
  return del(['js/*.js', 'js/*.js.map', 'js/asset-hashes.json']);
});

gulp.task('clean-css', function() {
  return del(['css/*.css', 'css/*.css.map', 'css/asset-hashes.json']);
});

gulp.task('clean-temp', ['clean-js', 'clean-css'], function() {
});

gulp.task('clean-jsx', function() {
  return del('src/**/*.jsx.js');
});

gulp.task('clean-build', function() {
  return del([
    'build/**/*'
  ]);
});

gulp.task('build-js', ['compile-js-for-build'],
    function() {
  var hashTimer = duration('hashing');

  return gulp.src('js/*.js').
      pipe(clean()).
      once('data', hashTimer.start).
      pipe(hash({
        algorithm: 'md5',
        hashLength: 32
      })).
      pipe(hashTimer).
      pipe(size()).
      pipe(size({gzip: true})).
      pipe(gulp.dest('js')).
      pipe(hash.manifest('asset-hashes.json')).
      pipe(gulp.dest('js'));
});

gulp.task('build-css', ['compile-less-for-build'],
    function() {
  var hashTimer = duration('hashing');

  return gulp.src('css/*.css').
      pipe(clean()).
      once('data', hashTimer.start).
      pipe(hash({
        algorithm: 'md5',
        hashLength: 32
      })).
      pipe(hashTimer).
      pipe(size()).
      pipe(size({gzip: true})).
      pipe(gulp.dest('css')).
      pipe(hash.manifest('asset-hashes.json')).
      pipe(gulp.dest('css'));
});

gulp.task('compile-less', makeCompileLessTasks(true));

gulp.task('compile-less-for-build', ['clean-build'].concat(
    makeCompileLessTasks(false)));

gulp.task('copy-app', function(){
});

function hashPattern() {
  return new Array(32).map(function(){
    return '[0123456789abcdefg]'
  }).join('')
}

gulp.task('copy-js', ['build-js'], function(){
  return gulp.src(['js/*' + hashPattern() + '.js', 'js/*.js.map',
      'js/asset-hashes.json']).
      pipe(gulp.dest(PATHS.APP_JS));

});

gulp.task('copy-css', ['build-css'], function(){
  return gulp.src(['css/*' + hashPattern() + '.css', 'css/*.css.map',
      'css/asset-hashes.json']).
      pipe(gulp.dest(PATHS.APP_CSS));
});

gulp.task('zip', ['copy-js', 'copy-css'], function() {
  return gulp.src('build/**/*.*').
      pipe(tar('.tar')).
      pipe(gzip()).
      pipe(gulp.dest('build'));
});

gulp.task('hash-build', ['zip'], function() {
  return gulp.src('build/**/.tar.gz').
      pipe(hash({
        algorithm: 'md5',
        hashLength: 32,
        template: 'build-<%= hash %><%= name %><%= ext %>'
      })).
      pipe(size()).
      pipe(gulp.dest('build'));
});

gulp.task('build', PACK_BUILD ? ['hash-build'] : ['copy-js', 'copy-css'],
    function() {
  //Final cleaning.
  return del((PACK_BUILD ? [
    'build/**/*',
    '!build/*.tar.gz'
  ] : []).
      concat(['js/*.js', 'js/*.js.map', 'js/asset-hashes.json']).
      concat(['css/*.css', 'css/*.css.map', 'css/asset-hashes.json']));
});

gulp.task('default', ['watch']);
