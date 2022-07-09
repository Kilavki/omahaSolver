// Основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

// Импортируем общие плагины
import { plugins } from './gulp/config/plugins.js';

// Передаём значения в глобальную переменную, для видимости
global.all = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	gulp: gulp,
	path: path,
	plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { server } from './gulp/tasks/server.js';
import { html } from './gulp/tasks/html.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { scripts } from './gulp/tasks/scripts.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { spriteSvg } from './gulp/tasks/spriteSvg.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';


// Наблюдение за файлами
function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.styles, styles);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.scripts, scripts);
	gulp.watch(path.watch.files, copy);
} // Для автоматической выгрузки файлов на сервер после изменения gulp.watch(path.watch.html, gulp.series(html, ftp));

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Константа с основными тасками
const mainTasks = gulp.parallel(copy, html, styles, images, scripts);
const buildTasks = gulp.series(fonts, spriteSvg, gulp.parallel(copy, html, styles, images, scripts));
// const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, styles, images, scripts));

// Сценарии выполнения задач
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const start = gulp.series(fonts, spriteSvg, mainTasks);
const build = gulp.series(reset, buildTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспортируем для возможности запуска задач отдельно (из вне)
export { spriteSvg };
export { fonts };
export { reset };
export { start };
export { dev };
export { build };
export { deployZip };
export { deployFTP };


// Выполнение задач по умолчанию
gulp.task('default', dev);