/////////////////////////////////////////////////////////////////统计数据/////////////////////////////
/**
 * 数据统计
 */
var field="field";
var labType="",productCode="";
function reloadLeftData(){
	 //实验室数量统计
    labNumStatis();
    //实验室总数及分布
    proLineStatis();
    //实验室区域数量统计：大洲 国家
	labAreaSpread();
	//按照实验室四大类统计数量
   // labTypeStatis();
	//专业能力-实验室性质
	labPropertiesStatis();
	//实验目的--可开展实验类型 产品生命周期全流程测试
	labLifeCycleStatis();
	//labCarouselInfo();
	worldLabTypeStatis();
	//专业领域
	professionalStatis();
	//联通数
	labLinkStatis();
}
function reloadLeftData2(){
   //产线维度实验室数量统计
   proLineStatis();
   //实验室区域数量统计：大洲 国家
	labAreaSpread();
	//按照实验室四大类统计数量
    //labTypeStatis();
	//专业能力-实验室性质
	labPropertiesStatis();
	//实验目的--可开展实验类型 产品生命周期全流程测试
	labLifeCycleStatis();
}
//实验室信息轮播数据
/*function labCarouselInfo(){
	$.post(contextPath+"/lab/labShowFlatMapAjax",{},function(data){
		console.log(data)
	})
}*/
//专业领域
function professionalStatis(){
	var names=['化学','机械','电气','日用消费品','EMC'];
	$.post(contextPath+'/lab/labStatisByFiledAjax',{field:"professional_code","labType":labType,"productCode":productCode,"sort":"asc"},function(data){
		$(".professional_code_div").html("覆盖专业领域："+data.length);
		var htmls="";
		$.each(names,function(index,item){
			var count=0;
			$.each(data,function(ind,it){
				if(it.name===item){
					count=it.count;
				}
			});
			htmls+='<li>'+count+'</li>';
		});
		$(".left3x3 #left_professional_code_num").html(htmls);
		// $(".fullScreen_map #left_professional_code_num").html(htmls);
	})
}
//实验室数量统计
function labNumStatis(){
	$.post(contextPath+'/lab/labNumStatisAjax',{},function(data){
		$("#lab_all_count_1").html(data);
		$(".lab_all_count").html(data);
	})
}

//实验室区域数量统计：大洲 国家
function labAreaSpread(){
	$.post(contextPath+'/lab/labSpreadAjax',{},function(data){
		$("#area_num").html(data.areanum);
		$("#country_num").html(data.countrynum);
		$("#belong_num").html(data.belongnum);
	})
}

//产线维度实验室数量统计
function proLineStatis(){
	$.post(contextPath+'/lab/labStatisByFiledAjax',{field:"product_code","labType":labType,"sort":"asc"},function(data){
		var nums=[];
		$(".pro_line").html("");
		$.each(data,function(index,item){
			$(".pro_line").append('<li><span class="icon"></span>'+item.name+'<span class="number" style="color: transparent;">'+item.count+'</span></li>');
			nums.push(item.count);
		});
		sphereRTnumberShow(nums);
	})
}
function standardSeriesDataForLeft(data,name){
	var num=0;
	$.each(data,function(index,item){
		if(item.name===name){
			num=parseInt(item.count);
		}
	});
	return num;
}

