/**
 * Created by Administrator on 2017/4/7 0007.
 */


var pathSymbols = {
    bar_chip: '${contextPath!}/static/img/bar_chip.png'
};


//切换地图显示区域及地图全屏
/*
function switchMapArea() {

    var iframe = '<iframe id="iframe" class="iframe map" scrolling="no" frameborder="0" src="' + contextPath + '/lab/flatMap" ></iframe>';
    $(".l").find(".btnGroup img").click(function () {
        var src = $(this).attr("src");

        if (src.indexOf("off") >= 0) {
            src = src.replace("off", "on");
            $(this).attr("src", src)
                .parent().siblings(".oneBtn").find("img")
                .attr("src", $(this).parent().siblings().find("img").attr("src").replace("on", "off"))
            if ($(this).parents(".l").find(".switch.sphere").is(":hidden")) {
                $(this).parents(".l").find(".switch.sphere").css({"display": "flex"}).siblings().hide();

            } else {
                $(this).parents(".l").find(".flat .mapArea iframe").remove();
                $(this).parents(".l").find(".switch.flat").css("display", "flex").find(".mapArea").append(iframe).parent().parent()
                    .siblings().hide();
            }
        }
    });
    $(".left3x3 .btnGroup  img.fullScreen").click(function () {
        $(".fullScreen_map").animate({
            left: 0
        },1000).show();
        $(".left3x3,#r,.labMain_content").hide();
    })
}
*/
function switchMapArea() {

    var iframe = '<iframe id="iframeFlatMap" class="iframe map" scrolling="no" frameborder="0" src="' + contextPath + '/lab/flatMap" ></iframe>';
    $(".l").find(".btnGroup img").click(function () {
        var src = $(this).attr("src");

        if (src.indexOf("off") >= 0) {
            src = src.replace("off", "on");
            $(this).attr("src", src)
                .parent().siblings(".oneBtn").find("img")
                .attr("src", $(this).parent().siblings().find("img").attr("src").replace("on", "off"));
            if ($(this).parents(".l").find(".switch.sphere").is(":hidden")) { //球是隐藏的
                $(this).parents(".l").find(".switch.sphere").css({"display": "flex"}).siblings().hide();
            } else { //平面地图是隐藏的
                $(this).parents(".l").find(".switch.flat").css("display", "flex").siblings().hide();
                resetSize();
            }
        }
    });
    $(".left3x3 .btnGroup  img.fullScreen").click(function () {
        $(".fullScreen_map").animate({
            left: 0
        },1000).show();
        $(".left3x3,#r,.labMain_content").hide();
    })
}

