/* ================
// Required Plugins
// ============= */

let gulp = require('gulp');
let fs = require('fs');
let packageJSON = require('./package.json');
let browserSync = require('browser-sync').create();
let minimist = require('minimist');
let gulpif = require('gulp-if');
let cached = require('gulp-cached');
let changed = require('gulp-changed');
let pug = require('gulp-pug');
let pugInheritance = require('gulp-pug-inheritance');
let postcss = require('gulp-postcss');
let sass = require('gulp-sass');
let sassGlob = require('gulp-sass-glob');
let cssnano = require('gulp-cssnano');
let extReplace = require('gulp-ext-replace');
let concat = require('gulp-concat');
// let uglify = require('gulp-uglify');
let imagemin = require('gulp-imagemin');
// let svgSprite = require('gulp-svg-sprite');
let ghPages = require('gulp-gh-pages');
let surge = require('gulp-surge');
let del = require('del');


/* ================
// Setup Environment
// ============= */

let dist = 'dist/';
let base = './' + dist;
let min = '';
let production = false;

let options = minimist(process.argv.slice(2));

if (options.base) {
	base = './';
}
if (options.min) {
	min = '.min';
}
if (options.production) {
	production = true;
}


/* ================
// Compile Pug
// ============= */

// let pugLocals = {
// 	base: base,
// 	min: min,
// 	gallery: []
// };

// function renameFile(file) {
// 	let name = file.replace('-', ' ');
// 	name = name.substring(0, name.indexOf('.'));

// 	return name;
// }

// function readGallery(dir, key, nest) {

// 	fs.readdir(dir, function (err, images) {
// 		if (err) { return console.error(err); }

// 		if (key == null) { key = 'root'; }
// 		if (nest == null) { nest = ''; }

// 		pugLocals.gallery[key] = [];

// 		for (let i in images) {
// 			if (fs.statSync(dir + '/' + images[i]).isDirectory()) {
// 				readGallery(dir + '/' + images[i], images[i], images[i] + '/');
// 			} else {
// 				let name = renameFile(images[i]);

// 				pugLocals.gallery[key].push({
// 					file: nest + images[i],
// 					name: name
// 				});
// 			}
// 		}
// 	});

// }

// gulp.task('gallery', function () {

// 	pugLocals.gallery = {};

// 	readGallery('src/images/');

// });

gulp.task('pug', function () {
	return gulp.src([
		'src/pug/pages/**/*.pug',
		'!src/pug/pages/**/_*.pug'
	])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(gulpif(production, gulp.dest(dist)))
		.pipe(browserSync.stream());

});

gulp.task('pug-pages', function () {

	return gulp.src([
		'src/pug/pages/**/*.pug',
		'!src/pug/pages/**/_*.pug'
	])
		.pipe(changed(dist, {
			extension: '.html'
		}))
		.pipe(cached('pug'))
		.pipe(pugInheritance({
			basedir: 'src/pug/pages',
			skip: 'node_modules'
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream());
});

/* ================
// Compile Sass
// ============= */

gulp.task('sass', function () {

	return gulp.src('src/sass/site.scss')
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dist + 'css'))
		.pipe(browserSync.stream())
		.pipe(gulpif(production, postcss([
			require('autoprefixer')({
				browsers: [
					'> 1%',
					'last 2 versions'
				],
				cascade: false
			})
		])))
		.pipe(gulpif(production, cssnano()))
		.pipe(gulpif(production, extReplace('.min.css')))
		.pipe(gulpif(production, gulp.dest(dist + 'css')))
		.pipe(gulpif(production, browserSync.stream()));

});


/* ================
// Compile JS
// ============= */

gulp.task('js', function () {

	return gulp.src([
		'src/js/vendor/*.js',
		'src/js/mimo/*.js',
		'src/js/site/*.js'
	])
		.pipe(concat('site.js'))
		.pipe(gulp.dest(dist + 'js'))
		.pipe(browserSync.stream())
		.pipe(gulpif(production, gulp.dest(dist + 'js')))
		.pipe(gulpif(production, browserSync.stream()));

});


/* ================
// Optimize Images
// ============= */

// gulp.task('images', function () {

// 	return gulp.src('src/images/**/*')
// 		.pipe(changed(dist + 'images'))
// 		.pipe(imagemin())
// 		.pipe(gulp.dest(dist + 'images'))
// 		.pipe(browserSync.stream());

// });


/* ================
// Create Sprite
// // ============= */

// gulp.task('sprite', function () {

// 	return gulp.src('src/svg/*.svg')
// 		.pipe(svgSprite({
// 			mode: {
// 				inline: true,
// 				symbol: {
// 					dest: dist
// 				}
// 			},
// 			svg: {
// 				xmlDeclaration: false,
// 				doctypeDeclaration: false,
// 				dimensionAttributes: false
// 			}
// 		}))
// 		.pipe(gulp.dest('.'))
// 		.pipe(browserSync.stream());

// });


/* ================
// Sync Changes
// ============= */

gulp.task('browser-sync', function () {

	browserSync.init({
		logPrefix: packageJSON.name,
		ui: false,
		server: './',
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
				padding: '4px 8px',
				fontSize: '12px',
				borderBottomLeftRadius: '0'
			}
		}
	});

});


/* ================
// Github Pages Deployment
// ============= */

gulp.task('ghPages', function () {

	return gulp.src('./dist/**/*')
		.pipe(ghPages());

});


/* ================
// Surge Direct Deployment
// ============= */

gulp.task('surge', ['build'], function () {

	return surge({
		project: './',
		domain: 'gode-ting.surge.sh'
	});

});


/* ================
// Watch Files
// ============= */

gulp.task('watch', function () {

	gulp.watch(['src/pug/**/*.pug', '!src/pug/pages/**/*.pug'], ['pug']);
	gulp.watch('src/pug/pages/**/*.pug', ['pug-pages']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	// gulp.watch('src/images/**/*', ['images', 'gallery']);
	// gulp.watch('src/svg/*', ['sprite']);

});


/* ================
// Clean all
// ============= */

gulp.task('clean', function () {
	return del([
		'dist',
		'index.html',
		'comments',
		'login',
		'submit',
		'user',
		'item'
	]);
});

/* ================
// Gulp Task Sets
// ============= */

gulp.task('build', [
	'sass',
	'js',
	'pug'
]);

gulp.task('default', [
	'build',
	'watch',
	'browser-sync'
]);