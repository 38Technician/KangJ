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
	
	
	//加入购物车
	
	let $addCart = $('.addToCart');
	// console.log($addCart)
	$('#cart-num').css('color','#ffffff');
	
	$.each($addCart,function(){
		//初始化购物车
		initial();
		
		$(this).click(function(){
			// console.log($(this).html())
			let id = $(this).parents('.fluid1').attr('data-good-id');
			let src = $(this).parent().prev().prev().prev().prev().find('img').attr('src');
			let p1 = $(this).parent().prev().prev().prev().html();
			let p2 = $(this).parent().prev().prev().html();
			let price = $(this).parent().prev().find('span').html();
			// console.log(src)
			
			//获取cookie
			let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
			let cookieObj = CookieStrToCookieObj(cookieStr);
			
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
			alert('添加成功！');
			
		})//点击结束
		
		
		
		
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
		
	})
	
	
	
})