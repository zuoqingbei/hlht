// 多个方向盘 设施状态
// $("#myChart").cl
/*var myChart1 = echarts.init(document.getElementById("myChart1"));
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
 radius: '80%',
 textStyle: {
 fontSize: 7 * bodyScale
 },
 axisLine: {            // 坐标轴线
 show: false,
 lineStyle: {       // 属性lineStyle控制线条样式
 width: 7,
 color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]
 },

 },
 axisLabel: {
 show: true,
 textStyle: {
 fontSize: 8 * bodyScale
 }
 },
 axisTick: {            // 坐标轴小标记
 length: 5,        // 属性length控制线长
 lineStyle: {       // 属性lineStyle控制线条样式
 color: '#66ccff'
 }
 },
 splitLine: {           // 分隔线
 length: 11,         // 属性length控制线长
 lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
 color: '#66ccff'
 }
 },
 itemStyle: {
 normal: {
 color: "#ff9933",
 // borderColor:"red",
 // borderWidth:2,
 //                        opacity:0.5
 }
 },
 pointer: {
 length: "55%",
 width: 3
 },
 title: {
 offsetCenter: [0, '110%'],       // x, y，单位px
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontSize: 12 * bodyScale,
 color: '#66ccff',
 //                        fontStyle: 'italic'
 },

 },
 detail: {
 offsetCenter: [0, '70%'],
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontWeight: 'bolder',
 fontSize: '170%',
 color: "#ff9933"
 },
 formatter: '{value}%'
 },
 data: [{value: 98, name: '设备完好率'}]
 },
 {
 name: '实验在线率',
 type: 'gauge',
 center: ['25%', '58%'],    // 默认全局居中
 radius: '70%',
 min: 0,
 max: 100,
 endAngle: 45,
 splitNumber: 5,
 axisLine: {            // 坐标轴线
 lineStyle: {       // 属性lineStyle控制线条样式
 width: 7,
 color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]

 },
 },
 axisLabel: {
 show: true,
 textStyle: {
 fontSize: 8 * bodyScale
 }
 },
 axisTick: {            // 坐标轴小标记
 length: 7,        // 属性length控制线长
 lineStyle: {       // 属性lineStyle控制线条样式
 color: 'auto'
 }
 },
 splitLine: {           // 分隔线
 length: 11,         // 属性length控制线长
 lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
 color: 'auto'
 }
 },
 itemStyle: {
 normal: {
 color: "#ff9933",
 //                        borderColor:"red",
 //                        borderWidth:2,
 //                        opacity:0.5
 }
 },
 pointer: {
 length: "55%",
 width: 3
 },
 title: {
 offsetCenter: [0, '100%'],       // x, y，单位px
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontSize: 12 * bodyScale,
 color: '#66ccff',
 //                        fontStyle: 'italic'
 },
 },
 detail: {
 offsetCenter: ['15%', '50%'],//数字显示的位置
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontWeight: 'bolder',
 fontSize: '170%',
 color: "#ff9933"
 },
 formatter: '{value}%' //数字显示的样式
 },
 data: [{value: 96, name: '实验在线率'}]
 },
 {
 name: '设备利用率',
 type: 'gauge',
 center: ['75%', '59%'],    // 默认全局居中
 radius: '70%',
 min: 0,
 max: 100,
 startAngle: 135,
 endAngle: -45,
 splitNumber: 5,
 axisLine: {            // 坐标轴线
 lineStyle: {       // 属性lineStyle控制线条样式
 width: 7,
 color: [[0.2, '#66ccff'], [0.8, '#66ccff'], [1, '#66ccff']]

 }
 },
 axisLabel: {
 show: true,
 textStyle: {
 fontSize: 8
 }
 },
 axisTick: {            // 坐标轴小标记
 length: 7,        // 属性length控制线长
 lineStyle: {       // 属性lineStyle控制线条样式
 color: 'auto'
 }
 },
 splitLine: {           // 分隔线
 length: 11,         // 属性length控制线长
 lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
 color: 'auto'
 }
 },
 itemStyle: {
 normal: {
 color: "#ff9933",
 //                        borderColor:"red",
 //                        borderWidth:2,
 //                        opacity:0.5
 }
 },
 pointer: {
 length: "55%",
 width: 3
 },
 title: {
 offsetCenter: [0, '100%'],       // x, y，单位px
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontSize: 12,
 color: '#66ccff',
 //                        fontStyle: 'italic'
 },
 },
 detail: {
 offsetCenter: ['-15%', '50%'],
 textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
 fontWeight: 'bolder',
 fontSize: '170%',
 color: "#ff9933"
 },
 formatter: '{value}%'
 },
 data: [{value: 95, name: '设备利用率'}]
 }
 ]
 };
 myChart1.setOption(option);*/

