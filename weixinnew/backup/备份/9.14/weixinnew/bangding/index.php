<div style="display:none">
	<?php
		require_once "../jssdk.php";
		$jssdk = new JSSDK("wx82dbac04fa8fd8ef", "98ecda31265ffc327d59adc969089650");
		$signPackage = $jssdk->GetSignPackage();
	?>
</div>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	<title>中集冷云(北京)冷链科技有限公司</title>
	<link rel="stylesheet" type="text/css" href="../css/index.css" />
	<link rel="stylesheet" type="text/css" href="css/bangding.css" />
</head>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="css/jquery-2.1.0.js"></script>



<body>
	<img class="hong_bj" src="../img/bangding.png"/>	
	<form class="hong_box">
		<p>手机号码绑定</p>
		<input type="text" class="" placeholder="" style="display: none;"/>
		<input type="text" class="phone" name="phone" placeholder="请输入手机号" />
		<div class="yanZhengMa">获取验证码</div>
		<input type="text" class="messageCode" name="messageCode" placeholder="请输入验证码" />
		<div class="button">确认提交</div>
		<!--<img src="../img/hong_sao.png" />-->
	</form>
	<script type="text/javascript">
			/*
			 * 判断用户是否登录，如果已登录跳转到
			 */
			if(window.localStorage.getItem("user")) {
				window.location.href = "../index.html";
			}
	</script>
		<script type="text/javascript">
			$(".button").on('click',function(){
				var url = "panduan.php";
				var phone = $("input[name='phone']").val();
				var messageCode = $("input[name='messageCode']").val();
				var reg = /^1[345789]\d{9}$/;
				if($(".phone").val() == ""){
					alert("手机号不能为空!");
					return false;
//					refresh();
					}
				  if(!reg.test(phone)){
					alert("请输入正确格式的手机号!");
					return false;
					}
					
					if($(".messageCode").val() == ""){
					alert("请输入验证码!");
					return false;
					}
				var messageCode = $("input[name='messageCode']").val();
				var data = {phone:phone, messageCode:messageCode};
				$.post(url,data,function(msg){
					if(msg.status){
						alert(msg.info);
					}else{
						alert(msg.info);
					}
				},'json');
			});
			$(".yanZhengMa").on('click',function(){				
                var val = $(this).text();
               
                switch(val){               	
                    case "获取验证码":                       
                        var url = "./yanzhengma.php";
                        var tel = $("input[name='phone']").val();
                        if(tel.length){
                            var reg = /^1[345789]\d{9}$/;
                            if(reg.test(tel)){         
                                console.log("短信已发至您的手机");
                                var num = 60;
                                var setint = setInterval(function(){
                                    $(".yanZhengMa").css({'font-size':'12px'});
                                    $(".yanZhengMa").text(num + "秒后重新获取");
                                    num -= 1;
                                    if(num < 0){
                                        clearInterval(setint);
                                        $(".yanZhengMa").css({'font-size':'14px'});
                                        $(".yanZhengMa").text("获取验证码");
                                    }
                                },1000);
                                $.post(url,{tel:tel},function(msg){
									console.log(msg);
									alert("手机号"+tel)
                                });
                            }else{
                            	alert('手机格式不正确');
                            }
                        }else{
                            alert('手机号不能为空');
                        }
                }
            });
		</script>
</body>

</html>