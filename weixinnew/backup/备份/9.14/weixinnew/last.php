<?php
/**
 * wechat php test
 */
//define your token
$postStr=isset($GLOBALS['HTTP_RAW_POST_DATA'])?$GLOBALS['HTTP_RAW_POST_DATA']:file_get_contents("php://input");
//get post data, May be due to the different environments

//file_put_contents("./data.txt",$postStr);
//die();
//extract post data
if (!empty($postStr)){
    //libxml_disable_entity_loader(true);
    $postObj = simplexml_load_string($postStr, 'SimpleXMLElement',LIBXML_NOCDATA);
    $fromUsername = $postObj->FromUserName;
    $toUsername = $postObj->ToUserName;
    $RX_TYPE=trim($postObj->MsgType);

    $keyword = trim($postObj->Content);
    $time = time();

    $textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							<FuncFlag>0</FuncFlag>
							</xml>";
    $imageTpl=	"<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Image>
							<MediaId><![CDATA[%s]]></MediaId>
							</Image>
							</xml>";
    $newsTpl=	"<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<ArticleCount>1</ArticleCount>
							<Articles>
							<item>
							<Title><![CDATA[%s]]></Title>
							<Description><![CDATA[%s]]></Description>
							<PicUrl><![CDATA[%s]]></PicUrl>
							<Url><![CDATA[%s]]></Url>
							</item>
							</Articles>
						</xml>";
    if($RX_TYPE=="event")
    {
        $result=receiveEvent($postObj);
    }else{
        if(!empty( $keyword ))
        {
            if($keyword=="设备"||$keyword=="查询"||$keyword=="冷链"||$keyword=="监控"||$keyword=="我的设备"||$keyword=="中集冷云"){
                $msgType = "text";
                $contentStr = "<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">我的设备</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="说明书"||$keyword=="产品说明书"||$keyword=="监控仪"||$keyword=="设备"){
                $msgType = "news";
                $title="温湿度监控智能终端使用说明书（20TP与20DP）";
                $Description="温湿度监控智能终端使用说明书（20TP与20DP）";
                $PicUrl="http://www.ccsc58.cc/weixinnew/img/shumingshu_tuisong.png";
                $Url="http://mp.weixin.qq.com/s/a-7N3QysT4Bmn3eNGPldOw";
                $resultStr = sprintf($newsTpl, $fromUsername, $toUsername, $time, $msgType,$title,$Description,$PicUrl,$Url);
                echo $resultStr;
            }else if($keyword=="RFID"||$keyword=="rfid"||$keyword=="Rfid"){
                $msgType = "text";
                $contentStr = "<a href=\"http://jd.ccsc58.cc/index_RFID.php?t=RFID_20170830\">RFID</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="绑定"||$keyword=="手机号"||$keyword=="手机号码绑定"||$keyword=="关联"){          
                $msgType = "text";
                $contentStr = "<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth_3.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">微信绑定</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="二维码"||$keyword=="app二维码"){
                $msgType = "news";
                $title="";
                $Description="中集冷云温湿度监控app二维码";
                $PicUrl="http://www.ccsc58.cc/weixinnew/img/Ewm_android.jpg";
                $Url="http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=42375908&isTimeline=false&actionFlag=0&params=pname%3Dcom.ccsc.coldcloud%26versioncode%3D1%26channelid%3D%26actionflag%3D0&from=singlemessage&isappinstalled=1";
                $resultStr = sprintf($newsTpl, $fromUsername, $toUsername, $time, $msgType,$title,$Description,$PicUrl,$Url);
                echo $resultStr;
            }else if($keyword=="网址"||$keyword=="官网"){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.cccc58.com\">中集冷云（北京）供应链管理有限公司</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="RFID"||$keyword=="rfid"||$keyword=="Rfid"){
                $msgType = "text";
                $contentStr = "<a href=\"http://jd.ccsc58.cc/index_RFID.php?t=RFID_20170830\">RFID</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="下载"||$keyword=="app"||$keyword=="APP"||$keyword=="App"||$keyword=="安卓"||$keyword=="ios"||$keyword=="IOS"||$keyword=="应用"||$keyword=="苹果"){
                $msgType = "text";
                $contentStr = "<a href=\"http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=42375908&isTimeline=false&actionFlag=0&params=pname%3Dcom.ccsc.coldcloud%26versioncode%3D1%26channelid%3D%26actionflag%3D0&from=singlemessage&isappinstalled=1\">中集冷云(安卓)</a>\n\n<a href=\"https://itunes.apple.com/us/app/zhong-ji-leng-yun-wen-shi/id1173609882?mt=8\">中集冷云(苹果)</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="客服"){
                $msgType = "text";
                $contentStr = "客服电话:400-6507-168";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="?"||$keyword=="？"||$keyword=="时间"||$keyword=="当前时间"){
            	$msgType = "text";
                $contentStr = date("Y-m-d H:i:s",time());
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }
            else if($keyword=="报警"||$keyword=="异常"){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.ccsc58.cc/weixinnew/html/warning_rukou.html\">设备报警列表</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if(is_numeric($keyword)&&strlen($keyword)>=5&&strlen($keyword)<=8){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.ccsc58.cc/weixinnew/details_rukou.html?num_m=".$keyword."\">".$keyword."</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }
            else if(is_numeric($keyword)&&strlen($keyword)==12){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.cccc58.com\">运单单号:".$keyword."</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="订单"||$keyword=="我的订单"){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.ccsc58.cc/weixinnew/html/dingdan_rukou.html\">我的订单</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }
            else if($keyword=="运单"||$keyword=="运单查询"||$keyword=="单号查询"||$keyword=="单号"){
                $msgType = "text";
                $contentStr = "<a href=\"http://www.cccc58.com/\">下单查询</a>";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if($keyword=="抽奖"||$keyword=="奖"||$keyword=="抽"||$keyword=="转盘抽奖"||$keyword=="choujiang"){
                $msgType = "text";
                $contentStr = "/微笑<a href=\"http://www.ccsc58.cc/leng/zhuanPan/yongHuXinXi.html\">参与抽奖</a>/微笑\n备注：请本人参与抽奖，代抽一律作废处理，感谢您的参与与配合!本次活动最终解释权归中集冷云所有";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else if(strstr($keyword, "天气")){
	             	if($keyword=="天气"){
	             	$msgType = "text";
	                $contentStr = "请输入城市+天气\n如北京天气";
	                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
	                echo $resultStr;
	             	}else{
	             		$result=receiveText($postObj);
	             	}	
	            }
            else if($keyword=="JdbJ"||$keyword=="京东报警"){
	                $msgType = "text";
	                $contentStr = "<a href=\"http://www.ccsc58.com/warning/\">京东报警</a>";
	                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
	                echo $resultStr;
	            }else{
                $msgType = "text";
                $contentStr = "您好！您可以回复以下内容：\n\n☞【下载】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">下载APP</a>\n\n☞【客服】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">客服电话</a>\n\n☞【说明书】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">产品说明书</a>\n\n☞【设备号】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">设备详情</a>\n\n☞【报警/异常】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">报警设备</a>\n\n☞【绑定/设备】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">绑定账号</a>\n\n☞【订单/我的订单】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">我的订单</a>\n\n☞【运单/运单查询】:<a href=\"http://www.cccc58.com\">下单查询</a>\n\n客服电话:400-6507-168";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            };
        }else{
            echo "Input something...";
        };
    }
    
    echo $result;
};
function receiveEvent($object)
{
    $content = "";
    switch($object->Event)
    {
        case "subscribe":
            $content = "您好，欢迎关注中集冷云公众平台！/微笑\n\n请点击下方“中集冷云”按钮进行账号绑定\n请点击“关于我们”按钮下载相关APP\n\n您好！您可以回复以下内容：\n\n☞【下载】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">下载APP</a>\n\n☞【客服】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">客服电话</a>\n\n☞【说明书】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">产品说明书</a>\n\n☞【设备号】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">设备详情</a>\n\n☞【报警/异常】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">报警设备</a>\n\n☞【绑定/设备】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">绑定账号</a>\n\n☞【订单/我的订单】:<a href=\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82dbac04fa8fd8ef&redirect_uri=http://www.ccsc58.cc/weixinnew/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect\">我的订单</a>\n\n☞【运单/运单查询】:<a href=\"http://www.cccc58.com\">下单查询</a>\n\n客服电话:400-6507-168";
            break;
        case "unsubscribe":
            $content = "";
            break;
		case "CLICK":
		    switch ($object->EventKey)
		    {
		        case "shuomingshu":
		             $content[] = array("Title" =>"温湿度监控智能终端使用说明书（20TP与20DP）", 
		    		 "Description" =>"温湿度监控智能终端使用说明书（20TP与20DP）", 
		             "PicUrl" =>"http://www.ccsc58.cc/weixinnew/img/shumingshu_tuisong.png", 
		             "Url" =>"http://mp.weixin.qq.com/s/a-7N3QysT4Bmn3eNGPldOw");
		             break;
		        case "tel":
		            $content = "客服电话：400-6507-168";
		            break;
		            default:
		            $content[] = array("Title" =>"冷云冷链", 
		            "Description" =>"您正在使用冷云冷链公众平台", 
		            "PicUrl" =>"http://discuz.comli.com/weixin/weather/icon/cartoon.jpg", 
		            "Url" =>"weixin://addfriend/pondbaystudio");
		            break;
		    }
            break;
            default:
            break;  
    }
	if (is_array($content))
	{
        $result = transmitNews($object, $content);
    }else{
        $result = transmitText($object, $content);
    }
    //$result = transmitText($object,$content);
    return $result;
};
function transmitText($object,$content)
{
    $tuiTpl = "<xml>
					<ToUserName><![CDATA[%s]]></ToUserName>
					<FromUserName><![CDATA[%s]]></FromUserName>
					<CreateTime>%s</CreateTime>
					<MsgType><![CDATA[text]]></MsgType>
					<Content><![CDATA[%s]]></Content>
					</xml>";
    $fromUsername = $object->FromUserName;
    $toUsername = $object->ToUserName;
    $time = time();
    $result = sprintf($tuiTpl,$fromUsername,$toUsername,$time,$content);
    return $result;
};
function transmitNews($object, $arr_item, $funcFlag = 0)
			    {
			        //首条标题28字，其他标题39字
			        if(!is_array($arr_item))
			            return;
			
			        $itemTpl = "<item>
						        <Title><![CDATA[%s]]></Title>
						        <Description><![CDATA[%s]]></Description>
						        <PicUrl><![CDATA[%s]]></PicUrl>
						        <Url><![CDATA[%s]]></Url>
						    	</item>";
			        $item_str = "";
			        foreach ($arr_item as $item)
			        $item_str .= sprintf($itemTpl, $item['Title'], $item['Description'], $item['PicUrl'], $item['Url']);
			        $newsTpl = "<xml>
								<ToUserName><![CDATA[%s]]></ToUserName>
								<FromUserName><![CDATA[%s]]></FromUserName>
								<CreateTime>%s</CreateTime>
								<MsgType><![CDATA[news]]></MsgType>
								<Content><![CDATA[]]></Content>
								<ArticleCount>%s</ArticleCount>
								<Articles>
								$item_str</Articles>
								<FuncFlag>%s</FuncFlag>
								</xml>";
			        $resultStr = sprintf($newsTpl, $object->FromUserName, $object->ToUserName, time(), count($arr_item), $funcFlag);
			        return $resultStr;
			    }
//{{first.DATA}}
//设备号：{{keyword1.DATA}}
//告警时间：{{keyword2.DATA}}
//告警级别：{{keyword3.DATA}}
//告警模块：{{keyword4.DATA}}
//事件描述：{{keyword5.DATA}}
//{{remark.DATA}}
function Tui_song($first,$keyword1,$keyword2,$keyword3,$keyword4,$keyword5,$remark,$openId,$app_key,$keyword6)
{
    //$keyword5='\n'.$keyword5.'\n';
    $first=$first.'\n\n设备编号：'.$keyword1;
    $keyword2=$keyword2.'\n详情描述：'.$keyword5;
    $remark='\n'.$remark;
    if($app_key== "261AFF68C0E9F076420D083D66222824"){
        $template=array(
            'touser'=>$openId,
            'template_id'=>"SiyIucG59C-fdnAR5n6WhszwXjZTsPjpZOqFuKzo--w",
            'url'=>"http://www.ccsc58.cc/weixinnew/html/warning_tui_rukou.html?num_m=".$keyword6."&",
            'topcolor'=>"#000000",
            'data'=>array('first'=>array('value'=>urlencode($first),'color'=>"#000",),
                'keyword1'=>array('value'=>urlencode($keyword3),'color'=>"#ff0000",),
                'keyword2'=>array('value'=>urlencode($keyword4),'color'=>"#000",),
                'keyword3'=>array('value'=>urlencode($keyword2),'color'=>"#000",),
                'remark'=>array('value'=>urlencode($remark),'color'=>"#000"),
            )
        );
        $url="http://api.weixin.qq.com/cgi-bin/message/template/send?access_token=".getAccessToken();
        $result=https_request($url,urldecode(json_encode($template)));
        //var_dump($result);
    }
}

function https_request($url,$data = null){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}
	$arr = array();
	foreach($_POST as $v)
	{
	    $arr[] = $v;
	}
	if(count($arr)==10){
		Tui_song($arr[0],$arr[1],$arr[2],$arr[3],$arr[4],$arr[5],$arr[6],$arr[7],$arr[8],$arr[9]);
	}elseif(count($arr)==8){
		 Pay_money($arr[0],$arr[1],$arr[2],$arr[3],$arr[4],$arr[5],$arr[6],$arr[7]);
	}else{
		 jiankong($arr[0],$arr[1],$arr[2],$arr[3],$arr[4],$arr[5],$arr[6]);
	}

function Pay_money($first,$keyword1,$keyword2,$keyword3,$keyword4,$remark,$openId,$app_key)
{
    if($app_key== "261AFF68C0E9F076420D083D66222824"){
        $template=array(
            'touser'=>$openId,
            'template_id'=>"0P_Gawko7wU3H2uJFHWBbbVYxsKmnZj4fFJ6mS5nBLI",
            'url'=>"http://www.ccsc58.cc/weixinnew/pay_list.html",
            'topcolor'=>"#000000",
            'data'=>array('first'=>array('value'=>urlencode($first),'color'=>"#000",),
                'keyword1'=>array('value'=>urlencode($keyword1),'color'=>"#000",),
                'keyword2'=>array('value'=>urlencode($keyword2),'color'=>"#0000ff",),
                'keyword3'=>array('value'=>urlencode($keyword3),'color'=>"#000",),
                'keyword4'=>array('value'=>urlencode($keyword4),'color'=>"#000",),
                'remark'=>array('value'=>urlencode($remark),'color'=>"#000",),
            )
        );
        $url="http://api.weixin.qq.com/cgi-bin/message/template/send?access_token=".getAccessToken();
        $result=https_request($url,urldecode(json_encode($template)));
        header('location:../weixin/image_test.html');
    }
}
//监控
function jiankong($first,$keyword1,$keyword2,$keyword3,$remark,$openId,$app_key)
{
    //$keyword5='\n'.$keyword5.'\n';
//  $first=$first.'\n\n设备编号：'.$keyword1;
//  $keyword2=$keyword2.'\n详情描述：'.$keyword3;oTarnv1Yl1Mk81Qb2Gm9G3gyar90
    $remark='\n'.$remark;
    if($app_key== "261AFF68C0E9F076420D083D66222824"){
        $template=array(
            'touser'=>$openId,
            'template_id'=>"gZHz3q-PQrZOhRd-TU_6QvmKDqfrdrvOtTi_74H-Zk4",
            'url'=>"http://www.ccsc58.com/warning",
            'data'=>array('first'=>array('value'=>urlencode($first),'color'=>"#0000FF",),
                'keyword1'=>array('value'=>urlencode($keyword1),'color'=>"#000",),
                'keyword2'=>array('value'=>urlencode($keyword2),'color'=>"#000",),
                'keyword3'=>array('value'=>urlencode($keyword3),'color'=>"#ff0000",),
                'remark'=>array('value'=>urlencode($remark),'color'=>"#000"),
            )
        );
        $url="http://api.weixin.qq.com/cgi-bin/message/template/send?access_token=".getAccessToken();
        $result=https_request($url,urldecode(json_encode($template)));
        var_dump($result);
    }
}
//用户关注后向客户推送；
function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode(get_php_file("access_token.php"));
    if ($data->expire_time < time()) {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx82dbac04fa8fd8ef&secret=98ecda31265ffc327d59adc969089650";
        $res = json_decode(https_request($url));
        $access_token = $res->access_token;
        if ($access_token) {
            $data->expire_time = time() + 7000;
            $data->access_token = $access_token;
            set_php_file("access_token.php", json_encode($data));
        }
    } else {
        $access_token = $data->access_token;
    }
    return $access_token;
}
function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
}

function set_php_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>
" . $content);
fclose($fp);
}

function receiveText($object)
    {
        $keyword = trim($object->Content);
		if (strstr($keyword, "天气")){
			$city = str_replace('天气', '', $keyword);
			include("weather2.php");
			$content = getWeatherInfo($city);
		//判断笑话
		}
        $result = transmitNews($object, $content);
        return $result;
    }