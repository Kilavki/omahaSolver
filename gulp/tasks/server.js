export const server = (done) => {
	all.plugins.browserSync.init({
		server: {
			baseDir: `${all.path.build.html}`
		},
		notify: false,
		port: 3000,
	});
}