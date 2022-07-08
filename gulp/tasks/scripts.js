import webpack from "webpack-stream";

export const scripts = () => {
	return all.gulp.src(all.path.src.scripts, { sourcemaps: all.isDev })

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "SCRIPTS",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(webpack({
			mode: all.isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js'
			}
		}))

		.pipe(all.gulp.dest(all.path.build.js))
		.pipe(all.plugins.browserSync.stream());
}