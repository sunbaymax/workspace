/*返回设备列表*/
$(".back_list").on("click", function() {
	window.location.href = "shop.html"
});

$(document).ready(function() {
	var cargoods = JSON.parse(sessionStorage.getItem('cargoods'))?JSON.parse(sessionStorage.getItem('cargoods')):'';
	if(cargoods==''){
		console.log("00")
		return false;
	}
console.log(cargoods)
	//	alert(photosrc+",型号"+chanpin+",颜色"+_color+",个数"+total+",单价"+danjia);
	var Ul = $('.Ul')
	for(var i = 0; i < cargoods.length; i++) {
		var Li = '<li class="Li">' +
			'<div class="li_left left">' +
			'<input type="checkbox"/>' +
			'<img class="right" src=' + cargoods[i].image_src + '>' +
			'</div>' +
			'<div class="li_middle left">' +
			'<p>' +
			cargoods[i].devicename +
			'</p>' +
			'<p>' +
			'规格：' + cargoods[i].devicetype +
			'</p>' +
			'<p>' +
			'<span class="color">' +
			'-' +
			'</span>' +
			'<span class="_total">' +
			cargoods[i].total +
			'</span>' +
			'<span>' +
			'+' +
			'</span>' +
			'</p>' +
			'</div>' +
			'<div class="li_right left">' +
			'<p class="right _price">' +
			cargoods[i].Price +
			'</p>' +
			'<p>' +
			'<img src="../img/shop_car_delete.png"/>' +
			'</p>' +
			'</div>' +
			'</li>'
		$('.Ul').append(Li)
	}

	/*控制数量的加减*/

	$(".li_middle span:nth-of-type(1)").on("click", function() {
		var _shuLiang = $(this).next().html();
		if(_shuLiang > 1) {
			$(this).next().html(Number(_shuLiang) - 1);
			if($(this).next().html() == 1) {
				$(this).addClass("color");
			}
		}
		if($(this).parents("li").find("input").is(":checked")) {
			var _danjia = Number($(this).parents("li").find(".li_right").find(".right").html().replace("￥", ""));
			var _yuanZongJia = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
			if(_shuLiang > 1) {
				$(".footer_left span:nth-of-type(2)").html("合计：￥" + (_yuanZongJia - _danjia).toFixed(2));
			}
		}
	});
	$(".li_middle span:nth-of-type(3)").on("click", function() {
		var _shuLiang = $(this).prev().html();
		$(this).prev().html(Number(_shuLiang) + 1);
		if($(this).prev().html() > 1) {
			$(this).prev().prev().removeClass("color");
		}
		if($(this).parents("li").find("input").is(":checked")) {
			var _danjia = Number($(this).parents("li").find(".li_right").find(".right").html().replace("￥", ""));
			var _yuanZongJia = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + (_yuanZongJia + _danjia).toFixed(2));
		}
	});
	/*全部选取并计算总价的代码*/
	$(".footer_left input").on("click", function() {
		if($(this).is(":checked")) {
			$(".li_left input").prop("checked", true);
			var _x = 0;
			for(var i = 0; i < $(".li_right .right").length; i++) {
				//console.log($(".li_middle span:nth-of-type(2)").html());
				_x += Number($(".li_right .right").eq(i).html().replace("￥", "")) * Number($(".li_middle span:nth-of-type(2)").eq(i).html())
			}
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + _x.toFixed(2));
		} else {
			$(".li_left input").prop("checked", false);
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + 0);
		};
	});

	$(".li_left input").on("click", function() {
		var one_jiage = Number($(this).parent().next().next().find(".right").html().replace("￥", ""));
		var one_shuliang = Number($(this).parent().next().find("span:nth-of-type(2)").html());
		var yuanZongJia = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
		if($(this).is(":checked")) {
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + (yuanZongJia + one_jiage * one_shuliang).toFixed(2));
		} else {
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + (yuanZongJia - one_jiage * one_shuliang).toFixed(2));
		};
		var _panDuan = 0; //判断是否全部选定；
		for(var i = 0; i < $(".li_left input").length; i++) {
			if($(".li_left input").eq(i).is(":checked") != true) {
				_panDuan = 1
			};
		}
		if(_panDuan == 0) {
			$(".footer_left input").prop("checked", true)
		} else {
			$(".footer_left input").prop("checked", false)
		}
	});
	/*删除购物车内容的代码*/
	$(".li_right img").on("click", function() {
		//
//		console.log($(this,8));
	
		if(JSON.parse(sessionStorage.getItem('cargoods'))) {
			var goods = JSON.parse(sessionStorage.getItem('cargoods'));
			goods.splice($(this).parents('li').index(),1)
			sessionStorage.setItem("cargoods", JSON.stringify(goods));
		} else {
			var goods = [];
		}
		$(this).parents("li").remove();
		var _zongJia = $(".footer_left span:nth-of-type(2)").html().replace("合计：￥", "")
		var del_total = $(this).parents("li").find('._total').text() * $(this).parents("li").find('._price').text();
		if($(this).parents("li").find("input").is(":checked")) {
			$(".footer_left span:nth-of-type(2)").html("合计：￥" + (_zongJia - del_total));
		}
		if($("li").length == 0) {
			$(".content").html("购物车空空如也~").css({
				color: "red",
				fontSize: "2rem",
				lineHeight: "5rem",
				textAlign: "center"
			});
			$(".footer_left span:nth-of-type(2)").html("合计：￥ 0 ");
			$(".footer_left input").prop("checked", false);
		};

	});
	/*结算按钮*/
	$(".footer_right").on("click", function() {
		var _jiage = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
		var shuLiang = 0;
		if(_jiage > 0) {
			for(var i = 0; i < $("li").length; i++) {
				if($("li").eq(i).find("input").is(":checked")) {
					window.sessionStorage.setItem("jiesuan" + shuLiang, $("li").eq(i).html());
					shuLiang += 1;
				}
			}
			window.location.href = "pay.html?zongjia=" + _jiage + "&shuLiang=" + shuLiang;
		} else {
			alert("请选择需要结算的商品！！！");
		}
	})

});

