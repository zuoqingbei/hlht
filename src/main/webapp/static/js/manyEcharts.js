/**
 * Created by Administrator on 2017/4/12.
 */

var axisLabel = {
    margin: 3 * bodyScale,
    show: true,
    textStyle: {
        color: '#66ccff',
        fontSize:11*bodyScale
    }
};
var nameGap = 10 * bodyScale;
var nameTextStyle = {
    color: '#66ccff',
    fontSize:8 * bodyScale
};

// 折线图
function getLineEcharts() {
    var option = {
        title: {
            left: 'center',
            text: '',
            textStyle: {
                fontSize: 9*bodyScale,
                color: '#66ccff'
            }
        },
        grid: {
            right: 0,
            bottom: '10%',
            left: '10%',
            top: '10%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: true,
            // // right:0,  //图例组件离右边的距离
            // orient :' horizontal',  //布局  纵向布局
            // // width:80,      //图行例组件的宽度,默认自适应
            // x : 'right',   //图例显示在右边
            // // itemWidth:10,  //图例标记的图形宽度
            // // itemHeight:10, //图例标记的图形高度
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        color: ['#00e673', '#66ccff'],
        textStyle: {    //图例文字的样式
            color: '#66ccff',
            fontSize: 10*bodyScale
        },

        xAxis: {
            data: [],
            boundaryGap: true,
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale
            },
            nameGap: nameGap,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: axisLabel,
            axisTick: {
                show: false,
                alignWithLabel: true,
                lineStyle: {
                    color: '#66ccff'
                }
            },

        },
        yAxis: {
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale,
            },
            nameGap: nameGap,
            axisLine: { //坐标轴
                show: false
            },
            axisLabel: axisLabel,
            splitLine: {  //刻度线
                show: true,
                lineStyle: {
                    color: '#234f65'
                }
            },
            axisTick: {  //刻度值
                show: false,
            }

        },
        series: []
    };
    return option;

}
// 柱状图 横向
function getBarEcharts() {
    option = {
        title: {
            left: 'center',
            text: '',
            textStyle: {
                fontSize: 9*bodyScale,
                color: '#66ccff',
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: true,
            data: ['数量'],
            // // right:0,  //图例组件离右边的距离
            // orient :' vertical',  //布局  纵向布局
            // // width:80,      //图行例组件的宽度,默认自适应
            // x : 'right',   //图例显示在右边
            // // itemWidth:10,  //图例标记的图形宽度
            // // itemHeight:10*bodyScale, //图例标记的图形高度
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        textStyle: {    //图例文字的样式
            color: '#66ccff',
            fontSize: 9*bodyScale
        },
        grid: {
//            show:true,
            x: "20%",
            x2: "15%",
            y: '20%',
            y2: "17%"
        },
        color: ['#66ccff'],
        yAxis: [
            {
                name: "",
                nameTextStyle: {
                    color: '#66ccff',
                    fontSize:7*bodyScale,
                },
                nameGap: nameGap,
                type: 'value',
                axisLabel: axisLabel,
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
                axisTick: {  //刻度值
                    show: false
                },
                offset: 5*bodyScale

            }
        ],
        xAxis: [
            {

                name: "",
                type: 'category',
                data: [],
                axisLabel: axisLabel,
                axisTick: {  //刻度值
                    show: false
                },
                axisLine: {
                    show: false
                },
                nameGap: nameGap,
                // offset: 5,
//                minInterval: .5
            }
        ],
        series: [
            {
                // name: '专业能力',
//                type:'bar',
                type: 'pictorialBar',
//                barGap: '10%',
                symbolRepeat: true,
                symbolSize: ['40%', '10%'],
                data: []
//                data: [0, 1, 2, 4, 4, 20, 22]
            }
        ]
    };

    return option;
}
// 饼图
function getPieEcharts() {
    option = {
        title: {
            text: '',
            left: 'center',
            // top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: []
    };

    return option;
}
//面积图  折线
function getAreaEcharts() {
    option = {
        title: {
            text: ''
        },
        textStyle: {
            fontSize: 9*bodyScale
        },
        color: ['#00e673', '#66ccff'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#234f65'
                }
            }
        },
        legend: {
            // // right:0,  //图例组件离右边的距离
            // orient :' horizontal',  //布局  纵向布局
            // // width:80,      //图行例组件的宽度,默认自适应
            // x : 'right',   //图例显示在右边
            // // itemWidth:10,  //图例标记的图形宽度
            // // itemHeight:10, //图例标记的图形高度
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            },
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '9%',
            bottom: '5%',
            top: '16%',
            containLabel: true
        },
        xAxis: [
            {
                name: '月份',
                nameTextStyle: {
                    color: '#66ccff',
                    fontSize:7*bodyScale,
                },
                nameGap: nameGap,
                type: 'category',
                boundaryGap: false,
                data: [],
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: axisLabel,
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
            }
        ],
        yAxis: [
            {
                name: "数量",
                nameTextStyle: {
                    color: '#66ccff',
                    fontSize:7*bodyScale,
                },
                nameGap: nameGap,
                type: 'value',
                axisLine: { //坐标轴
                    show: false
                },
                axisLabel: axisLabel,
                splitLine: {  //刻度线
                    show: true,
                    lineStyle: {
                        color: "#234f65"
                    }
                },
                axisTick: {  //刻度值
                    show: false
                },
                // max: 400,
                // offset: 5

            }

        ],
        series: []
    };
    return option;
}
//雷达图
function getRadarEcharts() {
    option = {
        title: {
            text: '',
            subtext: ''
        },
        textStyle: {    //图例文字的样式
            color: '#66ccff',
            fontSize: 10*bodyScale
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            data: [],
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        polar: [],
        series: [
            {
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: []
            }
        ]
    };

    return option;
}
//折线图和柱状图
function getLineAndBar() {
    option = {
        title: {
            left: 'center',
            text: '',
            textStyle: {
                fontSize: 9*bodyScale,
                color: '#66ccff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: [],
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: false,
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale
            },
            nameGap: nameGap,
            axisPointer: {
                type: 'shadow',
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: axisLabel,
            axisTick: {
                show: false,
                alignWithLabel: true,
                lineStyle: {
                    color: '#66ccff'
                }
            },
            splitLine: {  //刻度线
                show: false,
                lineStyle: {
                    color: "#234f65"
                }
            },

        },
        yAxis: {
            name:'数量',
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale
            },
            nameGap: nameGap,
            axisLine: { //坐标轴
                show: false
            },
            axisLabel: axisLabel,
            splitLine: {  //刻度线
                show: false,
                lineStyle: {
                    color: "#234f65"
                }
            },
            axisTick: {  //刻度值
                show: false,
            }

        },
        series: []
    };
    return option;
}
//仪表盘
function getGaugeEcharts() {
    option = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: []
    };
    return option;
}
//多个仪表盘
function getManyGauge() {
    option = {
        tooltip: {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: []
    };
    //clearInterval(timeTicket);
    //timeTicket = setInterval(function (){
    //    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
    //    option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
    //    option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
    //    option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
    //    myChart.setOption(option,true);
    //},2000)
    return option;
}
//圆环图
function getYuanhuan() {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: []
    };
    return option;
}
//同心圆
function getCenterPie() {
    option = {
        legend: {
            show: true,
            // // right:0,  //图例组件离右边的距离
            // orient :' horizontal',  //布局  纵向布局
            // // width:80,      //图行例组件的宽度,默认自适应
            x : 'right',   //图例显示在右边
            itemWidth:6*bodyScale,  //图例标记的图形宽度
            itemHeight:6*bodyScale, //图例标记的图形高度
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        title: {
            text: '',
            subtext: '',
            sublink: '',
            x: 'center',
            y: 'center',
            itemGap: 20*bodyScale,
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 12*bodyScale
            }
        },
        tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: false},
                dataView: {show: false, readOnly: false},
                restore: {show: false},
                saveAsImage: {show: false}
            }
        },
        series: []
    };
    return option;
}
//环形图
function getHuanXing() {
    option = {
        legend: {
            x: 'center',
            y: 'center',
            data: [],
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }

        },
        title: {
            text: '',
            subtext: '',
            x: 'center'
        },
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
        series: []
    };
    return option;

}
//多个环形图
function getManyHuan() {
    var labelTop = {
        normal: {
            label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                    baseline: 'bottom'
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
                    return 100 - params.value + '%'
                },
                textStyle: {
                    baseline: 'top'
                }
            }
        },
    }
    var labelBottom = {
        normal: {
            color: '#ccc',
            label: {
                show: true,
                position: 'center'
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var radius = [40, 55];
    option = {
        legend: {
            x: 'center',
            y: 'center',
            data: [
                'GoogleMaps', 'Facebook', 'Youtube', 'Google+', 'Weixin',
                'Twitter', 'Skype', 'Messenger', 'Whatsapp', 'Instagram'
            ],
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        title: {
            text: 'The App World',
            subtext: 'from global web index',
            x: 'center'
        },
        toolbox: {
            show: true,
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
        series: [
            {
                type: 'pie',
                center: ['10%', '30%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 46, itemStyle: labelBottom},
                    {name: 'GoogleMaps', value: 54, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['30%', '30%'],
                radius: radius,
                x: '20%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 56, itemStyle: labelBottom},
                    {name: 'Facebook', value: 44, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['50%', '30%'],
                radius: radius,
                x: '40%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 65, itemStyle: labelBottom},
                    {name: 'Youtube', value: 35, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['70%', '30%'],
                radius: radius,
                x: '60%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 70, itemStyle: labelBottom},
                    {name: 'Google+', value: 30, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['90%', '30%'],
                radius: radius,
                x: '80%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 73, itemStyle: labelBottom},
                    {name: 'Weixin', value: 27, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['10%', '70%'],
                radius: radius,
                y: '55%',   // for funnel
                x: '0%',    // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 78, itemStyle: labelBottom},
                    {name: 'Twitter', value: 22, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['30%', '70%'],
                radius: radius,
                y: '55%',   // for funnel
                x: '20%',    // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 78, itemStyle: labelBottom},
                    {name: 'Skype', value: 22, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['50%', '70%'],
                radius: radius,
                y: '55%',   // for funnel
                x: '40%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 78, itemStyle: labelBottom},
                    {name: 'Messenger', value: 22, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['70%', '70%'],
                radius: radius,
                y: '55%',   // for funnel
                x: '60%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 83, itemStyle: labelBottom},
                    {name: 'Whatsapp', value: 17, itemStyle: labelTop}
                ]
            },
            {
                type: 'pie',
                center: ['90%', '70%'],
                radius: radius,
                y: '55%',   // for funnel
                x: '80%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    {name: 'other', value: 89, itemStyle: labelBottom},
                    {name: 'Instagram', value: 11, itemStyle: labelTop}
                ]
            }
        ]
    };
    return option;
}

//玫瑰图
function getRoseEcharts() {
    option = {
        title: {
            show: false,
            text: '',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'right',
            y: 'top',
            data: [],
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: []
    };
    return option;
}

//散点图
function  getScatterEcharts() {

    option = {
        title: {
            text: '',
            link: ''
        },
        legend: {
            data: ['Punch Card'],
            left: 'right',
            textStyle: {    //图例文字的样式
                color: '#66ccff',
                fontSize: 9*bodyScale
            }
        },
        tooltip: {
            position: 'top',
            formatter: function (params) {
                return params.value[2] + ' commits in ' + hours[params.value[0]] + ' of ' + days[params.value[1]];
            }
        },
        grid: {
            top:0,
            left: 1,
            bottom: 25,
            right: 15,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [],
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale
            },
            nameGap: nameGap,
            boundaryGap: false,
            // splitLine: {
            //     show: true,
            //     lineStyle: {
            //         color: '#999',
            //         type: 'dashed'
            //     }
            // },
            axisLine: {
                show: false
            },
            axisLabel: axisLabel,
        },
        yAxis: {
            type: 'category',
            data: [],
            nameTextStyle: {
                color: '#66ccff',
                fontSize:7*bodyScale
            },
            nameGap: nameGap,
            axisLine: { //坐标轴
                show: false
            },
            axisLabel: axisLabel,
        },
        series: [{

            type: 'scatter',
            symbolSize: function (val) {
                return val[2] * 1;
            },
            data: [],
            animationDelay: function (idx) {
                return idx * 3;
            }
        }]
    };
    return option
}