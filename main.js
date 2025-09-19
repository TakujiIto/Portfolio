$(function () {


  // 背景切替設定
  let sectionImage = $('.section').first().data('bg');
  let currentLayer = 1;

  $('#background-layer-' + currentLayer)
    .css('background-image', 'url(' + sectionImage + ')')
    .css('opacity', 1);

  function changeBG(newImageUrl, layerNumber) {
    if (newImageUrl === sectionImage) return;
    $('.background-layer').css('opacity', 0);
    $('#background-layer-' + layerNumber)
      .css('background-image', 'url(' + newImageUrl + ')')
      .css('opacity', 1);
    sectionImage = newImageUrl;
    currentLayer = layerNumber;
  }


  // ビューボタンで全画面非表示
 $('.view-btn, .sp-view-btn').on('click', function (e) {
  e.stopPropagation();

  // ヘッダー・メイン・フッター非表示
  $('#header, #main, #footer').addClass('overlay-hidden');
  $('#bg-onview').addClass('visible');

  // どこかクリックされたら元に戻す
  $(document).one('click', function () {
    $('#header, #main, #footer').removeClass('overlay-hidden');
    $('#bg-onview').removeClass('visible');
  });
});



  // スマホNAVオープンBTN ＋ジャンプ
  $('#sp-nav-btn').on('click', function () {
    $(this).toggleClass('open');       
    $('.sp-nav').toggleClass('open'); 
  });
  $('a[href^="#"]').on('click', function () {
    $('#nav-btn').removeClass('open');
    $('.sp-nav').removeClass('open');
  });

  



  // !▼▼▼▼▼  スクロール ▼▼▼▼▼     

  $(window).on('scroll resize', function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    //画面中央
    const scrollCenter = scrollTop + windowHeight / 2;
    //上から200px 
    const scrollTop200 = scrollTop + 200;
    //下から200px
    const scrollBottom200 = scrollTop + windowHeight - 200;


    // 背景切替
    $('.section').each(function (i) {
      const sectionTop = $(this).offset().top;
      if (scrollBottom200 >= sectionTop) {
        const newBackgroundImage = $(this).data('bg');
        const layerNumber = i + 1;
        changeBG(newBackgroundImage, layerNumber);
      }
    });


    // セクション名切替
    let currentTitle = '';
    $('.section').each(function () {
      const $section = $(this);
      const sectionTop = $section.offset().top;
      const sectionHeight = $section.outerHeight();

      if (scrollBottom200 > sectionTop && scrollBottom200  < sectionTop + sectionHeight) {
        currentTitle = $section.data('title');
      }
    });

    if (currentTitle && $('.sec-title:visible').text() !== currentTitle) {
      $('.sec-title:visible').fadeOut(100, function () {
        $(this).text(currentTitle).fadeIn(400);
      });
    }


    // シャドウレイヤー切替
    const startSection = $('.section-2');
    const endSection = $('.section-6');

    if (startSection.length && endSection.length) {
      const startTop = startSection.offset().top;
      const endTop = endSection.offset().top;

      const shouldAddClass = (startTop < scrollBottom200) && (endTop > scrollBottom200);
      $('.shadow-layer').toggleClass('view', shouldAddClass);
    }


    // ABOUTアニメーション
    $('.about-box, .sp-about-box').each(function () {
      const elementTop = $(this).offset().top;
      if (elementTop < scrollBottom200) {
        $(this).addClass('fade draw');
      }
    });


    // WORKテキスト登場
    $('.work-wrapper:visible').each(function () {
      const $wrapper = $(this);
      const $left = $wrapper.find('.work-left');

      const wrapperTop = $wrapper.offset().top;
      const wrapperBottom = wrapperTop + $wrapper.outerHeight();

      // 画面中央をまたぐ範囲でのみ visible を付与
      if (wrapperTop < scrollCenter && wrapperBottom > scrollCenter) {
        $left.addClass('visible');
      } else {
        $left.removeClass('visible');
      }
    });


    // スキルアイコンアニメーション
    $('.skill-container').each(function () {
      const elementTop = $(this).offset().top;
      if (elementTop < scrollBottom200) {
        $(this).addClass('inview');
      }
    });

    // フッター関連
    const containerTop = $('.end-wrapper').offset().top;
    if (containerTop < scrollTop200) {
      $('#canvas-container, .contact-btn').addClass('visible');
    } else {
      $('#canvas-container, .contact-btn').removeClass('visible');
    }
  });
  // !▲▲▲▲ スクロール関数ここまで ▲▲▲▲   


  //WORKセクション テキスト&画像切替
  const originalTitle = $('.site-title').html();
  const originalText = $('.site-text').html();
  function fadeSwitch($el, newContent, isHtml = false) {
    $el.stop(true, true).fadeOut(200, function () {
      if ($el.is('img')) {
        $el.attr('src', newContent);
      } else if (isHtml) {
        $el.html(newContent);
      } else {
        $el.text(newContent);
      }
      $el.fadeIn(400);
    });
  }
  $('.site-thumbnails li').on('mouseenter', function () {
    const $this = $(this);
    const desktopImg = $this.data('img-desktop');
    const responsiveImg = $this.data('img-responsive');
    const title = $this.data('title');
    const text = $this.data('text')?.replace(/\n/g, '<br>');

    if (desktopImg) {
      fadeSwitch($('.desktop-img'), desktopImg);
    }
    if (responsiveImg) {
      fadeSwitch($('.responsive-img'), responsiveImg);
    }
    if (title) {
      fadeSwitch($('.site-title'), title);
    }
    if (text) {
      fadeSwitch($('.site-text'), text, true);
    }
  });

  $('.site-thumbnails').on('mouseleave', function () {
    fadeSwitch($('.site-title'), originalTitle);
    fadeSwitch($('.site-text'), originalText, true);
  });



  //スライド用スクリプト★★★
  $(document).ready(function () {
    // slick 初期化
    $('.slider').slick({
      slidesToShow: 1,
      arrows: false,
      dots: false, // dotsは使わない（外部のSVGで代用する）
      infinite: true,
    });

    // 初期状態のインジケーター
    $('.indicator li').removeClass('active');
    $('.indicator li').eq(0).addClass('active');

    // 初期のタイトルとテキストを設定
    var firstTitle = $('.indicator li').eq(0).data('title');
    var firstText = $('.indicator li').eq(0).data('text');
    $('.making-title').text(firstTitle);
    $('.making-text').text(firstText);

    // 最初のtext-setを表示
    $('.text-set').removeClass('active'); // すべて非表示
    $('.text-set').eq(0).addClass('active'); // 最初のtext-setにactiveを追加

    // スライド変更時（beforeChange）にインジケーター・テキスト更新
    $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      // インジケーターのアクティブ状態を変更
      $('.indicator li').removeClass('active even-slide'); // activeとeven-slide両方外す
      var $nextIndicator = $('.indicator li').eq(nextSlide);
      $nextIndicator.addClass('active');

      // text-setの表示切り替え
      $('.text-set').removeClass('active').removeAttr('id'); // activeとid両方外す
      var $nextText = $('.text-set').eq(nextSlide);
      $nextText.addClass('active');

      // 2, 4, 6番目（index 1, 3, 5）のときにid="after"と.even-slideを付ける
      if (nextSlide === 1 || nextSlide === 3 || nextSlide === 5) {
        $nextText.attr('id', 'after');         // テキストにid
        $nextIndicator.addClass('even-slide'); // インジケーターにクラス
      }
    });



    // スライドボタン
    $('.next-btn').on('click', function () {
      $('.slider').slick('slickNext');
    });


    // パスにホバー時、スライドボタンのテキストを光らせる
    $('.next-btn').on('mouseenter touchstart', function () {
      $(this).closest('.btn-container').addClass('hovered')
        .find('.btn-text').addClass('hovered');
    }).on('mouseleave touchend touchcancel', function () {
      $(this).closest('.btn-container').removeClass('hovered')
        .find('.btn-text').removeClass('hovered');
    });


  });



  // プロフィール名前 フェード ---
  function wrapEachChar($target) {
    const text = $target.text();
    const spanned = text.split('').map(char => {
      const safeChar = char === ' ' ? '\u00A0' : char;
      return `<span style="opacity: 0;">${safeChar}</span>`;
    }).join('');
    $target.html(spanned);
  }
  function animateTextPerChar($target, delay = 0, onComplete = null) {
    const $spans = $target.find('span');
    $spans.each(function (i) {
      $(this).delay(i * 30 + delay).animate({ opacity: 1 }, 100);
    });

    if (onComplete) {
      const totalTime = $spans.length * 30 + delay;
      setTimeout(onComplete, totalTime);
    }
  }
  function initNameFadeIn() {
    const targets = ['#name-en', '#name-slash', '#name-jp'];
    targets.forEach(selector => wrapEachChar($(selector)));
    animateTextPerChar($('#name-en'), 0, function () {
      animateTextPerChar($('#name-slash'), 0, function () {
        animateTextPerChar($('#name-jp'));
      });
    });
  }


  // プロフィール文章アニメーション
  let animated = false;
  $(window).on('scroll', function () {
    const $container = $('.profile-container');
    if (!animated && $container.offset().top <= $(window).scrollTop() + $(window).height() - 200) {
      animated = true;
      $container.addClass('visible');
      initNameFadeIn();
      initProfileFadeIn();
      $('#name-border').addClass('fade');

      // glow-textの表示後に時間差でactiveをつける
      setTimeout(function () {
        $('.glow-text').addClass('active');
      }, 3800); // 表示完了から4000ms後に光らせる
    }
  });

  // プロフィールテキストフェード 
  function wrapTextNodes(node) {
    node.contents().each(function () {
      if (this.nodeType === 3) { // テキストノード
        const text = $(this).text();
        const fragments = text.split('').map(char => {
          return $('<span>').text(char).css('opacity', 0);
        });
        $(this).replaceWith(fragments);
      } else if (this.nodeType === 1) { // 要素ノード
        wrapTextNodes($(this));
      }
    });
  }
  function initProfileFadeIn() {
    const $target = $('.profile-text');
    const original = $target.html().trim();
    $target.empty();
    const $temp = $('<div>').html(original);
    wrapTextNodes($temp);
    $target.append($temp.contents());

    const $allSpans = $target.find('span');
    $allSpans.each(function (i) {
      $(this)
        .delay(i * 5 + 1000)
        .animate({ opacity: 1 }, 100);
    });
  }

  $(window).trigger('scroll');


});







