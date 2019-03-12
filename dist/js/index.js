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
		// {
		// 	"src" : "../imgmin/tv1.jpg",
		// 	"h4" : "E75U 75吋超薄",
		// 	"p1" : "金属人工智能",
		// 	"p2" : "￥7999.00"
		// }
		var str = '';
		//data    { [{...},{...},{...}] , [{...},{...},{...}] }
		//data[key] = [{...},{...},{...}]
		var x = 0;
		for (var key in data) {

			for (var i in data[key]) {
				str = ' <div>\n\t\t\t\t\t\t\t<img src="' + data[key][i].src + '" >\n\t\t\t\t\t\t\t<h4>' + data[key][i].h4 + '</h4>\n\t\t\t\t\t\t\t<p>' + data[key][i].p1 + '</p>\n\t\t\t\t\t\t\t<p>' + data[key][i].p2 + '</p>\n\t\t\t\t\t\t</div>';

				$($div[x]).append(str);
				// console.log(data[key]);
				// console.log(data[key][i]);
			}
			x++;
		}
		// console.log($div[1]);
		// console.log($($div[1]));
		// console.log(data);
	});

	//头部导航吸顶 和 侧边导航显示
	// $('body').css('height','1000px');
	var navScl = $('.nav-suction-top').offset().top;
	$(window).on('scroll', function () {
		var scrollTop = $(document).scrollTop();
		//吸顶
		if (scrollTop > navScl) {
			$('.nav-suction-top').css({ 'position': 'fixed', 'top': '0' });
		} else {
			$('.nav-suction-top').css({ 'position': 'absolute', 'top': '0' });
		}
		//侧边导航栏
		if (scrollTop > 800) {
			$('.anchor').css('display', 'block');
		} else {
			$('.anchor').css('display', 'none');
		}
	});

	//轮播图位置的二级导航
	$.getJSON('../json/YnavIndex.json', {}, function (data) {
		var str = '';
		var a = 0;
		for (var key in data) {
			for (var index in data[key]) {
				//判断是否满一行
				if (index >= 6) {
					str = '\n\t\t\t\t\t\t\t\t<li><a href=""><img src="' + data[key][index].src + '" alt=""> <span>' + data[key][index].txt + '</span> </a></li>\n\t\t\t\t\t\t';
					$($('.YnavUlTwo')[a]).append(str);
					$($('.YnavUlTwo')[a]).css('display', 'block');
				} else {
					str = '\n\t\t\t\t\t\t\t\t<li><a href=""><img src="' + data[key][index].src + '" alt=""> <span>' + data[key][index].txt + '</span> </a></li>\n\t\t\t\t\t\t';
					$($('.YnavUl')[a]).append(str);
				}
			}
			a++;
			// console.log($('.YnavUl')[a]);
		}
		// console.log($('.YnavUl')[a]);
	});
	//回到顶部
	$('.tool').click(function () {
		$(document).scrollTop = 0;
	});
});