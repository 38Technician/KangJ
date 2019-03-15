'use strict';

$(function () {

	//顶部广告
	$('.icon-delete').click(function () {
		$(this).parent().css('display', 'none');
		//广告关闭后的导航吸顶
		var navScl = $('.nav-suction-top').offset().top;
		$(window).on('scroll', function () {
			// console.log(navScl);
			var scrollTop = $(document).scrollTop();
			console.log(scrollTop);
			if (scrollTop > navScl) {
				$('.nav-suction-top').css({ 'position': 'fixed', 'top': '0' });
			} else {
				$('.nav-suction-top').css({ 'position': 'absolute', 'top': '0' });
			}
		});
	});
	var $div = $('.nav-hover-div');
	// console.log($div);

	//头部导航
	$.getJSON('../json/XnavTV.json', function (data) {
		var str = '';
		var x = 0;
		for (var _key in data) {

			for (var i in data[_key]) {
				str = ' <div>\n\t\t\t\t\t\t\t<img src="' + data[_key][i].src + '" >\n\t\t\t\t\t\t\t<h4>' + data[_key][i].h4 + '</h4>\n\t\t\t\t\t\t\t<p>' + data[_key][i].p1 + '</p>\n\t\t\t\t\t\t\t<p>' + data[_key][i].p2 + '</p>\n\t\t\t\t\t\t</div>';

				$($div[x]).append(str);
			}
			x++;
		}
	});

	//头部导航吸顶
	var navScl = $('.nav-suction-top').offset().top;
	$(window).on('scroll', function () {
		var scrollTop = $(document).scrollTop();
		//吸顶
		if (scrollTop > navScl) {
			$('.nav-suction-top').css({ 'position': 'fixed', 'top': '0' });
		} else {
			$('.nav-suction-top').css({ 'position': 'absolute', 'top': '0' });
		}
	});

	//购物车
	var cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
	if (!cookieStr) {
		$('.cart-start').css('display', 'block');
	} else {
		var CookieStrToCookieObj = function CookieStrToCookieObj(str) {
			if (!str) {
				return {};
			}
			return JSON.parse(str);
		};

		$('.cart-start').css('display', 'none');

		var cookieObj = CookieStrToCookieObj(cookieStr);

		var cookieObjA = CookieStrToCookieObj(cookieStr);
		var sum = 0;
		var bigSum = 0;
		for (var i in cookieObjA) {
			sum += cookieObjA[i].num;
			// console.log(cookieObj[id].num)
			bigSum += cookieObjA[i].num * cookieObjA[i].price;
		}

		$('#cart-num').html(sum); //角标
		console.log(sum);
		//总数
		$('#goodsNum').html(sum); //件数
		$('#Total').html(bigSum); //总金额


		//遍历对象
		for (var key in cookieObj) {
			var obj = cookieObj[key];
			//字符串模板
			var str = '\n\t\t\t\t<div class="cart-TV" data-good-id="' + key + '">\n\t\t\t\t\t<div class="cartTV1"></div>\n\t\t\t\t\t<div class="cartTV2">\n\t\t\t\t\t\t<div class="mycart-img">\n\t\t\t\t\t\t\t<img src="' + cookieObj[key].src + '" >\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="mycart-txt">\n\t\t\t\t\t\t\t<p>' + cookieObj[key].p1 + '</p>\n\t\t\t\t\t\t\t<p>LED43E330C</p>\n\t\t\t\t\t\t\t<p>' + cookieObj[key].p2 + '</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="cartTV3">' + cookieObj[key].price + '</div>\n\t\t\t\t\t<div class="cartTV4">\n\t\t\t\t\t\t<div class="minus">-</div>\n\t\t\t\t\t\t<input type="text" class="goodsInputNum" value="' + cookieObj[key].num + '"/>\n\t\t\t\t\t\t<div class="plus">+</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="cartTV5 smallTotal">' + cookieObj[key].num * cookieObj[key].price + '</div>\n\t\t\t\t\t<div class="cartTV6">\n\t\t\t\t\t\t<a href="##" class="del">\u5220\u9664</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t';
			$('.mycart').append(str);
		}

		//减号
		var $minus = $('.minus');
		$minus.each(function () {
			$(this).click(function () {
				var id = $(this).parents('.cart-TV').attr('data-good-id');
				cookieObj[id].num--;
				if (cookieObj[id].num > 0) {
					$.cookie('cart', JSON.stringify(cookieObj), { expires: 7, path: '/' });
					$(this).next().val(cookieObj[id].num);
					$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);

					var allPrice = $('#Total').html();
					$('#Total').html(parseInt(allPrice) - parseInt(cookieObj[id].price)); //总金额
					var allNum = $('#goodsNum').html();
					$('#goodsNum').html(parseInt(allNum) - 1); //总件数		
				} else {
					cookieObj[id].num = 1;
				}
			});
		});

		//加号
		var $plus = $('.plus');
		$plus.each(function () {
			$(this).click(function () {
				var id = $(this).parents('.cart-TV').attr('data-good-id');
				cookieObj[id].num++;
				$.cookie('cart', JSON.stringify(cookieObj), { expires: 7, path: '/' });
				$(this).prev().val(cookieObj[id].num);
				$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);

				var allPrice = $('#Total').html();
				$('#Total').html(parseInt(allPrice) + parseInt(cookieObj[id].price)); //总金额
				var allNum = $('#goodsNum').html();
				$('#goodsNum').html(parseInt(allNum) + 1); //总件数
			});
		});

		//输入框
		var $numInput = $('input');
		$numInput.each(function () {
			$(this).blur(function () {
				var id = $(this).parents('.cart-TV').attr('data-good-id');
				if (/^\d+$/.test($(this).val()) && $(this).val() > 0) {
					cookieObj[id].num = $(this).val();

					// var allPrice = $(this).val();
					// $('#Total').html(parseInt(allPrice * cookieObj[id].price));//总金额
					// var allNum = $('#goodsNum').html();
					// $('#goodsNum').html($(this).val())//总件数
				} else {
					cookieObj[id].num = 1;
					$(this).val(cookieObj[id].num);
				}
				$.cookie('cart', JSON.stringify(cookieObj), { expires: 7, path: '/' });
				$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);
			});
		});

		//删除
		var $del = $('.del');
		$del.each(function () {
			$(this).click(function () {
				var id = $(this).parents('.cart-TV').remove().attr('data-good-id');
				delete cookieObj[id];
				$.cookie('cart', JSON.stringify(cookieObj), { expires: 7, path: '/' });

				var smallAllPrice = $(this).parent().prev().html();
				var allPrice = $('#Total').html();
				$('#Total').html(parseInt(allPrice) - parseInt(smallAllPrice)); //总金额
				var smallAllNum = $(this).parent().prev().prev().find('input').val();
				var allNum = $('#goodsNum').html();
				$('#goodsNum').html(parseInt(allNum) - smallAllNum); //总件数
			});
		});
	}
});