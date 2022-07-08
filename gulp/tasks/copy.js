export const copy = () => {
	return all.gulp.src(all.path.src.files)
		.pipe(all.gulp.dest(all.path.build.files))
}