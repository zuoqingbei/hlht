/////////////////////////////////////////////////////////////////统计数据/////////////////////////////
/**
 * 右侧数据统计
 */
function loadTab4Data(){
	// alert("tab4重新加载")
    // 共产 一致比重统计
	communistGravityStatisticForTab4Ajax();
    //根据类型 时间 统计共产 一致个月份数量
    communistStatisticForMonthForTab4Ajax();
    //直方图
    loadTab4JianData($(".tab4 .shujuWajue_left_top_list .active").attr("data"),$(".tab4 .shujuWajue_left_top_list .active").html());
}
//加载量产一致性保障 xhId:产品id  name：产品名称
function loadTab4JianData(xhId,xName){
	$.post(contextPath+'/lab/jianCeXhProForTab1Ajax',{"xhCode":xhId},function(xhPro){
		$("#tab4_jiance_xh_name").html("\""+xName+"\"");
		$("#tab4_jiance_xh_result").html("结论："+"过程稳定");
		$("#tab4_jiance_xh_name2").html("\""+xName+"\"");
		$("#tab4_jiance_xh_result2").html("cpk:"+xhPro.cpk+"</br>"+"结论："+xhPro.jielun);
		//模块商质量水平分布
		mkSqualityLevelForTab4(xhPro);
		//SPC分析
		scpDataForTab4("myChart15",xhPro,1);
		scpDataForTab4("myChart15_2",xhPro,2);
		//直方图
		cpkDataForTab4(xhPro);
	
	});
}
//模块商质量水平分布 横条图
/*
function mkSqualityLevelForTab4(xhPro){
	var myChart14 = echarts.init(document.getElementById("myChart14"));
	right_echarts.push(myChart14);
	myChart14.setOption(getBarEcharts());
	var bar_chip = '../img/bar_chip.png';
	myChart14.setOption({
	    color:["#66ccff","#ff9933"],
	    title: {
	        show:false,
	        text: '模块商质量水平分布',
	        left: 'center'
	    },
	    grid: {
//	            show:true,
	        x: "15%",
	        x2: "15%",
	        y: '15%',
	        y2: "15%"
	    },
	    yAxis: [
	        {
	            name: "Cpk",
                axisPointer:{
                    tiggerTooltip:false
                },
	            nameGap:2*bodyScale,
	            // type: 'category',
	            position: 'left',
                axisLabel:{
                    textStyle: {
                        fontSize: 9 * bodyScale
                    }
                },
	            data: [1, 1.33, 1.67, 2],
	            axisLine: { //坐标轴
	                show: false,
	                textStyle: {
	                    color: 'rgba(0,0,0,0)'
	                }
	            },
	            axisTick: {  //刻度值
	                show: false,
	            }
	        }, {
	            name: " ",/!*ppm用div替代*!/
	            // nameGap:8*bodyScale,
	            position: 'right',
	            // type: 'category',
	            data: [2700,63,0.57,0.002],
                axisLabel:{
                    textStyle: {
                        fontSize: 9 * bodyScale
                    }
                },
	            axisLine: { //坐标轴
	                show: true,
	                textStyle: {
	                    color: '#66ccff',
	                }
	            },
	            axisTick: {  //刻度值
	                show: false,
	            }
	        }, {
	            name: "",
                axisPointer:{
	            	tiggerTooltip:false
				},
	            nameGap:2*bodyScale,
	            position: 'right',
	            type: 'category',
	            data: [0.6, 1.16, 1.5, 1.85,2.5],
	            axisLabel:{
                    show:false,
	                textStyle:{
	                    color: '#66ccff',
	                }
	            },
	            axisLine: { //坐标轴
	                show: true,
	                textStyle: {
	                    color: '#66ccff',
	                }
	            },
	            axisTick: {  //刻度值
	                show: false,
	            }
	        }

	    ],
	    xAxis: [
	        {
	            type: 'value',
                nameGap:2*bodyScale,
                axisLabel: {
                    show:true
                },
	            splitLine: {  //刻度线
	                show: true,
	                lineStyle: {
	                    color: "#234f65"
	                }
	            },
	            axisLine: { //坐标轴
	                show: false,
	                textStyle: {
	                    color: '#66ccff',
	                }
	            },
	            axisTick: {  //刻度值
	                show: false,
	            }
	        }
	    ],
	    series: [
	        {
	            symbolSize: ['40%', '60%'],
	            data: [{
	                value: 1,
	                symbol: bar_chip
	            }, {
	                value: 5,
	                symbol: bar_chip
	            }, {
	                value: 8,
	                symbol: bar_chip
	             }, {
	                value: 3,
	                symbol: bar_chip
	             }, {
	                value: 0,
	                symbol: bar_chip
	            }
	            ]
	        }
	    ]
	});
}
*/
//获取最大值 最小值
function getMaxMinForScpTab4(data, xhPro, type) {
    var result = [];
    var max;
    var min;
    if (type == 1) {
        min = xhPro.jz_lcl;
        max = xhPro.jz_ucl;
    } else {
        min = xhPro.fc_lcl;
        max = xhPro.fc_ucl;
    }
    $.each(data, function (index, item) {
        if (parseFloat(item.num) > parseFloat(max)) {
            max = item.num;
        }
        if (parseFloat(item.num) < parseFloat(min)) {
            min = item.num;
        }
    });
    result.push(parseFloat(max) + 0.1);
    result.push(parseFloat(min) - 0.1);
    return result;
}
//SPC分析  xbar
function scpDataForTab4(myChartIds,xhPro,type){
	//类型 1：样本平均值 2：样本标准差
	$.post(contextPath+'/lab/jianCeXbarForTab1Ajax',{"xhName":xhPro.xh_name,"type":type},function(data){
		var maxAndMin=getMaxMinForScpTab4(data,xhPro,type);
		var mTitle,mLcl,mValue,mUcl;
		if(type==1){
			mTitle="样本平均值";
			mLcl=xhPro.jz_lcl;
			mValue=xhPro.pj_value;
			mUcl=xhPro.jz_ucl;
		}else{
			mTitle="样本标准差";
			mLcl=xhPro.fc_lcl;
			mValue=xhPro.fc_value;
			mUcl=xhPro.fc_ucl;
		}
		var myChart15 = echarts.init(document.getElementById(myChartIds));
		right_echarts.push(myChart15);
        myChart15.setOption(getLineEcharts());
        myChart15.setOption({
		    color:["#ff9933"],
		    textStyle:{
		        fontSize:9*bodyScale
		    },
		    title: {
		        show:false,
		        text: 'Xbar 控制图',
		        left: 'center'
		    },
		    grid: {
		        right: "13%",
		        bottom: "15%",
		        left: "15%",
		        top: "25%",
				x2:"15%"
		    },
		    yAxis: {
		        name: mTitle,
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
		        max: parseFloat(maxAndMin[0]),
		        min: parseFloat(maxAndMin[1]),
		        splitLine: {  //刻度线
		            show: false
		        },
		    },
		    xAxis: [
		        {
		            name: "",
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: axisLabel,
		            data: statisticRightLengend4(data)
		        }
		    ],
		    visualMap: {
		        show:false,
		        top: 10,
		        right: 10,
		        pieces: [{
		            gt:  parseFloat(mLcl),
		            lte: parseFloat(mUcl),
		            color: '#096'
		        }],
                outOfRange: {
                    color: '#cc0033'
                }
		    },
		    series: [
		        {
		            name: mTitle,
		            type: 'line',
		            lineStyle: {
		                normal: {
                            // color:"#00e673",
		                    width: 1
		                }
		            },
                    itemStyle:{normal:{
                        // borderColor:"#00e673"
                        borderColor:function (params) {
							console.log("...............................",params)
                        }
                    }},
		            symbolSize: 3*bodyScale,
		            data: tab4OrderRateSeriseData(data),
		            markLine: {
		                symbolSize:0,
		                silent: true,
		                label:{normal:{formatter:"{b}={c}"}},
                        lineStyle:{
                            normal:{
                                type:"solid",
                                width:1*bodyScale
                            }
                        },

                        data: [{
		                    name:"UCL",
		                    yAxis: parseFloat(mUcl)
		                },{
		                    name:"x",
		                    yAxis: parseFloat(mValue),
                            lineStyle:{
                                normal:{
                                    color:"#439ef7"
                                }
                            }

                        }, {
		                    name:"LCL",
		                    yAxis: parseFloat(mLcl)
		                }]
		            }
		        }
		    ]

		});
		
	});
	
}
function statisticRightLengend4(data) {
    var legnend = [];
    $.each(data, function (index, item) {
        var name = item.name;
        legnend.push(name);
    });
    return legnend;
}
function tab4OrderRateSeriseData(data) {
    var mData = [];
    $.each(data, function (index, item) {
        mData.push(item.rate);
    });
    return mData;
}
//直方图
function cpkDataForTab4(xhPro){
	$.post(contextPath+'/lab/jianCeDataForTab1Ajax',{"xhCode":xhPro.xh_name},function(data){
		var mData=[];
		var mData2=[];
		$.each(data[0],function(index,item){
			mData.push([parseFloat(item.wkq_num),parseFloat(xhPro.pj_value)]);
			//mData2.push([parseFloat(item.wkq_num),parseFloat(item.gd_num_2)]);
		});
		/*$.each(data[1],function(index,item){
			mData2.push([parseFloat(item.num),parseFloat(item.num)]);
		});*/
		//mHeightChartTab4.options.xAxis[0].plotLines[0].value=parseFloat(xhPro.lsl);
		//mHeightChartTab4.options.xAxis[0].plotLines[1].value=parseFloat(xhPro.usl);
		mHeightChartTab4.options.xAxis[0].max=parseFloat(xhPro.lsl);
		mHeightChartTab4.options.xAxis[0].min=parseFloat(xhPro.usl);
		mHeightChartTab4.series[0].setData(histogramTab4(mData, 0.3)); // 更新 series
		/*mHeightChartTab4.series[1].setData(histogramTab4(mData2, 0.3));*/
		mHeightChartTab4.xAxis[0].addPlotLine({
            color:'#f93',            //线的颜色，定义为红色
            dashStyle:'solid',//认是solid（实线），这里定义为长虚线
            value:parseFloat(xhPro.lsl),                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            width:1  ,               //标示线的宽度，2px
            label:{
                text:'LSL',  //标签的内容
                verticalAlign:'center',                //标签的水平位置，水平居左,默认是水平居中center
                x:5,                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                style: {
                    color: '#f93',
                   /* fontWeight: 'bold',*/
                    fontSize:12*bodyScale
                } 
            },
            zIndex:100,  //值越大，显示越向前，默认标示线显示在数据线之后
        });
		mHeightChartTab4.xAxis[0].addPlotLine({
            color:'#f93',            //线的颜色，定义为红色
            dashStyle:'solid',//标示线的样式，默认是solid（实线），这里定义为长虚线
            value:parseFloat(xhPro.usl),                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            width:1  ,               //标示线的宽度，2px
            label:{
                text:'USL',//标签的内容
                verticalAlign:'center',                //标签的水平位置，水平居左,默认是水平居中center
                x:5,                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
                style: {
                    color: '#f93',
                    /*fontWeight: 'bold',*/
                    fontSize:12*bodyScale
                }
            },
            zIndex:100,  //值越大，显示越向前，默认标示线显示在数据线之后
        });
	});

}
function histogramTab4(data, step) {
    var histo = {},
        x,
        i,
        arr = [];
    // Group down
    for (i = 0; i < data.length; i++) {
        x = Math.floor(data[i][0] / step) * step;
        if (!histo[x]) {
            histo[x] = 0;
        }
        histo[x]++;
    }
    // Make the histo group into an array
    for (x in histo) {
        if (histo.hasOwnProperty((x))) {
            arr.push([parseFloat(x), histo[x]]);
        }
    }
    // Finally, sort the array
    arr.sort(function (a, b) {
        return a[0] - b[0];
    });
    return arr;
}
var mHeightChartTab4=$('#myChart16').highcharts({
	tooltip:{
		formatter:function(p){
			if(this.series.name=="概率密度"){
				return false;
			}else{
				var h=this.point.x+"<br/>直方图："+this.point.y;
				return h;
			}
		}
	},
    chart: {
        type: 'column',
        backgroundColor: 'rgba(0,0,0,0)',
        spacingBottom: 7 * bodyScale,
        marginRight: 5*bodyScale,
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled:false
    },
    title: {
        text: '',
    },
    legend:{
        enabled:false,
    },
    xAxis: {
        gridLineWidth: 0,
        min:71,
        max:77,
        plotLines: [],
        tickColor: "rgba(0,0,0,0)",
        labels:{
       	 	 y: 10*bodyScale,
	       	 style: {
	             /* fontWeight: 'bold',*/
	             fontSize: 7* bodyScale,
	             color:"#439ef7"
	         }
       }
    },
    yAxis: [{
        title: {
            text: ''
        },
        visible:false
    }, {
        opposite: true,
        title: {
            text: ''
        },
        visible:false,
    }],
    series: [{
        name: '直方图',
        type: 'column',
        data: histogramTab4(data, 0.5),
        color:"#4397f7",
        pointPadding: 0,
        groupPadding: 0,
        pointPlacement: 'between',
		borderColor:"rgba(0,0,0,0)"
    }]
}).highcharts();
//根据类型 时间 统计共产 一致个月份数量
function communistStatisticForMonthForTab4Ajax(){
	$.post(contextPath+'/lab/communistStatisticForMonthForTab1Ajax',{},function(data){
		var myChart18 = echarts.init(document.getElementById("myChart18"));
		right_echarts.push(myChart18);
		myChart18.setOption(getBarEcharts());
		myChart18.setOption({
		    color: ['#2b64f6', '#66ccff'],
		    legend: {
		        show: true,
		        data: ['共产型号总数', '共产一致型号数'],
                textStyle: {
                    fontSize: 10 * bodyScale,
                },
                itemHeight: 6 * bodyScale,
                itemWidth: 6 * bodyScale,  //图例标记的图形宽度
		    },
		    grid: {
//		            show:true,
		        x: "10%",
		        x2: "10%",
		        y: '15%',
		        y2: "10%"
		    },
		    yAxis: [
		        {
		            name: "数量",
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: axisLabel,
		            type: 'value',
					scale:true
		        }
		    ],
		    xAxis: [
		        {
		            name: "时间",
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: axisLabel,
		            type: 'category',
		            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		        }
		    ],
		    series: [{
		        name: '共产型号总数',
				type:'bar',
		        // type: 'pictorialBar',
		        label: labelSetting,
		        // symbolRepeat: true,
		        // symbolSize: ['80%', '60%'],
		        barCategoryGap: '40%',
                data: statisticRightSeriesTab4Data(data[0])
		        // data: statisticRightSeriesTab4Data(data[0],bar_chip)
		    }, {
		        name: '共产一致型号数',
                type:'bar',
                // type: 'pictorialBar',
		        barGap: '10%',
		        label: labelSetting,
		        // symbolRepeat: true,
		        // symbolSize: ['80%', '60%'],
                data: statisticRightSeriesTab4Data(data[1])
		        // data: statisticRightSeriesTab4Data(data[1],bar_chip)
		    }]
		});
	})
}

