(function($) {
  $(function() {
    $('.modal').modal();
    $('.carousel').carousel({
      dist: -40,
      padding: 200
    });
    // move next carousel
    $('.moveNextCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('next');
    });

    // move prev carousel
    $('.movePrevCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('prev');
    });
    M.updateTextFields();

  }); // end of document ready
})(jQuery); // end of jQuery name space
