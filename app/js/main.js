$(function () {
  $('.reviews__slider').slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="reviews__arrow slick-prev"><svg width="11" height="19" viewBox="0 0 11 19" xmlns="http://www.w3.org/2000/svg"><path d = "M8.19676 18.0492L0.450821 10.3033C-0.150273 9.69905 -0.150273 8.72311 0.450821 8.11889L8.19676 0.372949C8.77613 -0.124317 9.63285 -0.124317 10.2122 0.372949C10.8614 0.929121 10.9372 1.90818 10.3811 2.55732L3.73512 9.20334L10.3811 15.8648C10.9822 16.469 10.9822 17.445 10.3811 18.0492C9.77691 18.6503 8.8009 18.6503 8.19676 18.0492Z"/></svg></button>',
    nextArrow: '<button type="button" class="reviews__arrow slick-next"><svg width="11" height="19" viewBox="0 0 11 19" xmlns="http://www.w3.org/2000/svg"><path d="M2.80324 18.0492L10.5492 10.3033C11.1503 9.69905 11.1503 8.72311 10.5492 8.11889L2.80324 0.372949C2.22387 -0.124317 1.36715 -0.124317 0.787776 0.372949C0.138636 0.929121 0.0627755 1.90818 0.618947 2.55732L7.26488 9.20334L0.618868 15.8648C0.0177739 16.469 0.0177738 17.445 0.618868 18.0492C1.22309 18.6503 2.1991 18.6503 2.80324 18.0492Z"/></svg></button>',
    appendArrows: '.reviews__slider-control',
    appendDots: '.reviews__dots'
  })

  var mixer = mixitup('.popular__content');
});