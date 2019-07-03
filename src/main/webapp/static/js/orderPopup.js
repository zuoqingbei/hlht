


/*------- 此文件暂时没用 -----------*/


let ec_curve1,
    ec_curve2,
    echarts = parent.echarts,
    bodyScale = parent.bodyScale,
    nameGap = parent.nameGap,
    nameTextStyle = parent.nameTextStyle
;
let colorData = ['#eaff56', '#bce672', '#ff461f', '#70f3ff', '#e9e7ef', '#fff143', '#c9dd22', '#ff2d51',
    '#44cef6', '#f0f0f4', '#faff72', '#bddd22', '#f36838', '#3eede7', '#e9f1f6', '#ffa631',
    '#afdd22', '#ed5736', '#1685a9', '#f0fcff', '#ffa400', '#a3d900', '#ff4777', '#177cb0',
    '#e3f9fd', '#fa8c35', '#9ed900', '#f00056', '#065279', '#d6ecf0', '#ff8c31', '#9ed048',
    '#ffb3a7', '#003472', '#fffbf0', '#ff8936', '#96ce54', '#f47983', '#4b5cc4', '#f2ecde',
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
let mSensor = [
    {
        'unit': '℃',
        'sensor_type_id': 1,
        'highvalue': 1000,
        'sort': 1,
        'legend': '1:T(℃)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'T',
        'lowvalue': -100
    },
    {
        'unit': 'Hz',
        'sensor_type_id': 6,
        'highvalue': 2000,
        'sort': 6,
        'legend': '6:F(Hz)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'F',
        'lowvalue': 0
    },
    {
        'unit': '%',
        'sensor_type_id': 8,
        'highvalue': 300,
        'sort': 8,
        'legend': '8:Th(%)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'Th',
        'lowvalue': 0
    },
    {
        'unit': 'V',
        'sensor_type_id': 2,
        'highvalue': 3000,
        'sort': 2,
        'legend': '2:U(V)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'U',
        'lowvalue': 0
    },
    {
        'unit': 'A',
        'sensor_type_id': 3,
        'highvalue': 2000,
        'sort': 3,
        'legend': '3:I(A)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'I',
        'lowvalue': 0
    },
    {
        'unit': 'W',
        'sensor_type_id': 4,
        'highvalue': 8000,
        'sort': 4,
        'legend': '4:P(W)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'P',
        'lowvalue': 0
    },
    {
        'unit': 'kW·h',
        'sensor_type_id': 5,
        'highvalue': 2000,
        'sort': 5,
        'legend': '5:E(kW·h)',
        'lab_code': 'refrigeratorkekao01',
        'test_unit_id': 1,
        'sensor_type_name': 'E',
        'lowvalue': 0
    }
];
let myChartCurve1;
let myChartWorld2;

let xDataWorld;//x轴坐标数据--对应时间
let legendDataWorld = [];//需要把全部图例放入里面 保证名称不同
let legendNumDataWorld = [];
let showlegendDataWorld = [];//需要展示图例 自定义
let seriesTopDataWorld = [];
let seriesBottomDataWorld = [];
let topParamWorld = [];//上方y参数单位
let bottomParamWorld = [];//下方y轴单位
let currentDataWorld;//当前传感器y信息数据 用于生成y轴
let totalLegendNameWorld = [];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
let interval_count1World = 0;
let interval_count2World = 0;
let mockxDataWorld = [];//模拟的x轴数据
let intevalChartHadoop;

let configName;
let startTime;


$(function () {
    leftNavAction();
    loadCurve();
    alert(1)
});

function leftNavAction() {
    $(".left-nav>ul>li").click(function () {
        $(this).toggleClass("show");
        return false;
    });
    $(".left-nav>ul>li>ul>li").click(function () {
        $(".left-nav>ul>li>ul>li").removeClass("active");
        $(this).addClass("active");
        return false;
    });
    $(".toCurve").click(function () {
        $(".list").hide().siblings().show();
    })
}

let com_yAxis = {
    type: 'value',
    nameGap: nameGap,
    nameTextStyle: nameTextStyle,
    axisLine: { //坐标轴线
        show: true,
        lineStyle: {
            color: '#999'
        }
    },
    axisLabel: {   //坐标轴标签
        show: true,
        textStyle: {
            color: '#66ccff',
            fontSize: 12 * bodyScale
        }
    },
    splitLine: {  //刻度线
        show: true,
        lineStyle: {
            color: '#999'
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
};
let com_opt = {
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
        // data: legendDataWorld
    },
    grid: {
        x: '13%',
        x2: '15%',
        y: '17%',
        y2: '5%'                  //下移负数 使两个图重叠
    },
    xAxis: [
        {
            type: 'category',
           /* splitLine: {
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
                show: true,
                alignWithLabel: true,
                lineStyle: {
                    color: '#ff2800'
                }
            },
            // data: xDataWorld.concat(mockXdataWorld)*/
            data: function () {
                if (xDataWorld) {
                    return xDataWorld.concat(mockXdataWorld);
                } else {
                    return null;
                }

            }
        }
    ],
    yAxis: [
        $.extend({}, com_yAxis, {
            name: mSensor[0].unit + "　　　",
            max: 90,
            min: -30,
            position: 'left',
            offset: 40 * bodyScale,
        }),
        $.extend({}, com_yAxis, {
            name: "Hz" + "　　　",
            max: 100,
            min: 0,
            position: 'left',
            offset: 10 * bodyScale,
        }),
        $.extend({}, com_yAxis, {
            name: "　　　" + "%",
            position: 'right',
            offset: 10 * bodyScale,
        }),
        $.extend({}, com_yAxis, {
            name: "　　　" + "V",
            position: 'right',
            offset: 40 * bodyScale,
        })
    ],
    series: seriesTopDataWorld
};

function loadCurve() {


    myChartCurve1 = echarts.init($("#curve1")[0]);
    myChartWorld2 = echarts.init($("#curve2")[0]);
    $("#center_sybh_id_world").html('');
    $("#center_ypbm_id_world").html('');
    $("#center_cpxh_id_world").html('');
    // $("#center_testPro_id_world").html('');
    $.post("http://localhost:8080/hlht/lab/getJsonFile", {"fileName": "USLAB-B1.json"}, function (data) {
        console.log("----------", eval('(' + data + ')'));
        setTimeout(function () {
            data = eval("(" + data + ")");
            if (data == "") {
                //alert("暂未开测");
                return;
            }
            myChartCurve1.clear();
            myChartWorld2.clear();
            $("#legend_ul_world").html('');
            dataBase = data;
            //根据传感器具体数据 生成图例
            $.each(data.list, function (index, item) {
                totalLegendNameWorld.push(item.name);
                legendNumDataWorld.push(item.data[item.data.length - 1].value + increaseBracketForObj(item.name))
            });
            legendDataWorld = dealBracket(totalLegendNameWorld);
            randomLegendWorld();
            $("#center_sybh_id_world").html(data.sybh);
            $("#center_ypbm_id_world").html(data.ybbh);
            $("#center_cpxh_id_world").html(data.cpxh);
            /*
                        if(data.testPro!=""&&data.testPro!=undefined){
                            $("#center_testPro_id_world").parent("li").css("display","inline-block");
                            $("#center_testPro_id_world").html(data.testPro);
                        }else{
                            $("#center_testPro_id_world").parent("li").css("display","none");
                        }
            */
            //showlegendDataWorld=legendDataWorld;//默认全选
            //console.log(showlegendDataWorld)
            createLegendHtmlsWorld();
            console.log()
            createEchartsWorld(true);
            //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新
            $("#legend_ul_world").find("li").last().find("input").trigger("click");
            $("#legend_ul_world").find("li").last().find("input").trigger("click");
            myChartCurve1.hideLoading();
            myChartWorld2.hideLoading();
            loadingAnimateOut("curve", 500);
        }, 2000)
    })
}

function getChartsWorld1() {
    console.log(seriesTopDataWorld)
    option_world = $.extend(true, {}, com_opt, {
        series: seriesTopDataWorld
    });
    myChartCurve1.clear();
    myChartCurve1.setOption(option_world);
    /*
        echarts.connect([myChartCurve1, myChartWorld2]);
        myChartCurve1.setOption({
            series: getAnimation(seriesTopDataWorld)
        });
    */
}

function getChartsWorld2() {

    option2_world = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            textStyle: {
                fontSize: 10 * bodyScale,
            },
            showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },
        legend: {
            show: false,
            data: legendDataWorld
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
                data: xDataWorld.concat(mockXdataWorld),
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
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
                name: "V" + "　　　",
                max: 300,
                min: 0,
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                position: 'left',
                offset: 40 * bodyScale,
                axisLabel: {
                    formatter: function (params, index) {
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
                name: "A" + "　　　",
                /* max:currentDataWorld[5].highvalue,
                 min:currentDataWorld[5].lowvalue,*/
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
                name: "　　　" + "W",
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                nameLocation: 'start',
                position: 'right',
                offset: 10 * bodyScale,
                axisLabel: {
                    formatter: function (params, index) {
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
                name: "　　　" + "kW·h",
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
        series: seriesBottomDataWorld
    };
    // myChartWorld2.clear();
    myChartWorld2.setOption(option2_world);

    echarts.connect([myChartCurve1, myChartWorld2]);
    myChartWorld2.setOption({
        series: getAnimation(seriesBottomDataWorld)
    });

}

//处理线series
function dealSeriesDataWorld() {
    seriesTopDataWorld = [];
    seriesBottomDataWorld = [];
    for (let x = 0; x < totalLegendNameWorld.length; x++) {
        let currentName = totalLegendNameWorld[x];
        let data = [];
        for (let i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        ;
        let checked = false;
        $('input[name="legendcheckbox_world"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        if (checked) {
            let topIndex = isHasElementOne(topParamWorld, dealUnit(currentName));
            let bottomIndex = isHasElementOne(bottomParamWorld, dealUnit(currentName));

            if (topIndex > -1 || bottomIndex > -1) {
                if (topIndex > -1 && isHasElementOne(showlegendDataWorld, dealBracketForObj(currentName)) > -1) {
                    //展示在上半部分
                    console.log("---seriesTopDataWorld赋值")
                    seriesTopDataWorld.push(joinSeriseWorld(data, currentName, topIndex, x));
                } else if (bottomIndex > -1 && isHasElementOne(showlegendDataWorld, dealBracketForObj(currentName)) > -1) {
                    //展示在下半部分
                    seriesBottomDataWorld.push(joinSeriseWorld(data, currentName, bottomIndex, x));
                }
            } else {
                //没有配置 默认画到左下
                seriesBottomDataWorld.push(joinSeriseOtherWorld(data, currentName, x));
            }
        }
    }
};

function dealSeriesData2World(obj) {
    seriesTopDataWorld = [];
    seriesBottomDataWorld = [];
    for (let x = 0; x < totalLegendNameWorld.length; x++) {
        let currentName = totalLegendNameWorld[x];
        let data = [];
        //没有配置 默认画到左下
        let checked = false;
        $('input[name="legendcheckbox_world"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        for (let i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        let topIndex = isHasElementOne(topParamWorld, dealUnit(currentName));
        let bottomIndex = isHasElementOne(bottomParamWorld, dealUnit(currentName));
        console.log("---dealSeriesData2World",checked,topIndex,data)
        if (checked) {
            if (topIndex > -1 || bottomIndex > -1) {
                if (topIndex > -1 && isHasElementOne(showlegendDataWorld, dealBracketForObj(currentName)) > -1) {
                    //展示在上半部分
                    seriesTopDataWorld.push(joinSeriseWorld(data, currentName, topIndex, x));
                } else if (bottomIndex > -1 && isHasElementOne(showlegendDataWorld, dealBracketForObj(currentName)) > -1) {
                    //展示在下半部分
                    seriesBottomDataWorld.push(joinSeriseWorld(data, currentName, bottomIndex, x));
                }
            } else {
                seriesBottomDataWorld.push(joinSeriseOtherWorld(data, currentName, x));
            }
        }
    }
};

function checkBoxValesWorld() { //jquery获取复选框值
    let chk_value = [];
    $('input[name="legendcheckbox_world"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}

//动态加载数据 动画效果 个数与serise数量相同
function getAnimation(arr) {
    let animation = [];
    for (let x = 0; x < arr.length; x++) {
        animation.push({
            animation: false
        });
    }
}


//模拟空白x轴
function mockXdataMethodWorld(endStart) {

    mockXdataWorld = [];
    //模拟空白x轴
    for (let x = 1; x < 90; x++) {
        let value = parseInt((parseFloat(endStart) + x));
        mockXdataWorld.push(value);
    }
}

function joinSeriseOtherWorld(data, name, colorIndex) {
    let dataArr = [];
    xDataWorld = [];
    let endStart;
    if (data[data.length - 1]) {
        endStart = parseFloat(data[data.length - 1].name) * 60;
    } else {
        console.log(name + "data未取到数据")
    }

    let startTime = parseInt(endStart) - 60 * 2;
    for (let x = 0; x < data.length; x++) {
        let value = data[x].value;
        if (value != "N" && startTime <= parseInt(parseFloat(data[x].name) * 60)) {
            dataArr.push(value);
            xDataWorld.push(parseInt(parseFloat(data[x].name) * 60));
        }
    }
    ;

    //模拟空白x轴
    mockXdataMethodWorld(endStart);
    let item = {
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

//传入字符串获取单位
function dealUnit(str) {
    if (str.indexOf("(") > -1 && str.indexOf(")") > -1) {
        let result = str.substr(str.indexOf("(") + 1, str.indexOf(")"));
        result = result.substr(0, result.indexOf(")"));
        return result;
    }
    return "";
}

function resetOptionsWorld(obj) {
    showLegendDataWorld = checkBoxValesWorld();
    interval_count1World = 0;
    interval_count2World = 0;
    createEchartsWorld(false, obj);
}



//视频加载动画淡出
function loadingAnimateOut(type, time) {
    //alert(type)
    // console.log("调用loadingAnimateOut");
    if (type === "curve") {
        // console.log("曲线调用loadingAnimateOut");
        $(".item.curve>.sheshi_right_left>.loadingAnimation").fadeOut(time, function () {
            clearTimeout(loadingAnimateCurveLoop);
        })
    } else {
        console.log("视频调用loadingAnimateOut");
        $monitoring.find(".bigVideoBox>.loadingAnimation,.smallVideoBox>.loadingAnimation").fadeOut(time, function () {
            clearTimeout(loadingAnimateVideoLoop);
        })
    }
}

//判断数组中某个元素下标
function isHasElementOne(arr, value) {
    for (let i = 0, vlen = arr.length; i < vlen; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
}

//生成echarts图形
function createEchartsWorld(isFirst, obj) {
    if (isFirst) {
        dealSeriesDataWorld();
        getChartsWorld1();
        getChartsWorld2();
    } else {
        //重绘线
        dealSeriesData2World(obj);
        let opt1 = myChartCurve1.getOption();
        let opt2 = myChartWorld2.getOption();
        myChartCurve1.clear();
        myChartWorld2.clear();
        opt1.xAxis = [{data: xDataWorld.concat(mockXdataWorld)}];
        opt1.series = seriesTopDataWorld;
        myChartCurve1.setOption(opt1);

        opt2.xAxis = [{data: xDataWorld.concat(mockXdataWorld)}];
        opt2.series = seriesBottomDataWorld;
        myChartWorld2.setOption(opt2);
    }
}

//生成图例控制
function createLegendHtmlsWorld() {
    let htmls = '';
    let width = 10 * bodyScale + "px";
    for (let x = 0; x < legendDataWorld.length; x++) {
        //如果是默认选择的 复选选中
        /*
                if (isHasElementOne(showlegendDataWorld, legendDataWorld[x]) != -1) {
                    htmls += '<li style="width: 100%;display: inline-block"><input style="margin-right: 2%;margin-top: 0;float: left;width:' + width + ';height:' + width + '" type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" checked><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><span  style="color:#fff;display:inline-block;float: left;" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '</span><span style="color: #66ccff;margin-left: 2%;float:left;">' + legendNumDataWorld[x] + '</span></li><br>'
                } else {
                    htmls += '<li style="width: 100%;display: inline-block;"><input style="margin-right: 2%;margin-top: 0;float: left;width:' + width + ';height:' + width + '" type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" ><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><span  style="color:#fff;display:inline-block;float: left;" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '</span><span style="color: #66ccff;margin-left: 2%;float:left;">' + legendNumDataWorld[x] + '</span></li><br>'
                }
        */

        let isChecked = "";
        if (isHasElementOne(showlegendDataWorld, legendDataWorld[x]) !== -1) {
            isChecked = "checked";
        }
        htmls += '<li><input type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" ' + isChecked + '><span class="colorBlock" style="background-color:' + colorData[x] + ';"></span><span class="name" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '</span><span>' + legendNumDataWorld[x] + '</span></li>'
    }
    console.log($("#legend_ul_world").html(htmls).children())
    $("#legend_ul_world").html(htmls).children().filter(":gt(15)").hide();

}

function randomLegendWorld() {
    let num = 0;
    $.each(totalLegendNameWorld, function (index, item) {
        if (item.indexOf("℃") == -1) {
            showlegendDataWorld.push(dealBracketForObj(item));
        } else if (num < 15) {
            showlegendDataWorld.push(dealBracketForObj(item));
            num++;
        }
    })
}

function dealBracketForObj(obj) {
    if (obj.indexOf("(") > -1) {
        return obj.substr(0, obj.indexOf("("));
    }
    return obj;
}

//处理括号
function dealBracket(arr) {
    let result = [];
    for (let x = 0; x < arr.length; x++) {
        result.push(dealBracketForObj(arr[x]));
    }
    return result;
}

function increaseBracketForObj(obj) {
    if (obj.indexOf("(") > -1) {
        return obj.substr(obj.indexOf("(") + 1, obj.indexOf(")") - obj.indexOf("(") - 1);
    }
    return obj;
}