//多个圆环图  标准状态
/*
var myChart2 = echarts.init(document.getElementById("myChart2"));
*/
var labelTop = {
    normal: {
        color: '#66ccff',
        label: {
            show: true,
            position: 'center',
            formatter: '{b}',
            textStyle: {
                baseline: 'bottom',
                color: '#66ccff',
                fontSize: 12 * bodyScale,
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
};
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
    emphasis: {
        color: 'rgba(0,0,0,0)'
    },
};
var radius = ['30%', '45%'];

/*option = {
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
 //            color:'#66ccff'
 color: '#ff9933',
 fontSize: 20 * bodyScale,
 },
 series: [
 //            {
 //                type : 'pie',
 //                center : ['10%', '30%'],
 //                radius : radius,
 //                x: '0%', // for funnel
 //                itemStyle : labelFromatter,
 //                data : [
 //                    {name:'other', value:46, itemStyle : labelBottom},
 //                    {name:'GoogleMaps', value:54,itemStyle : labelTop}
 //                ]
 //            },
 //            {
 //                type : 'pie',
 //                center : ['30%', '30%'],
 //                radius : radius,
 //                x:'20%', // for funnel
 //                itemStyle : labelFromatter,
 //                data : [
 //                    {name:'other', value:56, itemStyle : labelBottom},
 //                    {name:'Facebook', value:44,itemStyle : labelTop}
 //                ]
 //            },
 {
 type: 'pie',
 center: ['30%', '22%'],
 radius: radius,
 x: '40%', // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 65, itemStyle: labelBottom},
 {name: '牵头起草数', value: 35, itemStyle: labelTop}
 ]
 },
 {
 type: 'pie',
 center: ['90%', '22%'],
 radius: radius,
 x: '60%', // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 70, itemStyle: labelBottom},
 {name: '参与起草数', value: 30, itemStyle: labelTop}
 ]
 },
 //            {
 //                type : 'pie',
 //                center : ['90%', '30%'],
 //                radius : radius,
 //                x:'80%', // for funnel
 //                itemStyle : labelFromatter,
 //                data : [
 //                    {name:'other', value:73, itemStyle : labelBottom},
 //                    {name:'Weixin', value:27,itemStyle : labelTop}
 //                ]
 //            },
 {
 type: 'pie',
 center: ['10%', '75%'],
 radius: radius,
 y: '55%',   // for funnel
 x: '0%',    // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 78, itemStyle: labelBottom},
 {name: '国家标准', value: 22, itemStyle: labelTop}
 ]
 },
 {
 type: 'pie',
 center: ['30%', '75%'],
 radius: radius,
 y: '55%',   // for funnel
 x: '20%',    // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 78, itemStyle: labelBottom},
 {name: '国际标准', value: 22, itemStyle: labelTop}
 ]
 },
 {
 type: 'pie',
 center: ['50%', '75%'],
 radius: radius,
 y: '55%',   // for funnel
 x: '40%', // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 78, itemStyle: labelBottom},
 {name: '行业标准', value: 22, itemStyle: labelTop}
 ]
 },
 {
 type: 'pie',
 center: ['70%', '75%'],
 radius: radius,
 y: '55%',   // for funnel
 x: '60%', // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 83, itemStyle: labelBottom},
 {name: '当地标准', value: 17, itemStyle: labelTop}
 ]
 },
 {
 type: 'pie',
 center: ['90%', '75%'],
 radius: radius,
 y: '55%',   // for funnel
 x: '80%', // for funnel
 itemStyle: labelFromatter,
 data: [
 {name: 'other', value: 89, itemStyle: labelBottom},
 {name: '企业标准', value: 11, itemStyle: labelTop}
 ]
 }
 ]
 };
 myChart2.setOption(option);*/

//能力状态 柱形图
/*var myChart3 = echarts.init(document.getElementById("myChart3"));
 myChart3.setOption(getBarEcharts());*/
var bar_chip = '../img/bar_chip.png';
/*myChart3.setOption({
 yAxis: [
 {
 name: "数量",
 type: 'value',
 },
 ],
 xAxis: [
 {
 name: "试验类别",
 type: 'category',
 data: ["完全具备数", "部分具备", "不具备"]
 }
 ],
 series: [
 {
 symbolSize: ['60%', '10%'],
 data: [{
 value: 134,
 symbol: bar_chip
 }, {
 value: 32,
 symbol: bar_chip
 }, {
 value: 2,
 symbol: bar_chip
 }
 ]
 }
 ]
 });*/


//一次合格率 同心圆
/*var myChart4 = echarts.init(document.getElementById("myChart4"));
 myChart4.setOption(getCenterPie());*/
var dataStyle = {
    normal: {
        label: {show: false},
        labelLine: {show: false}
    }
};
var placeHolderStyle = {
    normal: {
        color: 'rgba(0,0,0,0)',
        label: {show: false},
        labelLine: {show: false}
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
/*myChart4.setOption({
 legend:{
 data:['整机','模块']
 },
 textStyle:{
 fontSize:12*bodyScale
 },
 color: ['#4397f7', '#66ccff'],
 series: [
 {
 name: '整机',
 type: 'pie',
 clockWise: false,
 radius: ['50%', '60%'],
 itemStyle: dataStyle,
 data: [
 {
 value: 2,
 name: '整机:2%',
 itemStyle: placeHolderStyle
 },
 {
 value: 98,
 name: '整机:98%',
 // itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '模块',
 type: 'pie',
 clockWise: false,
 radius: ['40%', '50%'],
 itemStyle: dataStyle,
 data: [
 {
 value: 5,
 name: '模块:5%',
 itemStyle: placeHolderStyle
 },
 {
 value: 95,
 name: '模块:95%',
 // itemStyle: placeHolderStyle
 }
 ]
 }
 ]

 });*/

//问题闭环率
/*var myChart5 = echarts.init(document.getElementById("myChart5"));
 myChart5.setOption(getCenterPie());
 myChart5.setOption({
 legend: {
 show:false,
 data: ['整机', '模块']
 },
 textStyle: {
 fontSize: 12 * bodyScale
 },
 color: ['#4397f7', '#66ccff'],
 series: [
 {
 name: '整机',
 type: 'pie',
 clockWise: false,
 radius: ['50%', '60%'],
 center:['40%', '45%'],
 itemStyle: {
 normal: {
 label: {show: true},
 labelLine: {show:true,length:12*bodyScale,length2:47*bodyScale,smooth:false}
 },
 },
 data: [
 {
 value: 2,
 name: '整机',
 itemStyle: placeHolderStyle
 },
 {
 value: 98,
 name: '整机',
 // itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '模块',
 type: 'pie',
 clockWise: false,
 radius: ['40%', '50%'],
 center:['40%', '45%'],
 itemStyle: {
 normal: {
 label: {show: true},
 labelLine: {show: true, length: 6, length2: 20, smooth: false}
 },
 },
 data: [
 {
 value: 5,
 name: '模块',
 itemStyle: placeHolderStyle
 },
 {
 value: 95,
 name: '模块',
 // itemStyle: placeHolderStyle
 }
 ]
 }
 ]

 });*/

//订单及时率
/*var myChart6 = echarts.init(document.getElementById("myChart6"));
 myChart6.setOption(getLineEcharts());
 myChart6.setOption({
 legend: {
 show: true,
 data: ['整机', '模块'],
 itemWidth: 5,  //图例标记的图形宽度
 itemHeight: 3, //图例标记的图形高度
 },
 grid: {
 right: 43,
 bottom: 20,
 left: 38,
 top:30
 },

 yAxis:{
 name:'及时率/%',
 nameTextStyle: {
 color: '#66ccff'
 },
 max:100
 },
 xAxis: [
 {
 name:"时间",
 nameTextStyle: {
 color: '#66ccff'
 },
 data: ['2016/8','2016/9','2016/9','2016/9','2016/9','2016/9', '2016/9', '2017/3', '2017/3','2017/5']
 }
 ],
 series: [
 {
 name: '整机',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 //            areaStyle: {normal: {}},
 data: [30, 32, 25, 34, 45, 30, 40, 23,34,46]
 },
 {
 name: '模块',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 //            areaStyle: {normal: {}},
 data: [40, 33,61, 34, 29, 30, 31, 34, 42, 44]
 }
 ]

 });*/


//用户满意度
/*var myChart7 = echarts.init(document.getElementById("myChart7"));
 myChart7.setOption(getLineEcharts());
 myChart7.setOption({
 legend: {
 show: false,
 data: ['整机', '模块'],
 itemWidth: 5,  //图例标记的图形宽度
 itemHeight: 3, //图例标记的图形高度
 },
 grid: {
 right: 43,
 bottom: 20,
 left: 38,
 top: 30
 },
 yAxis: {
 name: '满意度/%',
 max: 100
 },
 xAxis: [
 {
 name: "时间",
 data: ['2016/8', '2016/9', '2016/9', '2016/9', '2016/9', '2016/9', '2016/9', '2017/3', '2017/3', '2017/5']
 }
 ],
 series: [
 {
 name: '满意度',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [80, 92, 85, 94, 85, 80, 70, 83, 94, 96]
 },

 {
 name: '模块',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [40, 33, 61, 34, 29, 30, 31, 34, 42, 44]
 }

 ]

 });*/
//模块质量过程检测
/*
 var myChart8 = echarts.init(document.getElementById("myChart8"));
 myChart8.setOption(getBarEcharts());
 var bar_chip = '../img/bar_chip.png';
 myChart8.setOption({
 color:["#66ccff","#ff9933"],
 title: {
 show:false,
 text: '模块商质量水平分布',
 left: 'center'
 },
 grid: {
 //            show:true,
 x: "25%",
 x2: "21%",
 y: '25%',
 y2: "25%"
 },
 yAxis: [
 {
 name: "Cpk",
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
 position: 'right',
 // type: 'category',
 data: [2700],
 axisLabel:{
 textStyle: {
 fontSize: 9 * bodyScale
 }
 },
 axisLine: { //坐标轴
 show: true,
 textStyle: {
 // color: 'rgba(0,0,0,0)',
 color: '#66ccff',
 }
 },
 axisTick: {  //刻度值
 show: false,
 }
 }, {
 name: "",
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
 show:false
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
 color: 'rgba(0,0,0,0)',
 }
 },
 axisTick: {  //刻度值
 show: false,
 }
 }
 ],

 //    series: [
 //        {
 //            name:'Cpk',
 //            type:'bar',
 //            data:[2.0, 4.9, 7.0]
 //        },
 //        {
 //            name:'ppm',
 //            type:'bar',
 //            yAxisIndex: 1,
 //            data:[2.6, 5.9, 9.0]
 //        }
 //    ]
 series: [
 {
 symbolSize: ['40%', '60%'],
 data: [{
 value: 134,
 symbol: bar_chip
 }, {
 value: 32,
 symbol: bar_chip
 }, {
 value: 16,
 symbol: bar_chip
 }, {
 value: 8,
 symbol: bar_chip
 }, {
 value: 6,
 symbol: bar_chip
 }
 ]
 }
 ]
 });
 */


//Xbar控制图
/*
 var myChart9 = echarts.init(document.getElementById("myChart9"));
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
 right: "29%",
 bottom: "28%",
 left: "15%",
 top: "16%"
 },
 yAxis: {
 name: '样本均值',
 max: 74.5,
 min: 73,
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
 name: "时间",
 axisLabel:{
 textStyle:{
 fontSize:5*bodyScale
 },
 margin:2*bodyScale
 },
 nameGap:2*bodyScale,
 nameTextStyle:{fontSize:6*bodyScale},
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 visualMap: {
 show:false,
 top: 10,
 right: 10,
 pieces: [{
 gt: 73.5,
 lte: 74,
 color: function (params, lowLine) {
 var color;
 alert(22)
 console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",params);
 return "#0ff";
 }


 /!*        }, {
 gt: 50,
 lte: 100,
 color: '#ffde33'
 }, {
 gt: 1000,
 lte: 150,
 color: '#ff9933'
 }, {
 gt: 150,
 lte: 200,
 color: '#cc0033'*!/
 },
 //     {
 //     gt: 200,
 //     lte: 300,
 //     color: '#660099'
 // }, {
 //     gt: 300,
 //     color: '#7e0023'
 // }
 ],
 outOfRange: {
 color: '#cc0033'
 }
 },
 series: [
 {
 name: '样本均值',
 type: 'line',
 lineStyle: {
 normal: {
 color:"#00e673",
 width: 1
 }
 },
 itemStyle:{normal:{
 borderColor:"#00e673"
 }},
 symbolSize: 2,
 data: [73.50, 73.75, 74.00, 74.25,73.50, 73.75, 74.00, 74.25,73.50, 73.75, 74.00, 74.25],
 markLine: {
 symbolSize:0,
 silent: true,
 label:{normal:{formatter:"{b}={c}"}},
 data: [{
 name:"UCL",
 yAxis: 74.2688
 },{
 name:"x",
 yAxis: 74.0485
 }, {
 name:"LCL",
 yAxis: 73.4688
 }]
 }
 }
 ]

 });
 var myChart9_2 = echarts.init(document.getElementById("myChart9_2"));
 myChart9_2.setOption(getLineEcharts());
 myChart9_2.setOption({
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
 right: "29%",
 bottom: "28%",
 left: "15%",
 top: "16%"
 },
 yAxis: {
 name: '样本均值',
 max: 74.5,
 min: 73,
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
 name: "时间",
 axisLabel:{
 textStyle:{
 fontSize:5*bodyScale
 },
 margin:2*bodyScale
 },
 nameGap:2*bodyScale,
 nameTextStyle:{fontSize:6*bodyScale},
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 visualMap: {
 show:false,
 top: 10,
 right: 10,
 pieces: [{
 gt: 0,
 lte: 50,
 color: '#096'
 }, {
 gt: 50,
 lte: 100,
 color: '#ffde33'
 }, {
 gt: 1000,
 lte: 150,
 color: '#ff9933'
 }, {
 gt: 150,
 lte: 200,
 color: '#cc0033'
 },
 //     {
 //     gt: 200,
 //     lte: 300,
 //     color: '#660099'
 // }, {
 //     gt: 300,
 //     color: '#7e0023'
 // }
 ],
 outOfRange: {
 color: '#cc0033'
 }
 },
 series: [
 {
 name: '样本均值',
 type: 'line',
 lineStyle: {
 normal: {
 color:"#00e673",
 width: 1
 }
 },
 itemStyle:{normal:{
 borderColor:"#00e673"
 }},
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [73.50, 73.75, 74.00, 74.25,73.50, 73.75, 74.00, 74.25,73.50, 73.75, 74.00, 74.25],
 markLine: {
 symbolSize:0,
 silent: true,
 label:{normal:{formatter:"{b}={c}"}},
 data: [{
 name:"UCL",
 yAxis: 74.2688
 },{
 name:"x",
 yAxis: 74.0485
 }, {
 name:"LCL",
 yAxis: 73.4688
 }]
 }
 }
 ]

 });
 */


//能力直方图
/*var myChart10 = echarts.init(document.getElementById("myChart10"));
 myChart10.setOption(getLineAndBar());
 myChart10.setOption({
 title: {
 text: '能力直方图',
 left: 'center'
 },
 color: ['#ff9933', '#66ccff'],

 grid: {
 right: 43,
 bottom: 30,
 left: 38,
 top: 30
 },
 legend: {
 show: false,
 data: ['数量', '均值']
 },
 // yAxis:{
 //     axisLabel: {
 //         show:false,
 //     },
 // },
 xAxis: [
 {
 name: "时间",
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
 }
 ],
 series: [
 {
 name: '均值',
 type: 'line',
 smooth: true,
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [68, 78, 95, 121, 148, 180, 140, 118, 109, 76, 64, 55]
 },
 {
 name: '数量',
 type: 'bar',
 //            areaStyle: {normal: {}},
 data: [68, 78, 95, 121, 135, 150, 145, 118, 109, 76, 64, 55]
 }
 ]

 });*/
var data = [[74, 74], [75, 75], [74.7, 74.7], [75.5, 75.5], [75, 75], [74, 74], [75, 75], [74.7, 74.7], [75.5, 75.5], [75, 75], [74, 74], [75, 75], [74.7, 74.7], [75.5, 75.5], [75, 75], [74, 74], [75, 75], [74.7, 74.7], [75.5, 75.5], [75, 75], [72, 72], [73, 73]];
/**
 * Get histogram data out of xy data
 * @param   {Array} data  Array of tuples [x, y]
 * @param   {Number} step Resolution for the histogram
 * @returns {Array}       Histogram data
 */
function histogram(data, step) {
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

/*
$('#myChart10').highcharts({
    chart: {
        type: 'column'
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    title: {
        text: '直方图'
    },
    legend: {
        enabled: false,
    },
    xAxis: {
        gridLineWidth: 1,
        min: 68,
        max: 80,
        plotLines: [{
            color: 'red',            //线的颜色，定义为红色
            dashStyle: 'shortDot',//认是solid（实线），这里定义为长虚线
            value: 71,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            width: 2,               //标示线的宽度，2px
            label: {
                text: 'LSL',  //标签的内容
                align: 'center',                //标签的水平位置，水平居左,默认是水平居中center
                x: 5                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
            },
            zIndex: 100,  //值越大，显示越向前，默认标示线显示在数据线之后
        }, {
            color: 'red',            //线的颜色，定义为红色
            dashStyle: 'shortDot',//标示线的样式，默认是solid（实线），这里定义为长虚线
            value: 77,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            width: 2,               //标示线的宽度，2px
            label: {
                text: 'USL',//标签的内容
                align: 'center',                //标签的水平位置，水平居左,默认是水平居中center
                x: 5                         //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
            },
            zIndex: 100,  //值越大，显示越向前，默认标示线显示在数据线之后
        }
        ]
    },
    yAxis: [{
        title: {
            text: ''
        },
        visible: false
    }, {
        opposite: true,
        title: {
            text: 'Y value'
        },
        visible: false,
    }],
    series: [{
        name: '直方图',
        type: 'column',
        data: histogram(data, 0.5),
        pointPadding: 0,
        groupPadding: 0,
        pointPlacement: 'between'
    }, {
        name: 'XY 数据',
        type: 'line',
        data: data,
        yAxis: 1,
        marker: {
            radius: 1.5
        }
    }]
});
*/

//共产一致与不一致占比
/*var myChart11 = echarts.init(document.getElementById("myChart11"));
 myChart11.setOption(getRoseEcharts());
 myChart11.setOption({
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
 center: ['50%', '55%'],
 roseType: 'radius',
 label: {
 normal: {
 show: true,
 position: "inside",
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
 {value: 10, name: '共产一致型号数'},
 {value: 15, name: '共产不一致型号数'}
 ]
 },
 ]
 });*/

//共产一致
var labelSetting = {
    normal: {
        show: false,
        position: 'outside',
        offset: [10, 0],
        textStyle: {
            fontSize: 8 * bodyScale
        }
    }
};
/*var myChart12 = echarts.init(document.getElementById("myChart12"));
 myChart12.setOption(getBarEcharts());
 myChart12.setOption({
 color: ['#66ccff', '#a5fff1'],
 legend: {
 show: true,
 data: ['2015年', '2016年']
 },
 grid: {
 //            show:true,
 x: "12%",
 x2: "15%",
 y: '20%',
 y2: "22%"
 },
 yAxis: [
 {
 name: "数量",
 type: 'value'
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
 name: '2015',
 type: 'pictorialBar',
 label: labelSetting,
 symbolRepeat: true,
 symbolSize: ['80%', '60%'],
 barCategoryGap: '40%',
 data: [{
 value: 157,
 symbol: bar_chip
 }, {
 value: 21,
 symbol: bar_chip
 }, {
 value: 66,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 157,
 symbol: bar_chip
 }, {
 value: 21,
 symbol: bar_chip
 }, {
 value: 66,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }
 ]
 }, {
 name: '2016',
 type: 'pictorialBar',
 barGap: '10%',
 label: labelSetting,
 symbolRepeat: true,
 symbolSize: ['80%', '60%'],
 data: [{
 value: 184,
 symbol: bar_chip
 }, {
 value: 29,
 symbol: bar_chip
 }, {
 value: 73,
 symbol: bar_chip
 }, {
 value: 91,
 symbol: bar_chip
 }, {
 value: 95,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }
 ]
 }]
 });
 */

//模块质量过程检测
/*var myChart14 = echarts.init(document.getElementById("myChart14"));
 myChart14.setOption(getBarEcharts());
 myChart14.setOption({
 title: {
 text: '模块质量过程检测',
 left: 'center'
 },
 grid: {
 //            show:true,
 x: "13%",
 x2: "21%",
 y: '25%',
 y2: "25%"
 },
 yAxis: [
 {
 name: "Cpk",
 type: 'category',
 data: [0, 0.5, 1, 1.5, 2],
 axisLine: { //坐标轴
 show: false,
 textStyle: {
 color: '#66ccff',
 }
 },
 axisTick: {  //刻度值
 show: false,
 }
 }, {
 name: "ppm",
 position: 'right',
 type: 'category',
 data: [1230, 2460, 3690, 4920, 6150],
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
 value: 134,
 symbol: bar_chip
 }, {
 value: 32,
 symbol: bar_chip
 }, {
 value: 2,
 symbol: bar_chip
 }
 ]
 }
 ]
 });*/


//Xbar控制图
/*var myChart15 = echarts.init(document.getElementById("myChart15"));
 myChart15.setOption(getLineEcharts());
 myChart15.setOption({
 color:["#ff9933"],
 title: {
 text: 'Xbar 控制图',
 left: 'center'
 },
 grid: {
 right: 43,
 bottom: 30,
 left: 38,
 top: 30
 },
 yAxis: {
 name: '样本均值',
 // max: 100
 },
 xAxis: [
 {
 name: "时间",
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 visualMap: {
 show:false,
 top: 10,
 right: 10,
 pieces: [{
 gt: 0,
 lte: 50,
 color: '#096'
 }, {
 gt: 50,
 lte: 100,
 color: '#ffde33'
 }, {
 gt: 1000,
 lte: 150,
 color: '#ff9933'
 }, {
 gt: 150,
 lte: 200,
 color: '#cc0033'
 },
 //     {
 //     gt: 200,
 //     lte: 300,
 //     color: '#660099'
 // }, {
 //     gt: 300,
 //     color: '#7e0023'
 // }
 ],
 outOfRange: {
 color: '#cc0033'
 }
 },
 series: [
 {
 name: '样本均值',
 type: 'line',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [30, 232, 25, 34, 45, 30, 140, 23, 34, 46, 34, 113],
 markLine: {
 silent: true,
 data: [{
 yAxis: 50
 },{
 yAxis: 150
 }, {
 yAxis: 200
 }]
 }
 }
 ]

 });*/


//能力直方图
/*var myChart16 = echarts.init(document.getElementById("myChart16"));
 myChart16.setOption(getLineAndBar());
 myChart16.setOption({
 title: {
 text: '能力直方图',
 left: 'center'
 },
 color: ['#00e673', '#66ccff'],
 grid: {
 right: 13,
 bottom: 30,
 left: 38,
 top: 30
 },
 legend: {
 show: false,
 data: ['数量', '均值']
 },
 // yAxis:{
 //     axisLabel: {
 //         show:false,
 //     },
 // },
 xAxis: [
 {
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 series: [
 {
 name: '均值',
 type: 'line',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 //            areaStyle: {normal: {}},
 data: [68, 132, 95, 84, 45, 30, 90, 65, 34, 46, 34, 94]
 },
 {
 name: '数量',
 type: 'bar',

 //            areaStyle: {normal: {}},
 data: [30, 32, 25, 34, 45, 30, 40, 23, 34, 46, 34, 13]
 }
 ]

 });*/


//共产一致与不一致占比
/*var myChart17 = echarts.init(document.getElementById("myChart17"));
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
 center: ['50%', '55%'],
 roseType: 'radius',
 label: {
 normal: {
 show: true,
 position: "inside",
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
 {value: 2, name: '共产一致型号数'},
 {value: 98, name: '共产不一致型号数'}
 ]
 },
 ]
 });*/


//共产一致
/*var myChart18 = echarts.init(document.getElementById("myChart18"));
 myChart18.setOption(getBarEcharts());
 myChart18.setOption({
 color: ['#66ccff', '#a5fff1'],
 legend: {
 show: true,
 data: ['2015年', '2016年']
 },
 grid: {
 //            show:true,
 x: "12%",
 x2: "15%",
 y: '20%',
 y2: "20%"
 },
 yAxis: [
 {
 name: "数量",
 type: 'value'
 }
 ],
 xAxis: [
 {
 name: "月份",
 type: 'category',
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 series: [{
 name: '2015',
 type: 'pictorialBar',
 label: labelSetting,
 symbolRepeat: true,
 symbolSize: ['80%', '60%'],
 barCategoryGap: '40%',
 data: [{
 value: 157,
 symbol: bar_chip
 }, {
 value: 21,
 symbol: bar_chip
 }, {
 value: 66,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 157,
 symbol: bar_chip
 }, {
 value: 21,
 symbol: bar_chip
 }, {
 value: 66,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }
 ]
 }, {
 name: '2016',
 type: 'pictorialBar',
 barGap: '10%',
 label: labelSetting,
 symbolRepeat: true,
 symbolSize: ['80%', '60%'],
 data: [{
 value: 184,
 symbol: bar_chip
 }, {
 value: 29,
 symbol: bar_chip
 }, {
 value: 73,
 symbol: bar_chip
 }, {
 value: 91,
 symbol: bar_chip
 }, {
 value: 95,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }, {
 value: 123,
 symbol: bar_chip
 }, {
 value: 78,
 symbol: bar_chip
 }
 ]
 }]
 });*/

// //数据量挖掘 共产不一致性
// var myChart19 = echarts.init(document.getElementById("myChart19"));
// myChart19.setOption(getBarEcharts());
// myChart19.setOption({
//     textStyle:{
//         fontSize:8
//     },
//     color: ['#00e673', '#66ffcc'],
//     legend: {
//         show: true,
//         data: ['2015年', '2016年'],
//         orient: ' vertical' //布局  纵向布局
//     },
//     grid: {
// //            show:true,
//         x: "12%",
//         x2: "15%",
//         y: '20%',
//         y2: "14%"
//     },
//     yAxis: [
//         {
//             name: "数量",
//             type: 'value'
//         }
//     ],
//     xAxis: [
//         {
//             name: "月份",
//             type: 'category',
//             rote:30,
//             data: ["冰冷",'家空','洗涤','商空','热水器','厨电']
//         }
//     ],
//     series: [{
//         name: '2015',
//         type: 'pictorialBar',
//         label: labelSetting,
//         symbolRepeat: true,
//         symbolSize: ['80%', '60%'],
//         barCategoryGap: '40%',
//         data: [{
//             value: 157,
//             symbol: bar_chip
//         }, {
//             value: 21,
//             symbol: bar_chip
//         }, {
//             value: 66,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }, {
//             value: 157,
//             symbol: bar_chip
//         }, {
//             value: 21,
//             symbol: bar_chip
//         }, {
//             value: 66,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }
//         ]
//     }, {
//         name: '2016',
//         type: 'pictorialBar',
//         barGap: '10%',
//         label: labelSetting,
//         symbolRepeat: true,
//         symbolSize: ['80%', '60%'],
//         data: [{
//             value: 184,
//             symbol: bar_chip
//         }, {
//             value: 29,
//             symbol: bar_chip
//         }, {
//             value: 73,
//             symbol: bar_chip
//         }, {
//             value: 91,
//             symbol: bar_chip
//         }, {
//             value: 95,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }, {
//             value: 123,
//             symbol: bar_chip
//         }, {
//             value: 78,
//             symbol: bar_chip
//         }
//         ]
//     }]
// });


//人员状态 学历 柱状图
/*var myChart22 = echarts.init(document.getElementById("myChart22"));
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
 data: ["本科", "研究生", "其他"],
 boundaryGap: false,
 axisLabel: {
 textStyle: {
 fontSize: 9 * bodyScale
 }
 },

 }
 ],
 grid: {
 x: '10%',
 y: '25%',
 y2: "45%"
 },
 series: [
 {
 type: "bar",
 data: [40, 50, 10],
 barWidth: 10,
 itemStyle: {
 normal: {
 //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
 color: function (params) {
 // build a color map as your need.
 var colorList = ['#66ccff', '#ffff99', '#66ffcc'];
 return colorList[params.dataIndex]
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
 });*/

//人员状态 工作年限 柱状图
/*var myChart23 = echarts.init(document.getElementById("myChart23"));
 myChart23.setOption(getBarEcharts());
 myChart23.setOption({
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
 data: ["3年以下", "3-8年", "8-15年", "15年以上"],
 boundaryGap: false,
 axisLabel: {
 textStyle: {
 fontSize: 9 * bodyScale
 }
 },
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
 data: [11, 23, 12, 29],
 barWidth: 10,
 itemStyle: {
 normal: {
 //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
 color: function (params) {
 // build a color map as your need.
 var colorList = ['#66ccff', '#ffff99', '#66ffcc', '#ff6666'];
 return colorList[params.dataIndex]
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
 */
//人员状态 资质 柱状图
/*var myChart24 = echarts.init(document.getElementById("myChart24"));
 myChart24.setOption(getBarEcharts());
 myChart24.setOption({
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
 data: ["检测权限", "批准权限", "审核权限", "出具报告权限"],
 boundaryGap: false,
 axisLabel: {
 textStyle: {
 fontSize: 9 * bodyScale
 }
 },
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
 data: [21, 24, 30, 25],
 barWidth: 10,
 itemStyle: {
 normal: {
 //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
 color: function (params) {
 // build a color map as your need.
 var colorList = ['#66ccff', '#ffff99', '#66ffcc', '#ff6666'];
 return colorList[params.dataIndex]
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
 });*/

//人员状态 学历 散点图
/*var myChart25 = echarts.init(document.getElementById("myChart25"));
 var data = [
 [['本科', '冰冷', 212, 1990], ['本科', '洗涤', 222, 1990], ['本科', '家空', 411, 1990], ['本科', '商空', 510, 1990], ['本科', '热水器', 114, 1990], ['本科', '厨电', 545, 1990], ['本科', '其他', 645, 1990]],

 [['研究生', '冰冷', 411, 2015], ['研究生', '洗涤', 523, 2015], ['研究生', '家空', 312, 1990], ['研究生', '商空', 447, 1990], ['研究生', '热水器', 328, 1990], ['研究生', '厨电', 129, 1990], ['研究生', '其他', 329, 1990]]
 , [['其他', '冰冷', 333, 1996], ['其他', '洗涤', 163, 1996], ['其他', '家空', 214, 1996], ['其他', '商空', 128, 1996], ['其他', '热水器', 224, 1996], ['其他', '厨电', 446, 1996], ['其他', '其他', 446, 1996]],

 ];
 myChart25.setOption({
 grid: {
 right: 45,
 bottom: 25,
 left: 50,
 top: 0
 },

 xAxis: {
 type: 'category',
 data: ["本科", '研究生', '其他'],
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
 fontSize: 12 * bodyScale
 }
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
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他'],
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
 fontSize: 12 * bodyScale
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
 series: [{
 name: '1990',
 data: data[0],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102, 204, 255)'
 },
 {
 offset: 1,
 color: 'rgb(102, 204, 255)'
 }
 ])
 }
 }
 }, {
 name: '2015',
 data: data[1],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(25, 100, 150, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(255,255,153)'
 },
 {
 offset: 1,
 color: 'rgb(255,255,153)'
 }
 ])
 }
 }
 }, {
 name: '1996',
 data: data[2],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102,255,204)'
 },
 {
 offset: 1,
 color: 'rgb(102,255,204)'
 }
 ])
 }
 }
 }
 ]
 });
 */
//人员状态 工作年限 散点图
/*var myChart26 = echarts.init(document.getElementById("myChart26"));
 myChart26.setOption(getScatterEcharts());
 var data = [
 [['3年以下', '冰冷', 212, 1990], ['3年以下', '洗涤', 222, 1990], ['3年以下', '家空', 411, 1990], ['3年以下', '商空', 510, 1990], ['3年以下', '热水器', 114, 1990], ['3年以下', '厨电', 545, 1990], ['3年以下', '其他', 645, 1990]],
 [['3-8年', '冰冷', 411, 2015], ['3-8年', '洗涤', 523, 2015], ['3-8年', '家空', 312, 1990], ['3-8年', '商空', 447, 1990], ['3-8年', '热水器', 328, 1990], ['3-8年', '厨电', 129, 1990], ['3-8年', '其他', 329, 1990]],
 [['8-15年', '冰冷', 433, 1996], ['8-15年', '洗涤', 263, 1996], ['8-15年', '家空', 514, 1996], ['8-15年', '商空', 328, 1996], ['8-15年', '热水器', 524, 1996], ['8-15年', '厨电', 646, 1996], ['8-15年', '其他', 146, 1996]],
 [['15年以上', '冰冷', 333, 1999], ['15年以上', '洗涤', 163, 1999], ['15年以上', '家空', 214, 1999], ['15年以上', '商空', 128, 1999], ['15年以上', '热水器', 224, 1999], ['15年以上', '厨电', 446, 1999], ['15年以上', '其他', 446, 1999]]

 ];
 myChart26.setOption({
 grid: {
 right: 20,
 bottom: 10,
 left: 0,
 top: 0
 },

 xAxis: {
 type: 'category',
 data: ["3年以下", '3-8年', '8-15年', '15年以上'],
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
 fontSize: 12 * bodyScale
 }
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
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他'],
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
 fontSize: 12 * bodyScale
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
 series: [{
 name: '1990',
 data: data[0],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102, 204, 255)'
 },
 {
 offset: 1,
 color: 'rgb(102, 204, 255)'
 }
 ])
 }
 }
 }, {
 name: '2015',
 data: data[1],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(25, 100, 150, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(255,255,153)'
 },
 {
 offset: 1,
 color: 'rgb(255,255,153)'
 }
 ])
 }
 }
 }, {
 name: '1996',
 data: data[2],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102,255,204)'
 },
 {
 offset: 1,
 color: 'rgb(102,255,204)'
 }
 ])
 }
 }
 },
 {
 name: '1999',
 data: data[3],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(25, 100, 150, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(255,102,102)'
 },
 {
 offset: 1,
 color: 'rgb(255,102,102)'
 }
 ])
 }
 }
 }
 ]
 });
 */
//人员状态 资质 散点图
/*var myChart27 = echarts.init(document.getElementById("myChart27"));
 myChart27.setOption(getScatterEcharts());
 var data = [
 [['检测权限', '冰冷', 212, 1990], ['检测权限', '洗涤', 222, 1990], ['检测权限', '家空', 411, 1990], ['检测权限', '商空', 510, 1990], ['检测权限', '热水器', 114, 1990], ['检测权限', '厨电', 545, 1990], ['检测权限', '其他', 645, 1990]],
 [['出具报告权限', '冰冷', 411, 2015], ['出具报告权限', '洗涤', 523, 2015], ['出具报告权限', '家空', 312, 1990], ['出具报告权限', '商空', 447, 1990], ['出具报告权限', '热水器', 328, 1990], ['出具报告权限', '厨电', 129, 1990], ['出具报告权限', '其他', 329, 1990]],
 [['审核权限', '冰冷', 433, 1996], ['审核权限', '洗涤', 263, 1996], ['审核权限', '家空', 514, 1996], ['审核权限', '商空', 328, 1996], ['审核权限', '热水器', 524, 1996], ['审核权限', '厨电', 646, 1996], ['审核权限', '其他', 146, 1996]],
 [['批准报告权限', '冰冷', 333, 1999], ['批准报告权限', '洗涤', 163, 1999], ['批准报告权限', '家空', 214, 1999], ['批准报告权限', '商空', 128, 1999], ['批准报告权限', '热水器', 224, 1999], ['批准报告权限', '厨电', 446, 1999], ['批准报告权限', '其他', 446, 1999]]

 ];
 myChart27.setOption({
 grid: {
 right: 20,
 bottom: 10,
 left: 0,
 top: 0
 },

 xAxis: {
 type: 'category',
 data: ["检测权限", '出具报告权限', '审核权限', '批准报告权限'],
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
 fontSize: 12 * bodyScale
 }
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
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他'],
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
 fontSize: 12 * bodyScale
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
 series: [{
 name: '1990',
 data: data[0],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102, 204, 255)'
 },
 {
 offset: 1,
 color: 'rgb(102, 204, 255)'
 }
 ])
 }
 }
 }, {
 name: '2015',
 data: data[1],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(25, 100, 150, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(255,255,153)'
 },
 {
 offset: 1,
 color: 'rgb(255,255,153)'
 }
 ])
 }
 }
 }, {
 name: '1996',
 data: data[2],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(120, 36, 50, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(102,255,204)'
 },
 {
 offset: 1,
 color: 'rgb(102,255,204)'
 }
 ])
 }
 }
 },
 {
 name: '1999',
 data: data[3],
 type: 'scatter',
 symbolSize: function (data) {
 return Math.sqrt(data[2]) / 2;
 },
 // label: {
 //     emphasis: {
 //         show: true,
 //         formatter: function (param) {
 //             return param.data[3];
 //         },
 //         position: 'top'
 //     }
 // },
 itemStyle: {
 normal: {
 // shadowBlur: 10,
 // shadowColor: 'rgba(25, 100, 150, 0.5)',
 // shadowOffsetY: 5,
 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
 offset: 0,
 color: 'rgb(255,102,102)'
 },
 {
 offset: 1,
 color: 'rgb(255,102,102)'
 }
 ])
 }
 }
 }
 ]
 });*/

//标准状态 国际标准
/*var myChart28 = echarts.init(document.getElementById("myChart28"));
 myChart28.setOption(getRadarEcharts());
 myChart28.setOption({
 title: {
 text: '国际标准',
 left: 'center',
 top: 'center',
 textStyle: {
 color: '#fff',
 fontSize: 12,
 }
 },
 polar: [
 {
 indicator: [
 {text: '冰冷:4300', max: 6500},
 {text: '洗涤:1000', max: 6500},
 {text: '家空:2800', max: 6500},
 {text: '商空:2090', max: 6500},
 {text: '热水器:3201', max: 6500},
 {text: '厨电:2345', max: 6500},
 {text: '其他:1233', max: 6500},
 ],
 center: ['50%', '55%'],
 radius: '58%',
 name: {
 formatter: '{value}',
 textStyle: {
 color: '#66ccff',
 fontSize: 10,
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
 value: [4300, 1000, 2800, 3500, 5000, 1900],
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
 });*/


//标准状态 国家标准
/*var myChart29 = echarts.init(document.getElementById("myChart29"));
 myChart29.setOption(getRadarEcharts());
 myChart29.setOption({
 title: {
 text: '国家标准',
 left: 'center',
 top: 'center',
 textStyle: {
 color: '#fff',
 fontSize: 12,
 }
 },
 polar: [
 {
 indicator: [
 {text: '冰冷:4300', max: 6500},
 {text: '洗涤:1000', max: 6500},
 {text: '家空:2800', max: 6500},
 {text: '商空:2090', max: 6500},
 {text: '热水器:3201', max: 6500},
 {text: '厨电:2345', max: 6500},
 {text: '其他:1233', max: 6500},
 ],
 center: ['50%', '55%'],
 radius: '58%',
 name: {
 formatter: '{value}',
 textStyle: {
 color: '#66ccff',
 fontSize: 10,
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
 value: [4300, 1000, 2800, 3500, 5000, 1900],
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
 });*/


//标准状态 行业标准
/*var myChart30 = echarts.init(document.getElementById("myChart30"));
 myChart30.setOption(getRadarEcharts());
 myChart30.setOption({
 title: {
 text: '行业标准',
 left: 'center',
 top: 'center',
 textStyle: {
 color: '#fff',
 fontSize: 12,
 }
 },
 polar: [
 {
 indicator: [
 {text: '冰冷:4300', max: 6500},
 {text: '洗涤:1000', max: 6500},
 {text: '家空:2800', max: 6500},
 {text: '商空:2090', max: 6500},
 {text: '热水器:3201', max: 6500},
 {text: '厨电:2345', max: 6500},
 {text: '其他:1233', max: 6500},
 ],
 center: ['50%', '55%'],
 radius: '58%',
 name: {
 formatter: '{value}',
 textStyle: {
 color: '#66ccff',
 fontSize: 10,
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
 value: [4300, 1000, 2800, 3500, 5000, 1900],
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
 });*/


//标准状态 企业标准
/*var myChart31 = echarts.init(document.getElementById("myChart31"));
 myChart31.setOption(getRadarEcharts());
 myChart31.setOption({
 title: {
 text: '企业标准',
 left: 'center',
 top: 'center',
 textStyle: {
 color: '#fff',
 fontSize: 12,
 }
 },
 polar: [
 {
 indicator: [
 {text: '冰冷:4300', max: 6500},
 {text: '洗涤:1000', max: 6500},
 {text: '家空:2800', max: 6500},
 {text: '商空:2090', max: 6500},
 {text: '热水器:3201', max: 6500},
 {text: '厨电:2345', max: 6500},
 {text: '其他:1233', max: 6500},
 ],
 center: ['50%', '55%'],
 radius: '58%',
 name: {
 formatter: '{value}',
 textStyle: {
 color: '#66ccff',
 fontSize:10*bodyScale,
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
 value: [4300, 1000, 2800, 3500, 5000, 1900],
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
 });*/


//能力状态 冰冷
/*var myChart32 = echarts.init(document.getElementById("myChart32"));
 myChart32.setOption(getBarEcharts());
 myChart32.setOption({
 yAxis: [
 {
 type: 'category',
 data: ["完全具备", "部分具备", "完全不具备"],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }

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
 x: '53%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });*/

//能力状态 洗涤
/*var myChart33 = echarts.init(document.getElementById("myChart33"));
 myChart33.setOption(getBarEcharts());
 myChart33.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });*/

//能力状态 家空
/*var myChart34 = echarts.init(document.getElementById("myChart34"));
 myChart34.setOption(getBarEcharts());
 myChart34.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });
 */
//能力状态 商空
/*var myChart35 = echarts.init(document.getElementById("myChart35"));
 myChart35.setOption(getBarEcharts());
 myChart35.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });*/

//能力状态 热水器
/*var myChart36 = echarts.init(document.getElementById("myChart36"));
 myChart36.setOption(getBarEcharts());
 myChart36.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });
 */
//能力状态 厨电
/*var myChart37 = echarts.init(document.getElementById("myChart37"));
 myChart37.setOption(getBarEcharts());
 myChart37.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });*/

//能力状态 其他
/*var myChart38 = echarts.init(document.getElementById("myChart38"));
 myChart38.setOption(getBarEcharts());
 myChart38.setOption({
 yAxis: [
 {
 type: 'category',
 data: [],
 axisLine: {
 show: false,
 },
 axisTick: {
 show: false
 }
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
 x: '40%',
 y: '0%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12],
 barWidth: 8,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10,
 color: "#ff9933"
 },
 formatter: '{c}'
 }
 },
 }
 ]
 });*/

//数据结果 订单类别 整机
/*var myChart39 = echarts.init(document.getElementById("myChart39"));
 myChart39.setOption(getScatterEcharts());
 var data = [[0, 0, 5], [0, 1, 10], [0, 2, 2], [0, 3, 5], [0, 4, 9], [0, 5, 6],[1, 0, 7], [1, 1, 5], [1, 2, 6], [1, 3, 8], [1, 4, 1],[2, 0, 1], [2, 1, 1], [2, 2, 4], [2, 3, 8], [2, 4, 8],[3, 0, 7], [3, 1, 3], [3, 2, 7], [3, 3, 11], [3, 4, 3],[4, 0, 8], [4, 1, 3], [4, 2, 4], [4, 3, 8], [4, 4, 4],[5, 0, 2], [5, 1, 5], [5, 2, 2], [5, 3, 5], [5, 4, 2],[6, 0, 5], [6, 1, 6], [6, 2, 1], [6, 3, 9], [6, 4, 12]];
 data = data.map(function (item) {
 return [item[1], item[0], item[2]];
 });
 console.log(data)
 myChart39.setOption({
 color: ["#66ccff"],
 grid: {
 top: 2,
 left: 7,
 bottom: 10,
 right: 5,
 // containLabel: true
 },
 legend: {
 show: false
 },
 tooltip: {
 trigger: 'item',
 axisPointer: {
 type: 'cross',
 label: {
 backgroundColor: '#234f65'
 }
 }
 },
 xAxis: {
 data: ['对比试验', '新品调试', '新品确认', '小批验证', '年度型检', '监督抽测'],

 axisLine: {
 show: false
 },
 axisLabel: {
 show: true,
 // rotate: 30,
 textStyle: {
 color: '#66ccff',
 fontSize: 12*bodyScale,

 },
 // rotate:30,
 },
 axisTick: {
 show: false,
 alignWithLabel: true,
 lineStyle: {
 color: '#66ccff'
 }
 },
 splitLine: {  //刻度线
 show: true,
 lineStyle: {
 color: '#234f65'
 }
 },
 },
 yAxis: {
 data: ['冰冷', '家空', '洗涤', '商空', '热水器', '厨电', '其他'],
 axisLine: { //坐标轴
 show: false
 },
 axisLabel: {   //坐标值
 show: true,
 textStyle: {
 color: '#66ccff',
 fontSize: 12*bodyScale
 }
 },
 axisTick: {  //刻度值
 show: false,
 },
 },
 series: [{
 data: data
 }]
 });
 */

//数据结果 订单类别 模块
/*var myChart40 = echarts.init(document.getElementById("myChart40"));
 myChart40.setOption(getScatterEcharts());
 var data = [[0, 0, 5], [0, 1, 10], [0, 2, 2], [0, 3, 5], [0, 4, 9], [1, 0, 7], [1, 1, 5], [1, 2, 6], [1, 3, 8], [1, 4, 1], [2, 0, 1], [2, 1, 1], [2, 2, 4], [2, 3, 8], [2, 4, 8], [3, 0, 7], [3, 1, 3], [3, 2, 7], [3, 3, 11], [3, 4, 3], [4, 0, 8], [4, 1, 3], [4, 2, 4], [4, 3, 8], [4, 4, 4], [5, 0, 2], [5, 1, 5], [5, 2, 2], [5, 3, 5], [5, 4, 2], [6, 0, 5], [6, 1, 6], [6, 2, 1], [6, 3, 9], [6, 4, 12]];
 data = data.map(function (item) {
 return [item[1], item[0], item[2]];
 });
 myChart40.setOption({
 color: ["#66ccff"],
 grid: {
 top: 2,
 left: 7,
 bottom: 10,
 right: 40,
 // containLabel: true
 },
 legend: {
 show: false
 },
 tooltip: {
 trigger: 'item',
 axisPointer: {
 type: 'cross',
 label: {
 backgroundColor: '#234f65'
 }
 }
 },

 xAxis: {
 data: ['新品型号', '入厂检验', '分析验证', '抽样型式', '监督检验'],
 axisLine: {
 show: false
 },
 axisLabel: {
 show: true,
 // rotate: 30,
 textStyle: {
 color: '#66ccff',
 fontSize: 12*bodyScale
 }
 },
 axisTick: {
 show: false,
 alignWithLabel: true,
 lineStyle: {
 color: '#66ccff'
 }
 },
 splitLine: {  //刻度线
 show: true,
 lineStyle: {
 color: '#234f65'
 }
 },
 },
 yAxis: {
 show: true,
 data: ['冰冷', '家空', '洗涤', '商空', '热水器', '厨电', '其他'],
 axisLine: { //坐标轴
 show: false
 },
 axisLabel: {   //坐标值
 show: false,
 textStyle: {
 color: '#66ccff',
 fontSize: 12*bodyScale
 }
 },
 axisTick: {  //刻度值
 show: false,
 }
 },
 series: [{
 data: data,
 }]
 });*/


//数据结果 一次合格率 整机
/*var myChart41 = echarts.init(document.getElementById("myChart41"));
 myChart41.setOption(getAreaEcharts());
 myChart41.setOption({
 legend: {
 show: true,
 data: ['整机', '模块'],
 itemWidth: 6, //图例标记的图形宽度
 itemHeight: 6 //图例标记的图形高度
 },
 grid: {
 x: 7,
 y: 28
 },
 xAxis: [
 {
 name: '',
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他']
 }
 ],
 yAxis: [
 {
 name: '',
 }
 ],
 series: [
 {
 name: '整机',
 type: 'line',
 stack: '总量',
 // areaStyle: {normal: {}},
 data: [120, 132, 101, 134, 90, 230, 210, 231, 124, 156, 321, 154],
 itemStyle: {
 normal: {
 color: "#66ccff"
 }
 },
 symbolSize:2,
 lineStyle:{
 normal:{
 width:1
 }
 },

 }
 ]

 });*/


//数据结果 一次合格率 模块
/*var myChart42 = echarts.init(document.getElementById("myChart42"));
 myChart42.setOption(getAreaEcharts());
 myChart42.setOption({
 legend: {
 show: true,
 data: ['整机', '模块'],
 itemWidth: 6,  //图例标记的图形宽度
 itemHeight: 6 //图例标记的图形高度
 },
 grid: {
 x: 5,
 y: 28
 },
 xAxis: [
 {
 name: '',
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他']
 }
 ],
 yAxis: [
 {
 name: '',
 }
 ],
 series: [
 {
 name: '模块',
 type: 'line',
 stack: '总量',
 // areaStyle: {normal: {}},
 data: [120, 132, 101, 134, 90, 230, 210, 231, 124, 156, 321, 154],
 itemStyle: {
 normal: {
 color: "#00e673"
 }
 },
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 }
 ]

 });*/


//数据结果 问题闭环率 整机
/*var myChart43 = echarts.init(document.getElementById("myChart43"));
 myChart43.setOption(getCenterPie());

 myChart43.setOption({
 color: ['#66ccff', '#00e673', '#ff9933', '#4397f7', '#ffff99', '#ff6666', '#66ffcc'],
 legend: {
 show: true,
 data: ['冰冷'+"89%", '洗涤'+"89%", '家空'+"89%", '商空'+"89%", '热水器'+"89%", '厨电'+"89%", '其他'+"89%"],
 orient: ' vertical',  //布局  纵向布局


 },
 series: [
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,  //旋转方向
 radius: [60, 63],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 99,
 name: '冰冷'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 1,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [54, 57],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 98,
 name: '洗涤'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 2,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [48, 51],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 96,
 name: '家空'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 4,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [42, 45],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 89,
 name: '商空'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 11,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [36, 39],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 87,
 name: '热水器'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 13,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [30, 33],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 96,
 name: '厨电'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 4,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [24, 27],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 97,
 name: '其他'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 3,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 }
 ]
 });*/


//数据结果 问题闭环率 模块
/*var myChart44 = echarts.init(document.getElementById("myChart44"));
 myChart44.setOption(getCenterPie());
 myChart44.setOption({
 color: ['#66ccff', '#00e673', '#ff9933', '#4397f7', '#ffff99', '#ff6666', '#66ffcc'],
 legend: {
 show: true,
 data: ['冰冷'+"89%", '洗涤'+"89%", '家空'+"89%", '商空'+"89%", '热水器'+"89%", '厨电'+"89%", '其他'+"89%"],
 orient: ' vertical',  //布局  纵向布局


 },
 series: [
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,  //旋转方向
 radius: [60, 63],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 99,
 name: '冰冷'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 1,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [54, 57],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 98,
 name: '洗涤'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 2,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [48, 51],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 96,
 name: '家空'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 4,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [42, 45],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 89,
 name: '商空'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 11,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [36, 39],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 87,
 name: '热水器'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 13,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [30, 33],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 96,
 name: '厨电'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 4,
 name: '整机',
 itemStyle: placeHolderStyle
 }
 ]
 },
 {
 name: '问题闭环率',
 type: 'pie',
 clockWise: false,
 radius: [24, 27],
 center:["36%","50%"],
 itemStyle: dataStyle,
 data: [
 {
 value: 97,
 name: '其他'+"89%",
 // itemStyle: placeHolderStyle
 },
 {
 value: 3,
 name: '模块',
 itemStyle: placeHolderStyle
 }

 ]
 }
 ]
 });
 */

//数据结果 订单及时率 雷达图
/*var myChart45 = echarts.init(document.getElementById("myChart45"));
 myChart45.setOption(getRadarEcharts());
 myChart45.setOption({
 legend: {
 show: true,
 orient: ' vertical',  //布局  纵向布局
 left: 10,
 bottom: 5,
 itemWidth: 10,  //图例标记的图形宽度
 itemHeight: 2, //图例标记的图形高度
 textStyle: {    //图例文字的样式
 color: '#66ccff',
 fontSize: 12*bodyScale
 },
 data: ['2016年', '2017年']
 },

 calculable: true,
 polar: [
 {
 indicator: [
 {text: '冰冷', max: 6500},
 {text: '洗涤', max: 6500},
 {text: '家空', max: 6500},
 {text: '热水器', max: 6500},
 {text: '厨电', max: 6500},
 {text: '其他', max: 6500},
 ],
 center: ['50%', '55%'],
 radius: '65%',
 name: {
 formatter: '{value}',
 textStyle: {
 color: '#66ccff',
 fontSize: 10*bodyScale,
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
 },
 }

 ],
 series: [
 {
 type: 'radar',
 data: [
 {
 value: [4300, 1000, 2800, 3500, 5000, 1900],
 name: '2016年',
 itemStyle: {
 normal: {
 color: '#66ccff',
 areaStyle: {
 color: 'rgba(102,204,255,0.2)',
 },
 }
 }
 },
 {
 value: [3300, 2000, 2600, 2500, 4000, 2900],
 name: '2017年',
 itemStyle: {
 normal: {
 color: '#ff9933',
 areaStyle: {
 color: 'rgba(255,153,51,0.2)',
 },
 }
 }
 }
 ]
 }
 ]
 });*/


//数据结果 订单及时率 折线图
/*var myChart46 = echarts.init(document.getElementById("myChart46"));
 myChart46.setOption(getLineEcharts());
 myChart46.setOption({
 color: ['#66ccff', '#00e673', '#4397f7', '#ff9933', '#66ffcc', '#ffff99', '#ff6666'],
 legend: {
 show: true,
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他'],
 itemWidth: 2,  //图例标记的图形宽度
 itemHeight: 3, //图例标记的图形高度
 },
 grid: {
 x: "15%",
 x2: "10%",
 y: '25%',
 y2: "10%"
 },
 xAxis: [
 {
 name: '月份',
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 yAxis: [
 {
 name: '合格率/%',
 }
 ],
 series: [
 {
 name: '冰冷',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [120, 332, 101, 234, 190, 230, 230, 123, 311, 212, 153, 241],

 },
 {
 name: '洗涤',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [220, 132, 131, 234, 390, 130, 210, 341, 241, 411, 243, 223],

 },
 {
 name: '家空',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [120, 132, 161, 34, 190, 230, 310, 223, 312, 341, 431, 123],

 },
 {
 name: '商空',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [220, 142, 171, 234, 290, 260, 110, 312, 313, 454, 223, 213],

 },
 {
 name: '热水器',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [120, 232, 101, 434, 90, 130, 210, 532, 231, 456, 311, 234],

 },
 {
 name: '厨电',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [90, 139, 141, 184, 290, 230, 310, 312, 431, 412, 313, 451],

 },
 {
 name: '其他',
 type: 'line',
 stack: '总量',
 lineStyle:{
 normal:{
 width:1
 }
 },
 symbolSize:2,
 // areaStyle: {normal: {}},
 data: [120, 132, 101, 134, 390, 30, 110, 313, 534, 123, 411, 311],

 }
 ]

 });*/

//数据结果 检测满意度 整机
/*var myChart47 = echarts.init(document.getElementById("myChart47"));
 myChart47.setOption(getBarEcharts());
 myChart47.setOption({
 yAxis: [
 {
 type: 'category',
 data: ["冰冷", "洗涤", "家空", '商空', '热水器', '厨电', '其他'],
 splitLine: {  //刻度线
 show: false
 },
 axisLine: {
 show: false,
 lineStyle: {
 color: "#66ccff"
 }
 },
 axisTick: {
 show: false,

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
 x: '35%',
 y: '5%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12, 23, 43, 43, 52],
 barWidth: 7,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10 * bodyScale,
 color: "#ff9933"
 },
 formatter: '{c}%'
 }
 },
 }
 ]
 });*/

//数据结果 检测满意度 模块
/*var myChart48 = echarts.init(document.getElementById("myChart48"));
 myChart48.setOption(getBarEcharts());
 myChart48.setOption({
 yAxis: [
 {
 show: false,
 type: 'category',
 data: ["冰冷", "洗涤", "家空", '商空', '热水器', '厨电', '其他'],
 splitLine: {  //刻度线
 show: false
 },
 axisTick: {
 show: false,

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
 x: '25%',
 x2: "15%",
 y: '5%',
 y2: "0%"
 },
 series: [
 {
 type: "bar",
 data: [11, 23, 12, 32, 21, 34, 21],
 barWidth: 7,
 label: {
 normal: {
 show: true,
 position: 'right',
 // formatter: "{a}%",
 textStyle: {
 fontSize: 10 * bodyScale,
 color: "#ff9933"
 },
 formatter: '{c}%'
 }
 },
 itemStyle: {
 normal: {
 color: "#00e673",
 }
 }
 }
 ]
 });*/

//数据结果 检测满意度 折线图
/*var myChart49 = echarts.init(document.getElementById("myChart49"));
 myChart49.setOption(getLineEcharts());
 myChart49.setOption({
 color: ['#66ccff', '#00e673', '#4397f7', '#ff9933', '#66ffcc', '#ffff99', '#ff6666'],
 legend: {
 show: true,
 data: ['冰冷', '洗涤', '家空', '商空', '热水器', '厨电', '其他'],
 itemWidth: 2,  //图例标记的图形宽度
 itemHeight: 3 //图例标记的图形高度
 },
 grid: {
 x: "15%",
 x2: "15%",
 y: '25%',
 y2: "10%"
 },
 xAxis: [
 {
 name: '月份',
 data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 }
 ],
 yAxis: [
 {
 name: '合格率/%',
 }
 ],
 series: [
 {
 name: '冰冷',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [120, 332, 101, 234, 190, 230, 230, 123, 311, 212, 153, 241],

 },
 {
 name: '洗涤',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [220, 132, 131, 234, 390, 130, 210, 341, 241, 411, 243, 223],

 },
 {
 name: '家空',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [120, 132, 161, 34, 190, 230, 310, 223, 312, 341, 431, 123],

 },
 {
 name: '商空',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [220, 142, 171, 234, 290, 260, 110, 312, 313, 454, 223, 213],

 },
 {
 name: '热水器',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [120, 232, 101, 434, 90, 130, 210, 532, 231, 456, 311, 234],

 },
 {
 name: '厨电',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [90, 139, 141, 184, 290, 230, 310, 312, 431, 412, 313, 451],

 },
 {
 name: '其他',
 type: 'line',
 stack: '总量',
 lineStyle: {
 normal: {
 width: 1
 }
 },
 symbolSize: 2,
 // areaStyle: {normal: {}},
 data: [120, 132, 101, 134, 390, 30, 110, 313, 534, 123, 411, 311],

 }
 ]

 });*/
//var str=''
//for(var i=1;i<50;i++){
//	str+="myChart"+i+','
//}
//console.log(str)

var right_echarts = []
//重置echart图标大小 在加载平面地图时被调用
function resetSizeRight() {
    for (var i = 0; i < right_echarts.length; i++) {
        right_echarts[i].resize();
    }
    mHeightChartTab4.reflow();
}

$(function () {
    /*总状态底下的tab列表*/
    var $right = $("#right");
    $right.find(".total_bottom_tab ul>li[class]").click(function () {
        $(this).parents(".total_bottom_tab").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $right.find(".total_bottom_tab>ul>li[class]").click(function () {
        $(this).next().toggle();
    });

    /*实验室状态顶上右上角的tab切换*/
    $right.find(".lab .lab_icon li img").click(function () {

        var src = $(this).attr("src");
        if (src.indexOf("off") >= 0) {

            var index = $(this).parent().index();
            $(this).attr("src", src.replace("off", "on"))
                .parent().siblings().find("img").each(function (index, item) {
                $(item).attr("src", $(this).attr("src").replace("on", "off"));
            });
            $(this).parents("ul").next().find("li:eq(" + index + ")").css("color","#00e673")
                .siblings().css("color","#6cf");

            //取标签名字
            var thisLabel = $(this).parents("ul").next().find("li:eq(" + index + ")").text();
            console.log("```````````````````thisLabel",thisLabel);
            if(thisLabel=="中海博睿"){
            	thisLabel="中心实验室";
            }
            if(thisLabel!=labTypeCode){
            	labTypeCode=thisLabel;
            	 loadTab2Data();
                 loadTab3Data();
                 loadTab4Data();
            }
        }else{
        	  var index = $(this).parent().index();
              $(this).attr("src", src.replace("on", "off"))
                  .parent().siblings().find("img").each(function (index, item) {
                  $(item).attr("src", $(this).attr("src").replace("on", "off"));
              });
              $(this).parents("ul").next().find("li:eq(" + index + ")").css("color","#6cf")
              .siblings().css("color","#6cf");
        	//再次点击同一个 返回全部数据
        	labTypeCode="";
        	loadTab2Data();
            loadTab3Data();
            loadTab4Data();
        }

    })
});











