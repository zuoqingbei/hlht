//设备状态统计
var color = ['rgba(102, 204, 255,0.7)', 'rgba(255,255,153,0.7)', 'rgba(102,255,204,0.7)', 'rgba(255,102,102,0.7)'];
function loadTab2Data() {
    //设备状态统计 总状态
    equipmentTotalForLab1Ajax();

    //设施状态type 类型  0：实验室在线率 1：设备完好率 2：设备利用率
    equipmentStatisForPlForLab2Ajax(0);
    equipmentStatisForPlForLab2Ajax(1);
    equipmentStatisForPlForLab2Ajax(2);

    //人员信息 总状态
    findPersonStatusTab1Ajax(1);
    findPersonStatusTab1Ajax(2);
    findPersonStatusTab1Ajax(3);

    //人员信息 各个产线状态 散点图
    personForTab2Ajax("myChart25", "1", 1);
    personForTab2Ajax("myChart26", "2", 1);
    personForTab2Ajax("myChart27", "3", 1);

    //标准状态 总状态
    standardStatus();

    //标准数量分布情况
    standardDispersedStatus("myChart28", "国际标准");
    standardDispersedStatus("myChart29", "国家标准");
    standardDispersedStatus("myChart30", "行业标准");
    standardDispersedStatus("myChart31", "企业标准");

    //能力状态 总状态
    abilityStatus();

    //能力状态分布 不同产线的
    abilityByProductLine()
}

//设备状态统计 总状态
function equipmentTotalForLab1Ajax() {
    $.post(contextPath + '/lab/equipmentTotalForLab1Ajax', {}, function (data) {
        var myChart1 = echarts.init(document.getElementById("myChart1"));
        right_echarts.push(myChart1);
        option = {
            tooltip: {
                formatter: "{a} <br/>{c}%"
            },
            toolbox: {
                show: false,
                feature: {
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '设备完好率',
                    type: 'gauge',
                    z: 3,
                    min: 0,
                    max: 100,
                    splitNumber: 5,
                    radius: '88%',
                    // textStyle: {
                    //     fontSize: 15 * bodyScale
                    // },
                    axisLine: {            // 坐标轴线
                        show: false,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 7 * bodyScale,
                            color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]
                        },

                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 9 * bodyScale
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 9 * bodyScale,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#66ccff'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 11 * bodyScale,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: '#66ccff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ff9933",
                            // borderColor:"red",
                            // borderWidth:2,
//		                        opacity:0.5
                        }
                    },
                    pointer: {
                        length: "55%",
                        width: 3 * bodyScale
                    },
//                     title: {
//                         offsetCenter: [0, '100%'],       // x, y，单位px
//                         textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                             fontSize: 15 * bodyScale,
//                             color: '#66ccff',
// //		                        fontStyle: 'italic'
//                         },
//
//                     },
                    detail: {
                        offsetCenter: ['0%', '82%'],
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 25 * bodyScale,
                            color: "#ff9933"
                        },
                        formatter: '{value}%'
                    },
                    data: [{value: data[1].rate}]
                    // data: [{value: data[1].rate, name: '设备完好率'}]
                },
                {
                    name: '实验在线率',
                    type: 'gauge',
                    center: ['18%', '50%'],    // 默认全局居中
                    radius: '88%',
                    splitNumber: 5,
                    // textStyle: {
                    //     fontSize: 15 * bodyScale
                    // },
                    axisLine: {            // 坐标轴线
                        show: false,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 7 * bodyScale,
                            color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]
                        },

                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 9 * bodyScale
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 9 * bodyScale,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#66ccff'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 11 * bodyScale,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: '#66ccff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ff9933",
//		                        borderColor:"red",
//		                        borderWidth:2,
//		                        opacity:0.5
                        }
                    },
                    pointer: {
                        length: "55%",
                        width: 3 * bodyScale
                    },
