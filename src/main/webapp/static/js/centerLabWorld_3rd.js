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
let myChartWorld1;
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
let option_world;
let option2_world;

let configName;
let startTime;
let com_yAxis = {
    type: 'value',
    nameGap: nameGap,
    nameTextStyle: nameTextStyle,
    axisLine: { //坐标轴线
        show: true,
        lineStyle: {
            color: '#ddd'
        }
    },
    axisLabel: {   //坐标轴标签
        show: true,
        margin:5*bodyScale,
        textStyle: {
            color: '#4397f7',
            fontSize: 12 * bodyScale
        }
    },
    splitLine: {  //刻度线
        show: true,
        lineStyle: {
            color: '#ddd'
        }
    },
    axisTick: {  //刻度值
        show: false
    },
    lineStyle: {
        normal: {
            width: 0.5 * bodyScale
        }
    },
    symbolSize: 1 * bodyScale
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
        x: '14%',
        x2: '15%',
        y: '15%',
        y2: '4%'                  //下移使两个图重叠
    },
    xAxis:

        [{
            type: 'category',
            axisLine: { //坐标轴线
                lineStyle: {
                    color: '#4397f7'
                }
            },
            axisLabel: {   //坐标轴标签
                show: true,
                textStyle: {
                    color: '#4397f7',
                    fontSize: 12 * bodyScale
                }
            },
            splitLine: {  //刻度线
                show: false
            },
            axisTick: {  //刻度值
                show: false
            }
        }],

    yAxis: [
        $.extend({}, com_yAxis, {
            name: mSensor[0].unit + "　",
            max: 90,
            min: -30,
            position: 'left',
            offset: 40 * bodyScale
        }),
        $.extend({}, com_yAxis, {
            name: "Hz" + "　",
            max: 100,
            min: 0,
            position: 'left',
            offset: 10 * bodyScale
        }),
        $.extend({}, com_yAxis, {
            name: "　" + "%",
            max: 100,
            min: 0,
            position: 'right',
            offset: 10 * bodyScale
        }),
        $.extend({}, com_yAxis, {
            name: "　" + "V",
            max: 100,
            min: 0,
            position: 'right',
            offset: 40 * bodyScale
        })
    ],
};

// 加载曲线图表
function getChartsWorld1() {
    myChartWorld1.clear();
    option_world = $.extend(true, {}, com_opt, {
        xAxis: {
            axisTick: {  //刻度值
                show: false
            },
            axisLabel: {
                show: false
            }
        },

        series: seriesTopDataWorld
    })
    myChartWorld1.setOption(option_world);
    echarts.connect([myChartWorld1, myChartWorld2]);
    myChartWorld1.setOption({
        series: getAnimation(seriesTopDataWorld)
    });
}
// 加载曲线图表
function getChartsWorld2() {

    option2_world = $.extend(true, {}, com_opt, {
        grid: {
            y: '4%',
            y2: "12%"
        },
        xAxis: [
            {
                type: 'category',
                data: xDataWorld.concat(mockXdataWorld),

            }
        ],
        yAxis:[
            {
                name: "V"+"　　",
                max: 300,
                min: 0,
                nameLocation: 'start'
            },{
                name: "A"+"　　",
                nameLocation: 'start'
            },{
                name: "　"+"W",
                nameLocation: 'start'
            },{
                name: "　"+"kW·h",
                nameLocation: 'start'
            }
        ],
        series: seriesBottomDataWorld
    })

    myChartWorld2.clear();
    myChartWorld2.setOption(option2_world,true);
    echarts.connect([myChartWorld1, myChartWorld2]);
    myChartWorld2.setOption({
        series: getAnimation(seriesBottomDataWorld)
    });

}

//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoCenterTabAjaxWorldHadoop(type) {
    let labs = labsMap.get(type);
    let labCode = labs.lab_code;
    let $l3x3 = $("#l");
    configName = labs.souce_value;
    //清除检测中心定时器
    window.clearInterval(intevalChart1);
    window.clearInterval(intevalChartHadoop);

    //生成下拉
    $.post(contextPath + '/hadoop/unitInfo', {"configName": configName, "labCode": labCode}, function (data) {
        let htmls = labsHtmlsMap.get(type);
        //console.log(".......拼ul之前的HTML",htmls)
        htmls += "<ul>";
        $.each(data, function (index, item) {
            // console.log(item)
            if (item.istesting) {
                htmls += '<li class="istesting" onclick=findSensorTypeInfoHadoop(\"' + labCode + '\",\"' + item.testunitid + '\")>台位：' + item.testunitname + '  (' + item.testunitstatus + ')</li>';
            } else {
                htmls += '<li>台位：' + item.testunitname + '  (' + item.testunitstatus + ')</li>';
            }
        });
        htmls += '</ul>';
        $(".lab_code_" + labCode + "_" + type).html(htmls);
        $(".lab_code_" + labCode + "_" + type).find("header").attr("onclick", "");
        $(".lab_code_" + labCode + "_" + type).find("ul>li[class='istesting']:eq(0)").click();
    });
}

