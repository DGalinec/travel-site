const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

/* 'previewDist' spins up a preview server that uses our 'dist' folder as the based */
gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs" 
        }
    });
});

/* 'deleteDistFolder' deletes the 'dist' folder before to start building a new production copy of the site */
gulp.task('deleteDistFolder', ['icons'], function() {
    return del('./docs');
});

/* 'copyGeneralFiles' copies miscellaneous files */
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    const pathsToCopy = [
        './app/**/*',               /* include everything (** all subfolders and * all files) that is in the 'app' folder */
        '!./app/index.html',        /* exclude index.html since we take care of it in a separate task                     */
        '!./app/assets/images/**',  /* exclude images since we take care of them in a separate task                       */
        '!./app/assets/styles/**',  /* exclude CSS files since we take care of them in a separate task                    */
        '!./app/assets/scripts/**', /* exclude JS files since we take care of them in a separate task                     */
        '!./app/temp',              /* exclude the 'temp' folder                                                          */
        '!./app/temp/**'            /* exclude any content of the 'temp' folder                                           */
    ]
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

/* 'optimizeImages' copies all image files over to the 'dist' folder & compress the image files before */
/* they reach their destination. */
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*']) /* '!' --> exclude files */
        .pipe(imagemin({
            progressive: true, /* will optimize the JPG images even further */
            interlaced: true,  /* will help with any GIF images */
            multipass: true    /* will help with SVG files */
        }))
        .pipe(gulp.dest('./docs/assets/images'));
});

/* role of 'useminTrigger' is to trigger or begin 'usemin' task */
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

/* 'usemin' copies index.html and required CSS / JavaScript files to the 'dist' folder after having compressed and revisioned them */
gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() { return rev() }, function() { return cssnano() }], /* rev() revisions the CSS files, cssnano() compresses the CSS files */
            js: [function() {return rev() }, function() { return uglify() }]     /* rev() revisions the JS files,  uglify()  compresses the JS files  */
        }))                                                                      /* because we want Gulp to be aware when functions complete, we return them */
        .pipe(gulp.dest('./docs'));
});

/* the 'build' task won't do anything by itself instead it will be the shortcut we run in the command */
/* line that will trigger and call multiple other tasks. These tasks will be listed as dependencies.  */
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);