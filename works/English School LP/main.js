$(function () {

  $('.hamburger-btn').on('click', function () {
    navToggle();
  });

  $('nav a').on('click', function () {
    navToggle();
  });


  //inview スクロールして領域に入ったらclass付与
  $(".inview-slide-left").on("inview", function () {
    $(this).addClass("slide-left");

  });

  $(".inview-slide-right").on("inview", function () {
    $(this).addClass("slide-right");
  });

  $(".item-inview").on("inview", function () {
    $(this).addClass("zoom");
  });



  function navToggle() {
    $('.hamburger-btn').toggleClass('active');
    if ($('.hamburger-btn').hasClass('active')) {
      $('nav').addClass('active');
    } else {
      $('nav').removeClass('active');
    }
  }


});