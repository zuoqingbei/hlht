var $lab_content_r = $(".lab_content_r");//国内外右边的大框
var $monitoring = $lab_content_r.find(".monitoring");//曲线监控页
var $sheshi_tab_list = $monitoring.find(".sheshi_tab_list");//曲线左侧的台位列表
var $prevTaiwei = null;
var videoUrlMain = "";
var prevIsLabUrl = false;//主菜单的URL类型
var loadingAnimateVideoLoop = null;
var loadingAnimateCurveLoop = null;
var videoJsIsPlayed = false;


$(function () {
    //弹出订单页面也用了此js
    if(!location.href.includes('layout/orderPopup')){
        smallVideoMove();
        loadAllDataCenterAjax();
    }
    //中心实验室顶上的“返回总状态”按钮
    $(".btn-totalStatus").click(function () {
        $("#r>iframe", parent.document).attr('src',contextPath+'/layout/totalState');
    });
    //国内外切换
    var $navHeadLi = $(".labMainNav>header>ul>li");
    $navHeadLi.click(function () { //这里需要按钮，主菜单，子菜单，内容4部分都有变化
        $navHeadLi.removeClass("active");
        $(this).addClass("active");
        $(".labMainNav>.switchBox>ul:eq(" + $(this).index() + ")").show().siblings().hide();
        $(".labSubNav>ul>li").hide().eq(1).addClass("active").siblings().removeClass("active");

        if ($(this).index() === 0) { //国内
            inlandTabShow();
            $(".lab_content_r>.switchBox>div.item").eq(1).show().siblings().hide();
        } else {                    //国外
            abroadTabShow();
        }
    });

    //左侧菜单数据中心点击事件
    $(".labMainNav>.switchBox").on("click", "ul>li.noChildren, ul>li>ul>li", function () {
        prevIsLabUrl = false;

        $(".labMainNav>.switchBox ul>li").removeClass("active");
        $(this).addClass("active");

        if ($(this).data("urltype")) {//url类型
            moduleMakersShow(dataCenterMap.get($(this).data("urltype") + ''));
        } else {
            $(".labSubNav>ul>li").hide().eq(3).addClass("active").siblings().removeClass("active");
            $lab_content_r.find(".switchBox>div.item.monitoring").show().siblings().hide();
            var dataCenterId = $(this).data("centerid");
            var $curveBox = $monitoring.find(".shishi_right").children(".item.curve");
            if ($(this).parents("ul.inland")[0]) {//从url类型跳回到国内其他列表
                if (dataCenterId === 1) {
                    $(".labSubNav>ul>li").hide().eq(0).addClass("active").siblings().removeClass("active");
                    $lab_content_r.find(".switchBox>div.item.labHome").show().siblings().hide();
                    inlandTabShow("zhonghaiborui");
                    $(".labSubNav>ul>li").eq(1).click();
                } else {
                    inlandTabShow();
                    //只依靠台位来切换曲线不行，万一读不出来台位就一直显示体验馆，而且之前如果显示视频也不会自动隐藏
/*
                    if ($curveBox.is(":hidden")) {//曲线没有显示
                        $curveBox.show().siblings().hide();
                    }
                    $(".smallVideoBox").hide();*/
                    $(".labSubNav>ul>li").eq(3).click();
                    labCurveResize();
                    //非检测中心的隐藏运营状态内容
                    // $(".item.status .leftContent [class$=-body]").children().hide();
                }
            } else {
                abroadTabShow();
                // if ($curveBox.is(":hidden")) {//曲线没有显示
                    $curveBox.show().siblings().hide();
                // }
                $(".smallVideoBox").hide();
                labCurveResize();
            }
            $(".sheshi_tab_lines").click();
            //获取数据中心的视频列表
            loadVideosByDataCenterAjax(dataCenterId);
        }

    });

    //菜单的折叠与展开
    $(".switchBox").on("click", "ul>li>header", function () {
        if ($(this).next().is(":visible")) {
            // console.log("ul:visible")
            $(this).children("span").text("∨").parent().next("ul").hide(200);
        } else {
            $(this).children("span").text("∧").parent().next("ul").show(200);
            if ($(this).next("ul").length > 0) {
                $(this).next("ul").children("li:eq(0)").click();
            }
        }
        $(this).parent().siblings().children("ul").hide()
            .prev("header").children("span").text("∨");
    });

    //頂部子菜单点击事件
    var subNavLi = $(".labSubNav>ul>li");
    subNavLi.click(function () {
        subNavLi.removeClass("active");
        $(this).addClass("active");
        var borderUrl = $lab_content_r.css("background-image");


        //边框变换
        if ($(".labMainNav>header>ul>li:eq(0)").hasClass("active")) {//国内
            if ($(this).index() < 4) {
                borderUrl = borderUrl.replace(/_[1-4]/, "_" + ($(this).index() + 1));
            }
        } else {//国外
            if ($(this).index() < 1) {
                borderUrl = borderUrl.replace(/_[1-2]/, "_1");
            } else {
                borderUrl = borderUrl.replace(/_[1-2]/, "_2");
            }
        }
        $lab_content_r.css("background-image", borderUrl);
        $(".lab_content_r>.switchBox>div.item").eq($(this).index()).show().siblings().hide();
        echartsResize();

        if ($(this).text().indexOf("实时监测") > -1) {
            labCurveResize();
        }
    });

    //实时监测-视频监控按钮
    $(".sheshi_tab.centerVideo").click(function () {
        if ($(this).hasClass("disabled")) {
            return;
        }
        $(this).addClass("sheshi_tab_active").siblings().removeClass("sheshi_tab_active");
        if ($(this).next().is(":hidden")) {
            $(this).next().show().siblings(".sheshi_tab_list").hide();
            $(this).next().find("ul>li:first").click();
        }
    });
    //实时监测-视频地址选择
    $(".centerVideoList>ul").on("click", "li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var videoUrl = $(this).data("videourl").replace("/1/live.m3u8", "/0/live.m3u8");
        // videoShow("bigVideo",videoUrl,0);
        loadingAnimate($(".shishi_right").find(".bigVideoBox>.loadingAnimation"), "视频接入中", 4000);
        // loadingAnimate($(".shishi_right").find(".bigVideoBox>.loadingAnimation"), "视频接入中");
        $("#bigVideo").children("iframe").attr("src", videoUrl);
        $(".shishi_right>.item.video").show().siblings().hide();
    });
    //实时监测-实时数据按钮
    $(".sheshi_tab.sheshi_tab_lines").click(function () {
        $(this).addClass("sheshi_tab_active").siblings().removeClass("sheshi_tab_active");
        if ($(this).next().is(":hidden")) {
            $(this).next().show().siblings(".centerVideoList").hide();
        }
        if (prevIsLabUrl) {
            $(".shishi_right").children(".item.iframe").show().siblings().hide();
        } else {
            $(".shishi_right").children(".item.curve").show().siblings().hide();

        }
    });
    //链接型实验室点击和画中画切换
    $sheshi_tab_list.on("click", ".toLabIframe>header", function () {
        prevIsLabUrl = true;
        $(".sheshi_tab_list>ul>li>ul>li>ul>li").removeClass("active");
        $(this).addClass("active");
        var webUrl = $(this).parent().data("url");
        // console.log("webUrl", webUrl);
        $monitoring.find(".shishi_right>.item.iframe").children("iframe").attr("src", webUrl)
            .parent().show().siblings().hide();

        var labCode = $(this).attr("labcode");
        videoUrlAjax(labCode, "toUrl");
        window.clearInterval(intevalChart1);
        window.clearInterval(intevalChartHadoop);
    });

    //台位点击事件
    $sheshi_tab_list.on("click", "ul>li>ul>li>ul>li", function () {
        prevIsLabUrl = false;
        var $curveBox = $monitoring.find(".shishi_right").children(".item.curve");
        if ($curveBox.is(":hidden")) {//曲线没有显示
            $curveBox.show().siblings().hide();
        }
        labCurveResize();
        $(".sheshi_tab_list>ul>li>ul>li>ul>li").removeClass("active");
        $(".sheshi_tab_list>ul>li>ul>li.toLabIframe>header").removeClass("active");
        $(this).addClass("active");
        //自动切换到曲线显示
        // $(".sheshi_tab.sheshi_tab_lines").click();
        //实时监测的画中画视频切换
        if (!$(this).parent().is($prevTaiwei)) {//如果不是同一个实验室下的台位
            $prevTaiwei = $(this).parent();
            var labCode = $(this).parent().prev().attr("labcode");//获取實驗室編碼
            var $parentMonitoring = $(this).parents(".monitoring");
            videoUrlAjax(labCode);
        }
    });
    //画中画的视频隐藏显示
    $(".smallVideoBox").on("click", ".hideShow>span", function () {
        var $video = $(this).parent().next();
        if ($video.is(":visible")) {
            $video.hide();
            $(this).parent().children(".text").text("点击显示监控");
            $(this).parent().children(".icon").css("background-image", "url(../static/img/lab/browse.png)")
        } else {
            $video.show();
            $(this).parent().children(".text").text("点击隐藏");
            $(this).parent().children(".icon").css("background-image", "url(../static/img/lab/close.png)")
        }
    });

    //获取小视频地址的ajax
    function videoUrlAjax(labCode, toUrl) {
        $.post(contextPath + "/lab/loadTopVideoByLabCodeAjax?labCode=" + labCode, function (data) {
            var videoUrl = data.videl_url.replace("10.130.96.65:10800", "10.130.96.113:10801");
            // console.log("---labCode", labCode, "videoUrl:", videoUrl);
            if (videoUrl) {
                $(".smallVideoBox").show();
                $(".sheshi_tab:eq(0)").removeClass("disabled");
                var forceVideoJSplayingHtml = "<iframe class=\"forceVideoJSplaying\" src=\"http://10.130.96.113:10801/play.html?channel=128\" style=\"position: absolute; width: 550px; height: 300px; opacity: 0.1; z-index: -1;\" ></iframe>\n"
                var $smallVideo = "";
                if (toUrl) {
                    $smallVideo = $("#smallVideoWeb");
                } else {
                    $smallVideo = $("#smallVideo");
                }
                /*
                * 这里解决videoJS跨域时对尺寸大小的限制造成视频不能正常播放的问题
                * Cross-origin plugin content from http://127.0.0.1:10800/adminlte-2.3.6/plugins/video-js-5.19.2/video-js-fixed.swf must have a visible size larger than 400 x 300 pixels, or it will be blocked. Invisible content is always blocked.
                * 从http://127.0.0.1:10800 adminlte-2.3.6跨源插件内容/插件/ video-js-5.19.2 / video-js-fixed。swf必须有一个大于400 x 300像素的可见大小，否则它将被阻塞。不可见的内容总是被阻塞。
                * */
                if (!videoJsIsPlayed && ($smallVideo.width() < 560 || $smallVideo.height() < 300)) {
                    setTimeout(function () { //删除辅助的视频
                        $(".forceVideoJSplaying").remove();
                        videoJsIsPlayed = true;
                    }, 15000);
                }
                $smallVideo.children("iframe:eq(0)").attr("src", videoUrl);
                loadingAnimate($(".shishi_right").find(".smallVideoBox>.loadingAnimation"), "视频接入中", 4500);
            } else {
                $(".smallVideoBox").hide();
            }
        })
    }

    // console.log("bodyScale", bodyScale);
    $(".item.moduleMakers>iframe").css("transform", "scale(" + bodyScale * .93 + ")");


    // 数据分析中的合格率、及时率、满意度
    try{
        initThree();//合格率
    }catch (e) {
        console.log(e.message)
    }

    initfour();//及时率
    inittwo();//满意度
});
function inlandTabShow(mark) { //国内
    if (mark === "zhonghaiborui") {
        $lab_content_r.css("background-image", "url(../static/img/lab/labTabBoardInland_1.png)");
    } else {
        $lab_content_r.css("background-image", "url(../static/img/lab/labTabBoardInland_2.png)");
    }
    $(".labSubNav>ul>li.labHome,.labSubNav>ul>li.status,.labSubNav>ul>li.analysis,.labSubNav>ul>li.curves").show();
}

