	<?php
		require_once "../../jssdk.php";
		$jssdk = new JSSDK("wx029d1989acb9f44c", "b7a482220530d3be2278429bdf2a7a63");
		$signPackage = $jssdk->GetSignPackage();
	?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>TMS</title>
    <link rel="stylesheet" href="css/logistics.css">
</head>
<body>
    <div id="header">
        <span>TMS</span>
    </div>
    <div class="search">
        <div class="wap">
            <input type="text" class="form-control" placeholder="请输入运单号">
            <img class="search1" src="img/tubiao/search.png">
          <!--  //<span class="tishi">请输入运单号</span>-->
            <img id="saoyisao" class="saoma" src="img/tubiao/saoma.png" alt="">
            <img class="clean" src="img/tubiao/cancel.png">
        </div>
        <div class="right searchBtn">
        	<span class="chaxun">搜索</span>
        </div>
    </div>
    <div class="track-rcol">
        <div class="Orderdetail">
            <div class="OrderID">
                <span>订单号：</span>
                <span class="ddh"></span>
            </div>
            <span id="details">详情<img src="img/tubiao/details.png" alt=""></span>
            <div class="clear"></div>
        </div>
        <div class="detailsGoods">
        	<!--<p>货物名称：奥曲肽</p>-->
	        <!--<p>始发城市：武汉</p>-->
	        <!--<p>目的城市：乌鲁木齐</p>-->
	        <!--<p>件数：2件</p>-->
	        <!--<p>温度计使用：已使用</p>-->
	        <!--<p>温度计区间：2℃~5℃</p>-->
	        <!--<p>实际重量：120kg</p>-->
	        <!--<p>计费重量：120kg</p>-->
	        <!--<p>签收人：张三</p>-->
	        <!--<p>签收时间：2017-02-23 15:12:00</p>-->
	        <!--<p>委托时间：2017-02-23 15:40:35</p>-->
        </div>
      
    </div>
    <div class="track-rcol2">
       <!-- <div class="track-list">
            <div class="left">
                <div class="dateAndTime theNew">03-10</div>
                <div class="dateAndTime theNew times">18: &nbsp;07</div>
            </div>
            <img class="node-icon icon1 left"src="img/tubiao/wljh.png" alt="">
            <div class="stateAndPlace left ml36">
                <div class="state theNew">签收</div>
                <div class="place theNew">[乌鲁木齐]</div>
            </div>
            <div class="claar"></div>
        </div>-->
    </div>
	
    <script src="js/jquery.js"type="text/javascript"></script>
    <script src="js/logistics.js"></script>
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                };

            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);

    </script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" charset="utf-8"></script>
    <script type="text/javascript">
		wx.config({
			debug: false,
			appId: '<?php echo $signPackage["appId"];?>',
			timestamp: '<?php echo $signPackage["timestamp"];?>',
			nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			signature: '<?php echo $signPackage["signature"];?>',
			jsApiList: [
				'chooseImage',
				'scanQRCode'
			]
		});
		$("#saoyisao").on("click", function() {
			wx.scanQRCode({
				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function(res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果;
					$("#post_add").val(result.replace("CODE_128,", ""));
				}
			});
		});
</body>
</html>

