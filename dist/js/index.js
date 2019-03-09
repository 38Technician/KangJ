'use strict';

$('.icon-delete').click(function () {
	$(this).parent().css('display', 'none');
});
var $div = $('.nav-hover-div');
console.log($div);
$.getJSON('navX.json', function (data) {
	// {
	// 	"src" : "../imgmin/tv1.jpg",
	// 	"h4" : "E75U 75吋超薄",
	// 	"p1" : "金属人工智能",
	// 	"p2" : "￥7999.00"
	// }
	var str = '';
	$(data).each(function (index, value) {
		str = ' <div>\n\t\t\t\t\t<img src="' + value.src + '" >\n\t\t\t\t\t<h4>"' + value.h4 + '"</h4>\n\t\t\t\t\t<p>"' + value.p1 + '"</p>\n\t\t\t\t\t<p>"' + value.p2 + '"</p>\n\t\t\t\t</div>';
		$div[index].append(str);
	});
});