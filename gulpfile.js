var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch')

gulp.task('css', function() {
    gulp.src('public/css/*.css')
        .pipe(watch())
        .pipe(livereload());
});

gulp.task('js', function() {
    gulp.watch('public/js/**/*.js', function() {
        gulp.src('public/js/**/*.js')
            .pipe(livereload());
    });
});


gulp.task('jade', function() {
    gulp.src('views/**/*.jade')
        .pipe(watch())
        .pipe(livereload());
});


gulp.task('develop', function() {

    // not a good way but gulp-nodemon sucks xD
    var nodemon = require('nodemon');
    nodemon({
        script: 'bin/www',
        ext: 'js json'
    });

    nodemon.on('start', function() {
        console.log('App has started');
    }).on('quit', function() {
        console.log('App has quit');
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });
});


gulp.task('default', ['develop', 'css', 'jade', 'js']);