//查询y轴信息
function findSensorTypeInfoHadoop(labCode, testUnitId) {
    window.clearInterval(intevalChartHadoop);
    $.post(contextPath + "/hadoop/sensorTypeInfo", {"configName": configName, "labCode": labCode}, function (data) {
        resetDataCenterLabWorld();
        currentDataWorld = data;
        //console.log(data)
        //根据实验室-台位-传感器对照表 生成y轴信息 最多8个轴 如果多于8 其余默认展示左下
        $.each(data, function (index, item) {
            if (index < 4) {
                topParamWorld.push(item.unit);
            } else if (index >= 4 && index < 8) {
                bottomParamWorld.push(item.unit);
            }
        });
        //获取曲线具体数据
        findTestDataHadoop(labCode, testUnitId);
    });
}

function findTestDataHadoop(labCode, testUnitId) {
    window.clearInterval(intevalChartHadoop);
    mlabTypeCode = labCode;
    mtestUnitId = testUnitId;
    startTime = parseInt(new Date().getTime() / 1000); // 当前时间戳
    console.log(timestampFormat(startTime))
    $("#center_sybh_id_world").html('');
    $("#center_ypbm_id_world").html('');
    $("#center_cpxh_id_world").html('');
    $("#center_testPro_id_world").html('');
    $.post(contextPath + "/hadoop/testData", {
        "configName": configName,
        "labCode": labCode,
        "startTime": timestampFormat(startTime),
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
        if (data.testunitstatus != "" && data.testPro != undefined) {
            $("#center_testPro_id_world").parent("li").css("display", "inline-block");
            $("#center_testPro_id_world").html(data.testunitstatus);
        } else {
            $("#center_testPro_id_world").parent("li").css("display", "none");
        }
        //showlegendDataWorld=legendDataWorld;//默认全选
        //console.log(showlegendDataWorld)
        createLegendHtmlsWorld();
        createEchartsWorld(true);
        $("#legend_ul_world").find("li").last().find("input").trigger("click");
        $("#legend_ul_world").find("li").last().find("input").trigger("click");
        //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新
        intevalChartHadoop = setInterval("intervalChangeDataHadoop()", 30000);
        myChartWorld1.hideLoading();
        myChartWorld2.hideLoading();
    });
}

function intervalChangeDataHadoop() {
    window.clearInterval(intevalChartHadoop);
    //console.log("----intevalChart1-----------"+intevalChart1)
    let nt = new Date();//定义一个新时间
    nt.setTime(startTime * 1000 + 1000 * 60 * 0.5);//设置新时间比旧时间多一分钟
    startTime = nt.getTime() / 1000;
    console.log(timestampFormat(startTime))
    $.post(contextPath + "/hadoop/testData", {
        "configName": configName,
        "labCode": mlabTypeCode,
        "testUnitId": mtestUnitId,
        "startTime": timestampFormat(startTime),
        "interval": " 0.5"
    }, function (data) {
        intevalChartHadoop = setInterval("intervalChangeDataHadoop()", 30000);
        dealIntervalSeriesDataWorld(data);
        createLegendHtmlsWorld();
        //上方处理
        for (let i = 0; i < intervalSeriesTopDataWorld.length; i++) {
            for (let x = 0; x < intervalSeriesTopDataWorld[i].length; x++) {
                seriesTopDataWorld[i].data.shift();
                seriesTopDataWorld[i].data.push(intervalSeriesTopDataWorld[i][x].value);
            }
        }
        //下方处理
        for (let i = 0; i < intervalSeriesBottomDataWorld.length; i++) {
            for (let x = 0; x < intervalSeriesBottomDataWorld[i].length; x++) {
                if (i == 0) {
                    let mIndex = isHasElementOne(xDataWorld, parseInt(parseFloat(intervalSeriesBottomDataWorld[i][x].name) * 60));
                    if (parseInt(mIndex) == -1) {
                        let preData = xDataWorld.shift();
                        xDataWorld = removeReport(xDataWorld, preData);
                        xDataWorld.push(parseInt(parseFloat(intervalSeriesBottomDataWorld[i][x].name) * 60));
                    }
                }

                seriesBottomDataWorld[i].data.shift();
                seriesBottomDataWorld[i].data.push(intervalSeriesBottomDataWorld[i][x].value);
            }
        }
        let endStart = xDataWorld[xDataWorld.length - 1];
        //模拟空白x轴
        mockXdataMethodWorld(endStart);
        myChartWorld1.setOption({
            xAxis: [
                {data: xDataWorld.concat(mockXdataWorld)}],
            series: seriesTopDataWorld,
        });
        myChartWorld2.setOption({
            xAxis: [
                {data: xDataWorld.concat(mockXdataWorld)}],
            series: seriesBottomDataWorld,
        });

    });
}