//                     title: {
//                         offsetCenter: [0, '100%'],       // x, y，单位px
//                         textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                             fontSize: 12 * bodyScale,
//                             color: '#66ccff',
// //		                        fontStyle: 'italic'
//                         },
//                     },
                    detail: {
                        offsetCenter: [0, '82%'],
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 25 * bodyScale,
                            color: "#ff9933"
                        },
                        formatter: '{value}%' //数字显示的样式
                    },
                    // data: [{value: data[0].rate, name: '实验在线率'}]
                    data: [{value: data[0].rate}]
                },
                {
                    name: '设备利用率',
                    type: 'gauge',
                    center: ['82%', '50%'],    // 默认全局居中
                    radius: '88%',
                    splitNumber: 5,
                    // textStyle: {
                    //     fontSize: 15 * bodyScale
                    // },
                    axisLine: {            // 坐标轴线
                        show: false,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 7 * bodyScale,
                            color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]
                        },

                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 9 * bodyScale
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 9 * bodyScale,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#66ccff'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 11 * bodyScale,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: '#66ccff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#ff9933",
//		                        borderColor:"red",
//		                        borderWidth:2,
//		                        opacity:0.5
                        }
                    },
                    pointer: {
                        length: "55%",
                        width: 3 * bodyScale
                    },
//                     title: {
//                         offsetCenter: [0, '100%'],       // x, y，单位px
//                         textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
//                             fontSize: 12 * bodyScale,
//                             color: '#66ccff',
// //		                        fontStyle: 'italic'
//                         },
//                     },
                    detail: {
                        offsetCenter: [0, '82%'],
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 25 * bodyScale,
                            color: "#ff9933"
                        },
                        formatter: '{value}%'
                    },
                    // data: [{value: data[2].rate, name: '设备利用率'}]
                    data: [{value: data[2].rate}]
                }

            ]
        };
        myChart1.setOption(option);
    });
}

