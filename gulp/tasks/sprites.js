const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');
const svg2png = require('gulp-svg2png');

const config ={
    shape: { /* add some little space between the icons in the sprite file */
        spacing:{
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png'); /* replace '.svg' with '.png' in the 'sprite' filename */
                    }
                }
            },
            sprite: 'sprite.svg', /* command for removing the '.css' in file name */
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

/* delete the './app/temp/sprite' and './app/assets/images/sprites/' folders before to generate any new file */
gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

/* create a PNG copy of the SVG icon sprite file for older browser that does not support SVG format */
gulp.task('createPngCopy', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'));
});

/* copy the SVG ang PNG sprite files to './app/assets/images/sprites/' directory */
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

/* copy the CSS file to ./app/assets/styles/modules/ directory */
gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

/* delete the './app/temp/sprite/' folder after having proceeded with the 'icons' task */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    return del(['./app/temp/sprite']);
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);