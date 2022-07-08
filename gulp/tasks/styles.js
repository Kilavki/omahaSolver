import dartSass from "sass";
import gulpSass from "gulp-sass";


import groupCssMediaQueries from "gulp-group-css-media-queries";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css"
// import { tree } from "gulp";

const sass = gulpSass(dartSass);

export const styles = () => {
	return all.gulp.src(all.path.src.styles, { sourcemaps: all.isDev })

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "STYLES",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(all.plugins.replace(/@img\//g, '../img/'))

		.pipe(sass({
			outputStyle: 'expanded'
		}))

		// .pipe(groupCssMediaQueries())

		.pipe(all.plugins.if(
			all.isBuild,
			groupCssMediaQueries()
		))

		.pipe(all.plugins.if(
			all.isBuild,
			webpcss({
				webpClass: ".webp",
				noWebpClass: ".no-webp"
			})
		))

		.pipe(all.plugins.if(
			all.isBuild,
			autoPrefixer({
				grid: true,
				overrideBrowserslist: ["last 3 version"],
				cascade: true,
			})
		))

		// До сжатия выгружаем итоговый файл
		.pipe(all.gulp.dest(all.path.build.css))

		.pipe(cleanCss())

		.pipe(all.plugins.rename({
			extname: '.min.css'
		}))

		.pipe(all.gulp.dest(all.path.build.css))
		.pipe(all.plugins.browserSync.stream());
}