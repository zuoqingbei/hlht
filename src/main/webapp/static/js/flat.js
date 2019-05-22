/**
 * Created by Administrator on 2017/4/15 0015.
 */
var bodyScale = parent.bodyScale || 1;
var pageH = parent.pageH;
var pageW = parent.pageW;

var TIP_SETTIMEOUT_TIME = 2000;//静止显示的时间
var TIP_SETINTERVAL_TIME = 4000;//每个提示的周期时长
var stop = false;
var timeId = null;
var hallMap = (top.location.href.indexOf("hallMap") > 0);
// console.log(top.location.href)
var labCodeColors = [
    "#f5222d",
    "#00e673",
    "#b37feb",
    "#ff85c0",
];

//使提示框和其中文字大小随屏幕自动伸缩
function tipResize() {
    $("head").append("<style>" +
        "      .echart_tip_arrow > .echart_tip_line {" +
        "        height: " + 3.1 * bodyScale + "em;" +
        "        top: " + (-4 * bodyScale) + "em;" +
        "    }\n" +
        "    .dialog_title {\n" +
        "        font-size: " + bodyScale + "em;\n" +
        "    }"
        + "</style>")
}

$(function () {
    tipResize();

    //从地图提示框内直接打开实验室曲线
    $("body").on("click", "#echartTips .echart_content>.textBox>a", function () {
        var centerId = $(this).data("centerid");

        if ($(".fullScreen_map", top.document).length > 0) {//如果是从地图全屏的提示框进入，则需跳转并在url上挂参。
            console.log("大屏", url);
            var url = location.href.slice(0, location.href.lastIndexOf("/")) + "/index?toLabData&centerId=" + centerId;
            parent.parent.location.href = url;
        } else {
            $(".toLabData", top.document).click();
            parent.parent.toCenterLab(centerId+'');
        }
    });
});

function getGeoArr(data) {
    var geo = {};
    for (var i = 0; i < data.length; i++) {
        geo[data[i].name] = data[i].litude;
    }
    // console.log("geo"+geo);
    return geo;
};

/**
 * 程序被调用的入口——————————————————————————————————————————————————————
 * 平面世界地图数据准备
 * @param myChart
 * @param isFirst
 */

function createArrData(productCode, labType) {
    $.post(contextPath + "/lab/labShowFlatMapAjax", {
        "productCode": productCode,
        "labType": labType?labType:"2,1,4"
    }, function (dataBase1) {
        mDataBase = jsonToArray(dataBase1);

        //解决图片加载慢的问题
        var imgs = [];
        for (var item in dataBase1) {
            var imgUrl = dataBase1[item].img_content;
            if (imgUrl) {
                imgs.push(imgUrl)
            }
        }
        // console.log("~~~~~~~~~~",imgs)
        var imgHiddenHtml = "<div hidden class=''>";
        for (var item in imgs) {
            imgHiddenHtml += "<img src='" + imgs[item] + "'/>";
        }
        imgHiddenHtml += "</div>";
        $("body").append(imgHiddenHtml);
        // console.log("imgHiddenHtml", imgHiddenHtml);

        var option = {
            // backgroundColor: "rgba(255,0,0,0)",

            color: ['gold', 'aqua', 'lime'],
            calculable: false,
            tooltip: {
                show: true,
                showContent: true,
                enterable: true,
                trigger: 'item',
                //				        showDelay:100,
                hideDelay: 300,
                position: function (p) {
                    //                return [p[0] - 130, p[1] - 90];
                    return [p[0] + 100, p[1] + 100];
                },
                padding: [0, 0, 0, 0],
                // params : 数组内容同模板变量，
                formatter: function (param) {

                    //在这里是第一步
                    $elList = [];
                    //提示框的内容清空
                    $echartTips.empty();
                    //初始化轮播，就是将轮播定时器停止
                    stopNewsShown();
                    //调用轮播方法，参数主要是弹出点坐标
                    var $el = addNewsElem(param.data);
                    return '';
                },
            },
            series: seriesData(mDataBase, labType)
        }
        myFlatMap.clear();
        startNewsShown();
        myFlatMap.setOption(option);
        // myFlatMap.resize()
    })

}

