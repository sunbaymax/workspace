$(function() {
	toastr.options = {
		timeOut: "3000",
		positionClass: "toast-center-center"
	};

	function GetDateStr(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1; //获取当前月份的日期
		var d = dd.getDate();
		return y + "-" + m + "-" + d;
	}
	var date = [GetDateStr(0), GetDateStr(1), GetDateStr(2)];
	var currtime = [];
	var d = new Date();

	var currhour = d.getHours();
	if(currhour < 0 || currhour > 24) {
		currtime = ['无效时间']
	} else if(currhour >= 0 && currhour < 24) {
		currtime = ['2小时上门', '8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
	}
	//else if(currhour >= 8 && currhour < 10) {
	//		currtime = ['2小时上门', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
	//	} else if(currhour >= 10 && currhour < 12) {
	//		currtime = ['2小时上门', '12:30-14:30', '14:30-16:30', '16:30-17:30']
	//	} else if(currhour >= 12 && currhour < 14) {
	//		currtime = ['2小时上门', '14:30-16:30', '16:30-17:30']
	//	} else if(currhour >= 14 && currhour < 16) {
	//		currtime = ['2小时上门', '16:30-17:30']
	//	}
	else {
		currtime = ['非正常预约时间'];
	}
	$(".TimeType .TimeType-Ways .qi").each(function(key, index) {
		$(this).text(date[key]);
	});
	$(currtime).each(function(key, index) {
		let str = '<span class="ni">';
		str += index;
		str += '</span>';
		$('.TimeType-datetime').append(str);
	});

	var telephone = sessionStorage.getItem('Telephone');
	if(JSON.parse(sessionStorage.getItem('SendaddData'))) {
		var _ChoseaddData = JSON.parse(sessionStorage.getItem('SendaddData'));
		var _ChaddreType = sessionStorage.getItem('ChaddreType');
		$(".Noexistsend").hide();
		$(".existsend").show();
		$('#send_username').text(_ChoseaddData.addressname);
		$('#send_tel').text(_ChoseaddData.addresstel);
		$('#send_address').text(_ChoseaddData.address);
	}
	if(JSON.parse(sessionStorage.getItem('getaddData'))) {
		var _ChosogaddData = JSON.parse(sessionStorage.getItem('getaddData'));
		var _ChaddreType = sessionStorage.getItem('ChaddreType');
		$(".Noexistget").hide();
		$(".existget").show();
		$('#get_username').text(_ChosogaddData.addressname);
		$('#get_tel').text(_ChosogaddData.addresstel);
		$('#get_address').text(_ChosogaddData.address);
	}
	$('.clear').on('click', function() {
		sessionStorage.clear();
	})
	//寄件人地址薄选择
	$(".sendaddress").on("click", function() {
		var _ChaddreType = 'send';
		sessionStorage.setItem('ChaddreType', _ChaddreType);
		$.ajax({
			type: "post",
			url: 'http://out.ccsc58.cc/DATA_PORT_WECHAT_1.01/AddressBook.php',
			data: {
				State: "show",
				UserNumber: telephone
			},
			dataType: "json",
			success: function(res) {
				if(res.data.length > 0) {
					location.href = 'addressbook.html';
				} else {
					location.href = 'Addsendress.html';
				}
			},
			error: function(err) {

			}
		})
	})
	//收件人地址薄选择
	$(".getaddress").on("click", function() {
		var _ChaddreType = 'get';
		sessionStorage.setItem('ChaddreType', _ChaddreType);
		$.ajax({
			type: "post",
			url: 'http://out.ccsc58.cc/DATA_PORT_WECHAT_1.01/AddressBook.php',
			data: {
				State: "show",
				UserNumber: telephone
			},
			dataType: "json",
			success: function(res) {
				if(res.data.length > 0) {
					location.href = 'addressbook.html';
				} else {
					location.href = 'Addgetaddress.html';
				}
			},
			error: function(err) {

			}
		})

	})

	//新增寄件人地址
	$(".Noexistsend").on("click", function() {
		location.href = 'Addsendress.html';
	})
	//新增收件人地址
	$(".Noexistget").on("click", function() {
		location.href = 'Addgetaddress.html';
	})
	$(".yin").on('click', function() {
		$(".setbg").hide();
	})
	$(".closewindow").on('click', function() {
		$(".setbg").hide();
	})
	//点击温度区间
	$(".Tempqu").on('click', function() {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
		$(".setbg").show();
		$(".Temparea").show();
		$(".BoxType").hide();
		$(".TimeType").hide();
	})
	//点击箱型
	$(".clickbox").on('click', function() {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
		if($("#Temparea").text() == '请选择温区') {
			toastr.error("请选择温度区间");
		} else {
			$(".setbg").show();
			$(".Temparea").hide();
			$(".BoxType").show();
			$(".TimeType").hide();
		}

	})

	//点击预约时间
	var mytime = '';
	$(".clickTime").on('click', function() {
		//		$('body,html').animate({
		//			scrollTop: 0
		//		}, 0);
		//		$(".setbg").show();
		//		$(".Temparea").hide();
		//		$(".BoxType").hide();
		//		$(".TimeType").show();

		//		pickuptime.init(0, function(data) {
		//			var arr = data.split(" ");
		//			var c = arr.join('');
		//			if(c.indexOf('今') != -1) {
		//				mytime = c.replace("今天", " ");
		//			} else if(c.indexOf('明') != -1) {
		//				mytime = c.replace("明天", " ");
		//			} else if(c.indexOf('后') != -1) {
		//				mytime = c.replace("后天", " ");
		//			} else {
		//				console.log(c)
		//			}
		//			console.log(mytime);
		//			$('#ChooseTimes').text(mytime)
		//		});
		if($(".iDate.full").length > 0) {
			$(".iDate.full").datetimepicker({
				locale: "zh-cn",
				format: "YYYY-MM-DD a hh:mm",
				dayViewHeaderFormat: "YYYY年 MMMM"
			});
		}
	})
	$(".Temparea-Ways .Tempareac .ni").on('click', function() {
		$(this).parents('.Temparea-Ways').find('.ni').removeClass('spanActive');
		$(this).addClass('spanActive');
		if($(this).parent().attr("class").indexOf("Dryice") != -1) {
			$('.BoxTypef1 .ni').removeClass('disable');
			$('.BoxTypef2 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('spanActive');
		} else {
			$('.BoxTypef1 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('disable');
			$('.BoxTypef1 .ni').removeClass('spanActive');
		}

	});
	var arrCbox = [];
	$(".BoxType .ni").on('click', function() {
		if($(this).attr('class').indexOf("spanActive") != -1) {
			$(this).removeClass('spanActive')
		} else {
			$(this).addClass('spanActive');
		}
	});
	$("body").on("click", "li .gw_num .add", function() {
		var n = $(this).prev().val();
		var num = parseInt(n) + 1;
		if(num == 0) {
			return;
		}
		$(this).prev().val(num);
	});
	//减的效果
	$("body").on("click", "li .gw_num .jian", function() {
		var n = $(this).next().val();
		var num = parseInt(n) - 1;
		if(num == 0) {
			var delnumtext = $(this).prev().prev().text();
			arrcBoxTxts.remove(delnumtext);
			$(this).parents('.childbox').remove();
			return
		}
		$(this).next().val(num);
	});

	//点击时间日期
	$(".TimeType-Ways .TimeType-day .ni").on('click', function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
		$(this).find('img').show();
		$(this).siblings().find('img').hide();
		if($(this).find('.ri').text() == '明日' || $(this).find('.ri').text() == '后日') {
			$('.TimeType-datetime').empty();
			let currtime = ['8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			$(currtime).each(function(key, index) {
				let str = '<span class="ni">';
				str += index;
				str += '</span>';
				$('.TimeType-datetime').append(str);
			});
		} else {
			let currhour = d.getHours();
			$('.TimeType-datetime').empty();
			if(currhour < 0 || currhour > 24) {
				currtime = ['无效时间']
			} else if(currhour >= 6 && currhour < 17) {
				currtime = ['2小时上门', '8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			} else {
				currtime = ['非正常预约时间'];
			}
			$(currtime).each(function(key, index) {
				let str = '';
				if(currhour <= 8) {
					str = '<span class="ni">';
					str += index;
					str += '</span>';
				} else if(currhour >= 10 && currhour < 12) {
					if(key == 1) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 12 && currhour < 14) {
					if(key == 1 || key == 2) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 14 && currhour < 16) {
					if(key >= 1 && key <= 3) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else {
					str = '<span class="ni disable">';
					str += index;
					str += '</span>';
				}
				$('.TimeType-datetime').append(str);
			});
		}
	});
	//点击小时
	$('body').on('click', ".TimeType-Ways .TimeType-datetime .ni", function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
	});
	var arrcBoxTxts = [];
	$(".Temparea-btn").on('click', function() {
		var chooseTempTxt = $('.Temparea .spanActive').text();
		if(chooseTempTxt == '') {
			toastr.error("请选择温度区间");
			$("#Temparea").removeClass('chooseTemp');
			$(".fatherbox .choosewenqu .gw_num").removeClass('hide');
		} else {
			$("#Temparea").text(chooseTempTxt);
			$("#Temparea").addClass('chooseTemp');
			$("#BoxType").text('请选择箱型');
			$('.BoxType .BoxType-Ways .ni').removeClass('spanActive');
			$(".fatherbox .choosewenqu p").addClass('hide');
			$('.childbox').remove();
			arrcBoxTxts = [];
			$('.choosewenqu .gw_num input').val('1');
			$(".setbg").hide();
			$(".setbg").hide();
		}
	});

	$(".BoxType-btn").on('click', function() {
		var chooseBoxTxt = $('.BoxType .spanActive').text();
		arrcBoxTxts = chooseBoxTxt.trim().split(/\s+/);
		if(chooseBoxTxt == '') {
			toastr.error("请选择箱型");
			$("#BoxType").removeClass("chooseBox");
		} else {
			//			$("#BoxType").text(chooseBoxTxt);
			console.log(arrcBoxTxts)
			if(arrcBoxTxts.length >= 2) {
				$('.childbox').remove();
				$('.fatherbox .choosewenqu .gw_num').removeClass('hide');
				$(arrcBoxTxts).each(function(index, value) {
					if(index != 0) {
						let str = `<li class="childbox">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value}</label>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value="1" class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
						$('.fatherbox').after(str);
					} else {
						$(".fatherbox #BoxType").text(value)
					}
				});
			} else {
				$(".fatherbox #BoxType").text(chooseBoxTxt)
				$('.fatherbox .choosewenqu .gw_num').removeClass('hide');
				$('.childbox').each(function() {
					$(this).remove();
				});
			}

			$("#BoxType").addClass("chooseBox");
			$(".setbg").hide();
		}
	});
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if(index > -1) {
			this.splice(index, 1);
		}
	};
	//删除选择的箱型
	$("body").on("click", '.childbox .delbox', function() {
		var deltext = $(this).prev().text();
		arrcBoxTxts.remove(deltext);
		$(this).parents('.childbox').remove();

	})
	$(".time-btn").on('click', function() {
		var chooseDay = $('.TimeType-day .spanActive .qi').text();
		var chooseTimeTxt = $('.TimeType-datetime .spanActive').text();
		$("#ChooseTimes").text(chooseDay + ' ' + chooseTimeTxt);
		$(".time .time-right label").addClass("chooseTimes");
		$(".setbg").hide();
	});
	$('aside.slide-wrapper').on('touchstart', 'li', function(e) {
		$(this).addClass('current').siblings('li').removeClass('current');
	});

	$('a.slide-menu').on('click', function(e) {
		var wh = $('div.wrapper').height();
		$('div.slide-mask').css('height', '100%').show();
		$('aside.slide-wrapper').css('height', '100%').addClass('moved');
		var tel = window.sessionStorage.getItem('Telephone')
		$.ajax({
			type: "post",
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.01/Center.php",
			data: {
				user: tel
			},
			dataType: "JSON",
			success: function(res) {
				console.log(res);
				if(res.code == 300) {
					toastr.error("请进行信息录入");
//					setTimeout(function() {
//						window.location.href = 'InfoInput.html';
//					}, 1000);
					$('.menu_footer .haveinfo').hide();
					$('.menu_footer #editlogin').show();

				}else{
					$('.slide-wrapper .menu_footer img').attr("src",res.data.Picture);
					$('.slide-wrapper .menu_footer .turename').text(res.data.NickName);
					$('.slide-wrapper .menu_footer .turetel').text(res.data.UserNumber);
				}
			},
			error: function(err) {
				console.log(err)
			}

		})
	});

	$('div.slide-mask').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	$('.menu_top img').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	//提取汉字
	function  GetChinese(strValue)  {     
		if(strValue !=  null  &&  strValue !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;          
			return  strValue.match(reg).join("");      
		}      
		else   
			return  "";  
	} 
	//去掉汉字
	function  RemoveChinese(strValue)  {     
		if(strValue !=  null  &&  strValue  !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;         
			return  strValue.replace(reg, "");      
		}      
		else 
			return  "";  
	} 
	function trimstart(v) { //去除字符串尾空白
		if(typeof v == 'string') return v.replace(/^\s+/, '')
		return v;
	}

	function replacepos(text, start, stop, replacetext) {
		mystr = text.substring(0, stop - 1) + replacetext + text.substring(stop + 1);
		return mystr;
	}
	$('.btndiv button').on('click', function() {
		var choosetime = $('.iDate input').val();
		var isAMPMtime = GetChinese(choosetime);
		var jiequtime = RemoveChinese(choosetime);
		var hour = jiequtime.substring(12, 14);
		var t = '';

		if(isAMPMtime == '下午' && hour != 12) {
			t = parseInt(hour) + 12;
		} else if(isAMPMtime == '凌晨' && hour == 12) {
			t = '00';
		} else if(isAMPMtime == '晚上') {
			t = parseInt(hour) + 12;
		} else {
			t = hour;
		}
		if(parseInt(t) < 8 || parseInt(t) > 17) {
			toastr.error("非取件时间,请于8点到17点之间下单");
		}
		var endstr = replacepos(jiequtime, 12, 13, t);

		console.log(endstr.replace(" ", ""));
		let timeok = endstr.replace(" ", "");
		timeok = timeok.substring(0, 19);
		timeok = timeok.replace(/-/g, '/');
		console.log(timeok);
		var timestamp = new Date(timeok).getTime() / 1000;
		var timestamp1 = parseInt((new Date()).valueOf() / 1000);
		console.log(timestamp1, '当前');
		console.log(timestamp, '选择');
		if(timestamp1 > timestamp) {
			toastr.error("非取件时间,请选择大于当前时间");
		}
		//location.href = 'ordersuccess.html'
	});
	$('input').blur(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})
	//点击头像跳转
	$(".touxiang").on("click", function() {
		location.href = 'person.html';
	})
});