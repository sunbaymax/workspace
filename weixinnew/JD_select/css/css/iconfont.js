(function(window){var svgSprite='<svg><symbol id="icon-yundan" viewBox="0 0 1128 1024"><path d="M948.943215 152.227225v403.620116h37.759574V152.227225c0-41.45847-12.836053-77.060354-37.319229-103.238857C923.403212 21.312692 886.43626 6.605173 842.291685 6.605173h-35.667935v37.649487h35.601884c65.699456 0 106.65153 41.282332 106.761616 107.884496zM270.393773 7.375777H715.560429V45.13535H270.393773V7.375777z m0 234.571717h463.264831V279.618998H270.393773v-37.671504z m0 180.673504h278.386033v37.759574H270.393773V422.731084z m0 193.289385h170.699693v37.803608h-170.699693v-37.803608z"  ></path><path d="M44.298695 866.422585V152.227225c0-49.164506 18.516502-107.884495 106.65153-107.884496h28.886624V6.605173H150.950225C60.569438 6.605173 6.605173 60.943731 6.605173 152.161173V866.37855c0 91.833925 59.248404 151.016276 151.016277 151.016277h304.190242v-37.825625H157.62145c-70.93956 0.110086-113.322755-42.229074-113.322755-113.146617z"  ></path><path d="M968.626631 883.15569c39.30078 0 71.269819 30.097573 71.269819 67.10856s-31.969038 67.10856-71.269819 67.10856-71.269819-30.11959-71.269818-67.10856 31.969038-67.10856 71.269818-67.10856z m0 111.869617c26.20052 0 47.513212-20.079727 47.513213-44.73904s-21.312692-44.73904-47.513213-44.73904-47.513212 20.079727-47.513212 44.73904 21.312692 44.73904 47.513212 44.73904z m-308.813864 22.36952c39.30078 0 71.269819-30.097573 71.269819-67.10856s-31.969038-67.10856-71.269819-67.108559-71.269819 30.097573-71.269818 67.108559 31.969038 67.10856 71.269818 67.10856z m0-111.869617c26.20052 0 47.513212 20.079727 47.513213 44.73904s-21.312692 44.73904-47.513213 44.73904-47.513212-20.079727-47.513212-44.73904 21.312692-44.73904 47.513212-44.73904z m118.761014-213.126921v246.593132-246.593132z"  ></path><path d="M529.162442 820.340493v129.90174a11.537036 11.537036 0 0 0 11.867294 11.18476h23.756606a11.206777 11.206777 0 1 0 0-22.36952h-11.867294V823.444925L631.894902 704.177514h122.94429V950.26425a11.537036 11.537036 0 0 0 11.889312 11.18476h94.674149a11.18476 11.18476 0 1 0 0-22.347503h-82.784837V625.84016h320.681158v313.261347h-30.075555a11.18476 11.18476 0 1 0 0 22.347503h41.94285a11.537036 11.537036 0 0 0 11.867294-11.162743V614.677417a11.537036 11.537036 0 0 0-11.867294-11.162742H766.706487a11.537036 11.537036 0 0 0-11.867295 11.162742v67.10856H625.289729a12.06545 12.06545 0 0 0-10.083898 5.262121l-84.237975 127.369757a10.722398 10.722398 0 0 0-1.805414 5.922638z"  ></path><path d="M648.231697 811.951923l52.64323 0.110087 0.24219-59.182352H648.407835l-0.176138 59.072265z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)