function abroadTabShow() {//国外
    $lab_content_r.css("background-image", "url(../static/img/lab/labTabBoardForeign_2.png)");
    $(".labSubNav>ul>li.labHome,.labSubNav>ul>li.curves").show();
    $('.labSubNav>ul>li.curves').addClass('active');
    $('.lab_content_r>.switchBox>.item.monitoring').show().siblings().hide();
    //如果不是从full页跳进来，而且国外列表没有选中的情况下：
        if(!$('.item.abroad li').hasClass('active') && !window.top.location.search.includes('toLabData')){
        $('.item.abroad li>ul>li:first').click()
    }
}

function moduleMakersShow(dataCenter) {//模块商
	$("#secondName_world").html(dataCenter.center_name);
    $lab_content_r.css("background-image", "url(../static/img/lab/labTabBoard_onlyOne.png");
    $(".labSubNav>ul>li").hide().eq(4).addClass("active").show().siblings().removeClass("active").hide();
    $lab_content_r.find(".switchBox>div.item.moduleMakers").children("iframe").attr("src", dataCenter.souce_value).parent().show().siblings().hide();
    console.log("url", dataCenter.souce_value)
    setCenterLabHtmlDB(dataCenter);
}

//视频加载动画
function loadingAnimate($thisElem, text, time) {
    // console.log("thisElem---",thisElem[0]);
    $thisElem.fadeIn(200, function () {
        // var loadingAnimateLoop;
        var counter = 0;
        if (time) {
            clearTimeout(loadingAnimateVideoLoop);
            clearTimeout(loadingAnimateFadeOut);
            // console.log("```loadingAnimateFadeOut")
            var loadingAnimateFadeOut = setTimeout(function (loadingAnimateFadeOut) {
                // console.log("自动loadingAnimateFadeOut");
                $thisElem.fadeOut(3000, function () {
                    //如果把清除定时器直接放在回调函数的位置，则不会起作用
                    clearTimeout(loadingAnimateVideoLoop);
                    clearTimeout(loadingAnimateFadeOut);
                });
                // console.log("`````loadingAnimateFadeOut")
            }, time);
        } else {
            clearTimeout(loadingAnimateCurveLoop);
        }
        changeTxt();


        function changeTxt() {
            // clearTimeout(loadingAnimateLoop);
            if (counter === 3) {
                counter = 0;
                $thisElem.text(text);
            } else {
                counter++;
                var point = " ";
                for (var i = 0; i < counter; i++) {
                    point += "。";
                }
                $thisElem.text(text + point);
            }
            if (time) {
                loadingAnimateVideoLoop = setTimeout(changeTxt, 1500);
            } else {
                loadingAnimateCurveLoop = setTimeout(changeTxt, 1000);
            }
            // console.log("changeTxt()");

        }
    });

}

