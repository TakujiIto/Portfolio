
/*-----【ページ内スクロール】-----*/
$(function () {

  $('.scroll-btn').click(function (e) {
    const href = $(this).attr('href');
    // ページ内スクロールの場合のみ処理を実行
    //href がページ内リンク（#で始まる）であるかをチェック
    if (href.startsWith('#') && $(href).length) {
      e.preventDefault(); // デフォルト動作（リンク遷移）を防ぐ
      $('html, body').animate({ scrollTop: $(href).offset().top }, 500, "swing");
    }
  });

  $('.top-btn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

})
