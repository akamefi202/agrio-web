//メニュークリック
$(function() {

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  console.log(window.innerWidth);
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header_scrolled');
    } else {
      $('#header').removeClass('header_scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header_scrolled');
  }

  var winWidth = $(window).width();
  if (winWidth <= 750) {
    $('.open_btn').on('click', function() {
      $('menu_box').slideToggle();
    });
  }

  var product_category_list_width = 0;
  var product_category_item_element = $('#products .product_category_item');
  if (product_category_item_element.length > 0) {
    for (let nI = 0; nI < product_category_item_element.length; nI++) {
      product_category_list_width += $(product_category_item_element[nI]).innerWidth();
    }
  }

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > ($('#wrapper').height() - $(window).height() - 3)) {
      $('.site_extra_link_wrap').addClass('site_extra_scrolled');
    } else {
      $('.site_extra_link_wrap').removeClass('site_extra_scrolled');
    }

    if ($(window).scrollTop() > 100) {
      $('.site_extra_link_wrap').addClass('site_extra_scrolled');
    }

    if (product_category_list_width > $('#products .product_category_list').innerWidth()) {
      $('#products .product_category_list').addClass('pb_15');
      $('#products .product_category_body').css('width', product_category_list_width + "px");
    } else {
      $('#products .product_category_list').removeClass('pb_15');
    }

  });

  if ($(window).innerWidth() < 750) {
    $('#products .product_category_list').addClass('pb_15');
    $('#products .product_category_body').css('width', product_category_list_width + "px");
  }

  var product_category_arr = [];

  product_category_arr['pesticides'] = ["殺虫剤", "殺菌剤", "殺虫殺菌剤", "殺ダニ剤", "ナメクジ駆除剤", "水稲用除草剤", "その他除草剤", "植物成長調整剤"];
  product_category_arr['fertilizer'] = ["養液栽培用肥料", "PH調整剤", "園芸用追肥肥料", "育苗用肥料", "葉面散布用肥料", "亜りん酸肥料", "カルシウム補給剤", "その他"];
  product_category_arr['nutrient'] = ["養液土耕栽培用肥料", "養液土耕栽培システム"];
  product_category_arr['cut_flowers'] = ["切り花ながもち液", "家庭園芸用液体肥料"];
  product_category_arr['biostimulant'] = ["殺虫剤", "殺菌剤", "殺虫殺菌剤", "殺ダニ剤", "ナメクジ駆除剤", "水稲用除草剤", "その他除草剤", "植物成長調整剤"];

  var selectbox_category_arr = product_category_arr['pesticides'];
  var search_type_2_main_selectbox_ele = $('.product_search_input_box .product_search_type_2 .product_main_category select');

  $(search_type_2_main_selectbox_ele).on('change', function() {
    if ($(this).val() == 'pesticides') {
      selectbox_category_arr = product_category_arr['pesticides'];
    } else if ($(this).val() == 'fertilizer') {
      selectbox_category_arr = product_category_arr['fertilizer'];
    } else if ($(this).val() == 'nutrient') {
      selectbox_category_arr = product_category_arr['nutrient'];
    } else if ($(this).val() == 'cut_flowers') {
      selectbox_category_arr = product_category_arr['cut_flowers'];
    } else if ($(this).val() == 'biostimulant') {
      selectbox_category_arr = product_category_arr['biostimulant'];
    }
    add_tag_product_sub_category_selectbox();
  });

  if ($(search_type_2_main_selectbox_ele).val() == 'pesticides') {
    selectbox_category_arr = product_category_arr['pesticides'];
  } else if ($(search_type_2_main_selectbox_ele).val() == 'fertilizer') {
    selectbox_category_arr = product_category_arr['fertilizer'];
  } else if ($(search_type_2_main_selectbox_ele).val() == 'nutrient') {
    selectbox_category_arr = product_category_arr['nutrient'];
  } else if ($(search_type_2_main_selectbox_ele).val() == 'cut_flowers') {
    selectbox_category_arr = product_category_arr['cut_flowers'];
  } else if ($(search_type_2_main_selectbox_ele).val() == 'biostimulant') {
    selectbox_category_arr = product_category_arr['biostimulant'];
  }

  add_tag_product_sub_category_selectbox();

  function add_tag_product_sub_category_selectbox() {
    console.log(selectbox_category_arr);
    var selectbox_list_tags = '<option value="0">-</option>';
    for (let index = 0; index < selectbox_category_arr.length; index++) {
      selectbox_list_tags += '<option value="' + selectbox_category_arr[index] + '">' + selectbox_category_arr[index] + '</option>';
    }
    $('.product_search_input_box .product_search_type_2 .product_sub_category select').html(selectbox_list_tags);
  }

  // modal

  var product_custom_modal = $("#product_custom_modal");

  var modal_close_span = $(".close")[0];

  $('.product_list_table table a').on("click", function(e) {
    e.preventDefault();
    $(product_custom_modal).css("display", "block");
    $('body').toggleClass('modal_active');
  });

  $('.close_modal_toggle, .modal_close').on("click", function(e) {
    e.preventDefault();
    $(product_custom_modal).css("display", "none");
    $('body').removeClass('modal_active');
  });

  $(window).on('click', function(event) {
    if (event.target.id == 'product_custom_modal') {
      $(product_custom_modal).css("display", "none");
      $('body').removeClass('modal_active');
    }
  });
});


//ハンバーガーメニュー
$(function() {
  var winWidth = $(window).width();
  if (winWidth <= 750) {
    $('header .open_btn').on('click', function() {
      $('header .menu_box').addClass('active');
    });

    $('header .close_btn').on('click', function() {
      $('header .menu_box').removeClass('active');
      $('header .open_btn').removeClass('active');
    });
  }

  $('.gallery_top').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    // fade: true,
    // speed: 800,
    cssEase: 'ease-in-out',
  });

  $('.products_list_slider').slick({
    infinite: false,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: false,
    cssEase: 'ease-in-out',
    nextArrow: $('#product_next'),
    prevArrow: $('#product_prev'),
    responsive: [{
        breakpoint: 750,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      }
    ]

  });

  $('.csr_initiation_slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    nextArrow: $('#initiation_next'),
    prevArrow: $('#initiation_prev')
  });


});