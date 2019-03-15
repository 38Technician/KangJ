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
	
	
	
	//购物车
	
	let $addBtn = $('.addCartBtn');
	// console.log(111111)
	//初始化购物车
	initial();
	
	//获取cookie
	let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
	let cookieObj = CookieStrToCookieObj(cookieStr);
	
	$addBtn.click(function(){
		// console.log(111)
		let id = $(this).parents('.detail-div-right').find('h3').attr('data-good-id');
		let src = '../imgmin/goodsList1.jpg';
		let p1 = $(this).parents('.detail-div-right').find('h3').html();
		let p2 = $(this).parents('.detail-div-right').find('.p2').html();
		let price = $(this).parents('.detail-div-right').find('strong').html();
		// console.log(price)
		
		
		if(id in cookieObj){
			cookieObj[id].num ++;
		}else{
			cookieObj[id] = {
				"src" : src,
				"p1" : p1,
				"p2" : p2,
				"price" : price,
				"num" : 1
			}
		}
		//加入cookie
		$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
		//角标
		let num = parseInt($('#cart-num').html());
		$('#cart-num').html(num + 1);
		
		let iptNum = $(this).parents('.cartTV4').find('input').val();
		console.log(11111111)
		$(this).parents('.cartTV4').find('input').val(iptNum + 1);
		alert('添加成功！');
		location.href = 'cart.html';
		
	})
	//减号
	let $minus = $('.minus');
	
	$minus.click(function(){
		let id = $(this).parents('.detail-div-right').find('h3').attr('data-good-id');
		cookieObj[id].num --;
		if(cookieObj[id].num > 0){
			
			$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
			$(this).next().val(cookieObj[id].num);
			
		}else{
			cookieObj[id].num = 1;
		}
	})
	
	
	//加号
	let $plus = $('.plus');
	console.log($plus)
	$plus.click(function(){
		let id = $(this).parents('.detail-div-right').find('h3').attr('data-good-id');
		console.log(11)
		cookieObj[id].num ++;
			
		$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
		$(this).prev().val(cookieObj[id].num);
	})
	
	
	
	//输入框
	let $numInput = $('.goodsInputNum');
	
	$numInput.blur(function(){
		let id = $(this).parents('.detail-div-right').find('h3').attr('data-good-id');
		if(/^\d+$/.test($(this).val()) && $(this).val() > 0){
			cookieObj[id].num = $(this).val();
			
		}else{
			cookieObj[id].num = 1;
			$(this).val(cookieObj[id].num);
		}
		$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
		$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);
	})
	

	
	
	function CookieStrToCookieObj(str){
		if(!str){
			return {}
		}
		return JSON.parse(str)
	}
	
	//访问cookie 初始化购物车
	function initial(){
		let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
		let cookieObj = CookieStrToCookieObj(cookieStr);
		let sum = 0;
		// console.log(sum)
		for(let key in cookieObj){
			sum += cookieObj[key].num;
		}
		$('#cart-num').html(sum);
	}
	
	
	var $smallimg = $('#smallimg li');
	var $bigimg = $('.detail-left-Bigimg img');
	// console.log($bigimg)
	$.each($smallimg,function(i,n){
		$($smallimg[i]).mouseenter(function(){
			// console.log(111)
			$($bigimg[i]).css('z-index','10');
			$($bigimg[i]).siblings().css('z-index','1');
		})
	})
	
})