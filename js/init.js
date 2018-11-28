(function($) {
  $(function() {
    $('.modal').modal();
    $('#onBoarding').modal('open'); 
    $('.carousel').carousel({
      dist: -40,
      padding: 200
    });
    // move next carousel
    $('.moveNextCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('next');
      console.log("Right");
    });

    // move prev carousel
    $('.movePrevCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('prev');
      console.log("Left");
    });
    M.updateTextFields();

  }); // end of document ready
})(jQuery); // end of jQuery name space
