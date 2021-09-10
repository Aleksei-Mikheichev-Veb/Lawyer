// Бургер
// let menuActive = document.querySelector('.icon-menu');
// let menuActiveMenu = document.querySelector('.menu__body');
// let linkFirst= document.querySelector('.fullscreen__link');
// menuActive.addEventListener('click', function() {
// 	menuActive.classList.toggle('icon-menu__active');
// 	menuActiveMenu.classList.toggle('menu__body__active');
// 	linkFirst.classList.toggle('fullscreen__link__active');
// })

let windowW = document.documentElement.clientWidth;


// jquery для формы инпута

$(document).ready(function() {
	 $("#phone").mask("+7 (999) 999-99-99");
	 $("#phone2").mask("+7 (999) 999-99-99");
});

// Модальное окно

let popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 800;

for(let popupLink of popupLinks){
	popupLink.addEventListener('click', function(e) {
		let popupName = popupLink.getAttribute('href').replace('#', '');
		let curentPopup = document.getElementById(popupName);
		popupOpen(curentPopup);
		e.preventDefault();
	})
}
let popupCloseIcons = document.querySelectorAll('.close-popup');
for(let popupCloseIcon of popupCloseIcons){
	popupCloseIcon.addEventListener('click', function(e) {
		popupClose(this.closest('.popup'));
		e.preventDefault();
	})
}
function popupOpen(curentPopup) {
	if(curentPopup && unlock){
		const popupActive = document.querySelector('.popup.open');
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		})
	}
}
function popupClose(popupActive, doUnlock = true) {
		popupActive.classList.remove('open');
}
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();


// КНОПОЧКА ВВЕРХ
const offset1 = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';


const getTop = () => window.pageYoffset || document.documentElement.scrollTop;

// Заполнение
const updateDashoffset = () => {
	const height = document.documentElement.scrollHeight - window.innerHeight;
	const dashoffset = pathLength - (getTop() * pathLength/ height);
	 
	scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};
// Появление штуки с прокруткой
window.addEventListener('scroll', function() {
	updateDashoffset();
	if(getTop() > offset1){
		scrollUp.classList.add('scroll-up__active');
	}else{
		scrollUp.classList.remove('scroll-up__active');
	}
})
// Возвращает наверх
scrollUp.addEventListener('click', function() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});


// Счетчик чисел

let counters = document.querySelectorAll('.counter__number');

counters.forEach(counter => {
	counter.innerText = '0';

	const updateCounter = () => {
		const target = +counter.getAttribute('data-target');
		const c = +counter.innerText;

		const increment = target / 100;

		if(c < target){
			counter.innerText = `${Math.ceil(c + increment)}`;
			setTimeout(updateCounter, 10);
		}else{
			counter.innerText = target;
		}
	}
	updateCounter();
})

// Плавное появление элементов
	
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
		// Прилипающее меню
		//-----------------------------------------------//
		if (windowW > 990) {
				let menu = document.querySelector('.header');
				let menuHeight = menu.offsetHeight;
				let fullscreen = document.querySelector('.why');
				let fullscreenHeight = offset(fullscreen).top;
				const scrollY = window.scrollY || window.pageYOffset;
				function menuFixed() {
					if(scrollY > fullscreenHeight){
						menu.classList.add('act');
						}else{menu.classList.remove('act');
					}
				}
				menuFixed();
			}
		
		// console.log(fullscreenHeight);
		// console.log(scrollY);
		// console.log(document.querySelector('.header').offsetHeight)
		
		
	let windowWidth =  document.documentElement.clientWidth;
	if(windowWidth < 991){
		const itemShowsDis = document.querySelectorAll('.itemShow');
		for(let itemShow of itemShowsDis ){
			itemShow.classList.remove('itemShow');
		}
		
	}
		//-----------------------------------------------//
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

// Движение 1го фона
let background = document.querySelector('.fullscreen__bg');
window.addEventListener('scroll', bgMove)

function bgMove() {
	background.style.top = - window.pageYOffset/2 + 'px';
}

// Слайдер
$(document).ready(function(){
	$('.slider').slick({
		dots:true,
		adaptiveHeight:true,
		slidesToShow:1,
		// autoplay:true,
		// autoplaySpeed:3000,
		centerMode:true,
		centerPadding: '10px',
		infinite:true
		// variableWidth:true
		
	})
});



const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else {
	document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			
			if (windowW <= 990) {
				gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset ;
			}
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