//平面地图左上角的环形图，实验室数量按照四大类展示
function worldTyleEchart(data){
	var num2=standardSeriesDataForLeft(data,"研发实验室");
	var num3=standardSeriesDataForLeft(data,"中海博睿");
	var num4=standardSeriesDataForLeft(data,"工厂实验室");
	var num5=standardSeriesDataForLeft(data,"模块商实验室");
	var allNum=parseInt(num2)+parseInt(num3)+parseInt(num4)+parseInt(num5);
	myChartFlatLT.setOption(getYuanhuan());
	// myChartFlatLT_full.setOption(getYuanhuan());
	var labelTop = {
	    normal: {
	        color: '#064f66',
	        label: {
	            show: true,
	            position: 'center',
//	                模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
	            formatter: function (params) {
	                return allNum -  params.value;
	            },
	            textStyle: {
	                fontSize:bodyScale*13,
	                color: "#f90",
	                baseline: 'bottom'
	            }
	        },
	        labelLine: {
	            show: false
	        }
	    }
	};
/*
	var labelTop_full = {
	    normal: {
	        color: '#064f66',
	        label: {
	            show: true,
	            position: 'outside',
//	                模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
	            formatter: function (params) {
	                return allNum -  params.value ;
	            },
	            textStyle: {
	                fontSize:bodyScale*16,
	                color: "#f90",
	                baseline: 'bottom'
	            }
	        },

	    }
	};
*/
	var labelLine = {
		normal: {
			length2: 5*bodyScale,
				length: -80*bodyScale,
				lineStyle: {
				color: "rgba(0,0,0,0)"
			}
		}
    };
	var labelFromatter = {
	    normal: {
	        label: {
	            formatter: function (params) {
	                return 100 - ( params.value)  + '%'
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
	            formatter : '{b}',
	            textStyle: {
//	                    color:"#f90",
	                fontSize: bodyScale*9,
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
/*
	var labelBottom_full = {
	    normal: {
	        color: "#6cf",
	        label: {
	            show: true,
	            position: 'center',
	            formatter : '{b}',
	            textStyle: {
//	                    color:"#f90",
	                fontSize: bodyScale*12,
	                // fontSize: 6,
	                // fontFamily:'"Microsoft yahei", "微软雅黑"',
                    baseline: 'bottom'
	            }
	        },
	        labelLine: {
	            show: false
	        }
	    },
	    emphasis: {
	        color: '#6cf'
	    }
	};
*/
	var radius = ["27%", "36%"];
	myChartFlatLT.setOption({
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
	            center: ['30%', '33%'],
	            radius: radius,
	            x: '0%', // for funnel
	            data: [
	                {name: 'other', value: allNum-num2, itemStyle: labelTop},
	                {name: '研发-调试', value: num2, itemStyle: labelBottom}
	            ]
	        },
	        {
	            type: 'pie',
	            center: ['70%', '33%'],
	            radius: radius,
	            x: '20%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name:'other', value:allNum-num3, itemStyle : labelTop},
	                {name: '中海博睿\n新品确认', value: num3, itemStyle: labelBottom}
	            ]
	        },
	        {
	            type: 'pie',
	            center: ['70%', '76%'],
	            radius: radius,
	            x: '40%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name: 'other', value: allNum-num5, itemStyle: labelTop},
	                {name: '模块商\n模块测试', value: num5, itemStyle: labelBottom}
	            ]
	        },
	        {
	            type: 'pie',
	            center: ['30%', '76%'],
	            radius: radius,
	            x: '80%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name: 'other', value: allNum-num4, itemStyle: labelTop},
	                {name: '工厂\n量产测试', value: num4, itemStyle: labelBottom}
	            ]
	        }
	    ]
	});
/*
	myChartFlatLT_full.setOption({
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
                labelLine: {
                    normal: {
                        length: -65 * bodyScale,
                        length2: -5 * bodyScale,
                        lineStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }
                },
	            type: 'pie',
	            center: ['30%', '33%'],
	            radius: radius,
	            x: '0%', // for funnel
	            data: [
	                {name: 'other', value: allNum-num2, itemStyle: labelTop_full},
	                {name: '\n研发-调试', value: num2, itemStyle: labelBottom_full}
	            ]
	        },
	        {
                labelLine: {
                    normal: {
                        length: -65 * bodyScale,
                        length2: -10 * bodyScale,
                        lineStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }
                },
	            type: 'pie',
	            center: ['70%', '33%'],
	            radius: radius,
	            x: '20%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name:'other', value:allNum-num3, itemStyle : labelTop_full},
	                {name: '\n\n中海博睿\n新品确认\n', value: num3, itemStyle: labelBottom_full}
	            ]
	        },
	        {
                labelLine: {
                    normal: {
                        length: -80* bodyScale,
                        length2:10 * bodyScale,
                        lineStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }
                },
	            type: 'pie',
	            center: ['70%', '78%'],
	            radius: radius,
	            x: '40%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name: 'other', value: allNum-num5, itemStyle: labelTop_full},
	                {name: '\n模块商\n模块测试', value: num5, itemStyle: labelBottom_full}
	            ]
	        },
	        {
                labelLine: {
                    normal: {
                        length: -85 * bodyScale,
                        length2: 15 * bodyScale,
                        lineStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }
                },
	            type: 'pie',
	            center: ['30%', '78%'],
	            radius: radius,
	            x: '80%', // for funnel
	            itemStyle: labelFromatter,
	            data: [
	                {name: 'other', value: allNum-num4, itemStyle: labelTop_full},
	                {name: '\n工厂\n量产测试', value: num4, itemStyle: labelBottom_full}
	            ]
	        }
	    ]
	});
*/
}

