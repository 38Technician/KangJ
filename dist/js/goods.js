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
		for (var key in data) {

			for (var i in data[key]) {
				str = ' <div>\n\t\t\t\t\t\t\t<img src="' + data[key][i].src + '" >\n\t\t\t\t\t\t\t<h4>' + data[key][i].h4 + '</h4>\n\t\t\t\t\t\t\t<p>' + data[key][i].p1 + '</p>\n\t\t\t\t\t\t\t<p>' + data[key][i].p2 + '</p>\n\t\t\t\t\t\t</div>';

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
});