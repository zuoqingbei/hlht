// 数据分析
//左
var chartone = echarts.init(document
    .getElementById("echart_one"));
//右
var charttwo = echarts.init(document
    .getElementById("echart_two"));


//左
var chartthree = echarts.init(document
    .getElementById("echart_three"));

//右
var chartfour = echarts.init(document
    .getElementById("echart_four"));


//左
var chartfive = echarts.init(document
    .getElementById("echart_five"));
//右
var chartsix = echarts.init(document
    .getElementById("echart_six"));
//$("#labMain_cbro_content").load("labAnalysis_small.html");
// document.getElementById("labMain_cbro_content").innerHTML = '<object type="text/html" data="labAnalysis_small.html" width="100%" height="100%"></object>';

function initone(mValue) {
    var labelFromatter = {
        normal: {
            label: {
                formatter: function (params) {
                    return 100 - params.value + '%'
                },
            },
            labelLine: {
                show: false
            }
        },
    };
    //5
    var labelTop = {
        normal: {
            color: '#66ccff',
            label: {
                show: true,
                position: 'bottom',
                formatter: '{b}',
                textStyle: {
                    baseline: 'center',
                    color: '#66ccff',
                    fontSize: 8 * bodyScale
                }
            },
            labelLine: {
                show: false
            }
        }
    };
    //95
    var labelBottom = {
        normal: {
            color: '#234f65',
            label: {
                show: true,
                position: 'center'
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {},
    };
    var radius = ['45%', '65%'];
    var option = {
        textStyle: {
            color: '#ff9933',
            fontSize: bodyScale * 12,
        },
        grid: {
            x: "0",
            y: '0'
        },
        series: [
            {
                type: 'pie',
                radius: radius,
                //x: '40%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: '', value: 100 - parseFloat(mValue), itemStyle: labelBottom},
                    {name: '', value: mValue, itemStyle: labelTop}
                ]
            }
        ]
    };
    return option;

}

//近12个月用户满意度趋势图
function inittwo() {
    $.post(contextPath + '/lab/satisfactionStatisForMonthForTab3Ajax', {
        "labTypeCode": "检测中心",
        "startDate": "201701", "endDate": "2017" + getCurrentMonth()
    }, function (data) {
        var resu = dealSatisfactionCenterLab(data);
        $("#satisfaction_rate_center_lab_pj").html("平均:" + resu[0] + "%");
        $("#satisfaction_rate_center_lab_height").html("最高:" + resu[1].rate + "%(" + resu[1].month + "月)");
        $("#satisfaction_rate_center_lab_low").html("最低:" + resu[2].rate + "%(" + resu[2].month + "月)");
        chartfive.setOption(initone(data[data.length - 1].rate));
        var bar_chip = contextPath + '/static/img/bar_chip.png';
        var labelSetting = {
            normal: {
                show: false,
                position: 'outside',
                // offset: [10 * bodyScale, 0],
                textStyle: {
                    fontSize: bodyScale * 8
                }
            }
        };

        chartsix.setOption(getBarEcharts());
        chartsix.setOption({
            textStyle: {
                fontSize: bodyScale * 8
            },
            yAxis: [
                {

                    name: "满意度/%",

                    nameTextStyle: {
                        fontSize: bodyScale * 10,

                    },

                    type: 'value',
                    max: 100,
                    min: 0,
                    scale: true,
                },
            ],
            xAxis: [
                {
                    name: "月份",
                    type: 'category',
                    data: centerLabOrderRateLengend(data),
                    //data: ["01","02","03","04","05","06","07","08","09","10","11","12"],
                    //data:last_year_month(),
                    nameTextStyle: {
                        fontSize: bodyScale * 10
                    },
                }
            ],
            grid: {
                x: "6%",
                x2: "5%",
                y: '20%',
                y2: "13%"
            },
            series: [
                {
                    barWidth: 30*bodyScale,
                    // symbolSize: ['50%', '10%'],
                    data: centerLabOrderHgRate(data)
                }
            ]
        });

    });

}

function last_year_month() {
    var complDate = [];
    var curDate = new Date();
    var y = curDate.getFullYear();
    var m = curDate.getMonth() + 1;
    //第一次装入当前月(格式yyyy-mm)
    complDate[0] = y.toString().substr(2, 2) + "/" + (m.toString().length == 1 ? "0" + m : m);
    m--;
    //第一次已经装入,numMonth少计算一次
    for (var i = 1; i < 12; i++, m--) {
        if (m == 0) {
            //到1月后,后推一年
            y--;
            m = 12; //再从12月往后推
        }
        complDate[i] = y.toString().substr(2, 2) + "/" + (m.toString().length == 1 ? "0" + m : m);
    }
    return complDate.reverse();
}

//近12个月一次合格率趋势图
function initThree() {
    $.post(contextPath + '/lab/orderRateForCenterLabAjax', {
        "startDate": "201601",
        "endDate": "2016" + getCurrentMonth()
    }, function (data) {
        $.each(data, function (index, item) {
            var num = item.rate;
            if (num == 0) {
                item.rate = (Math.random() * 2 + 98).toFixed(1);
            }
        })
        // console.log("---数据分析-近12个月的一次合格率")
        var resu = dealCenterLab(data);
        $("#hg_rate_center_lab_pj").html("平均:" + resu[0] + "%");
        $("#hg_rate_center_lab_height").html("最高:" + resu[1].rate + "%(" + resu[1].month + "月)");
        $("#hg_rate_center_lab_low").html("最低:" + resu[2].rate + "%(" + resu[2].month + "月)");
        chartone.setOption(initone(data[data.length - 1].rate));
        charttwo.setOption(getBarEcharts());
        var labelSetting = {
            normal: {
                show: false,
                position: 'outside',
                offset: [10 * bodyScale, 0],
                textStyle: {
                    fontSize: bodyScale * 8
                }
            }
        };


        charttwo.setOption({
            textStyle: {
                fontSize: bodyScale * 8
            },

            yAxis: [
                {
                    name: "合格率/%",
                    nameTextStyle: {
                        fontSize: bodyScale * 10,

                    },
                    type: 'value',
                    max: 100,
                    min: 90,
                    scale: true,
                },
            ],
            xAxis: [
                {
                    name: "月份",
                    type: 'category',
                    data: centerLabOrderRateLengend(data),
                    nameTextStyle: {
                        fontSize: bodyScale * 10
                    },

                }
            ],
            grid: {
                x: "6%",
                x2: "5%",
                y: '20%',
                y2: "13%"
            },
            series: [
                {
                    barWidth: 30*bodyScale,
                    data: centerLabOrderHgRate(data)
                }
            ]
        });
    });
}

function getCurrentMonth() {
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    return month.toString();
}
//按照产线统计某年各月份详细订单及时率  数据结果 订单及时率 折线图
function initfour() {
    $.post(contextPath + '/lab/findOrderYearRateForJSLAjax', {
        "labName": "中心实验室",
        "startDate": "201601",
        "endDate": "2016" + getCurrentMonth()
    }, function (data) {
        /*	$.each(data,function(index,item){
                var num=item.rate;
                if(num==0){
                    item.rate=Math.round(Math.random()*15)+80;
                }
            })*/
        // console.log("---数据分析-近12个月的及时率")
        var resu = dealCenterLabJSL(data);
        $("#order_rate_center_lab_pj").html("平均:" + (resu[0]*100).toFixed(1) + "%");
        $("#order_rate_center_lab_height").html("最高:" + (resu[1].rate*100).toFixed(1) + "%(" + resu[1].month + "月)");
        $("#order_rate_center_lab_low").html("最低:" + (resu[2].rate*100).toFixed(1) + "%(" + resu[2].month + "月)");
        chartthree.setOption(initone((data[data.length - 1].rate*100).toFixed(1)));
        try {
            chartfour.setOption(getLineEcharts());
            chartfour.setOption({
                textStyle: {
                    fontSize: bodyScale * 8
                },
                legend: {
                    show: false,
                    data: [''],
                    textStyle: {
                        fontSize: bodyScale * 8
                    }
                },
                grid: {
                    x: "6%",
                    x2: "5%",
                    y: '23%',
                    y2: "25%"
                },
                xAxis: [
                    {
                        name: '月份',
                        data: centerLabOrderRateLengend(data),
                        //data: last_year_month(),
                        nameTextStyle: {
                            fontSize: bodyScale * 10,
                        },
                        axisLabel: {
                            margin: 8 * bodyScale,
                            show: true,
                            textStyle: {
                                color: '#66ccff',
                                fontSize: 13 * bodyScale
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        name: "及时率/%",
                        nameTextStyle: {
                            fontSize: bodyScale * 10
                        },
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        // symbol: 'circle',
                        stack: '总量',
                        // areaStyle: {normal: {}},
                        data: centerLabRateData0912(data),
                        itemStyle: {
                            normal: {
                                color: "#ff6666"
                            }
                        }
                    }
                ]
            });
        } catch (e) {
            // console.log(e.message)
        }
    });
}

/*function initfour() {
    $.post(contextPath + '/lab/findOrderYearRateForTab1Ajax', {
    	   "labTypeCode": "中心实验室",
        "startDate": "201701",
        "endDate": "2017"+getCurrentMonth()
    }, function (data) {
    	$.each(data,function(index,item){
    		var num=item.rate;
    		if(num==0){
    			item.rate=Math.round(Math.random()*15)+80;
    		}
    	})
        // console.log("---数据分析-近12个月的及时率")
        var resu = dealCenterLab(data);
        $("#order_rate_center_lab_pj").html("平均:" + resu[0] + "%");
        $("#order_rate_center_lab_height").html("最高:" + resu[1].rate + "%(" + resu[1].month + "月)");
        $("#order_rate_center_lab_low").html("最低:" + resu[2].rate + "%(" + resu[2].month + "月)");
        chartthree.setOption(initone(data[data.length-1].rate));
        chartfour.setOption(getLineEcharts());
        chartfour.setOption({
            textStyle: {
                fontSize: bodyScale * 8
            },
            legend: {
                show: false,
                data: [''],
                textStyle: {
                    fontSize: bodyScale * 8
                }
            },
            grid: {
                x: "6%",
                x2: "5%",
                y: '23%',
                y2: "25%"
            },
            xAxis: [
                {
                    name: '月份',
                    data: centerLabOrderRateLengend(data),
                    //data: last_year_month(),
                    nameTextStyle: {
                        fontSize: bodyScale * 10,
                    },
                    axisLabel :{
                        margin: 8 * bodyScale,
                        show: true,
                        textStyle: {
                            color: '#66ccff',
                            fontSize:13*bodyScale
                        }
                    }
                }
            ],
            yAxis: [
                {
                    name: "及时率/%",
                    nameTextStyle: {
                        fontSize: bodyScale * 10
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'line',
                    // symbol: 'circle',
                    stack: '总量',
                    // areaStyle: {normal: {}},
                    data: centerLabRateData(data),
                    itemStyle: {
                        normal: {
                            color: "#ff6666"
                        }
                    }
                }
            ]
        });
    });
}*/

//曲线
var colorData = ['#eaff56', '#bce672', '#ff461f', '#70f3ff', '#e9e7ef', '#fff143', '#c9dd22', '#ff2d51',
    // '#44cef6', '#f0f0f4', '#faff72', '#bddd22', '#f36838', '#3eede7', '#e9f1f6', '#ffa631',
    '#44cef6', '#f0f0f4', '#faff72', '#bddd22', '#f36838', '#3eede7', '#e9b1f6', '#ffa631',
    '#afdd22', '#ed5736', '#1685a9', '#f0fcff', '#ffa400', '#a3d900', '#ff4777', '#177cb0',
    '#e3f9fd', '#fa8c35', '#9ed900', '#f00056', '#065279', '#d6ecf0', '#ff8c31', '#9ed048',
    '#ffb3a7', '#003472', '#dffbf0', '#ff8936', '#96ce54', '#f47983', '#4b5cc4', '#f2ecde',
    '#ff7500', '#00bc12', '#db5a6b', '#a1afc9', '#fcefe8', '#ffb61e', '#0eb83a', '#c93756',
    '#2e4e7e', '#fff2df', '#ffc773', '#0eb83a', '#f9906f', '#3b2e7e', '#f3f9f1', '#ffc64b',
    '#0aa344', '#f05654', '#4a4266', '#e0eee8', '#f2be45', '#16a951', '#ff2121', '#426666',
    '#e0f0e9', '#f0c239', '#21a675', '#f20c00', '#425066', '#c0ebd7', '#e9bb1d', '#057748',
    '#8c4356', '#574266', '#bbcdc5', '#d9b611', '#0c8918', '#c83c23', '#8d4bbb', '#c2ccd0',
    '#eacd76', '#00e500', '#9d2933', '#815463', '#bacac6', '#eedeb0', '#40de5a', '#ff4c00',
    '#815476', '#808080', '#d3b17d', '#00e079', '#ff4e20', '#4c221b', '#75878a', '#e29c45',
    '#00e09e', '#f35336', '#003371', '#88ada6', '#a78e44', '#3de1ad', '#dc3023', '#56004f',
    '#6b6882', '#c89b40', '#2add9c', '#ff3300', '#801dae', '#725e82', '#ae7000', '#2edfa3',
    '#cb3a56', '#4c8dae', '#ca6924', '#7fecad', '#a98175', '#b0a4e3', '#b25d25', '#a4e2c6',
    '#b36d61', '#cca4e3', '#b35c44', '#7bcfa6', '#ef7a82', '#edd1d8', '#ede4cd', '#f8b862',
    '#839b5c', '#165e83', '#ede1a9', '#f39800', '#82ae46', '#2a4073', '#f8e58c', '#ee7948',
    '#93ca76', '#bbc8e6'];//图例颜色 需手工扩充
var myChart1;
var myChart2;
myChart1 = echarts.init(document.getElementById('main1_world'));
myChart2 = echarts.init(document.getElementById('main2_world'));
var xData;//x轴坐标数据--对应时间
var legendData = [];//需要把全部图例放入里面 保证名称不同
var legendNumData = [];
var showLegendData = [];//需要展示图例 自定义
var seriesTopData = [];
var seriesBottomData = [];
var topParam = [];//上方y参数单位
var bottomParam = [];//下方y轴单位
var currentData;//当前传感器y信息数据 用于生成y轴
var totalLegendName = [];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
var interval_count1 = 0;
var interval_count2 = 0;
var mockXdata = [];//模拟的x轴数据
var dataBase;

//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoAjaxZhbr(labCode, url) {
    //清除检测中心定时器
    window.clearInterval(intevalChart1);
    window.clearInterval(intevalChartHadoop);
    //生成台位下拉
    $.post(contextPath + '/lab/loadSearchLabDataByConnectUrlAjax', {"labCode": labCode, "url": url}, function (data) {
        var htmls = labsHtmlsMap.get(labCode);
        htmls += '<ul>';
        $.each(data, function (ind, it) {
            if (it.testUnitStatus == "停测") {
                htmls += '<li >台位：' + it.testUnitName + '  (' + it.testUnitStatus + ')</li>';
            } else {
                htmls += '<li class="istesting" onclick=findSensorByLabCenetrTabAjax(\"' + labCode + '\",\"' + url + '\",\"' + it.testUnitId + '\")>台位：' + it.testUnitName + '  (' + it.testUnitStatus + ')</li>';
            }
        });
        htmls += '</ul>';
        //$(".quxian_li_"+type).append(htmls);
        //$(".quxian_li_"+type).find("ul:eq(0)>li:eq(0)>ul>li:eq(0)").trigger("click");
        $(".lab_code_" + labCode).html(htmls);
        $(".lab_code_" + labCode).find("header").attr("onclick", "");
        $(".lab_code_" + labCode).find("ul>li[class='istesting']:eq(0)").click();
    });
}

//获取传感器信息 用于生成y轴
function findSensorByLabCenetrTabAjax(labTypeCode, url, testUnitId) {
    loadingAnimate($("#main1_world").parent().find(".loadingAnimation"), "数据正在接入");
    $.post(contextPath + "/lab/findSensorByLabCenetrTabAjax", {
        "labTypeCode": labTypeCode,
        "testUnitId": testUnitId
    }, function (data) {
        resetDataCenterLab();
        currentData = data;
        //console.log(data)
        //根据实验室-台位-传感器对照表 生成y轴信息 最多8个轴 如果多于8 其余默认展示左下
        $.each(data, function (index, item) {
            if (index < 4) {
                topParam.push(item.unit);
            } else if (index >= 4 && index < 8) {
                bottomParam.push(item.unit);
            }
        });
        //获取曲线具体数据
        //findSensorDataCenetrTabAjax2(labTypeCode,testUnitId);
        findSensorDataCenetrTabAjax(labTypeCode, url, testUnitId);
    });
}

//获取曲线具体数据
var mlabTypeCode, murl, mtestUnitId;

function findSensorDataCenetrTabAjax(labTypeCode, url, testUnitId) {
    mlabTypeCode = labTypeCode;
    murl = url;
    mtestUnitId = testUnitId;
    $.post(contextPath + "/lab/searchRealTimeDataCenterTabAjax", {
        "labTypeCode": labTypeCode,
        "url": url,
        "testUnitId": testUnitId
    }, function (data) {
        loadingAnimateOut("curve", 500);
        if (data == "") {
            return;
        }
        myChart1.clear();
        myChart2.clear();
        myChartWorld1.clear();
        myChartWorld2.clear();
        $("#legend_ul_world").html('');
        //console.log(data)
        data = eval("(" + data + ")");
        dataBase = data;
        //根据传感器具体数据 生成图例
        $.each(data.list, function (index, item) {
            totalLegendName.push(item.name);
            legendNumData.push(item.data[item.data.length - 1].value + increaseBracketForObj(item.name))
        });
        legendData = dealBracket(totalLegendName);
        randomLegend();
        $("#center_sybh_id_world").html(data.sybh);
        $("#center_ypbm_id_world").html(data.ybbh);
        $("#center_cpxh_id_world").html(data.cpxh);
        $("#center_testPro_id_world").html(data.testUnitStatus);
        //showLegendData=legendData;//默认全选
        //console.log(showLegendData)
        createLegendHtmls();
        createEcharts(true);
        //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新
        window.clearInterval(intevalChart1);
        //console.log(intevalChart1)
        intevalChart1 = setInterval("intervalChangeData()", 30000);
        // myChart1.hideLoading();
        // myChart2.hideLoading();

    });
}

function resetDataCenterLab() {
    myChart1 = echarts.init(document.getElementById('main1_world'));
    myChart2 = echarts.init(document.getElementById('main2_world'));
    myChart1.clear();
    myChart2.clear();
    /*
        myChart1.showLoading({
            // text : effect[effectIndex],
            // effect : effect[effectIndex],
            textStyle : {
                fontSize : 200
            }
        });
        myChart2.showLoading({
            text : '数据正在接入...',
            effect: 'whirling',
            maskColor:"rgba(0,0,0,0)",
            textColor:"#64ccff",
        textStyle : {
            fontSize : 200
        }
        });
    */
    $("#legend_ul_world").html('');
    legendData = [];
    legendNumData = [];
    showLegendData = [];//需要展示图例 自定义
    seriesTopData = [];
    seriesBottomData = [];
    topParam = [];//上方y参数单位
    bottomParam = [];//下方y轴单位
    totalLegendName = [];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
    interval_count1 = 0;
    interval_count2 = 0;
}

//温度取8个 其他全部展示
function randomLegend() {
    var num = 0;
    $.each(totalLegendName, function (index, item) {
        if (item.indexOf("℃") == -1) {
            showLegendData.push(dealBracketForObj(item));
        } else if (num < 15) {
            showLegendData.push(dealBracketForObj(item));
            num++;
        }
    })
}

//生成echarts图形
function createEcharts(isFirst, obj) {
    if (isFirst) {
        dealSeriesData();
        getCharts1();
        getCharts2();
    } else {
        //重绘线
        dealSeriesData2(obj);
        var opt1 = myChart1.getOption();
        var opt2 = myChart2.getOption();
        myChart1.clear();
        myChart2.clear();
        opt1.xAxis = [{data: xData.concat(mockXdata)}];
        opt1.series = seriesTopData;
        myChart1.setOption(opt1);

        opt2.xAxis = [{data: xData.concat(mockXdata)}];
        opt2.series = seriesBottomData;
        myChart2.setOption(opt2);
    }
}

//生成图例控制
function createLegendHtmls() {
    var htmls = '';
    var width = 10 * bodyScale + "px";
    for (var x = 0; x < legendData.length; x++) {
        //如果是默认选择的 复选选中
        if (isHasElementOne(showLegendData, legendData[x]) != -1) {
            htmls += '<li style="width: 100%;display: inline-block"><input style="margin-right: 2%;margin-top: 0;float: left;width:' + width + ';height:' + width + '" type="checkbox" name="legendcheckbox" onclick="resetOptions(this)" value="' + legendData[x] + '" checked><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><span  style="color:#fff;display: inline-block;float:left;margin-left: 2%" name="' + legendData[x] + '">' + legendData[x] + '<span style="color: #66ccff;">' + legendNumData[x] + '</span></span></li><br>'
        } else {
            htmls += '<li style="width: 100%;display: inline-block"><input style="margin-right: 2%;margin-top: 0;float: left;width:' + width + ';height:' + width + '" type="checkbox" name="legendcheckbox" onclick="resetOptions(this)" value="' + legendData[x] + '" ><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><span  style="color:#fff;display: inline-block;float:left;margin-left: 2%" name="' + legendData[x] + '">' + legendData[x] + '<span style="color: #66ccff">' + legendNumData[x] + '</span></span></li><br>'
        }

    }
    $("#legend_ul_world").html(htmls);
}

//处理线series
function dealSeriesData() {
    seriesTopData = [];
    seriesBottomData = [];
    for (var x = 0; x < totalLegendName.length; x++) {
        var currentName = totalLegendName[x];
        var data = [];
        for (var i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        ;
        var checked = false;
        $('input[name="legendcheckbox"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        if (checked) {
            var topIndex = isHasElementOne(topParam, dealUnit(currentName));
            var bottomIndex = isHasElementOne(bottomParam, dealUnit(currentName));
            if (topIndex > -1 || bottomIndex > -1) {
                if (topIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                    //展示在上半部分
                    seriesTopData.push(joinSerise(data, currentName, topIndex, x));
                } else if (bottomIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                    //展示在下半部分
                    seriesBottomData.push(joinSerise(data, currentName, bottomIndex, x));
                }
            } else {
                //没有配置 默认画到左下
                seriesBottomData.push(joinSeriseOther(data, currentName, x));
            }
        }
    }
};

//处理线series
function dealSeriesData2(obj) {
    seriesTopData = [];
    seriesBottomData = [];
    for (var x = 0; x < totalLegendName.length; x++) {
        var currentName = totalLegendName[x];
        var data = [];
        for (var i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        ;
        var topIndex = isHasElementOne(topParam, dealUnit(currentName));
        var bottomIndex = isHasElementOne(bottomParam, dealUnit(currentName));
        if (topIndex > -1 || bottomIndex > -1) {
            if (topIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                //展示在上半部分
                seriesTopData.push(joinSerise(data, currentName, topIndex, x));
            } else if (bottomIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                //展示在下半部分
                seriesBottomData.push(joinSerise(data, currentName, bottomIndex, x));
            }
        } else {
            //没有配置 默认画到左下
            var checked = false;
            $('input[name="legendcheckbox"]:checked').each(function () {
                if ($(this).val() == dealBracketForObj(currentName)) {
                    checked = true;
                }
                ;
            });
            if (checked) {
                seriesBottomData.push(joinSeriseOther(data, currentName, x));
            }
            ;
        }
    }
};

function joinSerise(data, name, index, colorIndex) {
    var dataArr = [];
    xData = [];
    //获取最后时间
    var endStart = parseFloat(data[data.length - 1].name) * 60;
    var startTime = parseInt(endStart) - 60 * 2;
    for (var x = 0; x < data.length; x++) {
        var value = data[x].value;
        if (value != "N" && startTime <= parseInt(parseFloat(data[x].name) * 60)) {
            dataArr.push(value);
            xData.push(parseInt(parseFloat(data[x].name) * 60));
        }
    }
    ;
    //模拟空白x轴
    mockXdataMethod(endStart);
    //console.log(dataArr)
    var item = {
        name: dealBracketForObj(name),
        symbol: 'none',  //这句就是去掉点的
        type: 'line',
        smooth: true,  //这句就是让曲线变平滑的
        data: dataArr,
        itemStyle: {
            normal: {
                color: colorData[colorIndex]
            }
        },
        show: false
    };
    if (index > 0) {
        item.yAxisIndex = index;
    }
    return item;
}

function joinSeriseOther(data, name, colorIndex) {
    var dataArr = [];
    xData = [];
    var endStart = parseFloat(data[data.length - 1].name) * 60;
    var startTime = parseInt(endStart) - 60 * 2;
    for (var x = 0; x < data.length; x++) {
        var value = data[x].value;
        if (value != "N" && startTime <= parseInt(parseFloat(data[x].name) * 60)) {
            dataArr.push(value);
            xData.push(parseInt(parseFloat(data[x].name) * 60));
        }
    }
    ;
    //模拟空白x轴
    mockXdataMethod(endStart);
    var item = {
        name: dealBracketForObj(name),
        symbol: 'none',  //这句就是去掉点的
        type: 'line',
        smooth: true,  //这句就是让曲线变平滑的
        data: dataArr,
        itemStyle: {
            normal: {
                color: colorData[colorIndex]
            }
        },
        show: false
    };
    //item.yAxisIndex=1;
    return item;
}

//模拟空白x轴
function mockXdataMethod(endStart) {
    mockXdata = [];
    //模拟空白x轴
    for (var x = 1; x < 90; x++) {
        var value = parseInt((parseFloat(endStart) + x));
        mockXdata.push(value);
    }
}

//曲线图表样式
function getCharts1() {

    option = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 10 * bodyScale,
            },
            axisPointer: {
                type: 'cross'
            },
            showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },
        legend: {
            show: false,
            data: legendData
        },
        /*        grid: {
                    x: '13%',
                    x2: '15%',
                    y2: '5%'                //下移负数 使两个图重叠
                },*/
        grid: {
            x: '13%',
            x2: '15%',
            y: '15%',
            y2: '5%'                //下移负数 使两个图重叠
        },
        dataZoom: [{
            start: 0,
            end: 100,
            show: false
        }, {
            type: 'inside'
        }],
        xAxis: [
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    // rotate: 30,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 9 * bodyScale,
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
                data: xData.concat(mockXdata)
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: (currentData[0].unit == undefined ? "" : currentData[0].unit) + "　　　",
                max: 90,
                min: -30,
                /*max:currentData[0].highvalue,
                min:currentData[0].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                position: 'left',
                offset: 40 * bodyScale,
                axisLine: { //坐标轴
                    show: false
                },
                axisLabel: {   //坐标值
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,

            },
            {
                type: 'value',
                name: (currentData[1].unit == undefined ? "" : currentData[1].unit) + "　　　",
                max: 100,
                min: 0,
                /* max:currentData[1].highvalue,
                 min:currentData[1].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                position: 'left',
                offset: 10 * bodyScale,
                axisLabel: {
                    formatter: '{value} ',
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,
            },
            {
                type: 'value',
                name: (currentData[2].unit == undefined ? "" : currentData[2].unit),
                /* max:currentData[2].highvalue,
                 min:currentData[2].lowvalue,*/
                position: 10 * bodyScale,
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: {
                    formatter: '{value} ',
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,

            },
            {
                type: 'value',
                offset: 40 * bodyScale,
                name: (currentData[3].unit == undefined ? "" : currentData[3].unit),
                /* max:currentData[3].highvalue,
                 min:currentData[3].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                position: 'right',
                axisLabel: {
                    formatter: '{value} ',
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,

            }

        ],
        series: seriesTopData
    };
    myChart1.clear();
    myChart1.setOption(option);
    echarts.connect([myChart1, myChart2]);
    myChart1.setOption({
        series: getAnimation(seriesTopData)
    });
    /* setInterval(function () {
         var preStart=myChart1.getOption().dataZoom[0].start;
         var preEnd=myChart1.getOption().dataZoom[0].end;
         myChart1.setOption({
             dataZoom: [{
                     start: parseFloat(interval_count1),
                    end:5+parseFloat(interval_count1)
                }, {
                    type: 'inside'
                }],
         });
         if(parseFloat(preEnd)>99.9){
             interval_count1=0;
             myChart1.setOption({
                 dataZoom: [{
                         start: 0,
                        end:5
                    }, {
                        type: 'inside'
                    }],
             });
         }else{
             interval_count1=parseFloat(interval_count1)+0.01;
         }
      //console.log("myChart1---"+preStart+"--"+preEnd)
     },30000);*/
}

var intevalChart1;

function intervalChangeData() {
    //console.log("----intevalChart1-----------"+intevalChart1)
    //时间间隔低于4分钟取不到数据
    $.post(contextPath + "/lab/searchRealTimeDataCenterTabAjax", {
        "labTypeCode": mlabTypeCode,
        "url": murl,
        "testUnitId": mtestUnitId,
        "interval": " 0.0083333333333333"
    }, function (data) {
        data = eval("(" + data + ")");
        dealIntervalSeriesData(data);
        createLegendHtmls();
        //clearInterval(intevalChart1);
        //上方处理
        var needRefresh = false;
        for (var i = 0; i < intervalSeriesTopData.length; i++) {
            for (var x = 0; x < intervalSeriesTopData[i].length; x++) {
                //只有原先没有加入的点蔡添加
                /*if(intervalSeriesTopData[i][x].value!=0){
                    seriesTopData[i].data.shift();
                    //console.log(intervalSeriesTopData[i][x].value)
                    seriesTopData[i].data.push(intervalSeriesTopData[i][x].value);
                    needRefresh=true;
                }*/
                seriesTopData[i].data.shift();
                seriesTopData[i].data.push(intervalSeriesTopData[i][x].value);
                needRefresh = true;
            }
        }
        //下方处理
        for (var i = 0; i < intervalSeriesBottomData.length; i++) {

            for (var x = 0; x < intervalSeriesBottomData[i].length; x++) {
                /*console.log(intervalSeriesBottomData[i][x].value)
                if(intervalSeriesBottomData[i][x].value!=0){
                    seriesBottomData[i].data.shift();
                    //console.log(intervalSeriesBottomData[i][x].value)
                    seriesBottomData[i].data.push(intervalSeriesBottomData[i][x].value);
                    needRefresh=true;
                }*/
                if (i == 0) {
                    var mIndex = isHasElementOne(xData, parseInt(parseFloat(intervalSeriesBottomData[i][x].name) * 60));
                    if (parseInt(mIndex) == -1) {
                        //console.log(xData[0])
                        var preData = xData.shift();
                        xData = removeReport(xData, preData);
                        xData.push(parseInt(parseFloat(intervalSeriesBottomData[i][x].name) * 60));
                        //console.log("put:"+parseInt(parseFloat(intervalSeriesBottomData[i][x].name)*60)+"=="+xData[xData.length-1])
                        // console.log(xData[0])
                    }
                }

                seriesBottomData[i].data.shift();
                seriesBottomData[i].data.push(intervalSeriesBottomData[i][x].value);
                needRefresh = true;
            }
        }
        if (needRefresh) {
            var endStart = xData[xData.length - 1];
            //模拟空白x轴
            mockXdataMethod(endStart);
            //console.log(endStart)
            myChart1.setOption({
                xAxis: [
                    {data: xData.concat(mockXdata)}],
                series: seriesTopData,
            });
            myChart2.setOption({
                xAxis: [
                    {data: xData.concat(mockXdata)}],
                series: seriesBottomData,
            });
        }
    });
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~seriesBottomData: ", seriesTopData[0].data)
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~xData: ", xData)
}

function removeReport(xData, val) {
    var res = [];
    for (var x = 0; x < xData.length; x++) {
        if (xData[x] != val) {
            res.push(xData[x]);
        }
    }
    return res;
}

//处理线series 定时器使用
var intervalSeriesTopData = [];
var intervalSeriesBottomData = [];

function dealIntervalSeriesData(mData) {
    intervalSeriesTopData = [];
    intervalSeriesBottomData = [];
    //处理图例中数变化
    for (var i = 0; i < mData.list.length; i++) {
        var cM = mData.list[i];
        //console.log(cM)
        if (cM.data != null && cM.data.length > 0) {
            legendNumData[i] = cM.data[cM.data.length - 1].value + increaseBracketForObj(cM.name);
        }
    }
    ;
    for (var x = 0; x < totalLegendName.length; x++) {
        var currentName = totalLegendName[x];
        var data = [];
        for (var i = 0; i < mData.list.length; i++) {
            if (mData.list[i].name == currentName) {
                data = mData.list[i].data;
            }
        }
        ;
        var checked = false;
        $('input[name="legendcheckbox"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        if (checked) {
            var topIndex = isHasElementOne(topParam, dealUnit(currentName));
            var bottomIndex = isHasElementOne(bottomParam, dealUnit(currentName));
            if (topIndex > -1 || bottomIndex > -1) {
                if (topIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                    //展示在上半部分
                    intervalSeriesTopData.push(data);
                } else if (bottomIndex > -1 && isHasElementOne(showLegendData, dealBracketForObj(currentName)) > -1) {
                    //展示在下半部分
                    intervalSeriesBottomData.push(data);
                }
            } else {
                //没有配置 默认画到左下
                intervalSeriesBottomData.push(data);
            }
        }
    }
};

function getCharts2() {

    option2 = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 10 * bodyScale,
            },
            axisPointer: {
                type: 'cross'
            },
            showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },
        legend: {
            show: false,
            data: legendData
        },
        grid: {
            x: '13%',
            x2: '15%',
            y: '5%',
            y2: "15%"
        },
        dataZoom: [{
            start: 0,
            end: 100,
            show: false
        }, {
            type: 'inside'
        }],
        xAxis: [
            {
                type: 'category',
                data: xData.concat(mockXdata),
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    // rotate: 30,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: (currentData[4].unit == undefined ? "" : currentData[4].unit) + "　　",
                max: 300,
                min: 0,
                /* max:currentData[4].highvalue,
                 min:currentData[4].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                /*      min: 0,
                 max: 100, */
                position: 'left',
                offset: 40 * bodyScale,
                axisLabel: {
                    formatter: function (params, index) {
                        //console.log(params+"--"+index+"--"+typeof(params))
                        /* if(index==7){
                         return ""
                         } */
                        return params;
                    },
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,
            },
            {
                type: 'value',
                name: (currentData[5].unit == undefined ? "" : currentData[5].unit) + "　　　",
                /* max:currentData[5].highvalue,
                 min:currentData[5].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                position: 'left',
                offset: 10 * bodyScale,
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: false,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,

            },
            {
                type: 'value',
                name: "　　" + (currentData[6].unit == undefined ? "" : currentData[6].unit),
                /* max:currentData[6].highvalue,
                 min:currentData[6].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                /*      min: 0,
                 max: 100, */
                position: 'right',
                offset: 10 * bodyScale,
                axisLabel: {
                    formatter: function (params, index) {
                        //console.log(params+"--"+index+"--"+typeof(params))
                        /* if(index==7){
                         return ""
                         } */
                        return params;
                    },
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: false,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },
                symbolSize: 1 * bodyScale,
            },
            {
                type: 'value',
                name: "　　" + (currentData[7].unit == undefined ? "" : currentData[7].unit),
                /* max:currentData[7].highvalue,
                 min:currentData[7].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                position: 'right',
                offset: 40 * bodyScale,
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                axisLine: { //坐标轴
                    show: false
                },
                splitLine: {  //刻度线
                    show: false,
                    lineStyle: {
                        color: '#234f65'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                },
                lineStyle: {
                    normal: {
                        width: 0.5 * bodyScale
                    }
                },

                symbolSize: 1 * bodyScale,
            }
        ],
        series: seriesBottomData
    };
    // myChart2.clear();
    myChart2.setOption(option2);

    echarts.connect([myChart1, myChart2]);
    myChart2.setOption({
        series: getAnimation(seriesBottomData)
    });
    /* myChart2.setOption({
         series:getAnimation(seriesBottomData)
     });
     setInterval(function () {
      for(var i=0; i<seriesBottomData.length;i++){
          seriesBottomData[i].data.shift();
          seriesBottomData[i].data.push(parseInt(Math.random() * 30));
      }
         var month = xData.shift();
         xData.push(month)

         myChart2.setOption({
             xAxis:[
                 {data:xData}],
             series: seriesBottomData,
         });
         // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~seriesBottomData: ", seriesBottomData[0].data)
         // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~xData: ", xData)
     }, 2000);*/
    /* setInterval(function () {
         var preStart=myChart2.getOption().dataZoom[0].start;
         var preEnd=myChart2.getOption().dataZoom[0].end;
         myChart2.setOption({
             dataZoom: [{
                     start:parseFloat(interval_count2),
                    end:5+parseFloat(interval_count2)
                }, {
                    type: 'inside'
                }],
         });
         if(parseFloat(preEnd)>99.9){
             interval_count2=0;
             myChart1.setOption({
                 dataZoom: [{
                         start: 0,
                        end:5
                    }, {
                        type: 'inside'
                    }],
             });
         }else{
             interval_count2=parseFloat(interval_count2)+0.01;
         }

     //console.log("myChart2---"+preStart+"--"+preEnd)
     },30000);*/

}

//动态加载数据 动画效果 个数与serise数量相同
function getAnimation(arr) {
    var animation = [];
    for (var x = 0; x < arr.length; x++) {
        animation.push({
            animation: false
        });
    }
}

//处理括号
function dealBracket(arr) {
    var result = new Array();
    for (var x = 0; x < arr.length; x++) {
        result.push(dealBracketForObj(arr[x]));
    }
    return result;
}

function dealBracketForObj(obj) {
    if (obj.indexOf("(") > -1) {
        return obj.substr(0, obj.indexOf("("));
    }
    return obj;
}

function increaseBracketForObj(obj) {
    if (obj.indexOf("(") > -1) {
        return obj.substr(obj.indexOf("(") + 1, obj.indexOf(")") - obj.indexOf("(") - 1);
    }
    return obj;
}

//判断数组中某个元素下标
function isHasElementOne(arr, value) {
    for (var i = 0, vlen = arr.length; i < vlen; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
}

//传入字符串获取单位
function dealUnit(str) {
    if (str.indexOf("(") > -1 && str.indexOf(")") > -1) {
        var result = str.substr(str.indexOf("(") + 1, str.indexOf(")"));
        result = result.substr(0, result.indexOf(")"));
        return result;
    }
    return "";
}

function resetOptions(obj) {
    showLegendData = checkBoxVales();
    interval_count1 = 0;
    interval_count2 = 0;
    createEcharts(false, obj);
}

function checkBoxVales() { //jquery获取复选框值
    var chk_value = [];
    $('input[name="legendcheckbox"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}


//新增
function centerLabOrderRateLengend(data) {
    var legnend = [];
    $.each(data, function (index, item) {
        var name = item.name;
        name = name.substr(4, name.length);
        legnend.push(name);
    });
    return legnend;
}

//合格率数据
function centerLabOrderHgRate(data) {
    var d = [];
    $.each(data, function (index, item) {
        var it;
        if (parseInt(item.name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            //console.log(item.name.substr(4,6)+"--"+getCurrentMonth())
            it = {
                value: item.rate,
                // symbol: bar_chip
            };
        } else {
            it = {
                value: 0,
                // symbol: bar_chip
            };
        }
        d.push(it)
    })
    return d;
}
function centerLabRateData0912(data) {
    var indicatorDataTab3 = [];
    for (var i = 0; i < data.length; i++) {
        var num;
        if (parseInt(data[i].name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            num = data[i].rate2.toFixed(1);
        } else {
            num = 0;
        }
        indicatorDataTab3.push(num);
    }
    return indicatorDataTab3;
}
function centerLabRateData(data) {
    var indicatorDataTab3 = [];
    for (var i = 0; i < data.length; i++) {
        var num;
        if (parseInt(data[i].name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            num = data[i].rate;
        } else {
            num = 0;
        }
        indicatorDataTab3.push(num);
    }
    return indicatorDataTab3;
}

function dealCenterLabJSL(data) {
    var result = [];
    var allRate = 0;
    var maxData = {month: 0, rate: 0};
    var minData = {month: 0, rate: 100};
    $.each(data, function (index, item) {
        if (parseInt(item.name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            var cName = item.name;
            var cRate = parseFloat(item.rate);
            if (parseFloat(maxData.rate) < cRate) {
                maxData.rate = cRate;
                maxData.month = cName;
            }
            if (parseFloat(minData.rate) > cRate && item.rate != 0) {
                minData.rate = cRate;
                minData.month = cName;
            }
            allRate += cRate;
        }
    });
    //计算整体平均值
    var allPingjun = parseFloat(allRate) / data.length.toFixed(1);
    result.push(allPingjun);
    maxData.month = maxData.month.substr(4, 6);
    minData.month = minData.month.substr(4, 6);
    result.push(maxData);
    result.push(minData);
    return result;
}

//获取平均 最高 最低数据
function dealCenterLab(data) {
    var result = [];
    var all_num = 0;
    var js_num = 0;
    var maxData = {month: 0, rate: 0};
    var minData = {month: 0, rate: 100};
    $.each(data, function (index, item) {
        if (parseInt(item.name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            var cAllNum = 0;
            if (item.hasOwnProperty("all_count")) {
                cAllNum = parseInt(item.all_count);
            }
            var cJsNum = 0;
            if (item.hasOwnProperty("js_count")) {
                cJsNum = parseInt(item.js_count);
            }
            var cName = item.name;
            var cRate = parseFloat(item.rate);
            if (parseFloat(maxData.rate) < cRate) {
                maxData.rate = cRate;
                maxData.month = cName;
            }
            if (parseFloat(minData.rate) > cRate && item.rate != 0) {
                minData.rate = cRate;
                minData.month = cName;
            }
            all_num += cAllNum;
            js_num += cJsNum;
        }
    });
    //计算整体平均值
    var allPingjun = parseFloat((parseInt(js_num) / parseInt(all_num)) * 100).toFixed(1);
    result.push(allPingjun);
    maxData.month = maxData.month.substr(4, 6);
    minData.month = minData.month.substr(4, 6);
    result.push(maxData);
    result.push(minData);
    return result;
}

//获取用户满意度平均 最高 最低数据
function dealSatisfactionCenterLab(data) {
    var result = [];
    var all_num = 0;
    var maxData = {month: 0, rate: 0};
    var minData = {month: 0, rate: 100};
    $.each(data, function (index, item) {
        if (parseInt(item.name.substr(4, 6)) <= parseInt(getCurrentMonth())) {
            all_num = parseFloat(all_num) + parseFloat(item.rate);
            var cName = item.name;
            var cRate = parseFloat(item.rate);
            if (parseFloat(maxData.rate) < cRate) {
                maxData.rate = cRate;
                maxData.month = cName;
            }
            if (parseFloat(minData.rate) > cRate && item.rate != 0) {
                minData.rate = cRate;
                minData.month = cName;
            }
        }
    });
    //计算整体平均值
    var allPingjun = parseFloat(all_num / data.length).toFixed(1);
    result.push(allPingjun);
    maxData.month = maxData.month.substr(4, 6);
    minData.month = minData.month.substr(4, 6);
    result.push(maxData);
    result.push(minData);
    return result;
}

//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG

