$(function(){
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
	$.getJSON('../json/XnavTV.json',function(data){
		let str = '';
		let x = 0;
		for(let key in data){
			
			for(let i in data[key]){
				str = ` <div>
							<img src="${data[key][i].src}" >
							<h4>${data[key][i].h4}</h4>
							<p>${data[key][i].p1}</p>
							<p>${data[key][i].p2}</p>
						</div>`;
				
				$($div[x]).append(str);
			}
			x ++;
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
	
	
	
	
	//登录验证
	var $uname = $('#uname');
	var $upwd = $('#upwd');
	var $verCode = $('#verCode');
	var $btn = $('#btn');
	
	var num = 0;
	//用户名
	$uname.blur(function(){
		var str = $uname.val();
		if(str){
			$(this).parent().next().html('');
			num ++;
		}else{
			$(this).parent().next().html('请输入用户名！');
		}
	});
	
	//密码
	$upwd.blur(function(){
		var str = $upwd.val();
		if(str){
			$(this).parent().next().html('');
			num ++;
		}else{
			$(this).parent().next().html('请输入密码!');
		}
	});
	
	//验证码
	$verCode.blur(function(){
		var str = $verCode.val();
		if(/^(B|b)5(A|a)(D|d)$/.test(str)){
			$(this).parent().next().html('');
			num ++;
		}else if(str){
			$(this).parent().next().html('请输入正确的验证码!');
		}else{
			$(this).parent().next().html('请输入验证码!');
		}
	});
	
	
	
	
	
	$btn.click(function(){
		if(num == 3){
			//获取cookie
			let cookieStr = $.cookie('user');
			let cookieObj = cookieStrToCookieObj(cookieStr);
			var uname = $uname.val();
			var upwd = $upwd.val();
			if(uname in cookieObj){
				if(cookieObj[uname] == upwd){
					alert('登录成功！');
					location.href = 'index.html';
				}else{
					alert('密码错误！');
				}
			}else{
				alert('用户名不存在！');
			}
		}else{
			alert('请输入完整的信息！');
		}
		// console.log(num);
	});
	
	
	function cookieStrToCookieObj(str){
		if(!str){
			return {};
		}
		return JSON.parse(str);
	}
})