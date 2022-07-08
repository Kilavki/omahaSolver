import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify";  // Сообщения (подсказки)
import browserSync from "browser-sync"; // Локальный сервер
import rename from "gulp-rename"; // Переименование файлов
import newer from "gulp-newer"; // Проверка версий файлов
import gulpIf from "gulp-if"; // Условное ветвление для задач

// Экспортируем общие плагины
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browserSync: browserSync,
	rename: rename,
	newer: newer,
	if: gulpIf,
}