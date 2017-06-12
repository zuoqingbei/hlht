/**
 * Created by Administrator on 2017/4/15 0015.
 */
var bodyScale = 1;
var pageH;
var pageW;
pageH = $(window).height()-17;
pageW = pageH * 16 * 7 / (9 * 3);

function pageResize() {
    $("#content").css("width", pageW);
    var bodyFontSize = pageH / 595 * 100 + "%";
    bodyScale = pageH / 595;
    $("body").css("font-size", bodyFontSize);
//        console.log("UUUUUUUUUU~~~~~~~~~~窗口高度：" + pageH + ",\n宽度:"+pageW+" \nbody字号：" + bodyFontSize)
}
pageResize();

var timeId = null;
function getGeoArr(data) {
    var geo = {};
    for (var i = 0; i < data.length; i++) {
        geo[data[i].name] = data[i].litude;
    }
    // console.log("geo"+geo);
    return geo;
}
/**
 * 平面世界地图数据准备
 * @param myChart
 * @param isFirst
 */
function createArrData(productCode,labType){
	$.post(contextPath+"/lab/labShowFlatMapAjax",{"productCode":productCode,"labType":labType},function(dataBase1){
		mDataBase=jsonToArray(dataBase1);
		var option = {
	    // backgroundColor: "rgba(255,0,0,0)",
	    color: ['gold', 'aqua', 'lime'],
	    title: {
	        show:false,
	        text: '模拟迁徙',
	        subtext: '数据纯属虚构',
	        x: 'center',
	        textStyle: {
	            color: '#fff'
	        }
	    },
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
	//            width: 207,
	//            height: 110,
	//            backgroundColor: 'rgba(13,43,67,0.7)',
	//            borderColor: 'rgba(31,120,214,1)',
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
	 
	
	    series: seriesData(mDataBase)
	}
		myChart.clear();
		startNewsShown();
		myChart.setOption(option);
		//setEvent(myChart);
})

}
function seriesData(data){
	 var seriesData = [];
	    var item={
	    		tooltip:{
	    	          show:false
	    	        },
	            name: 'zy_hotpoint',
	            type: 'map',
	            roam: false,
	            hoverable: false,
	            mapType: 'world',
	            mapLocation:{
	                x:'right',
	            },
	            itemStyle:{
	                 normal: {
						borderColor: '#8DF0FF',
						borderWidth: 0.2*bodyScale,
						areaStyle: {
							   color: 'rgba(20,143,204,0.6)'
						}
					}
	            },
	            data:[{
	            	name:"China",
	            	selected:true,
                    itemStyle:{
	            	    emphasis:{
	            	        areaStyle:{
	            	            color:'#00ffff'
                            }
                        }
                    }
	            }],
	            markPoint: {
	                symbol: 'emptyCircle',
	                symbolSize: function (v) {
	                     return 3*bodyScale;
	                },
	                effect: {
	                    show: true,
	                    type: 'scale',//圈圈
	                    loop: true,
	                    shadowBlur: 0
	                },
	                itemStyle: {
	                    normal: {label: {show: false}},
	                    emphasis: {label: {show: false}}
	                },
	                data: data
	            },
	            geoCoord: getGeoArr(data)
	         
	        };
	    seriesData.push(item);

   	item={
               name: '',
               type: 'map',
               roam: false,
               hoverable: false,
               mapType: 'world',
               mapLocation: {
                   x: "0",
                   // y: "top"
               },
               itemStyle: {
                   normal: {
                       borderColor: 'rgba(100,149,237,1)',
                       borderWidth: 0.5*bodyScale,
                       areaStyle: {
                           color: '#1b1b1b'
                       }
                   }
               },
               data: [],
               markPoint: {
                   symbol: 'emptyCircle',
                   symbolSize: function (v) {
                        return 3*bodyScale;
                   },
                   effect: {
                       show: true,
                       type: 'scale',//圈圈
                       loop: true,
                       shadowBlur: 0
                   },
                   itemStyle: {
                       normal: {label: {show: false}},
                       emphasis: {label: {show: false}}
                   },
                   data: data
               },
               markLine: {
                   smooth: true,
                effect : {
                    show: true,
                    scaleSize: 1,
                    period: 5*bodyScale,
                    color: '#ff0',
                    shadowBlur: 10*bodyScale
                },
                itemStyle : {
                    normal: {
                        color:"rgba(20,143,204,.7)",
                        borderWidth:1*bodyScale,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 0
                        }
                    }
                },
                   data:dataToArrayContinueArray(data)
               },
           }
   	
   	seriesData.push(item);
   	
   
	    return seriesData;
}
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('mapFlat'));
//调用父页面 获取数据
//window.parent.selectActLi();
window.parent.resetSize();


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
var $echart = $('#mapFlat');

/**
 * echart弹出新闻提示的容器
 * @type {*|jQuery|HTMLElement}
 */
var $echartTips = $('#echartTips');

/**
 * 提示渐隐时间
 * @type {number}
 *  
 */
var TIP_SETTIMEOUT_TIME = 3000;

function addNewsElem(news) {
    var $el = getTopicHtml(news);

    var divideLeft = $echart.width() / 2,
        divideTop = $echart.height() / 2;

    var left, top;
    // console.log("地点经纬度:" + news.litude);
    //getPosByGeo()：经纬度转成像素坐标
    var xypoint = myChart.chart.map.getPosByGeo("world", news.litude); //坐标
    // console.log("像素坐标————" + xypoint);
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
        $el.hover(function () {
            fadeInElList([$el]);
            stopNewsShown();
        }, function () {
            fadeOutElList();
            startNewsShown();
        });
        return $el;
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
        console.log("---start---")
        timeId = setInterval(showNews, 3000);
    }
}
function listenAnimationEnd($el, fn) {
    //transitionend是css3完成过渡后触发的事件
    $el.on('transitionend', function () {
        $el.off('transitionend');
        fn.call();
    })
}
/**
 * 初始化资讯及新闻轮循
 */
function stopNewsShown() {
    clearInterval(timeId);
    timeId = null;
}

function getTopicHtml(currentPoint) {
    var city = currentPoint.name;
    var value = currentPoint.value;
    var time = currentPoint.dateTime;
    var title = currentPoint.title;
    var id = currentPoint.id;
    var url = "";
    return $('<div class="echart_tip">' +
        '<div class="dialog_title echart_content">' +
        '<a title="' + title + '"  href="#" target="_blank" >' +
        '<span style="color:#ffffff;font-size:1.2em;text-shadow:0.15em 0.15em 0.15em rgba(0,0,0,0.9);">' + title + '</span>' +
        '</a>实验室数量：' + value +
        '</div>' +
        '<div class="echart_tip_arrow">' +
        '<div class="echart_tip_line"></div>' +
        '<div class="echart_tip_head"></div>' +
        '</div>' +
        '</div>');
}
/**
 * 渐隐 elList的每一项
 */
function fadeOutElList() {
    $.each($elList, function (i, $el) {
        $el.removeClass('fade_in').addClass('fade_out');
        listenAnimationEnd($el, function () {
            $el.remove();
        });
    });

    $elList = [];
}
/**
 * 渐入 elList
 */
function fadeInElList($list) {
    $.each($list, function (i, $el) {
        $el.off('transitionend');
        $el.removeClass('fade_out').addClass('fade_in');
    });
    $elList = $list;
}

$(window).resize(function () {
    myChart.resize();
});