/*全部选取并计算总价的代码*/
$(".footer_left input").on("click", function() {
	if($(this).is(":checked")) {
		$(".li_left input").prop("checked", true);
		var _x = 0;
		for(var i = 0; i < $(".li_right .right").length; i++) {
			//console.log($(".li_middle span:nth-of-type(2)").html());
			_x += Number($(".li_right .right").eq(i).html().replace("￥", "")) * Number($(".li_middle span:nth-of-type(2)").eq(i).html())
		}
		$(".footer_left span:nth-of-type(2)").html("合计：￥" + _x.toFixed(2));
	} else {
		$(".li_left input").prop("checked", false);
		$(".footer_left span:nth-of-type(2)").html("合计：￥" + 0);
	};
});
/*单个选取计算总价的代码；方向全选（如果单选的时候全部都选取了，全选按钮自动被选中）*/
$(".li_left input").on("click", function() {
	var one_jiage = Number($(this).parent().next().next().find(".right").html().replace("￥", ""));
	var one_shuliang = Number($(this).parent().next().find("span:nth-of-type(2)").html());
	var yuanZongJia = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
	if($(this).is(":checked")) {
		$(".footer_left span:nth-of-type(2)").html("合计：￥" + (yuanZongJia + one_jiage * one_shuliang).toFixed(2));
	} else {
		$(".footer_left span:nth-of-type(2)").html("合计：￥" + (yuanZongJia - one_jiage * one_shuliang).toFixed(2));
	};
	var _panDuan = 0; //判断是否全部选定；
	for(var i = 0; i < $(".li_left input").length; i++) {
		if($(".li_left input").eq(i).is(":checked") != true) {
			_panDuan = 1
		};
	}
	if(_panDuan == 0) {
		$(".footer_left input").prop("checked", true)
	} else {
		$(".footer_left input").prop("checked", false)
	}
});
/*删除购物车内容的代码*/
//$(".li_right img").on("click", function() {
//	var _zongJia = $(".footer_left span:nth-of-type(2)").html().replace("合计：￥", "")
//	if($(this).parents("li").find("input").is(":checked")) {
//		$(".footer_left span:nth-of-type(2)").html("合计：￥" + (_zongJia - $(this).parent().prev().html().replace("￥", "")).toFixed(2));
//	}
//	$(this).parents("li").remove();
//	if($("li").length == 0) {
//		$(".content").html("购物车空空如也~").css({
//			color: "red",
//			fontSize: "2rem",
//			lineHeight: "5rem",
//			textAlign: "center"
//		});
//		$(".footer_left input").prop("checked", false);
//	};
//
//});
/*结算按钮*/
//$(".footer_right").on("click", function() {
//	var _jiage = Number($(".footer_left span:nth-of-type(2)").html().replace("合计：￥", ""));
//	var shuLiang = 0;
//	if(_jiage > 0) {
//		for(var i = 0; i < $("li").length; i++) {
//			if($("li").eq(i).find("input").is(":checked")) {
//				window.sessionStorage.setItem("jiesuan" + shuLiang, $("li").eq(i).html());
//				shuLiang += 1;
//			}
//		}
//		window.location.href = "pay.html?zongjia=" + _jiage + "&shuLiang=" + shuLiang;
//	} else {
//		alert("请选择需要结算的商品！！！");
//	}
//})