//处理线series 定时器使用
let intervalSeriesTopDataWorld = [];
let intervalSeriesBottomDataWorld = [];

function dealIntervalSeriesDataWorld(mData) {
    intervalSeriesTopDataWorld = [];
    intervalSeriesBottomDataWorld = [];
    //处理图例中数变化
    if (mData.list) {
        for (let i = 0; i < mData.list.length; i++) {
            let cM = mData.list[i];
            if (cM.data != null && cM.data.length > 0) {
                legendNumDataWorld[i] = cM.data[cM.data.length - 1].value + increaseBracketForObj(cM.name);
            }
        }
        ;
    }

    for (let x = 0; x < totalLegendNameWorld.length; x++) {
        let currentName = totalLegendNameWorld[x];
        let data = [];
        for (let i = 0; i < mData.list.length; i++) {
            if (mData.list[i].name == currentName) {
                data = mData.list[i].data;
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
                    intervalSeriesTopDataWorld.push(data);
                } else if (bottomIndex > -1 && isHasElementOne(showlegendDataWorld, dealBracketForObj(currentName)) > -1) {
                    //展示在下半部分
                    intervalSeriesBottomDataWorld.push(data);
                }
            } else {
                //没有配置 默认画到左下
                intervalSeriesBottomDataWorld.push(data);
            }
        }
    }
};

function timestampFormat(timestamp) {
    let d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    let month = (d.getMonth() + 1);
    if (month < 9) {
        month = "0" + month;
    }
    let date = (d.getFullYear()) + "-" +
        month + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;
}


//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoCenterTabAjaxWorld(type) {
    let labs = labsMap.get(type);
    let labCode = labs.lab_code;
    window.clearInterval(intevalChart1);
    let htmls = "";
    $.post(contextPath + "/lab/loadJsonProByDataCenterIdAjax", {"labCode": labCode}, function (data) {
        let htmls = labsHtmlsMap.get(type);
        htmls += "<ul>";
        $.each(data, function (index, item) {
            // console.log(item)
            htmls += '<li class="istesting" onclick=findSensorByLabCenetrTabAjaxWorld(\"' + labCode + '\",\"' + item.pro_code + '\",\"' + item.file_name + '\")>' + item.pro_name + '</li>';
            /*if(index==0){
                findSensorByLabCenetrTabAjaxWorld(labCode,item.pro_code,item.file_name);

            }*/
        });
        htmls += '</ul>';

        $(".lab_code_" + labCode + "_" + type).html(htmls);
        $(".lab_code_" + labCode + "_" + type).find("header").attr("onclick", "");
        $(".lab_code_" + labCode + "_" + type).find("ul>li[class='istesting']:eq(0)").click();
    });


}

function resetDataCenterLabWorld() {
    myChartWorld1 = echarts.init(document.getElementById('main1_world'));
    myChartWorld2 = echarts.init(document.getElementById('main2_world'));
    myChartWorld1.clear();
    myChartWorld2.clear();
    loadingAnimate($("#main1_world").parent().find(".loadingAnimation"), "数据正在接入");
    /*    myChartWorld1.showLoading({
            text : '数据正在接入...',
            effect: 'whirling',
            maskColor:"rgba(0,0,0,0)",
            textColor:"#64ccff",
            textStyle:{
                color:"0f0",
                fontSize:120
            }
        });
        myChartWorld2.showLoading({
            text : '数据正在接入...',
            effect: 'whirling',
            maskColor:"rgba(0,0,0,0)",
            textColor:"#64ccff",
            textStyle : {
                fontSize : 200
            }
        });*/
    $("#legend_ul_world").html('');
    legendDataWorld = [];
    legendNumDataWorld = [];
    showlegendDataWorld = [];//需要展示图例 自定义
    seriesTopDataWorld = [];
    seriesBottomDataWorld = [];
    topParamWorld = [];//上方y参数单位
    bottomParamWorld = [];//下方y轴单位
    totalLegendNameWorld = [];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
    interval_count1World = 0;
    interval_count2World = 0;
}

//获取传感器信息 用于生成y轴
function findSensorByLabCenetrTabAjaxWorld(labTypeCode, testUnitId, fileName) {
    console.log("findSensorByLabCenetrTabAjaxWorld")
    if (mDataCenterId == "12") {
        mSensor[0].unit = '°F';
    } else {
        mSensor[0].unit = '℃';
    }
    resetDataCenterLabWorld();
    currentDataWorld = mSensor;
    //根据实验室-台位-传感器对照表 生成y轴信息 最多8个轴 如果多于8 其余默认展示左下
    $.each(mSensor, function (index, item) {
        if (index < 4) {
            topParamWorld.push(item.unit);
        } else if (index >= 4 && index < 8) {
            bottomParamWorld.push(item.unit);
        }
    });
    //获取曲线具体数据
    findSensorDataCenetrTabAjaxWorld(labTypeCode, testUnitId, fileName);
}