//设施状态 各个产线  type 类型  0：实验室在线率 1：设备完好率 2：设备利用率
function equipmentStatisForPlForLab2Ajax(type) {
    var rise_pic = contextPath + "/static/img/tab2/rise.png";//上升图片
    var reduce_pic = contextPath + "/static/img/tab2/down.png";//降低图片
    var no_change = contextPath + "/static/img/tab2/cp.png";//没有变化
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
                if (type == 0) {
                    htmls += '<tr><td>' + item.product_name + '</td><td class="td_progress">';
                } else {
                    htmls += '<tr><td>' + "" + '</td><td class="td_progress">';
                }
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
                    htmls += ' <span style="color:#ff6666;">' + (0 - parseFloat(item.change_num)) + '%</span></td>';
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


//人员状态 总状态 type:类型 1:学历情况 2:工作年限情况 3:批准权限
function findPersonStatusTab1Ajax(type) {
    $.post(contextPath + '/lab/findPersonStatusTab1Ajax', {"type": type}, function (data) {
        var htmls = "";
        if(type==3){
        	for(var x=data.length-1;x>=0;x--){
        		var item=data[x];
        		htmls += '<li><span class="bar_name">' + item.name + '</span>';
        		htmls += '<div class="progress">';
        		htmls += '<div class="progress-bar1" role="progressbar" aria-valuenow="' + item.rate + '" aria-valuemin="0" aria-valuemax="100" style="width:' + item.rate + '%;height: 110%"></div>';
        		htmls += '</div><span>' + item.rate + '%</span></li>';
        	}
        }else{
        	$.each(data, function (index, item) {
        		htmls += '<li><span class="bar_name">' + item.name + '</span>';
        		htmls += '<div class="progress">';
        		htmls += '<div class="progress-bar1" role="progressbar" aria-valuenow="' + item.rate + '" aria-valuemin="0" aria-valuemax="100" style="width:' + item.rate + '%;height: 110%"></div>';
        		htmls += '</div><span>' + item.rate + '%</span></li>';
        	});
        }
        $("#tab1_person_detail_" + type).html(htmls)
    })
}


function dealNumberTab2(num) {
    var max = 25;
    if (parseInt(num) > max) {
        var x = parseInt(parseInt(num) / (parseInt(num) - max));
        if (max + x > 30) {
            return 30 * bodyScale;
        }
        return (max + x) * bodyScale
    } else {
        return parseInt(num) * bodyScale;
    }
}
//人员信息 各个产线状态 散点图
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
            data0.push([item[0].name, item[0].product_name, dealNumberTab2(parseInt(item[0].all_num) / divisor), item[0].name]);
            data1.push([item[1].name, item[1].product_name, dealNumberTab2(parseInt(item[1].all_num) / divisor), item[1].name]);
            data2.push([item[2].name, item[2].product_name, dealNumberTab2(parseInt(item[2].all_num) / divisor), item[2].name]);
            data3.push([item[3].name, item[3].product_name, dealNumberTab2(parseInt(item[3].all_num) / divisor), item[3].name]);

            /* data0.push([item[0].name, item[0].product_name, parseInt(item[0].all_num) / divisor*bodyScale, item[0].name]);
             data1.push([item[1].name, item[1].product_name, parseInt(item[1].all_num) / divisor*bodyScale, item[1].name]);
             data2.push([item[2].name, item[2].product_name, parseInt(item[2].all_num) / divisor*bodyScale, item[2].name]);
             data3.push([item[3].name, item[3].product_name, parseInt(item[3].all_num) / divisor*bodyScale, item[3].name]);*/
            if (index == 0) {
                $.each(item, function (ind, it) {
                	if(type==4){
                		var result="";
                		var str=it.name+"";
                		console.log(str)
                		for(var i=0,len=str.length;i<len;i++){
                		    result += str[i];
                		    if(i % 2 == 1) result += '\n';
                		}
                		 xData.push(result);
                	}else{
                		 xData.push(it.name);
                	}
                   
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
                bottom: "10%",
                left: (type == 1 ? "22%" : '8%'),
                top: "4%"
            },
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    textStyle: {
                        fontSize: 10 * bodyScale,
                    },
                    label: {
                        backgroundColor: '#234f65'
                    }
                },
                position: 'top',
                formatter: function (params) {
                    return (parseInt(params.value[2] * divisor / bodyScale));
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
                        fontSize: 13 * bodyScale
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
                    show: (type == 1),
                    // rotate: 30,
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 13 * bodyScale
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
                    // shadowBlur: 5,
                    // shadowColor: 'rgba(255,255,255,0.5)',
                    // shadowOffsetY: 3,
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
            },

        }
        s.push(c);
    });
    return s;
}


