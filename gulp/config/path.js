// Получение имени папки проекта
import * as nodePath from 'path';
const rootDir = nodePath.basename(nodePath.resolve());

// Основные папки проекта
const buildDir = `./dist`;
const srcDir = `./src`;
const preprocessor = `scss` // для написания на разных стилях sass
const imgFiles = `jpg,jpeg,png,gif,webp`

// Пути и переменные
export const path = {
	src: {
		html: `${srcDir}/*.html`,
		styles: `${srcDir}/styles/style.${preprocessor}`,
		images: `${srcDir}/images/**/*.{${imgFiles}}`,
		svg: `${srcDir}/images/**/*.svg`,
		scripts: `${srcDir}/scripts/app.js`,
		files: `${srcDir}/files/**/*.*`,
		fonts: `${srcDir}/fonts/`,
		svgIcons: `${srcDir}/svgIcons/*.svg`,
	},
	build: {
		html: `${buildDir}/`,
		css: `${buildDir}/css/`,
		img: `${buildDir}/img/`,
		js: `${buildDir}/js/`,
		files: `${buildDir}/files/`,
		fonts: `${buildDir}/fonts/`,
	},
	watch: {
		html: `${srcDir}/**/*.html`,
		styles: `${srcDir}/styles/**/*.${preprocessor}`,
		images: `${srcDir}/images/**/*.{${imgFiles},svg,ico}`,
		scripts: `${srcDir}/scripts/**/*.js`,
		files: `${srcDir}/files/**/*.*`,
	},
	clean: buildDir,
	buildDir: buildDir,
	srcDir: srcDir,
	rootDir: rootDir,
	preprocessor: preprocessor,
	imgFiles: imgFiles,
	ftp: `` // Здесь имя папки на сервере куда заливать
}

// console.log(path.watch.images);