function findSensorDataCenetrTabAjaxWorld(labTypeCode, testUnitId, fileName) {
    if (labTypeCode == "USLABXYJ") {
        loadingAnimateOut("curve", 500);
        return;
    }
    mlabTypeCode = labTypeCode;
    mtestUnitId = testUnitId;
    $("#center_sybh_id_world").html('');
    $("#center_ypbm_id_world").html('');
    $("#center_cpxh_id_world").html('');
    $("#center_testPro_id_world").html('');
    $.post(contextPath + "/lab/getJsonFile", {"fileName": fileName}, function (data) {
        // loadingAnimateOut("curve", 500);
        setTimeout(function () {
            if (data == "") {
                //alert("暂未开测");
                return;
            }
            data = eval("(" + data + ")");
            console.log(data)
            myChartWorld1.clear();
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
            if (data.testPro != "" && data.testPro != undefined) {
                $("#center_testPro_id_world").parent("li").css("display", "inline-block");
                $("#center_testPro_id_world").html(data.testPro);
            } else {
                $("#center_testPro_id_world").parent("li").css("display", "none");
            }
            //showlegendDataWorld=legendDataWorld;//默认全选
            //console.log(showlegendDataWorld)
            createLegendHtmlsWorld();
            createEchartsWorld(true);
            //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新
            $("#legend_ul_world").find("li").last().find("input").trigger("click");
            $("#legend_ul_world").find("li").last().find("input").trigger("click");
            // myChartWorld1.hideLoading();
            // myChartWorld2.hideLoading();
            loadingAnimateOut("curve", 500);

        }, 1000)
    });
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
    // console.log(seriesTopDataWorld)
    // console.log(xDataWorld)
};

//处理线series
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
        ;
        let topIndex = isHasElementOne(topParamWorld, dealUnit(currentName));
        let bottomIndex = isHasElementOne(bottomParamWorld, dealUnit(currentName));
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

function joinSeriseWorld(data, name, index, colorIndex) {
    let dataArr = [];
    xDataWorld = [];
    //获取最后时间
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
    // console.log(data.length+"---endStart="+endStart+"---startTime="+startTime)
    //模拟空白x轴
    mockXdataMethodWorld(endStart);
    //console.log(dataArr)
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
    if (index > 0) {
        item.yAxisIndex = index;
    }
    return item;
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

//模拟空白x轴
function mockXdataMethodWorld(endStart) {

    mockXdataWorld = [];
    //模拟空白x轴
    for (let x = 1; x < 90; x++) {
        let value = parseInt((parseFloat(endStart) + x));
        mockXdataWorld.push(value);
    }
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
        let opt1 = myChartWorld1.getOption();
        let opt2 = myChartWorld2.getOption();
        myChartWorld1.clear();
        myChartWorld2.clear();
        opt1.xAxis = [{data: xDataWorld.concat(mockXdataWorld)}];
        $.extend(true,opt1,{data: xDataWorld.concat(mockXdataWorld)});
        opt1.series = seriesTopDataWorld;
        myChartWorld1.setOption(opt1);

        // opt2.xAxis = [{data: xDataWorld.concat(mockXdataWorld)}];
        $.extend(true,opt2,{data: xDataWorld.concat(mockXdataWorld)})
        opt2.series = seriesBottomDataWorld;
        myChartWorld2.setOption(opt2);
    }
}


//生成图例控制
function createLegendHtmlsWorld() {
    let htmls = '';
    let width = 10 * bodyScale + "px";
    for (let x = 0; x < legendDataWorld.length; x++) {
        let isChecked = "";
        if (isHasElementOne(showlegendDataWorld, legendDataWorld[x]) !== -1) {
            isChecked = "checked";
        }
        htmls += '<li><input type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" ' + isChecked + '><span class="colorBlock" style="background-color:' + colorData[x] + ';"></span><span class="name" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '</span><span>' + legendNumDataWorld[x] + '</span></li>'
    }
    // console.log($("#legend_ul_world").html(htmls).children())
    $("#legend_ul_world").html(htmls).children().filter(":gt(15)").hide();
}

function resetOptionsWorld(obj) {
    showLegendDataWorld = checkBoxValesWorld();
    interval_count1World = 0;
    interval_count2World = 0;
    createEchartsWorld(false, obj);
}

function checkBoxValesWorld() { //jquery获取复选框值
    let chk_value = [];
    $('input[name="legendcheckbox_world"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
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