//标准状态 总状态
function standardStatus() {
    $.post(contextPath + '/lab/standardStatusAjax', {}, function (data) {
        var reviseNum = parseInt(data.revisenum);
        var standardNum = parseInt(data.standardnum);
        $("#reviseNum").html(reviseNum);
        $("#tab1_qtqc_id").html(1144);
        $("#standardNum").html(standardNum);
        /*var num0=(standardSeriesData(data.revisedata,"牵头起草数")/reviseNum).toFixed(2)*100;
         var num1=(standardSeriesData(data.revisedata,"参与起草数")/reviseNum).toFixed(2)*100;
         var gjia=standardSeriesData(data.standarddata,"国家标准");
         var gjbz=standardSeriesData(data.standarddata,"国际标准");
         var hybz=standardSeriesData(data.standarddata,"行业标准");
         var qybz=standardSeriesData(data.standarddata,"企业标准");*/
        var num0 = standardSeriesData(data.revisedata, "牵头起草数");
        var num1 = standardSeriesData(data.revisedata, "参与起草数");
        var gjia = standardSeriesData(data.standarddata, "国家标准");
        var gjbz = standardSeriesData(data.standarddata, "国际标准");
        var hybz = standardSeriesData(data.standarddata, "行业标准");
        var qybz = standardSeriesData(data.standarddata, "企业标准");
        $("#tab1_gjiabz_id").html(172);
        $("#tab1_gjibz_id").html(90);
        $("#tab1_hybz_id").html(114);
        $("#tab1_qybz_id").html(768);
        var num2 = gjia;
        var num3 = gjbz;
        var num4 = hybz;
        //var num5=(standardSeriesData(data.standarddata,"当地标准")/standardNum).toFixed(2)*100;
        var num6 = qybz;
        //多个圆环图  标准状态
        var myChart2 = echarts.init(document.getElementById("myChart2"));
        right_echarts.push(myChart2);
        var labelTop = {
            normal: {
                color: '#234f65',
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{b}',
                    textStyle: {
                        baseline: 'bottom',
                        color: '#66ccff',
                        fontSize: 12 * bodyScale
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return params.value
                    },
                    textStyle: {
                        baseline: 'top',
                        fontSize: 12 * bodyScale
                    }
                }
            },
        };
        var labelBottom = {
            normal: {
                color: '#66ccff',
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: 20 * bodyScale
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: '#66ccff'
            },
        };
        var radius = ['32%', '40%'];
        option = {
            toolbox: {
                show: false,
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                width: '20%',
                                height: '30%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            formatter: function (params) {
                                                return 'other\n' + params.value + '%\n'
                                            },
                                            textStyle: {
                                                baseline: 'middle'
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            textStyle: {
//		            color:'#66ccff'
                color: '#ff9933'
            },
            tooltip: {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                textStyle: {
                    fontSize: 10 * bodyScale,
                }
            },
            series: [
                {
                    type: 'pie',
                    center: ['35%', '20%'],
                    radius: radius,
                    x: '40%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: parseInt(reviseNum) - qybz, itemStyle: labelBottom},
                        {name: '起草数', value: qybz, itemStyle: labelTop}
                    ]
                },
                {
                    type: 'pie',
                    center: ['85%', '20%'],
                    radius: radius,
                    x: '60%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: qybz, itemStyle: labelBottom},
                        {name: '起草数', value: parseInt(reviseNum) - qybz, itemStyle: labelTop}
                    ]
                },
                {
                    type: 'pie',
                    center: ['10%', '80%'],
                    radius: radius,
                    y: '55%',   // for funnel
                    x: '0%',    // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: num3, itemStyle: labelBottom},
                        {name: '国际标准', value: parseInt(standardNum) - num3, itemStyle: labelTop}
                    ]
                },
                {
                    type: 'pie',
                    center: ['35%', '80%'],
                    radius: radius,
                    y: '55%',   // for funnel
                    x: '20%',    // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: num2, itemStyle: labelBottom},
                        {name: '国家标准', value: parseInt(standardNum) - num2, itemStyle: labelTop}
                    ]
                },
                {
                    type: 'pie',
                    center: ['60%', '80%'],
                    radius: radius,
                    y: '55%',   // for funnel
                    x: '40%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: num4, itemStyle: labelBottom},
                        {name: '行业标准', value: parseInt(standardNum) - num4, itemStyle: labelTop}
                    ]
                },

                {
                    type: 'pie',
                    center: ['85%', '80%'],
                    radius: radius,
                    y: '55%',   // for funnel
                    x: '80%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: num6, itemStyle: labelBottom},
                        {name: '企业标准', value: parseInt(standardNum) - num6, itemStyle: labelTop}
                    ]
                }
            ]
        };
        myChart2.setOption(option);
    })
}

