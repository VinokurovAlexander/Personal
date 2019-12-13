$('.main-block__btn').click(function() {
  const mainBlock = $(this).closest('.main-block');

  if (!mainBlock.hasClass('main-block--open')) {
    $(this).prev().slideDown(800);
    mainBlock.addClass('main-block--open');
  } else {
    mainBlock.removeClass('main-block--open');
    $(this).addClass('main-block__btn--close');
    $(this).prev().delay(800).slideUp(800);
  }

});
