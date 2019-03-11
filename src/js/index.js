$('.icon-delete').click(function(){
	$(this).parent().css('display','none');
});
let $div = $('.nav-hover-div');
console.log($div);
$.getJSON('../json/XnavTV.json',function(data){
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
	for(var key in data){
		
		for(var i in data[key]){
			str = ` <div>
						<img src="${data[key][i].src}" >
						<h4>${data[key][i].h4}</h4>
						<p>${data[key][i].p1}</p>
						<p>${data[key][i].p2}</p>
					</div>`;
			
			$($div[x]).append(str);
			// console.log($div[x]);
			// console.log(data[key]);
			// console.log(data[key][i]);
		}
		x ++;
	}
	// console.log(data);
})