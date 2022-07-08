import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	return all.gulp.src(all.path.src.images)

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(all.plugins.newer(all.path.build.img))

		.pipe(all.plugins.if(
			all.isBuild,
			webp()
		))

		.pipe(all.plugins.if(
			all.isBuild,
			all.gulp.dest(all.path.build.img)
		))

		.pipe(all.plugins.if(
			all.isBuild,
			all.gulp.src(all.path.src.images)
		))

		.pipe(all.plugins.if(
			all.isBuild,
			all.plugins.newer(all.path.build.img)
		))

		.pipe(all.plugins.if(
			all.isBuild,
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 до 7
			})
		))

		.pipe(all.gulp.dest(all.path.build.img))

		.pipe(all.gulp.src(all.path.src.svg))
		.pipe(all.gulp.dest(all.path.build.img))

		.pipe(all.plugins.browserSync.stream());
}