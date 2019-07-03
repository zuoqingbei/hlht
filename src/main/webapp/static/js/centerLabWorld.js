var mSensor = [
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
var myChartWorld1;
var myChartWorld2;

var xDataWorld;//x轴坐标数据--对应时间
var legendDataWorld = [];//需要把全部图例放入里面 保证名称不同
var legendNumDataWorld = [];
var showlegendDataWorld = [];//需要展示图例 自定义
var seriesTopDataWorld = [];
var seriesBottomDataWorld = [];
var topParamWorld = [];//上方y参数单位
var bottomParamWorld = [];//下方y轴单位
var currentDataWorld;//当前传感器y信息数据 用于生成y轴
var totalLegendNameWorld = [];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
var interval_count1World = 0;
var interval_count2World = 0;
var mockxDataWorld = [];//模拟的x轴数据
var intevalChartHadoop;
var option_world;

var configName;
var startTime;


//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoCenterTabAjaxWorldHadoop(type) {
	var labs=labsMap.get(type);
	var labCode=labs.lab_code;
	var $l3x3 = $("#l");
	configName=labs.souce_value;
	//清除检测中心定时器
	window.clearInterval(intevalChart1);
	window.clearInterval(intevalChartHadoop);

    //生成下拉
	$.post(contextPath+'/hadoop/unitInfo',{"configName":configName,"labCode":labCode},function(data){
		var htmls=labsHtmlsMap.get(type);
		//console.log(".......拼ul之前的HTML",htmls)
		htmls+="<ul>";
		$.each(data,function(index,item){
			 // console.log(item)
			if(item.istesting){
				htmls+='<li class="istesting" onclick=findSensorTypeInfoHadoop(\"'+labCode+'\",\"'+item.testunitid+'\")>台位：'+item.testunitname+'  ('+item.testunitstatus+')</li>';
			}else{
				htmls+='<li>台位：'+item.testunitname+'  ('+item.testunitstatus+')</li>';
			}
		/*	if(index==0){
				// console.log(item.testunitlist)
				findSensorTypeInfoHadoop(labCode,item.testunitid);
			}*/
		});
		htmls+='</ul>';
		//$(".quxian_li_"+type).append(htmls);
        //$(".quxian_li_"+type).find("ul:eq(0)>li:eq(0)>ul>li:eq(0)").trigger("click");
		$(".lab_code_"+labCode+"_"+type).html(htmls);
		$(".lab_code_"+labCode+"_"+type).find("header").attr("onclick","");
        $(".lab_code_"+labCode+"_"+type).find("ul>li[class='istesting']:eq(0)").click();
	});
}
//查询y轴信息
function findSensorTypeInfoHadoop(labCode,testUnitId){
	window.clearInterval(intevalChartHadoop);
	$.post(contextPath+"/hadoop/sensorTypeInfo",{"configName":configName,"labCode":labCode},function(data){
	    resetDataCenterLabWorld();
		currentDataWorld=data;
		//console.log(data)
		//根据实验室-台位-传感器对照表 生成y轴信息 最多8个轴 如果多于8 其余默认展示左下
		$.each(data,function(index,item){
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
    startTime=parseInt(new Date().getTime()/1000); // 当前时间戳
    console.log(timestampFormat(startTime));
    $("#center_sybh_id_world").html('');
    $("#center_ypbm_id_world").html('');
    $("#center_cpxh_id_world").html('');
    $("#center_testPro_id_world").html('');
    $.post(contextPath + "/hadoop/testData", {"configName":configName,"labCode":labCode,"startTime":timestampFormat(startTime),"testUnitId":testUnitId}, function (data) {
    	loadingAnimateOut("curve", 500);
    	if (data == "") {
            return;
        }
    	myChart1.clear();
		myChart2.clear();
		myChartWorld1.clear();
	    myChartWorld2.clear();
        $("#legend_ul_world").html('');
        dataBase=data;
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
        if(data.testunitstatus!=""&&data.testPro!=undefined){
        	 $("#center_testPro_id_world").parent("li").css("display","inline-block");
        	 $("#center_testPro_id_world").html(data.testunitstatus);
        }else{
        	 $("#center_testPro_id_world").parent("li").css("display","none");
        }
        //showlegendDataWorld=legendDataWorld;//默认全选
        //console.log(showlegendDataWorld)
        createLegendHtmlsWorld();
        createEchartsWorld(true);
        $("#legend_ul_world").find("li").last().find("input").trigger("click");
        $("#legend_ul_world").find("li").last().find("input").trigger("click");
        //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新
		intevalChartHadoop=setInterval("intervalChangeDataHadoop()", 30000);
		myChartWorld1.hideLoading();
	    myChartWorld2.hideLoading();
    });
}
function intervalChangeDataHadoop() {
	window.clearInterval(intevalChartHadoop);
	//console.log("----intevalChart1-----------"+intevalChart1)
	var nt=new Date();//定义一个新时间
    nt.setTime(startTime*1000+1000*60*0.5);//设置新时间比旧时间多一分钟
	startTime=nt.getTime()/1000;
	console.log(timestampFormat(startTime))
	$.post(contextPath+"/hadoop/testData",{"configName":configName,"labCode":mlabTypeCode,"testUnitId":mtestUnitId,"startTime":timestampFormat(startTime),"interval":" 0.5"},function(data){
		intevalChartHadoop=setInterval("intervalChangeDataHadoop()", 30000);
		dealIntervalSeriesDataWorld(data);
		createLegendHtmlsWorld();
		//上方处理
		for(var i=0; i<intervalSeriesTopDataWorld.length;i++){
			for(var x=0;x<intervalSeriesTopDataWorld[i].length;x++){
				seriesTopDataWorld[i].data.shift();
				seriesTopDataWorld[i].data.push(intervalSeriesTopDataWorld[i][x].value);
			}
		}
		//下方处理
		for(var i=0; i<intervalSeriesBottomDataWorld.length;i++){
			for(var x=0;x<intervalSeriesBottomDataWorld[i].length;x++){
				if(i==0){
					var mIndex=isHasElementOne(xDataWorld,parseInt(parseFloat(intervalSeriesBottomDataWorld[i][x].name)*60));
					if(parseInt(mIndex)==-1){
						var preData=xDataWorld.shift();
						xDataWorld=removeReport(xDataWorld,preData);
						xDataWorld.push(parseInt(parseFloat(intervalSeriesBottomDataWorld[i][x].name)*60));
					}
				}

				seriesBottomDataWorld[i].data.shift();
				seriesBottomDataWorld[i].data.push(intervalSeriesBottomDataWorld[i][x].value);
			}
		}
		var endStart=xDataWorld[xDataWorld.length-1];
		//模拟空白x轴
		mockXdataMethodWorld(endStart);
		myChartWorld1.setOption({
			xAxis:[
			       {data:xDataWorld.concat(mockXdataWorld)}],
			       series: seriesTopDataWorld,
		});
		myChartWorld2.setOption({
			xAxis:[
			       {data:xDataWorld.concat(mockXdataWorld)}],
			       series: seriesBottomDataWorld,
		});
		
	});
}
//处理线series 定时器使用
var intervalSeriesTopDataWorld=[];
var intervalSeriesBottomDataWorld=[];
function dealIntervalSeriesDataWorld(mData){
	intervalSeriesTopDataWorld=[];
	intervalSeriesBottomDataWorld=[];
	//处理图例中数变化
    if(mData.list){
        for(var i=0;i<mData.list.length;i++){
            var cM=mData.list[i];
            if(cM.data!=null&&cM.data.length>0){
                legendNumDataWorld[i]=cM.data[cM.data.length-1].value+increaseBracketForObj(cM.name);
            }
        };
    }

	for(var x=0;x<totalLegendNameWorld.length;x++){
		var currentName=totalLegendNameWorld[x];
		var data=[];
		for(var i=0;i<mData.list.length;i++){
			if(mData.list[i].name==currentName){
				data=mData.list[i].data;
			}
		};
		var checked=false;
		$('input[name="legendcheckbox_world"]:checked').each(function(){
			if($(this).val()==dealBracketForObj(currentName)){
				checked=true;
			};
		});
		if(checked){
			var topIndex=isHasElementOne(topParamWorld,dealUnit(currentName));
			var bottomIndex=isHasElementOne(bottomParamWorld,dealUnit(currentName));
			if(topIndex>-1||bottomIndex>-1){
				if(topIndex>-1&&isHasElementOne(showlegendDataWorld,dealBracketForObj(currentName))>-1){
					//展示在上半部分
					intervalSeriesTopDataWorld.push(data);
				}else if(bottomIndex>-1&&isHasElementOne(showlegendDataWorld,dealBracketForObj(currentName))>-1){
					//展示在下半部分
					intervalSeriesBottomDataWorld.push(data);
				}
			}else{
				//没有配置 默认画到左下
				intervalSeriesBottomDataWorld.push(data);
			}
		}
	}
};

function timestampFormat(timestamp){
	var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
	var month= (d.getMonth() + 1);
	if(month<9){
		month="0"+month;
	}
	var date = (d.getFullYear()) + "-" + 
	month + "-" +
	           (d.getDate()) + " " + 
	           (d.getHours()) + ":" + 
	           (d.getMinutes()) + ":" + 
	           (d.getSeconds());
	return date;
}


//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoCenterTabAjaxWorld(type) {
	var labs=labsMap.get(type);
	var labCode=labs.lab_code;
	window.clearInterval(intevalChart1);
    var htmls = "";
    $.post(contextPath+"/lab/loadJsonProByDataCenterIdAjax",{"labCode":labCode},function(data){
    	var htmls=labsHtmlsMap.get(type);
		htmls+="<ul>";
		$.each(data,function(index,item){
			// console.log(item)
			htmls+='<li class="istesting" onclick=findSensorByLabCenetrTabAjaxWorld(\"'+labCode+'\",\"'+item.pro_code+'\",\"'+item.file_name+'\")>'+item.pro_name+'</li>';
			/*if(index==0){
				findSensorByLabCenetrTabAjaxWorld(labCode,item.pro_code,item.file_name);

			}*/
		});
		htmls+='</ul>';
		 
		$(".lab_code_"+labCode+"_"+type).html(htmls);
		$(".lab_code_"+labCode+"_"+type).find("header").attr("onclick","");
        $(".lab_code_"+labCode+"_"+type).find("ul>li[class='istesting']:eq(0)").click();
    });

    


}
function resetDataCenterLabWorld() {
    myChartWorld1 = echarts.init(document.getElementById('main1_world'));
    myChartWorld2 = echarts.init(document.getElementById('main2_world'));
    myChartWorld1.clear();
    myChartWorld2.clear();
    loadingAnimate($("#main1_world").parent().find(".loadingAnimation"),"数据正在接入");
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
function findSensorByLabCenetrTabAjaxWorld(labTypeCode, testUnitId,fileName) {
	if(mDataCenterId=="12"){
		mSensor[0].unit= '°F';
	}else{
		mSensor[0].unit= '℃';
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
    findSensorDataCenetrTabAjaxWorld(labTypeCode, testUnitId,fileName);
}

function findSensorDataCenetrTabAjaxWorld(labTypeCode, testUnitId,fileName) {
	if(labTypeCode=="USLABXYJ"){
		loadingAnimateOut("curve", 500);
		return ;
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
            data = eval("(" + data + ")");
            if (data == "") {
                //alert("暂未开测");
                return;
            }
            myChartWorld1.clear();
            myChartWorld2.clear();
            $("#legend_ul_world").html('');
            dataBase=data;
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
            if(data.testPro!=""&&data.testPro!=undefined){
                $("#center_testPro_id_world").parent("li").css("display","inline-block");
                $("#center_testPro_id_world").html(data.testPro);
            }else{
                $("#center_testPro_id_world").parent("li").css("display","none");
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
            console.log(myChartWorld1.getOption())

        },2000)
    });
}
function randomLegendWorld() {
    var num = 0;
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
    for (var x = 0; x < totalLegendNameWorld.length; x++) {
        var currentName = totalLegendNameWorld[x];
        var data = [];
        for (var i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        ;
        var checked = false;
        $('input[name="legendcheckbox_world"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        if (checked) {
            var topIndex = isHasElementOne(topParamWorld, dealUnit(currentName));
            var bottomIndex = isHasElementOne(bottomParamWorld, dealUnit(currentName));
            
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
    for (var x = 0; x < totalLegendNameWorld.length; x++) {
        var currentName = totalLegendNameWorld[x];
        var data = [];
        //没有配置 默认画到左下
        var checked = false;
        $('input[name="legendcheckbox_world"]:checked').each(function () {
            if ($(this).val() == dealBracketForObj(currentName)) {
                checked = true;
            }
            ;
        });
        for (var i = 0; i < dataBase.list.length; i++) {
            if (dataBase.list[i].name == currentName) {
                data = dataBase.list[i].data;
            }
        }
        ;
        var topIndex = isHasElementOne(topParamWorld, dealUnit(currentName));
        var bottomIndex = isHasElementOne(bottomParamWorld, dealUnit(currentName));
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
    var dataArr = [];
    xDataWorld = [];
    //获取最后时间
    var endStart;
    if(data[data.length - 1]){
        endStart = parseFloat(data[data.length - 1].name) * 60;
    }else{
        console.log(name+"data未取到数据")
    }
    var startTime = parseInt(endStart) - 60 * 2;
    for (var x = 0; x < data.length; x++) {
        var value = data[x].value;
        if (value != "N" && startTime <= parseInt(parseFloat(data[x].name) * 60)) {
            dataArr.push(value);
            xDataWorld.push(parseInt(parseFloat(data[x].name) * 60));
        }
    };
    // console.log(data.length+"---endStart="+endStart+"---startTime="+startTime)
    //模拟空白x轴
    mockXdataMethodWorld(endStart);
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
function joinSeriseOtherWorld(data, name, colorIndex) {
    var dataArr = [];
    xDataWorld = [];
    var endStart;
    if(data[data.length - 1]){
        endStart = parseFloat(data[data.length - 1].name) * 60;
    }else{
        console.log(name+"data未取到数据")
    }

    var startTime = parseInt(endStart) - 60 * 2;
    for (var x = 0; x < data.length; x++) {
        var value = data[x].value;
        if (value != "N" && startTime <= parseInt(parseFloat(data[x].name) * 60)) {
            dataArr.push(value);
            xDataWorld.push(parseInt(parseFloat(data[x].name) * 60));
        }
    }
    ;
    //模拟空白x轴
    mockXdataMethodWorld(endStart);
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
function mockXdataMethodWorld(endStart) {
	
    mockXdataWorld = [];
    //模拟空白x轴
    for (var x = 1; x < 90; x++) {
        var value = parseInt((parseFloat(endStart) + x));
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
        var opt1 = myChartWorld1.getOption();
        var opt2 = myChartWorld2.getOption();
        myChartWorld1.clear();
        myChartWorld2.clear();
        // opt1.xAxis = [{data: xDataWorld.concat(mockXdataWorld)}];
        $.extend(true,opt1,{data: xDataWorld.concat(mockXdataWorld)});
        opt1.series = seriesTopDataWorld;
        myChartWorld1.setOption(opt1);

        $.extend(true,opt2,{data: xDataWorld.concat(mockXdataWorld)});
        opt2.series = seriesBottomDataWorld;
        myChartWorld2.setOption(opt2);
    }
}
//生成图例控制
function createLegendHtmlsWorld() {
    var htmls = '';
    var width = 10 * bodyScale + "px";
    for (var x = 0; x < legendDataWorld.length; x++) {
        var isChecked = "";
        if (isHasElementOne(showlegendDataWorld, legendDataWorld[x]) !== -1) {
            isChecked = "checked";
        }
        htmls += '<li><input type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" ' + isChecked + '><span class="colorBlock" style="background-color:' + colorData[x] + ';"></span><span class="name" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '</span><span>' + legendNumDataWorld[x] + '</span></li>'
    }
    $("#legend_ul_world").html(htmls);
}
function resetOptionsWorld(obj) {
    showLegendDataWorld = checkBoxValesWorld();
    interval_count1World = 0;
    interval_count2World = 0;
    createEchartsWorld(false, obj);
}
function checkBoxValesWorld() { //jquery获取复选框值
    var chk_value = [];
    $('input[name="legendcheckbox_world"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}
function getChartsWorld1() {
// console.log(xDataWorld[xDataWorld.length-1])
    option_world = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 10*bodyScale,
            },
            axisPointer: {
                type: 'cross'
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
            y: '17%',
            y2: '5%'                  //下移负数 使两个图重叠
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
                // data: xDataWorld.concat(mockXdataWorld)
                data: function () {
                    if(xDataWorld){
                        return xDataWorld.concat(mockXdataWorld);
                    }else{
                        return null;
                    }

                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: mSensor[0].unit+"　　　",
                max: 90,
                min: -30,
                /*max:currentDataWorld[0].highvalue,
                 min:currentDataWorld[0].lowvalue,*/
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
                name: "Hz"+"　　　",
                max: 100,
                min: 0,
                /* max:currentDataWorld[1].highvalue,
                 min:currentDataWorld[1].lowvalue,*/
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
                name: "　　　"+"%",
                /* max:currentDataWorld[2].highvalue,
                 min:currentDataWorld[2].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                position: 'right',
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
                name: "　　　"+"V",
                /* max:currentDataWorld[3].highvalue,
                 min:currentDataWorld[3].lowvalue,*/
                nameGap: nameGap,
                nameTextStyle: nameTextStyle,
                position: 'right',
                offset: 40 * bodyScale,
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
        series: seriesTopDataWorld
    };
    myChartWorld1.clear();
    myChartWorld1.setOption(option_world);
    echarts.connect([myChartWorld1, myChartWorld2]);
    myChartWorld1.setOption({
        series: getAnimation(seriesTopDataWorld)
    });
}

function getChartsWorld2() {

    option2_world = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            textStyle: {
                fontSize: 10*bodyScale,
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
                name: "V"+"　　　",
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
                name: "A"+"　　　",
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
                name: "　　　"+"W",
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
                name: "　　　"+"kW·h",
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

    echarts.connect([myChartWorld1, myChartWorld2]);
    myChartWorld2.setOption({
        series: getAnimation(seriesBottomDataWorld)
    });

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

