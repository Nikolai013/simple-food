$(function () {
	$(".select-style").styler({});
	//stars
	$(".stars").rateYo({
		normalFill: "#C1C1C1",
		ratedFill: "#FFB800",
		starWidth: "16px",
		readOnly: true,
	});
	$(".add-review__stars").rateYo({
		normalFill: "#C1C1C1",
		ratedFill: "#FFB800",
		starWidth: "16px",
	});
	//Price-filter
	var $range = $(".js-range-slider"),
		$inputFrom = $(".js-input-from"),
		$inputTo = $(".js-input-to"),
		instance,
		min = 0,
		max = 1000,
		from = 0,
		to = 0;
	$(".catalog__input").ionRangeSlider({
		skin: "round",
		type: "double",
		min: min,
		max: max,
		from: 200,
		to: 800,
		onStart: updateInputs,
		onChange: updateInputs,
		hide_from_to: true,
		hide_min_max: true,
	});
	instance = $range.data("ionRangeSlider");

	function updateInputs(data) {
		from = data.from;
		to = data.to;

		$inputFrom.prop("value", from);
		$inputTo.prop("value", to);
	}

	$inputFrom.on("input", function () {
		var val = $(this).prop("value");
		if (val < min) {
			val = min;
		} else if (val > to) {
			val = to;
		}
		instance.update({
			from: val,
		});
	});

	$inputTo.on("input", function () {
		var val = $(this).prop("value");
		if (val < from) {
			val = from;
		} else if (val > max) {
			val = max;
		}

		instance.update({
			to: val,
		});
	});

	//slider

	var swiper = new Swiper(".product__gallery", {
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	$(".product__img").magnificPopup({
		type: "image",
		items: {
			src: "../images/food-cart/gallery.jpg",
		},
	});

	$(".reviews__slider").slick({
		dots: true,
		arrows: true,
		prevArrow:
			'<button type="button" class="reviews__arrow slick-prev"><svg width="11" height="19" viewBox="0 0 11 19" xmlns="http://www.w3.org/2000/svg"><path d = "M8.19676 18.0492L0.450821 10.3033C-0.150273 9.69905 -0.150273 8.72311 0.450821 8.11889L8.19676 0.372949C8.77613 -0.124317 9.63285 -0.124317 10.2122 0.372949C10.8614 0.929121 10.9372 1.90818 10.3811 2.55732L3.73512 9.20334L10.3811 15.8648C10.9822 16.469 10.9822 17.445 10.3811 18.0492C9.77691 18.6503 8.8009 18.6503 8.19676 18.0492Z"/></svg></button>',
		nextArrow:
			'<button type="button" class="reviews__arrow slick-next"><svg width="11" height="19" viewBox="0 0 11 19" xmlns="http://www.w3.org/2000/svg"><path d="M2.80324 18.0492L10.5492 10.3033C11.1503 9.69905 11.1503 8.72311 10.5492 8.11889L2.80324 0.372949C2.22387 -0.124317 1.36715 -0.124317 0.787776 0.372949C0.138636 0.929121 0.0627755 1.90818 0.618947 2.55732L7.26488 9.20334L0.618868 15.8648C0.0177739 16.469 0.0177738 17.445 0.618868 18.0492C1.22309 18.6503 2.1991 18.6503 2.80324 18.0492Z"/></svg></button>',
		appendArrows: ".reviews__slider-control",
		appendDots: ".reviews__dots",
		autoplaySpeed: 2000,
		infinite: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
					arrows: true,
				},
			},
		],
	});

	$(window).on("load resize", function () {
		if ($(window).width() < 768) {
			$(".restorants__list:not(.slick-initialized)").slick({
				centerMode: false,
				dots: true,
				arrows: false,
				slidesToShow: 2,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							variableWidth: false,
							slidesToShow: 1,
						},
					},
				],
			});
		} else {
			$(".restorants__list.slick-initialized").slick("unslick");
		}
	});

	//Slick-catalog
	$(window).on("load resize", function () {
		if ($(window).width() < 768) {
			$(".offers__list:not(.slick-initialized)").slick({
				centerMode: false,
				dots: true,
				arrows: false,
				slidesToShow: 2,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							variableWidth: false,
							slidesToShow: 1,
						},
					},
				],
			});
		} else {
			$(".offers__list.slick-initialized").slick("unslick");
		}
	});

	//add class active

	$(".nav__link").click(function () {
		if ($(this).hasClass("active")) {
			return false;
		}
		$(".nav__link").removeClass("active");
		$(this).addClass("active");
	});
});

