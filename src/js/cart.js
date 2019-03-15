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
	let cookieStr = $.cookie('cart') ? $.cookie('cart') : '' ;
	if(!cookieStr){
		$('.cart-start').css('display','block');
		
	}else{
		
		$('.cart-start').css('display','none');
		
		let cookieObj = CookieStrToCookieObj(cookieStr);
		
		let cookieObjA = CookieStrToCookieObj(cookieStr);
		let sum = 0;
		let bigSum = 0;
		for(let i in cookieObjA){
			sum += cookieObjA[i].num;
			// console.log(cookieObj[id].num)
			bigSum += cookieObjA[i].num * cookieObjA[i].price;
		}
		
		$('#cart-num').html(sum);//角标
		console.log(sum)
		//总数
		$('#goodsNum').html(sum);//件数
		$('#Total').html(bigSum);//总金额
		
		
		
		
		//遍历对象
		for(var key in cookieObj){
			let obj = cookieObj[key];
			//字符串模板
			let str = `
				<div class="cart-TV" data-good-id="${key}">
					<div class="cartTV1"></div>
					<div class="cartTV2">
						<div class="mycart-img">
							<img src="${cookieObj[key].src}" >
						</div>
						<div class="mycart-txt">
							<p>${cookieObj[key].p1}</p>
							<p>LED43E330C</p>
							<p>${cookieObj[key].p2}</p>
						</div>
					</div>
					<div class="cartTV3">${cookieObj[key].price}</div>
					<div class="cartTV4">
						<div class="minus">-</div>
						<input type="text" class="goodsInputNum" value="${cookieObj[key].num}"/>
						<div class="plus">+</div>
					</div>
					<div class="cartTV5 smallTotal">${cookieObj[key].num * cookieObj[key].price}</div>
					<div class="cartTV6">
						<a href="##" class="del">删除</a>
					</div>
				</div>
			`;
			$('.mycart').append(str);
			
			
		}
		
		//减号
		let $minus = $('.minus');
		$minus.each(function(){
			$(this).click(function(){
				let id = $(this).parents('.cart-TV').attr('data-good-id');
				cookieObj[id].num --;
				if(cookieObj[id].num > 0){
					$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
					$(this).next().val(cookieObj[id].num);
					$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);
			
			var allPrice = $('#Total').html();
			$('#Total').html(parseInt(allPrice) - parseInt(cookieObj[id].price));//总金额
			var allNum = $('#goodsNum').html();
			$('#goodsNum').html(parseInt(allNum) - 1)//总件数		
					
				}else{
					cookieObj[id].num = 1;
				}
			})
		});
		
		//加号
		let $plus = $('.plus');
		$plus.each(function(){
			$(this).click(function(){
				let id = $(this).parents('.cart-TV').attr('data-good-id');
				cookieObj[id].num ++;
				$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
				$(this).prev().val(cookieObj[id].num);
				$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);
				
				var allPrice = $('#Total').html();
				$('#Total').html(parseInt(allPrice) + parseInt(cookieObj[id].price));//总金额
				var allNum = $('#goodsNum').html();
				$('#goodsNum').html(parseInt(allNum) + 1)//总件数
			})
		})
		
		//输入框
		let $numInput = $('input');
		$numInput.each(function(){
			$(this).blur(function(){
				let id = $(this).parents('.cart-TV').attr('data-good-id');
				if(/^\d+$/.test($(this).val()) && $(this).val() > 0){
					cookieObj[id].num = $(this).val();
					
					// var allPrice = $(this).val();
					// $('#Total').html(parseInt(allPrice * cookieObj[id].price));//总金额
					// var allNum = $('#goodsNum').html();
					// $('#goodsNum').html($(this).val())//总件数
					
				}else{
					cookieObj[id].num = 1;
					$(this).val(cookieObj[id].num);
				}
				$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
				$(this).parent().next().html(cookieObj[id].num * cookieObj[id].price);
			})
		});
		
		//删除
		let $del = $('.del');
		$del.each(function(){
			$(this).click(function(){
				let id = $(this).parents('.cart-TV').remove().attr('data-good-id');
				delete cookieObj[id];
				$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
				
				var smallAllPrice = $(this).parent().prev().html();
				var allPrice = $('#Total').html();
				$('#Total').html(parseInt(allPrice) - parseInt(smallAllPrice));//总金额
				var smallAllNum = $(this).parent().prev().prev().find('input').val();
				var allNum = $('#goodsNum').html();
				$('#goodsNum').html(parseInt(allNum) - smallAllNum)//总件数
			})
		})
		function CookieStrToCookieObj(str){
			if(!str){
				return {};
			}
			return JSON.parse(str);
		}
	}
	
})