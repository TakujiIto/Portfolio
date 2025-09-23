$(function () {


  //!カルーセル用 jQueryプラグイン「slick」の設定
  $('.slider-list').slick({

    //前後のスライドの表示
    centerMode: true,
    //centerModeで前後のスライドの表示幅
    centerPadding: '100px',
    //表示するスライド数（）
    slidesToShow: 3,

    //レスポンシブ 768px以下で1枚にする
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '10%',
          slidesToShow: 1
        }
      }
    ]
  });


  
  $('.toggle_btn').on('click', function() {
    $('#header').toggleClass('open');
  });
  
  // #maskやリンクをクリックしたら必ず閉じる
  $('#mask, .scroll-btn').on('click', function() {
    $('#header').removeClass('open');
  });
  


  $('a[href^="#"]').click(function(){
    let href= $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $("html, body").animate( {scrollTop:position}, 600, "swing");
    return false;
  });


  //フェードインアニメーション       
  $(window).scroll(function () {

    //each＝要素全てに処理を繰り返し
    $(".fadein").each(function () {
      // スクロール距離を定義
      let scroll = $(window).scrollTop();
      // ページTOPから要素までの距離(offset)を定義
      let target = $(this).offset().top;
      // 画面の高さを定義
      let windowHeight = $(window).height();

      // 要素がウィンドウ下部から200pxの位置にきたらcss適応
      if (scroll > target - windowHeight + 200) {
        $(this).css('opacity', '1');
        $(this).css('transform', 'translateY(0)');
      }
    });
  });



});
