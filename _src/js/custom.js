
//===== Touch event check:
if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
  document.body.classList.add('_touch');
} else {
  document.body.classList.add('_no-touch');
}

//===== Mobile Navigation:

// Hamburger toggle:
$('.hamburger').on('click', function (event) {
  event.preventDefault();

  $('.hamburger, .nav').toggleClass('is-active');
  $('body').toggleClass('_of-hidden');
});

// Hide the menu and return the standard view of the hamburger:
$('.nav a').on('click', function (event) {
  event.preventDefault();

  $('.hamburger, .nav').removeClass('is-active');
  $('body').removeClass('_of-hidden');
});

// Resetting scroll for menu:
$('.hamburger, .nav a').on('click', function (event) {
  event.preventDefault();

  $('.nav').delay(350).queue(function (reset_scroll) {
    $(this).scrollTop(0);
    reset_scroll();
  });
});

// Removing classes for menu if window resize:
$(window).on('resize', function () {
  var width = $(document).width();

  if (width > 991) {
    $('body').removeClass('_of-hidden');
    $('.hamburger, .nav').removeClass('is-active');
  }
});

//===== Smooth scroll:
$('a[href^="#"]:not([href="#"])').on('click', function(event) {
  event.preventDefault();

  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 350);
});

//===== Owl carousel for section: Testimonials
$('.owl-carousel').owlCarousel({
  items: 1,
  nav:  true,
  navText: ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
  smartSpeed: 700,
  responsive: {
    0: {
      margin: 30
    },
    768: {
      margin: 50
    }
  }
});