function seriesData(data, labType) {
    var seriesData = [];
    var item;
    // 绘制地图
    item = {
        tooltip: {
            show: false
        },
        name: 'zy_hotpoint',
        type: 'map',
        roam: false,
        mapType: 'world',
        mapLocation: {
            x: 'right',
            height:"80%"
        },
        grid:{
            bottom:"20%"
        },
        itemStyle: {
            normal: {
                borderColor: '#8DF0FF',
                borderWidth: 0.2 * bodyScale,
                areaStyle: {
                    color: 'rgba(20,143,204,0.6)'
                }
            }
        },
        data: [{
            name: "China",
            selected: true,
            itemStyle: {
                emphasis: {
                    areaStyle: {
                        color: '#00ffff'
                    }
                }
            }
        }
        ],
        geoCoord: function () {
            var t = getGeoArr(data);
            // console.log(t);
            return t
        }()
    };
    seriesData.push(item);
    var dataItem = {};
    var labArr = [];
    // console.log(labType)
    // if (labType && (labArr = labType+"".split(",")) > 0) {
        // labArr.forEach(function (item, index) {
        // [1,2,3,4].forEach(function (item, index) {
            dataItem = {
                name: '',
                type: 'map',
                roam: false,
                // hoverable: false,
                mapType: 'world',
                mapLocation: {
                    x: 0,
                    // y: "top"
                },
                data: [],
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return 6.5 * bodyScale;
                    },
                    effect: {
                        show: true,
                        type: 'scale',//圈圈
                        loop: true,
                        shadowBlur: 0.1 * bodyScale,
                        period: 15
                    },
                    itemStyle: {
                        normal: {
                            label: {show: false},
                            color: function(params) {
                                // return colorarr[params.dataIndex]
                                let color;
                                switch (data[params.dataIndex].lab_type){
                                    case "检测中心":
                                        // color = "#fff";
                                        color = labCodeColors[0];
                                        break;
                                    case "研发类":
                                        color = labCodeColors[1];
                                        break;
                                    case "工厂类":
                                        color = labCodeColors[2];
                                        break;
                                    case "模块商":
                                        color = labCodeColors[3];
                                        break;
                                }
                                return color;
                            }
                        },
                        emphasis: {label: {show: false}}
                    },
                    data: data
                },
                markLine: {
                    smooth: true,
                    tooltip: {
                        show: false
                    },
                    symbolSize: 0,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 25 * bodyScale,
                        color: labCodeColors[labType - 1],
                        shadowBlur: 10 * bodyScale
                    },
                    itemStyle: {
                        normal: {
                            label:{
                                show:false,
                            },
                            color: function(params) {
                                var color;
                                switch (data[params.dataIndex].lab_type){
                                    case "检测中心":
                                        color = labCodeColors[0]+88;
                                        break;
                                    case "研发类":
                                        color = labCodeColors[1]+88;
                                        break;
                                    case "工厂类":
                                        color = labCodeColors[2]+88;
                                        break;
                                    case "模块商":
                                        color = labCodeColors[3]+88;
                                        break;
                                }
                                return color;
                            },
                            borderWidth: 1 * bodyScale,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 0
                            }
                        },

                    },
                    data: dataToArrayContinueArray(data)

                },
            }
            seriesData.push(dataItem);
        // })
    // }


    return seriesData;
}

// 基于准备好的dom，初始化echarts实例
var myFlatMap = echarts.init($('.mapFlat')[0]);

/*平面地图上点击各个国家的点，右侧切换到对应的实验室页面*/
var $l3x3 = $("#l", parent.document);

var showTopicIndex = 0;
/**
 * echartTips内的提示元素
 * @type {Array}
 */
var $elList = [];

/**
 * echart容器
 * @type {*|jQuery|HTMLElement}
 */
var $echart = $('.mapFlat');

/**
 * echart弹出新闻提示的容器
 * @type {*|jQuery|HTMLElement}
 */
var $echartTips = $('.echartTips');


