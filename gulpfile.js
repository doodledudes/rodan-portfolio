var gulp = require('gulp');
var clean = require('gulp-clean');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var exec = require('child_process').exec;

// - ###########################################################################
// - Runs the 'clean' task first before it run all other tasks.
// - ###########################################################################
gulp.task('default', ['clean'], function(cb) {
    exec('gulp main', function(err,stdout,stderr) {
        // console.log('Static files are now copied inside ttstatic.github.io "drinkcircle" folder.');
        console.log(stdout);
        console.log(stderr);
        cb(err);
        // - Watchers
        // gulp.watch('assets/scss/**/*.scss',['sass']);
        // gulp.watch('./**/*.jade',['jade']);
    });
});
gulp.task('main', ['jade', 'sass', 'copy', 'bower']);

// - ###########################################################################
// - Compile JADE files to HTML
// - ###########################################################################
gulp.task('jade', function() {
    /*
     * Compile all Jade files except files with
     * file names that starts with an underscore('_').
     */
    gulp.src(['./*.jade', '!**[^_]/*.jade'])
        .pipe(jade({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('public'));
});

// - ###########################################################################
// - Compile SASS files to CSS
// - ###########################################################################
gulp.task('sass', function() {
    gulp.src('assets/css/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/assets/css'));
});

// - ###########################################################################
// - Copy assets (css, images, scripts, etc...)
// - ###########################################################################
var assetsBaseDir = "./assets";
var assets = [
    assetsBaseDir + '/css/**/*.css',
    assetsBaseDir + '/images/**/*.*',
    assetsBaseDir + '/scripts/**/*.*',
    assetsBaseDir + '/vendor/bootstrap/dist/**/*.*',
    assetsBaseDir + '/fonts/**/*.*',
    "!" + assetsBaseDir + '/css/*.scss',
];
gulp.task('copy', function() {
    gulp.src(assets, { base: './'})
        .pipe(gulp.dest('public'));
});

// - ###########################################################################
// - Copy plugins from bower
// - ###########################################################################
var bowerBaseDir = "./bower_components";
var bower = [
    bowerBaseDir + '/bootstrap/dist/**/*.*',
    bowerBaseDir + '/jquery/dist/**/*.*',
    bowerBaseDir + '/font-awesome/**/*.*',
    bowerBaseDir + '/animate.css/**/*.*',
    '!' + bowerBaseDir + '/font-awesome/scss/**', // Exclude 'scss' folder
    '!' + bowerBaseDir + '/font-awesome/less/**', // Exclude 'less' folder
    '!' + bowerBaseDir + '/font-awesome/*.json', // Exclude '.json' files
    '!' + bowerBaseDir + '/font-awesome/*.txt', // Exclude '.txt' files
    '!' + bowerBaseDir + '/animate.css/*.json', // Exclude '.json' files
    '!' + bowerBaseDir + '/animate.css/*.js' // Exclude '.js' files
];
gulp.task('bower', function() {
    gulp.src(bower, { base: './'})
        .pipe(gulp.dest('public'));
});

// - ###########################################################################
// - Clean task (deletes the public folder)
// - ###########################################################################
gulp.task('clean', function() {
    return gulp.src('./public', { read: false })
        .pipe(clean());
});
