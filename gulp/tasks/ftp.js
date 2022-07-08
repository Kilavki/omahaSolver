import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;

	const ftpConnect = vinylFTP.create(configFTP);

	return all.gulp.src(all.path.buildDir, {})

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))


		.pipe(ftpConnect.dest(`/${all.path.ftp}/${all.path.rootDir}`));
}