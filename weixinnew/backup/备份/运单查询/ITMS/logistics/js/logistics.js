!function(window, document, $, undefined) {
	var $details = $('#details'),
		$detailsGoods = $('.detailsGoods'),
		$imgcon = $('#details').find('img');
	    $trackrcol2=$('.track-rcol2');


    $(".chaxun").on("click",function(){
    	var formControlVal = $('.form-control').val();
        $.ajax({
            url: 'http://www.ccsc58.com/json/tms.php',
            type:'post',
            dataType: 'json',
            data: {
                admin_permit: 'zjly8888',
                danhao: formControlVal
            },
            success: function(res) {
                if(res.code =="300"){
                    alert("没有此单号")
                    window.location.reload();
                    $(".form-control").val("") ;
                    return
                }
               /* var gt = res.GetTime-8*60*60;
                var i_d = res.Indate-8*60*60;*/
				var dateArr = [],
                    /*GetTime = fmtDate(parseInt(gt) * 1000),
                    Indate = fmtDate(parseInt(i_d) * 1000),*/
                    GetTime=(res.GetTime.substr(0,10)),
                    Indate = (res.Indate.substr(0,10)),
                    result = res.result,
					dateList = [];

               /* function fmtDate(obj){
                    var date =  new Date(obj);
                    var y = date.getFullYear();
                    var m = "0"+(date.getMonth()+1);
                    var d = "0"+date.getDate();
                    var h = "0"+date.getHours();
                    var mm = "0"+date.getMinutes();
                    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
                }*/
                dateArr.push(
					'<p>','货物名称:',res.CargoName,'</p>',
					'<p>','始发城市:',res.StartCity,'</p>',
					'<p>','目的城市:',res.EndCity,'</p>',
					'<p>','件数:',res.Jian,'</p>',
					'<p>','温度计使用:',res.WTNO1,'</p>',
					'<p>','温度计区间:',res.WDQJ,'</p>',
					'<p>','实际重量:',res.Aweight,'</p>',
					'<p>','计费重量:',res.Cweight,'</p>',
					'<p>','签收人:',res.GetName,'</p>',
					'<p>','签收时间:',GetTime,'</p>',
					'<p>','委托时间:',Indate,'</p>'
				);
                $('.ddh').html(res.billnumber);
                $detailsGoods.html(dateArr.join(''));
                console.log(GetTime);
                console.log(Indate);
                $.each(result, function(ind, key) {
                	var BillNote = key.BillNote,
                       /* Indates = key.Indate-8*60*60,*/
                        city = key.city,
                    newIndate1 = key.Indate.substr(5,5),
                    newIndate2 = key.Indate.substr(11,5);

                  /*  var date = new Date(Indates*1000);
                    var m = (date.getMonth()+1);
                    var d = date.getDate();
                    var h = date.getHours();
                    var mm = date.getMinutes();*/
                  /*  var newIndate1 =fil(m)+'-'+fil(d) ;
                    var newIndate2 = fil(h)+':'+fil(mm);*/
                    function fil(d) {
                        if(d<10){
                            return '0'+d;
                        }
                        return d;
                    }
                    if(BillNote=="入库"){
                        dateList.push(
                            '<div class="track-list">',
                            '<div class="left">',
                            '<div class="dateAndTime">',newIndate1,'</div>',
                            '<div class="dateAndTime times">',newIndate2,'</div>',
                            '</div>',
                            '<img class="node-icon icon1 left"src="ITMS/logistics/img/tubiao/huise.png" alt="">',
                            '<div class="stateAndPlace left ml36">',
                            '<div class="state">',BillNote,'</div>',
                            '<div class="place">',city,'</div>',
                            '</div>',
                            '<div class="claar"></div>',
                            '</div>'
                        )
                    }else if(BillNote=="出库"){
                        dateList.push(
                            '<div class="track-list">',
                            '<div class="left">',
                            '<div class="dateAndTime">', newIndate1,'</div>',
                            '<div class="dateAndTime times">', newIndate2,'</div>',
                            '</div>',
                            '<img class="node-icon icon1 left"src="ITMS/logistics/img/tubiao/huangse.png" alt="">',
                            '<div class="stateAndPlace left ml36">',
                            '<div class="state">',BillNote,'</div>',
                            '<div class="place">',city,'</div>',
                            '</div>',
                            '<div class="claar"></div>',
                            '</div>'
                        )


                    }else{
                        dateList.push(
                            '<div class="track-list">',
                            '<div class="left">',
                            '<div class="dateAndTime ">', newIndate1,'</div>',
                            '<div class="dateAndTime  times">', newIndate2,'</div>',
                            '</div>',
                            '<img class="node-icon icon1 left"src="ITMS/logistics/img/tubiao/yuanquan.png" alt="">',
                            '<div class="stateAndPlace left ml36">',
                            '<div class="state old">',BillNote,'</div>',
                            '<div class="place ">',city,'</div>',
                            '</div>',
                            '<div class="claar"></div>',
                            '</div>'
                        )
                    }


				});

                $trackrcol2.html(dateList.join(''));

                $(".clean").on("click",function () {
                    $(".form-control").val("") ;
                  /*  $(".track-rcol").html("");
                    $(".detailsGoods").html("")
*/
                });
                $trackrcol2.find('.track-list').first().find('div').css('color','#FF9500');
                console.log($trackrcol2.find('.track-list').first());

			}
        })

       $(".form-control").val("") ;

    });
    $("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.chaxun').trigger("click")
        }
    });
    $details.on('click', function() {
    	if($detailsGoods.css('display') == 'block') {
    		$detailsGoods.slideUp();
    		$imgcon.attr('src', 'ITMS/logistics/img/tubiao/details.png');
    	} else {
    		$detailsGoods.slideDown();
    		$imgcon.attr('src', 'ITMS/logistics/img/tubiao/detail2.png');
    	}
    })
}(window, document, jQuery)