function worldLabTypeStatis(){
	$.post(contextPath+'/lab/labStatisByFiledAjax',{field:"lab_type_code","productCode":productCode},function(data){
		worldTyleEchart(data);
	})
}

//按照实验室实验室性质统计数量  ---全方位测试
function labPropertiesStatis(){
	$.post(contextPath+'/lab/labStatisByFiledAjax',{field:"properties_code","labType":labType,"productCode":productCode},function(data){
		$(".properties_code_div").html("覆盖专业能力："+data.length);
		myChartFlatRT.resize();
		// myChartFlatRT_full.resize();
		myChartFlatRT.clear();
		// myChartFlatRT_full.clear();
		//右上角的图表
	    myChartFlatRT.setOption(getLineEcharts());
	    // myChartFlatRT_full.setOption(getLineEcharts());
	    myChartFlatRT.setOption({
            color: ['#66ccff'],//屏蔽引入getLineEcharts()造成的两种颜色
	        tooltip: {
	            trigger: 'axis'
	        },
	        legend: {
	            show: false,
	            data: ['专业能力']
	        },
	        textStyle: {
	            color: "#6cf",
	            fontSize: bodyScale*10
	        },
	        grid: {
//	            show:true,
	        	 x: "24%",
	             x2: "12%",
	             y:"15%",
	             y2:"15%"
	        },
	        xAxis: [
	            {
                    // name: "\n\n\n\n\n实验室数量",
					name:"",
                    nameGap:  150 * bodyScale,
                    nameTextStyle: nameTextStyle_l,
                    axisLabel: axisLabel_l,

	                type: 'value',
                    axisTick: {  //刻度值
                        show: false,
                    },
	                axisLine: {
	                    lineStyle: {
	                        width: 0
	                    }
	                },
	                splitLine: {  //刻度线
	                    show: true,
	                    lineStyle: {
	                        color: "#234f65"
	                    }
	                },
	                offset: 5//调整个坐标轴标签的远近

	            }
	        ],
	        yAxis: [
	            {
	                // name: "专业能力",
	                name: "",
	                type: 'category',
	                data: statisticLengend(data),
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle_l,
                    axisLabel: {
                        margin: 3 * bodyScale,
                        textStyle: {
                            fontSize: 9 * bodyScale
                        },
						interval:0
					},
                    axisTick: {  //刻度值
                        show: false,
                    },
	                offset: 0,
	            }
	        ],
	        series: [
	            {
	                name: '专业能力',
	                type:'bar',
// 	                type: 'pictorialBar',
//	                barGap: '10%',
// 	                symbolRepeat: true,
// 	                symbolSize: ['40%', '80%'],
	                data: statisticSeriesDataData(data)
	            }
	        ]
	    });
/*
	    myChartFlatRT_full.setOption({
            color: ['#66ccff'],//屏蔽引入getLineEcharts()造成的两种颜色
	        tooltip: {
	            trigger: 'axis'
	        },
	        legend: {
	            show: false,
	            data: ['专业能力']
	        },
	        textStyle: {
	            color: "#6cf",
	            fontSize: bodyScale*21
	        },
	        grid: {
//	            show:true,
	        	 x: "23%",
	             x2: "18%",
	             y:"14%",
	             y2:"12%"
	        },
	        xAxis: [
	            {
	                name: "",
                    nameGap:  -25 * bodyScale,
                    nameTextStyle: nameTextStyle_full,
                    axisLabel: axisLabel_full,
	                type: 'value',
                    axisTick: {  //刻度值
                        show: false
                    },
	                axisLine: {
	                    lineStyle: {
	                        width: 0
	                    }
	                },
	                splitLine: {  //刻度线
	                    show: true,
	                    lineStyle: {
	                        color: "#234f65"
	                    }
	                },
	                offset: 5//调整个坐标轴标签的远近

	            }
	        ],
	        yAxis: [
	            {
	                // name: "专业能力",
	                name: "",
	                type: 'category',
	                data: statisticLengend(data),
                    nameGap: nameGap,
                    nameTextStyle: nameTextStyle,
                    axisLabel: {
                        margin: 5 * bodyScale,
                        textStyle: {
                            fontSize: 12 * bodyScale
                        },
						interval:0
					},
                    axisTick: {  //刻度值
                        show: false
                    },
	                offset: 0
	            }
	        ],
	        series: [
	            {
	                name: '专业能力',
	                type:'bar',
	                // type: 'pictorialBar',
//	                barGap: '10%',
// 	                symbolRepeat: true,
// 	                symbolSize: ['40%', '80%'],
	                data: statisticSeriesDataData(data)
	            }
	        ]
	    });
*/
	})
}

