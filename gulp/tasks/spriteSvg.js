import svgSprite from "gulp-svg-sprite";

export const spriteSvg = () => {
	return all.gulp.src(all.path.src.svgIcons)

		.pipe(all.plugins.plumber(
			all.plugins.notify.onError({
				title: "SpriteSVG",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					// Создать страницу с перечнем иконок
					example: true
				}
			},
		}
		))
		
		.pipe(all.gulp.dest(`${all.path.srcDir}/images/`));
}