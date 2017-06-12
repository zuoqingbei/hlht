/////////////////////////////////////////////////////////////////统计数据/////////////////////////////
/**
 * 右侧数据统计
 */
function loadTab4Data(){
	
    // 共产 一致比重统计
	communistGravityStatisticForTab4Ajax();
    //根据类型 时间 统计共产 一致个月份数量
    communistStatisticForMonthForTab4Ajax();
    //直方图
    loadTab4JianData($(".tab4 .total_bottom_tab .active").attr("data"),$(".tab4 .total_bottom_tab .active").html());
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
//模块商质量水平分布
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
	        x2: "21%",
	        y: '15%',
	        y2: "25%"
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
	            name: " ",/*ppm用div替代*/
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
//SPC分析  xbar
function scpDataForTab4(myChartIds,xhPro,type){
	//类型 1：样本平均值 2：样本标准差
	$.post(contextPath+'/lab/jianCeXbarForTab1Ajax',{"xhName":xhPro.xh_name,"type":type},function(data){
		var maxAndMin=getMaxMinForScpTab1(data,xhPro,type);
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
		var myChart9 = echarts.init(document.getElementById(myChartIds));
		right_echarts.push(myChart9);
		myChart9.setOption(getLineEcharts());
		myChart9.setOption({
		    color:["#ff9933"],
		    textStyle:{
		        fontSize:4*bodyScale
		    },
		    title: {
		        show:false,
		        text: 'Xbar 控制图',
		        left: 'center'
		    },
		    grid: {
		        right: "24%",
		        bottom: "22%",
		        left: "15%",
		        top: "16%"
		    },
		    yAxis: {
		        name: mTitle,
		        max: parseFloat(maxAndMin[0]),
		        min: parseFloat(maxAndMin[1]),
		        axisLabel:{
		            textStyle:{
		                fontSize:5*bodyScale
		            }
		        },
		        splitLine: {  //刻度线
		            show: false
		        },
		        nameGap:2*bodyScale,
		        nameTextStyle:{fontSize:6*bodyScale},
		    },
		    xAxis: [
		        {
		            name: "",
		            axisLabel:{
		                textStyle:{
		                    fontSize:5*bodyScale
		                },
		                margin:2*bodyScale
		            },
		            nameGap:2*bodyScale,
		            nameTextStyle:{fontSize:6*bodyScale},
		            data: statisticRightLengend2(data)
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
		            symbolSize: 2,
		            data: tab1OrderRateSeriseData(data),
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
        data: histogram(data, 0.5),
        color:"#4397f7",
        pointPadding: 0,
        groupPadding: 0,
        pointPlacement: 'between',
		borderColor:"rgba(0,0,0,0)"
    }, {
        name: '概率密度',
        type: 'spline',
        data: data,
		color:"#00e673",
        yAxis: 1,
        marker: {
            radius: 1.5
        }
    }]
}).highcharts();
//根据类型 时间 统计共产 一致个月份数量
function communistStatisticForMonthForTab4Ajax(){
	$.post(contextPath+'/lab/communistStatisticForMonthForTab1Ajax',{},function(data){
		var myChart18 = echarts.init(document.getElementById("myChart18"));
		right_echarts.push(myChart18);
		myChart18.setOption(getBarEcharts());
		myChart18.setOption({
		    color: ['#66ccff', '#a5fff1'],
		    legend: {
		        show: true,
		        data: ['共产型号总数', '共产一致型号数'],
                textStyle: {
                    fontSize: 10 * bodyScale,
                },
                itemWidth: 6 * bodyScale,  //图例标记的图形宽度
		    },
		    grid: {
//		            show:true,
		        x: "12%",
		        x2: "15%",
		        y: '20%',
		        y2: "22%"
		    },
		    yAxis: [
		        {
		            name: "数量",
		            type: 'value',
					scale:true
		        }
		    ],
		    xAxis: [
		        {
		            name: "时间",
		            type: 'category',
		            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		        }
		    ],
		    series: [{
		        name: '共产型号总数',
		        type: 'pictorialBar',
		        label: labelSetting,
		        symbolRepeat: true,
		        symbolSize: ['80%', '60%'],
		        barCategoryGap: '40%',
		        data: statisticRightSeriesTab4Data(data[0],bar_chip)
		    }, {
		        name: '共产一致型号数',
		        type: 'pictorialBar',
		        barGap: '10%',
		        label: labelSetting,
		        symbolRepeat: true,
		        symbolSize: ['80%', '60%'],
		        data: statisticRightSeriesTab4Data(data[1],bar_chip)
		    }]
		});
	})
}


// 共产 一致比重统计
function communistGravityStatisticForTab4Ajax(){
	$.post(contextPath+'/lab/communistGravityStatisticForTab1Ajax',{},function(data){
		var myChart17 = echarts.init(document.getElementById("myChart17"));
		right_echarts.push(myChart17);
		myChart17.setOption(getRoseEcharts());
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