//平面地图左下角，产品生命周期全流程测试，P1~P5
function labLifeCycleStatis(){
	$.post(contextPath+'/lab/labCarryNumStatisAjax',{"labType":labType,"productCode":productCode},function(data){
		myChartFlatLB.resize();
		// myChartFlatLB_full.resize();
		myChartFlatLB.clear();
		// myChartFlatLB_full.clear();
		myChartFlatLB.setOption(getAreaEcharts());
		// myChartFlatLB_full.setOption(getAreaEcharts());
		var colors = ['#00e673', '#66ccff'];
	    myChartFlatLB.setOption({
	        tooltip: {
	            trigger: 'axis',
	            axisPointer: {
	                type: 'cross'
	            },
	            formatter: function(a){  
	            	var r=a[0].name+"</br>"  
                    +a[0].seriesName+':'+a[0].value  +"</br>" ;
	            	if(a.length>0){
	            		r+=a[1].seriesName+':'+parseFloat(a[1].value)*100  +"</br>"  ;
	            	}
                    return r;  
                }
	        },
	        grid: {
	            left:"10%",
	            right: '10%',
	            top:"25%,",
				bottom:"2%"
	        },
	        legend: {
	        	   data:['实验室数量','检测订单量(百万)'],
				   itemGap:bodyScale*40,
	               textStyle:{
	                   fontSize: bodyScale*8
	               },
	               itemWidth: bodyScale*5,
	               itemHeight: bodyScale*5
	        },
	        xAxis: [
	            {
	                name: "",
					// nameGap:1*bodyScale,
	                type: 'category',
	                axisTick: {
	                    alignWithLabel: true
	                },
	                axisLabel: {
                        margin:3*bodyScale,
	                    textStyle: {
	                        fontSize: bodyScale*10
	                    }
	                },
	                splitLine: {  //刻度线
	                    show: false,
	                },
	                // data: statisticLengend(data)
                    data:["a","b","c","d","e","f","g"]

	            }
	        ],
	        yAxis: [
	            {
	            	type: 'value',
	            	name: '',
                    nameTextStyle:{
	            		fontSize:bodyScale*5
                    },
                    nameGap:10,
					min: 0,
	                max: 500,
	                axisLine: {
	                    lineStyle: {
	                        color: colors[0]
	                    }
	                },
	                axisLabel: {
	                    textStyle: {
	                        fontSize: bodyScale*10
	                    }
	                    // formatter: '{value} ml'
	                },
	                splitLine: {  //刻度线
	                    show: true,
	                    lineStyle: {
	                        color: "#234f65"
	                    }
	                }
	            },{
	            	 type: 'value',
	                 name: '',
                    nameTextStyle:{
                        fontSize:bodyScale*5
                    },
                    nameGap:10,
	                 min: 0,
	                 max: 500,
	                 position: 'right',
	                 axisLine: {
	                     lineStyle: {
	                         color: colors[1],
							 width:0
	                     }
	                 },
	                 axisLabel: {
	                     textStyle: {
	                         fontSize: bodyScale*10
	                     }
	                     // formatter: '{value} ml'
	                 },
	                 splitLine: {  //刻度线
	                     show: true,
	                     lineStyle: {
	                         color: "#234f65"
	                     }
	                 },
                    axisTick: {  //刻度值
                        show: false,
                    }

                }
	        ],
	        series: [
                {
                    name:'实验室数量',
                    symbol:"circle",
                    type:'line',
                    yAxisIndex: 1,
                    hoverAnimation:false,
                    data: statisticSeriesDataData(data),
                    lineStyle:{
                        normal:{
                            width:2*bodyScale
                        }
                    },
                    symbolSize:3*bodyScale,

                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(96,192,255,0)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(96,192,255,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                    },
                },
	            {
	                name:'检测订单量(百万)',
                    symbol:"circle",
	                type:'line',
	                yAxisIndex: 1,
                    hoverAnimation:false,
	                data:[47.39, 202.33, 56.83,3.81, 168.01, 28.39, 7.59],
                    lineStyle:{
                        normal:{
                            width:2*bodyScale
                        }
                    },
                    symbolSize:3*bodyScale,
	                areaStyle: {
	                    normal: {
	                        color: {
	                            type: 'linear',
	                            x: 0,
	                            y: 0,
	                            x2: 0,
	                            y2: 1,
	                            colorStops: [{
	                                offset: 0, color: 'rgba(96,192,255,0)' // 0% 处的颜色
	                            }, {
	                                offset: 1, color: 'rgba(96,192,255,0)' // 100% 处的颜色
	                            }],
	                            globalCoord: false // 缺省为 false
	                        }
	                    },
	                },
	            }
	        ]
	    });
/*
	    myChartFlatLB_full.setOption({
	        tooltip: {
	            trigger: 'axis',
	            axisPointer: {
	                type: 'cross'
	            },
	            formatter: function(a){
	            	var r=a[0].name+"</br>"
                    +a[0].seriesName+':'+a[0].value  +"</br>" ;
	            	if(a.length>0){
	            		r+=a[1].seriesName+':'+parseFloat(a[1].value)*100  +"</br>"  ;
	            	}
                    return r;
                },
	        },
	        grid: {
	            left:"5%",
	            right: '10%',
	            // top:"35%,",
				bottom:"2%",
				y:"25%"
	        },
	        legend: {
	        	   data:['实验室数量','检测订单量'],
	               textStyle:{
	                   fontSize: bodyScale*12
	               },
	               itemWidth: bodyScale*11,
	               itemHeight: bodyScale*11,
                padding: [5, 5, 12*bodyScale],
                // top:-6*bodyScale
	        },
	        xAxis: [
	            {
	                name: "",
					// nameGap:1*bodyScale,
	                type: 'category',
	                axisTick: {
	                    alignWithLabel: true
	                },
	                axisLabel: {
                        margin:3*bodyScale,
	                    textStyle: {
	                        fontSize: bodyScale*13
	                    }
	                },
	                splitLine: {  //刻度线
	                    show: false
	                },
	                // data: statisticLengend(data)
                    data:["a","b","c","d","e","f","g"]

	            }
	        ],
	        yAxis: [
	            {
	            	type: 'value',
	            	name: '实验室数量     ',
                    nameTextStyle:{
	            		fontSize:bodyScale*10
                    },
                    nameGap:15,
					min: 0,
	                max: 500,
	                axisLine: {
	                    lineStyle: {
	                        color: colors[0]
	                    }
	                },
	                axisLabel: {
	                    textStyle: {
	                        fontSize: bodyScale*10
	                    }
	                    // formatter: '{value} ml'
	                },
	                splitLine: {  //刻度线
	                    show: true,
	                    lineStyle: {
	                        color: "#234f65"
	                    }
	                }
	            },{
	            	 type: 'value',
	                 name: '检测订单量(百万)',
                    nameTextStyle:{
                        fontSize:bodyScale*10
                    },
                    nameGap:15,
	                 min: 0,
	                 max: 500,
	                 position: 'right',
	                 axisLine: {
	                     lineStyle: {
	                         color: colors[1],
							 width:0
	                     }
	                 },
	                 axisLabel: {
	                     textStyle: {
	                         fontSize: bodyScale*10
	                     }
	                     // formatter: '{value} ml'
	                 },
	                 splitLine: {  //刻度线
	                     show: true,
	                     lineStyle: {
	                         color: "#234f65"
	                     }
	                 },
                    axisTick: {  //刻度值
                        show: false,
                    }

                }
	        ],
	        series: [
                {
                    name:'实验室数量',
					symbol:"circle",
                    type:'line',
                    yAxisIndex: 1,
                    hoverAnimation:false,
                    data: statisticSeriesDataData(data),
                    lineStyle:{
                        normal:{
                            width:2*bodyScale
                        }
                    },
                    symbolSize:4*bodyScale,

                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(96,192,255,0)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(96,192,255,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                    },
                },
	            {
	                name:'检测订单量',
                    symbol:"circle",
	                type:'line',
	                yAxisIndex: 1,
                    hoverAnimation:false,
	                data:[47.39, 202.33, 56.83,3.81, 168.01, 28.39, 7.59],
                    lineStyle:{
                        normal:{
                            width:2*bodyScale
                        }
                    },
                    symbolSize:4*bodyScale,
	                areaStyle: {
	                    normal: {
	                        color: {
	                            type: 'linear',
	                            x: 0,
	                            y: 0,
	                            x2: 0,
	                            y2: 1,
	                            colorStops: [{
	                                offset: 0, color: 'rgba(96,192,255,0)' // 0% 处的颜色
	                            }, {
	                                offset: 1, color: 'rgba(96,192,255,0)' // 100% 处的颜色
	                            }],
	                            globalCoord: false // 缺省为 false
	                        }
	                    },
	                },
	            }
	        ]
	    });
*/
	})
}

//实验室联通数据统计
function labLinkStatis(){
	$.post(contextPath+'/lab/labLinkAjax',{},function(data){
		$("#link_lab_all_count").html(data.all_num);
		$("#linked_status_num").html(data.link_num);
		$("#link_status_rate").html(data.link_rate);
	})
}
function statisticLengend(data){
	var legnend=[];
	$.each(data,function(index,item){
		var name=item.name;
		name=name.replace("/","\n");
		legnend.push(name);
	});
	return legnend;
}
function statisticSeriesDataData(data){
	var series=[];
	$.each(data,function(index,item){
		var obj=new Object();
		obj.value=item.count;
		obj.symbol=pathSymbols.bar_chip;
		series.push(obj);
	});
	return series;
}