function standardSeriesData(data, name) {
    var num = 0;
    $.each(data, function (index, item) {
        if (item.name == name) {
            num = parseInt(item.count);
        }
    });
    return num;
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
                    fontSize: 15 * bodyScale
                }
            },
            polar: [
                {
                    indicator: tab2IndicatorData(data),
                    center: ['50%', '50%'],
                    radius: '65%',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#66ccff',
                            fontSize: 12 * bodyScale,
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(102,204,255,0.5)',
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(102,204,255,0.2)',
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
            tooltip: {},
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

//能力状态 总状态
function abilityStatus() {
    $.post(contextPath + '/lab/abilityStatusAjax', {}, function (data) {
        var maxNum = parseInt(data.allnum);
        $.each(data.data, function (index, item) {
            if (maxNum < parseInt(item.count)) {
                maxNum = parseInt(item.count);
            }
        })
        $("#ability_all_num").html(data.allnum)
        //能力状态 柱形图
        var myChart3 = echarts.init(document.getElementById("myChart3"));
        right_echarts.push(myChart3);
        myChart3.setOption(getBarEcharts());
        // var bar_chip = contextPath + '/img/bar_chip.png';
        myChart3.setOption({
            yAxis: [
                {
                    name: "数量",
                    type: 'value',
                    max: maxNum,
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: axisLabel,
                    splitLine: {  //刻度线
                        show: false
                    }
                }
            ],
            xAxis: [
                {
                    name: "",
                    type: 'category',
                    data: statisticRightLengend2(data.data),
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: axisLabel,

                }
            ],
            grid: {
                x: '8%',
                x2: '5%',
                y: '12%',
                y2: '12%'
            },
            series: [
                {
                    // symbolSize: ['60%', '10%'],
                    barWidth: "30%",
                    data: statisticRightSeriesData(data.data),
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: 25 * bodyScale,
                                color: '#ff9933'
                            }
                        }
                    }
                }
            ]
        });
    })
}

function statisticRightLengend2(data) {
    var legnend = [];
    $.each(data, function (index, item) {
        var name = item.name;
        legnend.push(name);
    });
    return legnend;
}

function statisticRightSeriesData(data) {
    var series = [];
    $.each(data, function (index, item) {
        var obj = new Object();
        obj.value = item.count;
        // obj.symbol = bar_chip;
        series.push(obj);
    });
    return series;
}


function abilityByProductLine() {
    $.post(contextPath + '/lab/abilityByProductLineAjax', {}, function (data) {
        var xData = [];
        //var yData = [];
        var yData1 = [];
        var yData2 = [];
        var yData3 = [];
        for (var i = 0; i < data[0].length; i++) {
            if (data[0][i][0]) {
                xData.push(data[0][i][0].product_name);
                yData1.push(data[0][i][0].count);
                yData2.push(data[0][i][1].count);
                yData3.push(data[0][i][2].count);
            } else {
                xData.push('其他');
                yData1.push(0);
                yData2.push(0);
                yData3.push(0);
            }
        }
        /*     console.log(yData1);
         console.log(yData2);
         console.log(yData3);
         console.log(xData);
         */
        var myChart32 = echarts.init(document.getElementById("myChart32"));
        right_echarts.push(myChart32);
        myChart32.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['完全具备', '部分具备', '完全不具备'],
                textStyle: {    //图例文字的样式
                    color: '#66ccff',
                    fontSize: 12 * bodyScale
                },
                itemWidth: 6 * bodyScale,  //图例标记的图形宽度
                itemHeight: 6 * bodyScale, //图例标记的图形高度
                itemGap: 10 * bodyScale,   //图例之间的间隔
            },
            grid: {
                x: '2%',
                x2: '5%',
                y: '12%',
                y2: '2%',
                containLabel: true
            },
            yAxis: {
                name: '标准数',
                type: 'value',
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
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
                }
            },
            xAxis: {
                type: 'category',
                data: xData,
                boundaryGap: true,
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    // alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                }
            },
            color: ['#66ccff', "#ffff99", '#66ffcc'],
            series: [
                {
                    name: '完全具备',
                    type: 'bar',
                    stack: '总量',
                    barWidth: "60%",
                    data: yData1
                },
                {
                    name: '部分具备',
                    type: 'bar',
                    stack: '总量',
                    barWidth: "60%",
                    data: yData2
                },
                {
                    name: '完全不具备',
                    type: 'bar',
                    stack: '总量',
                    barWidth: "60%",
                    data: yData3
                }
            ]
        });
    });
}