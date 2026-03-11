$(function () {

  //? 関数『Toggle_Active』を定義 
  function Toggle_Active() {
    // ハンバーガーボタンにクラス付け外し
    $("#toggle-btn").toggleClass('active');

    // btnにactiveが付いたらnaviをslideToggle(高さを元に戻す)。
    if ($("#toggle-btn").hasClass('active')) {
      $('#navi').slideToggle(500);
    } else {
      $('#navi').slideUp(500);
    }
  }

  // ボタンかリンクを押した時にactiveを外す
  $("#toggle-btn").on("click", function () {
    Toggle_Active();
  });
  $('#navi a').on('click', function () {
    Toggle_Active();
  });


  //! ページ内ジャンプ                           
  //！『#から始まるa』のクリックイベント
  $('a[href^="#"]').click(function () {
    let href_date = $(this).attr("href");

    // 条件演算子『?』を用い、target-idを定義
    let target_id = $(href_date == "#" || href_date == "" ? "html" : href_date);

    // トップからtarget-idまでの距離をid-positionとする
    let id_position = target_id.offset().top;

    // ページトップからid-positionｍでスクロールアニメーション
    $("html, body").animate({ scrollTop: id_position - 80 }, 600, "swing");
    return false;
  });


  //? 関数 heroZoom 
  //?他スコープの 変数scrollPositionは引数で受けとる
  function heroZoom(scrollPosition) {
    if (window.innerWidth > 900) {
      $("#hero img").css({ 'width': 100 / 3 + scrollPosition / 10 + '%' });
    } else {
      $("#hero img").css({
        'width': 100 - scrollPosition / 10 + '%'
      });
    }
  }

  //!スクロールイベント                          
  $(window).scroll(function () {

    //現在のスクロール位置を定義
    let scrollTop = $(window).scrollTop();
    //ウィンドウ高さを定義
    let windowHeight = $(window).height();
    //各要素の位置を定義
    let galleryTop = $("#gallery").offset().top;
    let accessTop = $("#access").offset().top;
    let contactTop = $("#contact").offset().top;

    //? スクロール時に関数heroZoomを実行
    heroZoom(scrollTop);

    //?関数herozoom をwindowサイズ変更時に実行
    $(window).on('load resize', function () {
      let scroll = $(window).scrollTop();
      heroZoom(scroll);
    });

    //? ロゴとトグルボタンの表示 
    if (scrollTop > 600) {
      $(".logo, #toggle-btn").fadeIn(500);
    } else {
      $(".logo, #toggle-btn").fadeOut(500);
    }

    //? サイドボタンの表示 (gallerey ~ accessの間)
    if (scrollTop + windowHeight > accessTop) {
      $("#side-btn").removeClass("show");
    } else if (scrollTop + windowHeight > galleryTop) {
      $("#side-btn").addClass("show");
    } else {
      $("#side-btn").removeClass("show");
    }

    //? 背景の表示
    // スクロール位置がCONTACT ~ ACCESS間だけ表示
    if (scrollTop + windowHeight > contactTop) {
      $(".bg").fadeOut(500);
      $("#position-date").removeClass("active");
    } else if (scrollTop + windowHeight > accessTop) {
      $(".bg").fadeIn(500);
      $("#position-date").addClass("active");
    } else {
      $(".bg").fadeOut(500);
      $("#position-date").removeClass("active");
    }

    // スクロール数値計
    $('#scroll-position-date').text("scroll top = " + Math.floor(scrollTop));
    $("#window-height-date").text("window height = " + windowHeight);
    $("#now-position-date").text("scroll position = " + Math.floor(windowHeight + scrollTop));
    $('#content-position-date1').text('ACCESS = ' + Math.floor(accessTop));
    $('#content-position-date2').text("CONTACT = " + Math.floor(contactTop));
  });


  //!inviewイベント 画面内に入ったらclass付与    
  $(".fadein").on("inview", function () {
    $(this).addClass("show");
  });

  $(window).trigger('scroll');


});

