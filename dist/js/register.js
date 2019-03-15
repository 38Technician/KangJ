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

	var $uname = $('#uname');
	var $upwd = $('#upwd');
	var $upwdAgain = $('#upwdAgain');
	var $verCode = $('#verCode');
	var $btn = $('#btn');

	var num = 0;
	//用户名框
	$uname.blur(function () {
		var str = $uname.val();
		var re = /^[A-Za-z0-9\u4e00-\u9fa5]{3,6}$/;
		// console.log($(this));
		if (re.test(str)) {
			$(this).parent().next().find('span').css('display', 'none');
			num++;
		} else {
			$(this).parent().next().find('span').css('display', 'block');
		}
	});

	//密码框
	$upwd.blur(function () {
		var str = $upwd.val();
		var re = /^[A-Za-z0-9]{6,12}$/;
		if (re.test(str)) {
			$(this).parent().next().find('span').css('display', 'none');
			num++;
		} else {
			$(this).parent().next().find('span').css('display', 'block');
		}
	});

	//确认密码
	$upwdAgain.blur(function () {
		var str = $upwdAgain.val();
		if (str == $upwd.val()) {
			$(this).parent().next().find('span').css('display', 'none');
			num++;
		} else {
			$(this).parent().next().find('span').css('display', 'block');
		}
	});

	//验证码
	$verCode.blur(function () {
		var str = $verCode.val();
		if (/^(B|b)5(A|a)(D|d)$/.test(str)) {
			$(this).parent().next().find('span').css('display', 'none');
			num++;
		} else {
			$(this).parent().next().find('span').css('display', 'block');
		}
	});

	//提交按钮
	$btn.click(function () {
		if (num === 4) {
			var uname = $uname.val();
			var upwd = $upwd.val();
			//获取cookie
			var cookieStr = $.cookie('user') ? $.cookie('user') : '';
			var cookieObj = cookieStrToCookieObj(cookieStr);
			if (uname in cookieObj) {
				alert("用户名已存在！");
			} else {
				// $uname.val() : $upwd.val()
				cookieObj[uname] = upwd;
				//加入cookie
				$.cookie('user', JSON.stringify(cookieObj), { expires: 7, path: '/' });
				console.log(num);
				alert('注册成功！');
				location.href = 'login.html';
			}
		} else {
			alert('请将注册信息填写完整！');
			// console.log(num);
		}
	});

	function cookieStrToCookieObj(str) {
		if (!str) {
			return {};
		}
		return JSON.parse(str);
	}
});