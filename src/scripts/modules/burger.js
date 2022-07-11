// Бургер
const iconBurger = document.querySelector('.icon-burger');
const menuBody = document.querySelector('.menu__body');
const headerButtons = document.querySelector('.header__buttons');

if (iconBurger) {
	iconBurger.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconBurger.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		headerButtons.classList.toggle('_active');
	})
}