(() => {
  const container = document.getElementById('canvas-container');

  const scene = new THREE.Scene();

  // 初期画面サイズとカメラ設定
  let viewWidth = window.innerWidth;
  let viewHeight = window.innerHeight;

  let particlesCount = viewWidth <= 600 ? 20 : 80; // 初期粒子数

  const camera = new THREE.OrthographicCamera(
    -viewWidth / 2, viewWidth / 2,
    viewHeight / 2, -viewHeight / 2,
    -1000, 1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(viewWidth, viewHeight);
  container.appendChild(renderer.domElement);

  // 粒子属性を初期化する関数
  const initializeParticles = (count) => {
    const positions = new Float32Array(count * 3);
    const baseOpacities = new Float32Array(count);
    const opacityOffsets = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // !  粒子の色 ★★★
    const r = 0 / 255;
    const g = 225 / 255;
    const b = 235 / 255;

    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewWidth;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewHeight;
      positions[i * 3 + 2] = 0;

      baseOpacities[i] = 1 + Math.random() * 0.2;
      opacityOffsets[i] = Math.random() * Math.PI * 2;

      // ! 最小サイズ ＋ ランダム加算サイズ
      sizes[i] = 10 + Math.random() * 15;

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.7,
        y: (Math.random() - 0.5) * 0.5
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('baseOpacity', new THREE.BufferAttribute(baseOpacities, 1));
    geometry.setAttribute('opacityOffset', new THREE.BufferAttribute(opacityOffsets, 1));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry, velocities };
  };

  let { geometry, velocities } = initializeParticles(particlesCount);

  const vertexShader = `
    attribute float baseOpacity;
    attribute float opacityOffset;
    attribute float size;
    attribute vec3 color;
    varying float vOpacity;
    varying vec3 vColor;
    uniform float time;
    void main() {
      vOpacity = baseOpacity * (0.8 + 0.2 * sin(time + opacityOffset));
      vColor = color;
      gl_PointSize = size;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying float vOpacity;
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      float glow = pow(1.0 - dist, 3.0);
      gl_FragColor = vec4(vColor * glow, vOpacity * glow);
      if (dist > 0.5) discard;
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 } }
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate(time) {
    requestAnimationFrame(animate);

    for (let i = 0; i < particlesCount; i++) {
      geometry.attributes.position.array[i * 3] += velocities[i].x;
      geometry.attributes.position.array[i * 3 + 1] += velocities[i].y;

      if (geometry.attributes.position.array[i * 3] > viewWidth / 2) geometry.attributes.position.array[i * 3] = -viewWidth / 2;
      else if (geometry.attributes.position.array[i * 3] < -viewWidth / 2) geometry.attributes.position.array[i * 3] = viewWidth / 2;

      if (geometry.attributes.position.array[i * 3 + 1] > viewHeight / 2) geometry.attributes.position.array[i * 3 + 1] = -viewHeight / 2;
      else if (geometry.attributes.position.array[i * 3 + 1] < -viewHeight / 2) geometry.attributes.position.array[i * 3 + 1] = viewHeight / 2;
    }

    geometry.attributes.position.needsUpdate = true;
    material.uniforms.time.value = time * 0.001;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    viewWidth = window.innerWidth <= 600 ? 600 : window.innerWidth;
    viewHeight = window.innerHeight;
    particlesCount = viewWidth <= 600 ? 30 : 100;

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // 粒子を再初期化
    scene.remove(points);
    ({ geometry, velocities } = initializeParticles(particlesCount));
    points.geometry = geometry;
    scene.add(points);
  });

})();