
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

  $(this).toggleClass('is-active');
  $('.mobile-nav').fadeToggle();
  $('body').toggleClass('_of-hidden');
});

// Hide the menu and return the standard view of the hamburger:
$('.mobile-nav a').on('click', function (event) {
  event.preventDefault();

  $('.hamburger').removeClass('is-active');
  $('.mobile-nav').fadeToggle();
  $('body').removeClass('_of-hidden');
});

// Resetting scroll for menu:
$('.hamburger, .mobile-nav a').on('click', function (event) {
  event.preventDefault();

  $('.mobile-nav__inner').delay(350).queue(function (reset_scroll) {
    $(this).scrollTop(0);
    reset_scroll();
  });
});

// Removing classes for menu if window resize:
$(window).on('resize', function () {
  var width = $(document).width();

  if (width > 991) {
    $('body').removeClass('_of-hidden');
    $('.hamburger').removeClass('is-active');
    $('.mobile-nav').attr('style', 'display: none');
  }
});

//===== Smooth scroll:
$('[data-scroll]').on('click', function(event) {
  event.preventDefault();

  var sectionId     = $(this).data('scroll'),
      sectionOffset = $(sectionId).offset().top;

  // active link change:
  // $('.nav a').removeClass('is-active');
  // $(this).addClass('is-active');

  $('html, body').animate({
    scrollTop: sectionOffset // here it will be possible to take away the height of the fixed-navigation for correct scrolling
  }, 0);
});