//视频加载动画淡出
function loadingAnimateOut(type, time) {
    // console.log("调用loadingAnimateOut");
    if (type === "curve") {
        // console.log("曲线调用loadingAnimateOut");
        $(".item.curve>.sheshi_right_left>.loadingAnimation").fadeOut(time, function () {
            clearTimeout(loadingAnimateCurveLoop);
        })
    } else {
        console.log("视频调用loadingAnimateOut");
        $monitoring.find(".bigVideoBox>.loadingAnimation,.smallVideoBox>.loadingAnimation").fadeOut(time, function () {
            clearTimeout(loadingAnimateVideoLoop);
        })
    }
}

//小视频拖动
function smallVideoMove() {
    var $smallVideoBox = $(".smallVideoBox");
    $smallVideoBox.mousedown(function (ev) {
        var parent = $(this).parent()[0];
        var smallVideoBox = this;
        var distanceX = ev.clientX - this.offsetLeft;
        var distanceY = ev.clientY - this.offsetTop;
        var maxLeft = parent.offsetWidth - smallVideoBox.offsetWidth;
        var maxTop = parent.offsetHeight - smallVideoBox.offsetHeight;
        // document.onmousemove = function (ev) {
        // $smallVideoBox[0].style.left = ev.
        //             document.onmousemove = function (ev) {
        document.onmousemove = function (ev) {
            console.log("鼠标坐标：",ev.clientX,ev.clientY);
            console.log("距离：",distanceX,distanceY);
            smallVideoBox.style.left = ev.clientX - distanceX + "px";
            smallVideoBox.style.top = ev.clientY - distanceY + "px";

            if(parseInt(smallVideoBox.style.left.slice(0,-2))<0){
                smallVideoBox.style.left =0
            }
            if(parseInt(smallVideoBox.style.top.slice(0,-2))<0){
                smallVideoBox.style.top =0
            }
            if(parseInt(smallVideoBox.style.left.slice(0,-2))>maxLeft){
                smallVideoBox.style.left =maxLeft+"px";
            }
            if(parseInt(smallVideoBox.style.top.slice(0,-2))>maxTop){
                smallVideoBox.style.top =maxTop+"px";
            }
            console.log("smallVideoBox",smallVideoBox)
            console.log("maxLeft",maxLeft,"maxTop",maxTop)
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
        $(".item.iframe")[0].onmouseleave = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    })

}
