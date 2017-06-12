/////////////////////////////////////////////////////////////////统计数据/////////////////////////////
/**
 * 右侧tab2数据统计
 */
var color = ['rgb(102, 204, 255)', 'rgb(255,255,153)', 'rgb(102,255,204)', 'rgb(255,102,102)'];
function loadTab2Data() {
    //设施状态type 类型  0：实验室在线率 1：设备完好率 2：设备利用率
    equipmentStatisForPlForLab2Ajax(0);
    equipmentStatisForPlForLab2Ajax(1);
    equipmentStatisForPlForLab2Ajax(2);
    //标准数量分布情况
    standardDispersedStatus("myChart28", "国际标准");
    standardDispersedStatus("myChart29", "国家标准");
    standardDispersedStatus("myChart30", "行业标准");
    standardDispersedStatus("myChart31", "企业标准");
    //不同产线的能力状态分布
    abilityByProductLine();
    //人员状态 散点
    personForTab2Ajax("myChart25", "1", 3);
    personForTab2Ajax("myChart26", "2", 2);
    personForTab2Ajax("myChart27", "3", 3);
    //人员状态 柱状
    findPersonStatusTab2Ajax("myChart22", 1);
    findPersonStatusTab2Ajax("myChart23", 2);
    findPersonStatusTab2Ajax("myChart24", 3);
}
//设施状态 type 类型  0：实验室在线率 1：设备完好率 2：设备利用率 
function equipmentStatisForPlForLab2Ajax(type) {
    var rise_pic = contextPath + "/static/img/sheshiState/rise.png";//上升图片
    var reduce_pic = contextPath + "/static/img/sheshiState/down.png";//降低图片
    var no_change = contextPath + "/static/img/sheshiState/cp.png";//没有变化
    $.post(contextPath + '/lab/equipmentStatisForPlForLab2Ajax', {
        "type": type,
        "labTypeCode": labTypeCode
    }, function (data) {
        var htmls;
        var all_change = 0;
        var all_rate = 0;
        var topHtmls;
        if (data == null || data.length == 0) {
            $("#tab2_equipment_top_" + type).html('');
            $("#tab2_equipment_table_" + type).html('');
        } else {
            $.each(data, function (index, item) {
                all_change += parseFloat(item.change_num);
                all_rate += parseFloat(item.dq);
                htmls += '<tr><td>' + item.product_name + '</td><td>';
                htmls += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="' + item.dq + '"';
                htmls += 'aria-valuemin="0" aria-valuemax="100" style="width: ' + item.dq + '%;"></div>';
                htmls += '</div> <span class="zaixianlv">' + item.dq + '%</span></td>';
                htmls += '<td><span>';
                //判断上升或者下降
                if (parseFloat(item.change_num) > 0) {
                    //上升
                    htmls += ' <img src="' + rise_pic + '" alt=""></span>';
                } else if (parseFloat(item.change_num) < 0) {
                    //下降
                    htmls += ' <img src="' + reduce_pic + '" alt=""></span>';
                } else {
                    //没有变化
                    htmls += ' <img src="' + no_change + '" alt=""></span>';
                }
                if (parseFloat(item.change_num) < 0) {
                    htmls += ' <span style="color:red;">' + (0 - parseFloat(item.change_num)) + '%</span></td>';
                } else {
                    htmls += ' <span >' + item.change_num + '%</span></td>';
                }
                if (index == 0) {
                    htmls += ' <td>(同比)</td>';
                }
                htmls += '</tr>';
            });
            //求平均值
            all_rate = (parseFloat(all_rate) / data.length).toFixed(1);
            all_change = (parseFloat(all_change) / data.length).toFixed(1);
            topHtmls = all_rate + '% <span>';
            if (parseFloat(all_change) > 0) {
                //上升
                topHtmls += ' <img src="' + rise_pic + '" alt=""></span>'
            } else if (parseFloat(all_change) < 0) {
                //下降
                topHtmls += ' <img src="' + reduce_pic + '" alt=""></span>'
            } else {
                //没有变化
                topHtmls += ' <img src="' + no_change + '" alt=""></span>'
            }
            if (parseFloat(all_change) < 0) {
                topHtmls += '<span class="up_num">' + (0 - parseFloat(all_change)) + '%</span>';
            } else {
                topHtmls += '<span class="up_num">' + all_change + '%</span>';
            }
            $("#tab2_equipment_top_" + type).html(topHtmls);
            $("#tab2_equipment_table_" + type).html(htmls);
        }

    });
}