function addNewsElem(news) {
    var $el = getTopicHtml(news);


    var divideLeft = $echart.width() / 2,
        divideTop = $echart.height() / 2;

    var left, top;
    // console.log("地点经纬度:" + news.litude);
    //getPosByGeo()：经纬度转成像素坐标
    // console.log("~~~~~~~~~~~~~~~~~~~~~news.litude:" + news.litude);
    var xypoint = [0, 0];
    if (news.litude) {//若不判断则在markLine上的提示会报错
        xypoint = myFlatMap.chart.map.getPosByGeo("world", news.litude); //坐标
    }

    left = xypoint[0];
    top = xypoint[1];


    $echartTips.append($el);

    $el.css({left: left, top: top});

    //分屏区域添加样式
    if (left > divideLeft) {
        $el.addClass('left');
    } else {
        $el.addClass('right');
    }

    if (top > divideTop) {
        $el.addClass('top');
    } else {
        $el.addClass('bottom');
    }

    //获取css中对应屏幕区域的相对偏移样式
    var $content = $el.children('.echart_content'),
        contentOffset = $content.offset();

    var offset = {
        left: contentOffset.left,
        top: contentOffset.top,
        height: $content.outerHeight(),
        width: $content.outerWidth()
    };

    if (false) {
        $el.remove();
    } else {
        $el.data('offset', offset);
        $elList.push($el);
        fadeOutElList();
        startNewsShown();
        $el.hover(function () {//鼠标移动上去后暂停
            fadeInElList([$el]);
            stopNewsShown($el);
        }, function () {
            fadeOutElList();
            startNewsShown();
        });
        return $el;
        /*$el.click(function () {
            alert()
        })*/
    }
    return null;
}

/**
 * 每格一定时间显示的资讯及新闻
 */
function showNews() {
    if (document.hidden) {
        return;
    }
    $elList = [];
    //循环显示器
    showTopicIndex = addEl(mDataBase, showTopicIndex);
    fadeOutElList();

    function addEl(list, index) {
        if (list.length === 0) {
            return;
        }
        for (var num = 0; num < 1; num++) {
            var $el = addNewsElem(list[index]);
            //console.log(index,num);
            if ($el) {
                if ((++index) >= list.length) {
                    return 0;
                }
            } else {
                return index;
            }
        }
        return index;
    }
}

function startNewsShown() {

    if (timeId === null) {
        // console.log("---自动提示启动---")
        //每个提示的周期长度
        timeId = setInterval(showNews, TIP_SETINTERVAL_TIME);
    }
}

function listenAnimationEnd($el, fn) {
    //transitionend是css3完成过渡后触发的事件,下一步将被删除
    $el.on('transitionend', function () {
        $el.off('transitionend');
        fn.call();
    })
}

/**
 * 初始化资讯及新闻轮循
 */
function stopNewsShown($el) {
    clearInterval(timeId);
    timeId = null;
    // $el.css("")

    // animation-play-state: paused
}

/**
 * 拼提示框的标签
 * */
function getTopicHtml(currentPoint) {
    var city = "";
    if (currentPoint.name) {
        city = currentPoint.name;
    }
    var country = currentPoint.country;
    var value = currentPoint.value;
    var time = currentPoint.dateTime;
    var title = currentPoint.title;
    var id = currentPoint.id;
    var url = "";
    var centerId = currentPoint.centerId;
    var imgUrl = currentPoint.imgUrl;
    // console.log("currentPoint.centerId",centerId);

    return $((centerId ? ' <div class="echart_tip">' : ' <div class="echart_tip noCenterData">') +
        '<div class="dialog_title echart_content">' +
        //下面设置了没有图片时的默认显示
        '   <img src="' + (imgUrl || '../static/img/ico/logo_pinyin.png') + '" alt="默认图片">' +
        '   <div class="textBox">' +
        '   <h4 style="">' + title + '</h4>' +
        '   <div class="labNumber">共 ' + value + ' 家实验室</div>' +
        function () { //大厅里面不需要显示“进入实验室”按钮
            return hallMap ? '' : '   <a class="toLab" data-centerId="' + centerId + '" href="javascript:void(0);">进入实验室&nbsp;</a>'
        }() +
        '   </div>' +
        '</div>' +
        '<div class="echart_tip_arrow">' +
        '   <div class="echart_tip_line"></div>' +
        '   <div class="echart_tip_head"></div>' +
        '</div>' +
        '</div>');
}


/**
 * 渐隐 elList的每一项
 */
function fadeOutElList() {
    $.each($elList, function (i, $el) {
        // console.log("---delay3000前")
        setTimeout(function () {
            $el.removeClass('fade_in').addClass('fade_out');
            listenAnimationEnd($el, function () {
                $el.remove();
            });
        }, TIP_SETTIMEOUT_TIME)
        // console.log("---delay3000后")
    })


    $elList = [];
}

/**
 * 渐入 elList
 */
function fadeInElList($list) {
    // console.log("---fadeInElList")
    $.each($list, function (i, $el) {
        $el.off('transitionend');
        $el.removeClass('fade_out').addClass('fade_in');
    });
    $elList = $list;
}
