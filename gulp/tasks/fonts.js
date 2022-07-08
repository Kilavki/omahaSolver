import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


export const otfToTtf = () => {
	// Ищем шрифты otf
	return all.gulp.src(`${all.path.srcDir}/fonts/*.otf`, {})

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))

		// Конвертируем в ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Выгружаем в исходную папку
		.pipe(all.gulp.dest(`${all.path.srcDir}/fonts/`))
}

export const ttfToWoff = () => {
	// Ищем шрифты ttf
	return all.gulp.src(`${all.path.srcDir}/fonts/*.ttf`, {})

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		// Конвертируем в woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Выгружаем в папку с результатами
		.pipe(all.gulp.dest(`${all.path.build.fonts}`))

		// Ищем шрифты ttf
		.pipe(all.gulp.src(`${all.path.srcDir}/fonts/*.ttf`, {}))
		// Конвертируем в woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатами
		.pipe(all.gulp.dest(`${all.path.build.fonts}`))
}

export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${all.path.srcDir}/styles/fonts.scss`;
	
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(all.path.build.fonts, function (err, fontsFiles) {
		
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаём его
				fs.writeFile(fontsFile, '', cb);
				
				let newFileOnly;
				
				for (var i = 0; i < fontsFiles.length; i++) {
					
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
							`@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../fonts/${fontFileName}.woff2") format("woff2"),
										 url("../fonts/${fontFileName}.woff") format("woff");
								font-weight: ${fontWeight};
								font-style: normal;
							}\r\n`, cb);
						// 
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл scss/fonts.scss уже существует. Для обновления нужно его удалить.");
			}
		}
	});

	return all.gulp.src(`${all.path.srcDir}`);
	function cb() { }
}