//人员状态 type:类型 1:学历情况 2:工作年限情况 3:批准权限
function findPersonStatusTab2Ajax(myChartIds, type) {
    $.post(contextPath + '/lab/findPersonStatusTab1Ajax', {"labTypeCode": labTypeCode, "type": type}, function (data) {
        var myChart22 = echarts.init(document.getElementById(myChartIds));
        right_echarts.push(myChart22);
        myChart22.setOption(getBarEcharts());
        myChart22.setOption({
            yAxis: [
                {
                    type: 'value',
                    splitLine: {  //刻度线
                        show: false
                    },
                    show: false
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: tab2PersonLengend(data),
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            fontSize: 9 * bodyScale
                        },
                        interval: 0
                    }

                }
            ],
            grid: {
                x: '15%',
                x2: '15%',
                y: '25%',
                y2: "45%"
            },
            series: [
                {
                    type: "bar",
                    data: tab2PersonDataData(data),
                    barWidth: 12* bodyScale,
                    itemStyle: {
                        normal: {
                            //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function (params) {
                                // build a color map as your need.
                                // var colorList = ['#66ccff', '#ffff99', '#66ffcc'];
                                return color[params.dataIndex]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                // formatter: "{a}%",
                                textStyle: {
                                    fontSize: 10 * bodyScale,
                                    color: "white"
                                },
                                formatter: '{c}%'

                            },
                        }
                    }
                }
            ]
        });

    })
}
//人员状态 散点图
function personForTab2Ajax(myChartIds, type, divisor) {
    $.post(contextPath + '/lab/personForTab2Ajax', {"labTypeCode": labTypeCode, "type": type}, function (res) {
        //console.log(res)
        var data = [];
        var yData = [];//产线
        var xData = [];//类型
        //准备数据
        var data0 = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var preYdata = [];
        $.each(res, function (index, item) {
            preYdata.push(item[0].product_name);
            data0.push([item[0].name, item[0].product_name, parseInt(item[0].all_num) / divisor*bodyScale, item[0].name]);
            data1.push([item[1].name, item[1].product_name, parseInt(item[1].all_num) / divisor*bodyScale, item[1].name]);
            data2.push([item[2].name, item[2].product_name, parseInt(item[2].all_num) / divisor*bodyScale, item[2].name]);
            data3.push([item[3].name, item[3].product_name, parseInt(item[3].all_num) / divisor*bodyScale, item[3].name]);
            if (index == 0) {
                $.each(item, function (ind, it) {
                    xData.push(it.name);
                })
            }
        });
        for (var x = preYdata.length - 1; x >= 0; x--) {
            yData.push(preYdata[x]);
        }
        if (data0.length > 0) {
            data.push(data0);
        }
        if (data1.length > 0) {
            data.push(data1);
        }
        if (data2.length > 0) {
            data.push(data2);
        }
        if (data3.length > 0) {
            data.push(data3);
        }
        var myChart25 = echarts.init(document.getElementById(myChartIds));
        right_echarts.push(myChart25)
        myChart25.setOption({
            grid: {
                right: "1%",
                bottom: "20%",
                left: "20%",
                top: "6%"
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#234f65'
                    }
                },
                position: 'top',
                formatter: function (params) {
                    return (parseInt(params.value[2] * divisor/bodyScale));
                }
            },
            xAxis: {
                type: 'category',
                data: xData,
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
                        color: '#66ccff',
                        fontSize: 9 * bodyScale
                    },
                    interval: 0
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: yData,
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
                        color: '#66ccff',
                        fontSize: 11* bodyScale
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
                scale: true
            },

            series: tab2PersonSanDianSeries(data)


        });


    })
}

