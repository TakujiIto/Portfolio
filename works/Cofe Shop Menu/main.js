
$(function(){

  $('a[href^="#"]').click(function(){

    // リンクを取得
    let href= $(this).attr("href");
   
    //  href が "#" または "空欄" なら html
    // それ以外ならhref(リンク)を代入
    let target = $(href == "#" || href == "" ? 'html' : href);

    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;

    //scrollTop:要素の位置   までswing
    $("html, body").animate({scrollTop:position}, 600, "swing");
    return false;
  });
})