import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlMin from "gulp-htmlmin";

export const html = () => {
	return all.gulp.src(all.path.src.html)

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(fileInclude())

		.pipe(all.plugins.replace(/@img\//g, 'img/'))

		.pipe(all.plugins.if(
			all.isBuild,
			webpHtmlNosvg()
		))

		.pipe(all.plugins.if(
			all.isBuild,
			versionNumber({
				'value': '%DT%',
				'append': {
					'key': '_v',
					'cover': 0,
					'to': [
						'css',
						'js',
					]
				},
				'output': {
					'file': 'gulp/version.json'
				}
			})
		))

		.pipe(all.plugins.if(
			all.isBuild,
			htmlMin({
				collapseWhitespace: true,
				removeComments: true
			})
		))

		.pipe(all.gulp.dest(all.path.build.html))
		.pipe(all.plugins.browserSync.stream());
}