//散点图数据 -人员
function tab2PersonSanDianSeries(data) {
    var s = [];
    $.each(data, function (index, item) {
        var c = {
            name: item[0][3],
            data: item,
            type: 'scatter',
            symbolSize: function (da) {
                return da[2];
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: color[index]
                    },
                        {
                            offset: 1,
                            color: color[index]
                        }
                    ])
                }
            }
        }
        s.push(c);
    });
    return s;
}
function tab2IndicatorData(data) {
    //先找出最大值
    var maxNum = 0;
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].count) > parseInt(maxNum)) {
            maxNum = parseInt(data[i].count);
        }
    }
    var indicatorData = [];
    for (var i = 0; i < data.length; i++) {
        var obj = new Object();
        obj.max = maxNum;
        obj.text = data[i].name + ":" + data[i].count;
        indicatorData.push(obj);
    }
    return indicatorData;
}

function tab2DataData(data) {
    var indicatorData = [];
    for (var i = 0; i < data.length; i++) {
        indicatorData.push(data[i].count);
    }
    return indicatorData;
}
function tab2Lengend(data) {
    var legnend = [];
    $.each(data, function (index, item) {
        legnend.push(item.type_name);
    });
    return legnend;
}
function tab2PersonLengend(data) {
    var legnend = [];
    $.each(data, function (index, item) {
        legnend.push(item.name);
    });
    return legnend;
}
function tab2PersonDataData(data) {
    var indicatorData = [];
    for (var i = 0; i < data.length; i++) {
        indicatorData.push(data[i].rate);
    }
    return indicatorData;
}
//标准数量分布情况
function standardDispersedStatus(mychartId, filedVaule) {
    $.post(contextPath + '/lab/standardDispersedAjax', {
        "type": "0",
        "filedVaule": filedVaule,
        "filed": "type_name"
    }, function (data) {
        var myChart = echarts.init(document.getElementById(mychartId));
        right_echarts.push(myChart);
        myChart.setOption(getRadarEcharts());
        myChart.setOption({
            title: {
                text: filedVaule,
                left: 'center',
                top: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 10 * bodyScale
                }
            },
            polar: [
                {
                    indicator: tab2IndicatorData(data),
                    center: ['50%', '55%'],
                    radius: '58%',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#66ccff',
                            fontSize: 10 * bodyScale,
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(102,204,255,0.5)',
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    textStyle: {
                        color: '#66ccff'
                    }
                }

            ],
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: tab2DataData(data),
                            name: '标准数量分布情况',
                            itemStyle: {
                                normal: {
                                    color: '#66ccff',
                                    areaStyle: {
                                        color: 'rgba(102,204,255,0.5)',
                                    },

                                }
                            }
                        }
                    ]
                }
            ]
        });
    })
}

//不同产线的能力状态分布
//不同产线的能力状态分布
function abilityByProductLine() {
    $.post(contextPath + '/lab/abilityByProductLineAjax', {}, function (data) {
        $.each(data[1], function (index, item) {
            //console.log(index+"---"+item)
            if (item != null && item.length > 0) {
                $("#yingjubei_id_" + index).html(item[0].count + "<br>应具备数")
            }
        });
        $.each(data[0], function (index, item) {
            var chartIndex = 32 + index;
            var myChart = echarts.init(document.getElementById("myChart" + chartIndex));
            myChart.setOption(getBarEcharts());
            right_echarts.push(myChart);
            var lengendData = [];
            var gridX = "40%";
            if (index == 0) {
                lengendData = tab2Lengend(item);
                gridX = "58%";
            }
            var seriesData = tab2DataData(item);
            myChart.setOption({
                yAxis: [
                    {
                        type: 'category',
                        data: lengendData,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 11 * bodyScale
                            },
                            interval: 0,
                        },
                    }
                ],
                xAxis: [
                    {
                        show: false,
                        type: 'value',
                        boundaryGap: false,

                    }
                ],
                grid: {
                    x: gridX,
                    x2: "25%",
                    y: '0%',
                    y2: "0%"
                },
                series: [
                    {
                        type: "bar",
                        data: seriesData,
                        barWidth: 12*bodyScale,
                       
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                // formatter: "{a}%",
                                textStyle: {
                                    fontSize: 10*bodyScale,
                                    color: "#ff9933"
                                },
                                formatter: '{c}'
                            }
                        },
                    }
                ]
            });

        });
    })
}



