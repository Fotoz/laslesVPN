//===== jQuery:
@@include('../../node_modules/jquery/dist/jquery.js')

//===== Owl Carousel:
// Main:
@@include('../libs/owl-carousel/js/owl.carousel.js')
// Navigation:
@@include('../libs/owl-carousel/js/owl.navigation.js')

$(function () {
//===== User scripts:
@@include('custom.js')
});