// 共产 一致比重统计
function communistGravityStatisticForTab4Ajax() {
    $.post(contextPath + '/lab/communistGravityStatisticForTab1Ajax', {"startDate":"201601","endDate":"201612"}, function (data) {
    	//console.log(data)
        var myChart17 = echarts.init(document.getElementById("myChart17"));
        right_echarts.push(myChart17);
        myChart17.setOption(getYuanhuan());
        var labelTop1 = {
            normal: {
                color: '#064f66',
                label: {
                    show: true,
                    position: 'center',
//	                模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
                    formatter: function (params) {
                    	//var num=(parseInt(data.yz_num)/parseInt(data.gc_num)*100).toFixed(1);
                        //return num+"%";
                    	return data.yz_num;
                    },
                    textStyle: {
                        fontSize: bodyScale * 24,
                        color: "#f90",
                        baseline: 'bottom'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var labelTop2 = {
                normal: {
                    color: '#064f66',
                    label: {
                        show: true,
                        position: 'center',
//    	                模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
                        formatter: function (params) {
                        	//var num=(parseInt(data.yz_num)/parseInt(data.gc_num)*100).toFixed(1);
                            //return (100-num)+"%";
                        	return (parseInt(data.gc_num)-parseInt(data.yz_num));
                        },
                        textStyle: {
                            fontSize: bodyScale * 24,
                            color: "#f90",
                            baseline: 'bottom'
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            };
        var labelLine = {
            normal: {
                length2: 5 * bodyScale,
                length: -80 * bodyScale,
                lineStyle: {
                    color: "rgba(0,0,0,0)"
                }
            }
        };
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return 100 - ( params.value) + '%'
                    },
                    textStyle: {
                        baseline: 'bottom'
                    }
                }
            }
        };
        var labelBottom = {
            normal: {
                color: "#6cf",
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{b}',
                    textStyle: {
//	                    color:"#f90",
                        fontSize: bodyScale * 16,
                        // fontSize: 6,
                        // fontFamily:'"Microsoft yahei", "微软雅黑"',
                        baseline: 'top'
                    }
                },

            },
            emphasis: {
                color: '#6cf'
            }
        };
        var radius = ["52%", "61%"];
        myChart17.setOption({
            textStyle: {
                color: '#6cf',
                fontSize: "60%"
            },

            series: [
                {
                    type: 'pie',
                    center: ['25%', '50%'],
                    radius: radius,
                    x: '0%', // for funnel
                    data: [
                        {name: 'other', value: (parseInt(data.gc_num)-parseInt(data.yz_num)), itemStyle: labelTop1},
                        {name: '共产一致占比', value: data.yz_num, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['71.5%', '50%'],
                    radius: radius,
                    x: '20%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'other', value: data.yz_num, itemStyle: labelTop2},
                        {
                            name: '共产不一致占比',
                            value: (parseInt(data.gc_num)-parseInt(data.yz_num)),
                            itemStyle: labelBottom
                        }
                    ]
                },
            ]
        });
		/*
		 myChart17.setOption({
		 textStyle: {
		 color: '#6cf',
		 fontSize: "60%"
		 },
		 grid: {
		 //	            show:true,
		 //	         x: "25%",
		 //	         x2: "15%",
		 //	         y2: "12%"
		 },
		 series: [
		 {
		 type: 'pie',
		 center: ['25%', '50%'],
		 radius: radius,
		 x: '0%', // for funnel
		 data: [
		 {name: 'other', value: allNum-num2, itemStyle: labelTop},
		 {name: '共产一致占比', value: num2, itemStyle: labelBottom}
		 ]
		 },
		 {
		 type: 'pie',
		 center: ['71.5%', '50%'],
		 radius: radius,
		 x: '20%', // for funnel
		 itemStyle: labelFromatter,
		 data: [
		 {name:'other', value:allNum-num3, itemStyle : labelTop},
		 {name: '共产不一致占比', value: num3, itemStyle: labelBottom}
		 ]
		 },
		 ]
		 });
		 */


		/*
		 myChart17.setOption({
		 color: ['#66ccff', '#4397f7'],
		 legend: {
		 show: true,
		 textStyle: {
		 color: '#66ccff',
		 fontSize: 10 * bodyScale,
		 },
		 orient: 'vertical',  //布局  纵向布局
		 data: ['共产一致型号数', '共产不一致型号数'],
		 itemWidth: 10,  //图例标记的图形宽度
		 itemHeight: 2, //图例标记的图形高度
		 },
		 series: [
		 {
		 name: '',
		 type: 'pie',
		 radius: [0, '50%'],
		 center: ['45%', '55%'],
		 // roseType: 'radius',
		 label: {
		 normal: {
		 show: true,
		 position: "outside",
		 formatter: "{d}%"
		 },
		 emphasis: {
		 show: true
		 }
		 },
		 lableLine: {
		 normal: {
		 show: false
		 },
		 emphasis: {
		 show: true
		 }
		 },
		 data: [
		 {value: data.yz_num, name: '共产一致型号数'},
		 {value: (parseInt(data.gc_num)-parseInt(data.yz_num)), name: '共产不一致型号数'}
		 ]
		 },
		 ]
		 });
		 */
    })
}

function statisticRightSeriesTab4Data(data,bar_chip){
	var series=[];
	$.each(data,function(index,item){
		var obj=new Object();
		obj.value=item.count;
		obj.symbol=bar_chip;
		series.push(obj);
	});
	return series;
}

//下拉菜单选择
function tab4JianSelected(obj) {
    // var id = $(obj).find("option:selected").attr("data");
    // var name = $(obj).find("option:selected").text();
    $("option").removeClass("active");
    var selectOpt = $("option[value="+$("select").val()+"]");
    var selectedLabel = selectOpt.addClass("active").parent().attr("label");
    $("option.showLabel").text(selectedLabel).prop("selected",true);

    var id = $(obj).find("option.active").attr("data");
    var name = $(obj).find("option.active").text();
    console.log("-------------$('select').val():",$("select").val())
    // console.log("-------------id,selectOpt:",id,selectOpt[0])
    loadTab4JianData(id,name);
}

//模块商质量水平分布
function mkSqualityLevelForTab4(xhPro) {
    var myChart14 = echarts.init(document.getElementById("myChart14"));
    right_echarts.push(myChart14);
    myChart14.setOption(getBarEcharts());
    var bar_chip = '../img/bar_chip.png';
    myChart14.setOption({
        color: ["#66ccff", "#ff9933"],
        title: {
            show: false,
            text: '模块商质量水平分布',
            left: 'center'
        },
        grid: {
//	            show:true,
            x: "13%",
            x2: "21%",
            y: '13%',
            y2: "20%"
        },
        yAxis: [
            {
                name: "Cpk",
                axisPointer: {
                    tiggerTooltip: false
                },
                position: 'left',
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
                data: [1, 1.33, 1.67, 2],
                axisLine: { //坐标轴
                    show: false,
                    textStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                }
            }, {
                name: " ", /*ppm用div替代*/
                // nameGap:8*bodyScale,
                position: 'right',
                // type: 'category',
                data: [2700, 63, 0.57, 0.002],
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
                axisLine: { //坐标轴
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                }
            }, {
                name: "",
                axisPointer: {
                    tiggerTooltip: false
                },
                position: 'right',
                type: 'category',
                data: [0.6, 1.16, 1.5, 1.85, 2.5],
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
                axisLabel: {
                    show: false,
                },
                axisLine: { //坐标轴
                    show: true,
                    textStyle: {
                        color: '#66ccff',
                    }
                },
                axisTick: {  //刻度值
                    show: false,
                }
            }

        ],
        xAxis: [
            {
                type: 'value',
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                axisLabel: axisLabel,
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: "#234f65"
                    }
                },
                axisLine: { //坐标轴
                    show: false,
                    textStyle: {
                        color: '#66ccff',
                    },
                    color: '#66ccff',
                },
                axisTick: {  //刻度值
                    show: false,
                }
            }
        ],
        series: [
            {
                symbolSize: ['40%', '60%'],
                data: [{
                    value: 1,
                    symbol: bar_chip
                }, {
                    value: 5,
                    symbol: bar_chip
                }, {
                    value: 8,
                    symbol: bar_chip
                }, {
                    value: 3,
                    symbol: bar_chip
                }, {
                    value: 0,
                    symbol: bar_chip
                }
                ]
            }
        ]
    });
}




