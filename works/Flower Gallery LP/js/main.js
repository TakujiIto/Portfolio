$(function () {

  //? 関数『Toggle_Active』を定義 
  function Toggle_Active() {
    // ハンバーガーボタンにクラス付け外し
    $("#toggle-btn").toggleClass('active');

    //クラスが付く時にnaviにもクラス付与させ。slideToggleで表示。
    if ($("#toggle-btn").hasClass('active')) {
      $('#navi').addClass('active');
      $('#navi').slideToggle(500);
    } else {
      $('#navi').removeClass('active');
      $('#navi').slideUp(500);
    }
  }

  // ハンバーガーボタンとページ内リンク、どちらを押した場合も上記の関数を呼び出す
  // (リンクを押した時にactiveを外してナビメニューを閉じる)
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
    $("html, body").animate({ scrollTop: id_position -80 }, 600, "swing");
    return false;
  });


  //? 関数 heroZoom 
  //?他スコープの 変数scrollPositionは引数で書けば受け取れる
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
    let scrollPosition = $(window).scrollTop();
    //ウィンドウ高さを定義
    let windowHeight = $(window).height();
    //各要素の位置を定義
    let galleryTop = $("#gallery").offset().top;
    let accessTop = $("#access").offset().top;
    let contactTop = $("#contact").offset().top;

    //? スクロール時に関数heroZoomを実行
    heroZoom(scrollPosition);

    //?関数herozoom をwindowサイズ変更時に実行
    $(window).on('load resize', function () {
      let scroll = $(window).scrollTop();
      heroZoom(scroll);
    });

    //? ロゴとトグルボタンの表示 
    if (scrollPosition > 600) {
      $(".logo, #toggle-btn").fadeIn(500);
    } else {
      $(".logo, #toggle-btn").fadeOut(500);
    }

    //? サイドボタンの表示 (gallerey ~ accessの間)
    if (scrollPosition + windowHeight > accessTop) {
      $("#side-btn").removeClass("show");
    } else if (scrollPosition + windowHeight > galleryTop) {
      $("#side-btn").addClass("show");
    } else {
      $("#side-btn").removeClass("show");
    }

    //? 背景の表示
    //条件①スクロール位置はcontactTopを越えたか？
    if (scrollPosition + windowHeight > contactTop) {
      //①が真ならフェードアウト
      $(".bg").fadeOut(500);
      //①が偽かつ、スクロールはaccessTopを越えているか？
      //(つまり access ~ contact の間)
    } else if (scrollPosition + windowHeight > accessTop) {
      $(".bg").fadeIn(500);
      //どちらも偽の場合
    } else {
      $(".bg").fadeOut(500);
    }


    $('#scroll-position-date').text("scroll top = " + Math.floor(scrollPosition));
    $("#window-height-date").text("window height = " + windowHeight);
    $("#now-position-date").text("scroll position = " + Math.floor(windowHeight + scrollPosition));
    $('#content-position-date1').text('ACCESS = ' + Math.floor(accessTop));
    $('#content-position-date2').text("CONTACT = " + Math.floor(contactTop));
  });


  //!inviewイベント 画面内に入ったらclass付与    
  $(".fadein").on("inview", function () {
    $(this).addClass("show");
  });

   $(window).trigger('scroll');


});

