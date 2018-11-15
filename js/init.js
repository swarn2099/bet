(function($) {
  $(function() {
    $('.modal').modal();
    $('.carousel').carousel({
      dist: -40,
      padding: 200
    });
    M.updateTextFields();

  }); // end of document ready
})(jQuery); // end of jQuery name space