//Burger

document.addEventListener("DOMContentLoaded", () => {
	const burger = document.querySelector(".burger");
	const mobileMenu = document.querySelector(".nav-mobile");
	const close = document.querySelector(".nav-mobile__close");
	const bodyLock = document.querySelector("body");

	burger.addEventListener("click", () => {
		mobileMenu.classList.toggle("nav--active");
		if (mobileMenu.classList.contains("nav--active")) {
			burger.classList.add("burger--active");
			bodyLock.classList.add("lock");
		} else {
			burger.classList.remove("burger--active");
			bodyLock.classList.remove("lock");
		}
	});
	close.addEventListener("click", () => {
		mobileMenu.classList.toggle("nav--active");
		if (mobileMenu.classList.contains("nav--active")) {
			bodyLock.classList.add("lock");
		} else {
			bodyLock.classList.remove("lock");
		}
	});
});

document.addEventListener("click", function (e) {
	const burger = document.querySelector(".burger");
	const mobileMenu = document.querySelector(".nav-mobile");
	const bodyLock = document.querySelector("body");

	if (e.target !== burger && e.target !== mobileMenu) {
		burger.classList.remove("burger--active");
		mobileMenu.classList.remove("nav--active");
		bodyLock.classList.remove("lock");
	}
});

//filter btn

document.addEventListener("DOMContentLoaded", () => {
	const filter = document.querySelector(".catalog__filter-btn");
	const mobileFilter = document.querySelector(".catalog__filter");
	const close = document.querySelector(".close");
	const bodyLock = document.querySelector("body");

	filter.addEventListener("click", () => {
		mobileFilter.classList.toggle("catalog__filter--active");
		if (mobileFilter.classList.contains("catalog__filter--active")) {
			filter.classList.add("catalog__filter-btn--active");
			bodyLock.classList.add("lock");
		} else {
			filter.classList.remove("catalog__filter-btn--active");
			bodyLock.classList.remove("lock");
		}
	});
	close.addEventListener("click", () => {
		mobileFilter.classList.toggle("catalog__filter--active");
		if (mobileFilter.classList.contains("catalog__filter--active")) {
			bodyLock.classList.add("lock");
		} else {
			bodyLock.classList.remove("lock");
		}
	});
});

document.addEventListener("click", function (e) {
	const filter = document.querySelector(".catalog__filter-btn");
	const mobileFilter = document.querySelector(".catalog__filter");
	const bodyLock = document.querySelector("body");

	if (e.target !== filter && e.target !== mobileFilter) {
		filter.classList.remove("catalog__filter-btn--active");
		mobileFilter.classList.remove("catalog__filter--active");
		bodyLock.classList.remove("lock");
	}
});

// product +/-
$(document).ready(function () {
	$(".product__input-box span").click(function () {
		var $input = $(this)
			.parents(".product__box-quantity")
			.find("input.product__input");
		if ($(this).hasClass("product__input-minus")) {
			var count = parseFloat($input.val()) - 1;
			count = count < 1 ? 1 : count;
			if (count < 2) {
				$(this).addClass("dis");
			} else {
				$(this).removeClass("dis");
			}
			$input.val(count);
		} else {
			var count = parseFloat($input.val()) + 1;
			$input.val(count);
			if (count > 1) {
				$(this)
					.parents(".product__input")
					.find(".product__input-minus")
					.removeClass("dis");
			}
		}

		$input.change();
		return false;
	});

  $(".product__tab-btn").on("click", function(e){
    e.preventDefault();
    $(".product__tab-btn").removeClass("product__tab-btn--active");
    $(this).addClass("product__tab-btn--active");
  });
});

var mixer = mixitup(".popular__content, .catalog__list, .product__tab-content");
