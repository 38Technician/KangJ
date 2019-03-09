$('.icon-delete').click(function(){
	$(this).parent().css('display','none');
});
let $div = $('.nav-hover-div');
console.log($div);
$.getJSON('navX.json',function(data){
// {
// 	"src" : "../imgmin/tv1.jpg",
// 	"h4" : "E75U 75吋超薄",
// 	"p1" : "金属人工智能",
// 	"p2" : "￥7999.00"
// }
	var str = '';
	$(data).each(function(index,value){
		str = ` <div>
					<img src="${value.src}" >
					<h4>"${value.h4}"</h4>
					<p>"${value.p1}"</p>
					<p>"${value.p2}"</p>
				</div>`;
		$div[index].append(str);
	})
})