//切换地球和平面地图按钮的提示
function switchMapBtnTip() {
    $(".btnGroup img").hover(function () {
        $(this).siblings().show()
    }, function () {
        $(this).siblings().hide()
    })
}
//重置echart图标大小 在加载平面地图时被调用
function resetSize() {
    for (var i = 0; i < myCharts.length; i++) {
        myCharts[i].resize();
    }
    var $iframeFlatMap =$("#iframeFlatMap");
    $iframeFlatMap[0].contentWindow.createArrData(productCode, labType);
    $iframeFlatMap[0].contentWindow.myFlatMap.resize()
}
//切换生产线和实验室的列表显示
function navLabLine() {
    //切换平面地图下面导航栏内实验室和生产线
    $(".l").find(".legend .navSwitch").click(function () {
        var bgImg = $(this).css("background-image");
        if (bgImg.indexOf("off") > 0) {
            var text = $(this).text();
            bgImg = bgImg.replace("off", "on");
            $(this).css({
                color: "#00e673",
                backgroundImage: bgImg
            }).siblings(".navSwitch").css({
                color: "#6cf",
                backgroundImage: bgImg.replace("on", "off")
            });
            if (text.indexOf("产线") >= 0) {

                $(".legend .animateBox").animate({top: "-2.1em"}, "slow")
                    .find(".line").addClass("current").siblings().removeClass("current");
            } else {
                // $(".legend ul.lab").css("top","15px");
                $(".legend .animateBox").animate({top: "-.5rem"}, "slow")
                    .find(".lab").addClass("current").siblings().removeClass("current");
            }
        }
    });
}
//让元素的背景图标点亮
function bgImgOn(e) {
    var bgImg = e.find("span").css("background-image");
    e.find("span").css("background-image", bgImg.replace("off", "on"));
    return e;
}
//让元素的背景图标熄灭
function bgImgOff(e) {
    var bgImg = e.find("span").css("background-image");
    e.find("span").css("background-image", bgImg.replace("on", "off"));
    return e;
}
//导航栏中的全选
function navSelectAll() {
    $(".l").find(".legend .selectAll label").click(function () {
        var $actLi = $(this).parents(".l").find(".legend .labLine ul.current").find("li");
            $(this).css("color", "#6cf");
            bgImgOn($(this)); //全选前面的对勾
        // $actLi.addClass("active");
            $actLi.addClass("active").each(function () {
            // $actLi.each(function () {
                bgImgOn($(this))
            });
        selectActLi($(this));
    })
}
//选取被激活li元素下面的值
function selectActLi($this) {
    if(getSelectLab($this)){
    	reloadData(productCode, labType);
    };
}
//获取实验室类别 产线选择类型
function getSelectLab($this) {
    //实验室类别
    var changed = true;
    var mlabType = "";
    var mproductCode = "";
    var $actLi = $this.parents(".l").find(".legend .labLine .lab").find("li.active");
    $actLi.each(function () {
        mlabType += $(this).attr("code") + ","
    });
    //产线
    var $actLiPro = $this.parents(".l").find(".legend .labLine .line").find("li.active");
    console.log("------$actLiPro:" + $actLiPro.length)
    $actLiPro.each(function () {
        mproductCode += $(this).attr("code") + ","
    });
    // $(this).parents = mproductCode.substr(0, mproductCode.length - 1);
    mlabType = mlabType.substr(0, mlabType.length - 1);
    console.log("------------mproductCode,mlabType:",mproductCode,mlabType);
    if (mlabType == labType && mproductCode == productCode) {
        changed = false;
    }
    labType = mlabType;
    productCode = mproductCode;
    return changed;
}
//重置数据
function reloadData(productCode, labType) {
    // console.log(labType+"----"+productCode)
    //平面地图数据mapFlat
    //console.log(echarts.init(document.getElementById('iframe').contentWindow.document.getElementById("mapFlat")))
    //document.getElementById('iframe').contentWindow.say()
    for (var k = 0; k < $("#iframeFlatMap").length; k++) {

        $("#iframeFlatMap").eq(k)[0].contentWindow.createArrData(productCode, labType);
    }
    // reloadLeftData();
}
//点击a元素时
function navSelectA() {//这里会触发地图中要加载的数据
    $(".l").find(".legend ul li a").click(function () {
        var bgImg = $(this).find("span").css("background-image");
        var $selectLi = $(this).parent();
        $selectLi.addClass("active");
        bgImgOn($selectLi);
        $selectLi.siblings().removeClass("active").each(function () {
            bgImgOff($(this))
        });
        //关闭全选状态
        bgImgOff($(this).parents(".legend").find(".selectAll label"));
        $(this).parents(".legend").find(".selectAll label").css("color", "#999");
        //如果是生产线和实验室
        if ($(this).parents(".labLine").length > 0) {
            selectActLi($(this));
        }
    });
    //点击检测中心切换右边页面上
    var $flatBottomSwitchLi = $("#l.left3x3").find(".flat-footer ul.legend-bottom li");
    $flatBottomSwitchLi.find("a").click(function () {
        if($(this).text() ==="检测中心"){
            $("#r").hide();
            $(".labMain_content").show()
            $(".labMain_content_country").hide()
        }
    })
}
//地球右上角区域的数字样式
function sphereRTnumberShow(n) {
    for (var k = 0; k < $(".sphere-right-top .chartBorder ul").length; k++) {
        // console.log("~~~~~~~~~~~~~~~~~~~",$(".sphere-right-top .chartBorder ul").length,n)
        for (var j = 0; j < n.length; j++) {


            var $flatLTnumber = $(".sphere-right-top .chartBorder ul").eq(k).find("li").eq(j).find(".allnum");
            var str = n[j] + "";
            var newStr = "";
            for (var i = 0; i < 4; i++) {
                if (i < 4 - str.length) {
                    newStr += "0";
                } else {
                    newStr += '<span style="color: #fff;">' + str + '</span>';
                    $flatLTnumber.html(newStr);
                    break;
                }

            }
        }

    }
}
function sphereRTHlnumberShow(n) {
    for (var k = 0; k < $(".sphere-right-top .chartBorder ul").length; k++) {
        // console.log("~~~~~~~~~~~~~~~~~~~",$(".sphere-right-top .chartBorder ul").length,n)
        for (var j = 0; j < n.length; j++) {


            var $flatLTnumber = $(".sphere-right-top .chartBorder ul").eq(k).find("li").eq(j).find(".hlnum");
            var str = n[j] + "";
            var newStr = "";
            for (var i = 0; i < 4; i++) {
                if (i < 4 - str.length) {
                    newStr += "0";
                } else {
                    newStr += '<span style="color: #fff;">' + str + '</span>';
                    $flatLTnumber.html(newStr);
                    break;
                }

            }
        }

    }
}
//球形地图右下角的广告滚动
function sphereRBscroll() {
    var speed = 100;

    scroll($(".fullScreen_map .scroll"),$(".fullScreen_map .scroll ul:first"),$(".fullScreen_map .scroll ul:last"),20);
    // scroll($(".left3x3 .scroll"),$(".left3x3 .scroll ul:first"),$(".left3x3 .scroll ul:last"),50);

    function scroll($scrollBoard,$ul1,$ul2,speed) {
        $scrollBoard.css("height", $scrollBoard.width);
        $ul2.html($ul1.html());
        function Marquee() {
            //scrollTop:溢出上边界的高度
            //offsetHeight:元素包括border和padding的高度
            //$scrollBoard这个高度一定要小，且不能用百分比
            if ($ul2[0].offsetHeight <= $scrollBoard[0].scrollTop)
                $scrollBoard[0].scrollTop -= $ul2[0].offsetHeight;
            else {
                $scrollBoard[0].scrollTop++;
            }
        }

        var MyMar = setInterval(Marquee, speed);
        $scrollBoard.hover(function () {
            clearInterval(MyMar)
        }, function () {
            MyMar = setInterval(Marquee, speed);
        })
    }
}

function popWindow() {
    var $h2 = $(".fullScreen_map .sphere .mapArea h2");
    $h2.click(function (e) {
        $(this).siblings(".popWindow, .popWindowMask").show(300);
        // e.stopPropagation();
    });
    $h2.siblings(".popWindowMask").click(function () {
        $(this).hide(500).siblings(".popWindow").hide(500);;
    })

}
$(function () {
   
    //调整字符云页面的文字大小
    // document.getElementById("wordCloud").contentWindow.resizeText(bodyScale);
    // wordCloud.window.resizeText(bodyScale);

    //切换地图显示区域
    switchMapArea();
    //切换地球和平面地图按钮的提示
    switchMapBtnTip();
    //切换生产线和实验室的列表显示
    navLabLine();
    //导航栏中的全选
    navSelectAll();
    //点击a元素时
    navSelectA();
    //球形地图右下角的广告滚动
    sphereRBscroll();
    //地球页面弹窗
    popWindow();


    //开场视频已经移到full.html中去了

});
