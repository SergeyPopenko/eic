const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const svgmin = require('gulp-svgmin');
const cheerio = require("gulp-cheerio");
const rename = require("gulp-rename");
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const webp = require("gulp-webp");
const imagemin = require('gulp-imagemin');

gulp.task('clean:docs', function (done) {
	if (fs.existsSync('./docs/')) {
		return gulp
			.src('./docs/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:docs', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
		.pipe(changed('./docs/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(htmlclean())
		.pipe(gulp.dest('./docs/'));
});

gulp.task('sass:docs', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./docs/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(groupMedia())
		.pipe(sass())
		.pipe(csso())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./docs/css/'));
});

gulp.task('images:docs', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./docs/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./docs/img/'));
});

gulp.task('fonts:docs', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./docs/fonts/'))
		.pipe(gulp.dest('./docs/fonts/'));
});

gulp.task('files:docs', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./docs/files/'))
		.pipe(gulp.dest('./docs/files/'));
});

gulp.task('js:docs', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./docs/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./docs/js/'));
});

gulp.task('copyManifest:docs', function () {
	return gulp
		.src('./src/manifest.json')
		.pipe(gulp.dest("./build/js/"))
});

gulp.task('copyManifest:docs', function () {
	return gulp
		.src('./src/manifest.json')
		.pipe(gulp.dest("./docs/"))
});

gulp.task('symbols:docs', function () {
	return gulp
	.src('./src/icons/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				// $('[fill]').removeAttr('fill');
				// $('[stroke]').removeAttr('stroke');
				// $('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$("svg").attr("style", "display:none");
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest('./src/img/'));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:docs', function () {
	return gulp.src('./docs/').pipe(server(serverOptions));
});
