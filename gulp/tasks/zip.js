import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
	del(`${all.path.rootDir}.zip`)

	return all.gulp.src(`${all.path.buildDir}/**/*.*`, {})

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(zipPlugin(`${all.path.rootDir}.zip`))
		
		.pipe(all.gulp.dest('./'));
}