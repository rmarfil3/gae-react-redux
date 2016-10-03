/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * B U I L D   I N S T R U C T I O N S
 *
 * To build as PRODUCTION, either:
 *   -> Run "build-prod" task; OR
 *   -> Run "gulp --production" in terminal
 *
 * To build as DEVELOPMENT, either:
 *   -> Run "build-dev" task; OR
 *   -> Run "gulp --development" in terminal
 *
 * To WATCH for changes and build, either:
 *   -> Run "watch" task; OR
 *   -> Run "gulp --watch" in terminal
 *
 * For BrowserSync:
 *   -> Run "gulp --watch --proxy_host=<HOST:localhost> --proxy_port=<PORT:8080>
 *   -> Open http://localhost:3000
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpIf = require("gulp-if");
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var nodeNotifier = require("node-notifier");
var plumber = require("gulp-plumber");
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");
var cssModulesify = require("css-modulesify");
var livereactload = require("livereactload");
var browserSync = require("browser-sync").create();
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var runSequence = require("run-sequence");
var moment = require("moment");


var flags = require("minimist")(process.argv.slice(2));
var isProduction = process.env.NODE_ENV === "production" || flags.production || flags.prod || false;
var shouldWatch = flags.watch || false;

// BrowserSync proxy setup
var proxyHost = flags.proxy_host || "localhost";
var proxyPort = flags.proxy_port || 8080;

var isBuildSuccess = true;
var isWatching = false;


var ROOT = "frontend/";
var JS_ROOT = ROOT + "static/js/";
var CSS_ROOT = ROOT + "static/css/";
var REACT_ROOT = ROOT + "react_src/";
var HELPER_FILES = JS_ROOT + "helpers/**/*.js";
var REACT_FILES = REACT_ROOT + "**/*.+(js|jsx)";
var CSS_FILES = REACT_ROOT + "**/*.+(css)";
var ENTRY_FILE = REACT_ROOT + "index.js";


// Lint JS/JSX files
gulp.task("eslint", function () {
    return gulp.src([
        HELPER_FILES,
        REACT_FILES
    ])
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(plumber())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("error", notify.onError(function (error) {
            return {
                title: "<%= error.name %>",
                message: "<%= error.message %>"
            }
        }))
});


function createBundler(useWatchify) {
    return browserify({
        entries: ENTRY_FILE,
        paths: [],
        debug: !isProduction,
        cache: {},  // required for watchify
        packageCache: {},  // required for watchify
        fullPaths: !isProduction,
        plugin: (!isProduction && useWatchify) ? [livereactload] : []
    })
        .transform(babelify, {
            presets: ["es2015", "react", "stage-2"],
            env: {
                development: {
                    plugins: [
                        ["react-transform", {
                            transforms: [{
                                transform: "livereactload/babel-transform",
                                imports: ["react"]
                            }],
                        }]
                    ]
                }
            }
        })
        .plugin(cssModulesify, {
            output: CSS_ROOT + "main.css",
            after: "cssnano"
        })
}


// Compile React files using Browserify
function buildBundler(bundler, callback) {
    gulp.task("build", function () {
        return bundler
            .bundle()
            .on("error", notify.onError(function (error) {
                isBuildSuccess = false;
                return {
                    title: "<%= error.name %>",
                    message: "<%= error.message %>"
                }
            }))
            .on("error", function (error) {
                gutil.log(error.stack);
                this.emit("end");
            })
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(gulp.dest(JS_ROOT + "app"))
    });

    nodeNotifier.notify({
        title: "Gulp Build",
        message: "Starting build for " + process.env.NODE_ENV + "...",
        time: 1000,
        "expire-time": 1000
    });

    isBuildSuccess = true;
    runSequence("build", "compress", function () {
        nodeNotifier.notify({
            title: "Gulp Build",
            message: isBuildSuccess ?
                ("Build for " + process.env.NODE_ENV + " successful!")
                :
                ("Build for " + process.env.NODE_ENV + " failed."),
            time: 1000,
            "expire-time": 1000
        });

        if (isWatching) {
            gutil.log("-----------------------------------------------");

            callback && callback();
        }
    });

    return true;
}


// Compress the bundled file (only if production)
gulp.task("compress", function () {
    if (isBuildSuccess) {
        return gulp.src(JS_ROOT + "app/bundle.js")
            .pipe(gulpIf(isProduction, uglify()))
            .on("error", notify.onError(function (error) {
                isBuildSuccess = false;
                return {
                    title: "<%= error.name %>",
                    message: "<%= error.message %>"
                }
            }))
            .on("error", function (error) {
                gutil.log(error.stack);
                this.emit("end");
            })
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest(JS_ROOT + "app"))
    }
});


// Watch for changes and bundle using Watchify
gulp.task("watch", function () {
    process.env.NODE_ENV = "development";
    isWatching = true;
    var bundler = createBundler(true);
    var watcher = watchify(bundler, {
        poll: true
    });
    buildBundler(watcher);
    watcher
        .on("update", function () {
            buildBundler(watcher)
        });

    browserSync.init({
        proxy: proxyHost + ":" + proxyPort,
        open: false,
        once: true,
        logFileChanges: false,
        logPrefix: moment().format('HH:mm:ss')
    });

    // Watch for changes in external CSS files
    gulp.task("watch-css", function () {
       return gulp.src(CSS_ROOT + "**/*.css")
           .pipe(browserSync.stream());
    });
    gulp.watch(CSS_ROOT + "**/*.css", ["watch-css"]);

    nodeNotifier.notify({
        title: "Watchify Started",
        message: "Open http://localhost:3000 to use BrowserSync.",
        time: 1000,
        "expire-time": 1000
    });
});


// Default task for DEVELOPMENT
gulp.task("build-dev", function (callback) {
    process.env.NODE_ENV = "development";
    isProduction = false;
    buildBundler(createBundler(false), callback);
});


// Default task for PRODUCTION
gulp.task("build-prod", function (callback) {
    process.env.NODE_ENV = "production";
    isProduction = true;
    buildBundler(createBundler(false), callback);
});


// Default entry
gulp.task("default", function (callback) {
    if (shouldWatch) {
        runSequence("build-dev", "watch", function () {
            callback();  // Signal DONE flag
        });
    }
    else {
        runSequence(isProduction ? "build-prod" : "build-dev", function () {
            callback();  // Signal DONE flag
        });
    }
});