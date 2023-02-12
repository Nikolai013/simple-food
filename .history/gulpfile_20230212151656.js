const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const fileInclude = require("gulp-file-include");

//-- Обновление браузера
function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/",
		},
		notify: false,
	});
}

//-- Функции для стилей
function styles() {
	return src("app/scss/style.scss")
		.pipe(
			scss({
				outputStyle: "compressed",
			})
		)
		.pipe(concat("style.min.css"))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 10 versions"],
				grid: true,
			})
		)
		.pipe(dest("app/css"))
		.pipe(browserSync.stream());
}

//-- Функции для скриптов
function scripts() {
	return src([
		"node_modules/jquery/dist/jquery.js",
		"node_modules/slick-carousel/slick/slick.js",
		"node_modules/swiper/swiper-bundle.min.js",
		"node_modules/mixitup/dist/mixitup.js",
		"node_modules/rateyo/lib/cjs/rateyo.js",
		"node_modules/ion-rangeslider/js/ion.rangeSlider.js",
		"node_modules/jquery-form-styler/dist/jquery.formstyler.js",
		"app/js/main.js",
	])
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(dest("app/js"))
		.pipe(browserSync.stream());
}

const htmlInclude = () => {
	return src(["app/html/*.html"]) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы
		.pipe(
			fileInclude({
				prefix: "@",
				basepath: "@file",
			})
		)
		.pipe(dest("app")) // указываем, в какую папку поместить готовый файл html
		.pipe(browserSync.stream());
};

//-- Обработка картинок
function images() {
	return src("app/images/**/*.*")
		.pipe(
			imagemin([
				imagemin.gifsicle({
					interlaced: true,
				}),
				imagemin.mozjpeg({
					quality: 80,
					progressive: true,
				}),
				imagemin.optipng({
					optimizationLevel: 5,
				}),
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: true,
						},
						{
							cleanupIDs: false,
						},
					],
				}),
			])
		)
		.pipe(dest("dist/images"));
}

function svgSprites() {
	return src("app/images/icons/*.svg")
		.pipe(
			cheerio({
				run: ($) => {
					$("[fill]").removeAttr("fill");
					$("[stroke]").removeAttr("stroke");
					$("[style]").removeAttr("style");
				},
				parserOptions: { xmlMode: true },
			})
		)
		.pipe(replace("&gt;", ">")) // боремся с заменой символа
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg",
					},
				},
			})
		)
		.pipe(dest("app/images"));
}

function build() {
	return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
		base: "app",
	}).pipe(dest("dist"));
}

function cleanDist() {
	return del("dist");
}

function watching() {
	watch(["app/scss/**/*.scss"], styles);
	watch(["app/images/icons/*.svg"], svgSprites);
	watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
	watch(["app/**/*.html"]).on("change", browserSync.reload);
	watch(["app/html/**/*.html"], htmlInclude);
}

exports.svgSprites = svgSprites;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.htmlInclude = htmlInclude;

exports.default = parallel(
	htmlInclude,
	svgSprites,
	styles,
	scripts,
	browsersync,
	watching
);
