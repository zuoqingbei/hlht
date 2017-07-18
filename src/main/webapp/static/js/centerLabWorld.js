var mSensor=[
             {'unit':'℃','sensor_type_id':1,'highvalue':1000,'sort':1,'legend':'1:温度(℃)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'温度','lowvalue':-100},
             {'unit':'Hz','sensor_type_id':6,'highvalue':2000,'sort':6,'legend':'6:频率(Hz)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'频率','lowvalue':0},
             {'unit':'%','sensor_type_id':8,'highvalue':300,'sort':8,'legend':'8:湿度(%)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'湿度','lowvalue':0},
             {'unit':'V','sensor_type_id':2,'highvalue':3000,'sort':2,'legend':'2:电压(V)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'电压','lowvalue':0},
             {'unit':'A','sensor_type_id':3,'highvalue':2000,'sort':3,'legend':'3:电流(A)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'电流','lowvalue':0},
             {'unit':'W','sensor_type_id':4,'highvalue':8000,'sort':4,'legend':'4:功率(W)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'功率','lowvalue':0},
             {'unit':'kW·h','sensor_type_id':5,'highvalue':2000,'sort':5,'legend':'5:耗电量(kW·h)','lab_code':'refrigeratorkekao01','test_unit_id':1,'sensor_type_name':'耗电量','lowvalue':0}
             ];
var myChartWorld1;
var myChartWorld2;

var xDataWorld;//x轴坐标数据--对应时间
var legendDataWorld=[];//需要把全部图例放入里面 保证名称不同
var legendNumDataWorld=[];
var showlegendDataWorld=[];//需要展示图例 自定义
var seriesTopDataWorld=[];
var seriesBottomDataWorld=[];
var topParamWorld=[];//上方y参数单位
var bottomParamWorld=[];//下方y轴单位
var currentDataWorld;//当前传感器y信息数据 用于生成y轴
var totalLegendNameWorld=[];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
var interval_count1World=0;
var interval_count2World=0;
var mockxDataWorld=[];//模拟的x轴数据


//实验室文本信息
var labInfos=[];
labInfos[0]="日本研发中心拥有冰箱检测实验室39个，测试台位290个，具备冰箱性能、结构、电子电器以及超前研发技术检测能力。The Japan R&D Center has 39 refrigerator testing labs, 290 test stations, covering the testing capabilitiesof  refrigerator performance, structure, electronic and electrical appliances and advanced R&D technology."
labInfos[1]="Haier Thailand ACF have own testing laboratory，which can do the normal cooling capacity testing with our engineer. ACF also can develop new product with local parts."
labInfos[2]="3 main labs on Auckland site: Refrigeration Test Lab，Refrigeration Evaluation Lab，Laundry Evaluation Lab2 main labs on Dunedin site: Cooking Evaluation Lab，Dishwashing Evaluation LabLab capacity including hundreds of testing items for both Compliance Testing & Development Testing based on advanced and reliable measurement system and skilled lab techs."
//  实验室图片信息
var labImgs=["../static/img/labMain/Japan.png","../static/img/labMain/NewZealand.png","../static/img/labMain/Thailand.png"];

//'#labName'    实验室标题名
//'#labnameIcon'  实验室标题名按钮
//'#secondName'  实验室名小标题
var labname=['日本实验室','泰国实验室','新西兰实验室']
//加载实验室与台位对照关系 生刷选框
function loadLabUnitInfoCenterTabAjaxWorld(type){
	console.log(labInfos[type])
	 $(".labMain_cblt_tone").html("<h3>基本介绍</h3>"+"<p style:'font-size:1.3em'>"+labInfos[type]+"</p>");
	 $(".labMain_cblt_ttwo img").attr("src",labImgs[type]);
     $('#labName').html(labname[type]);
    $('#labnameIcon').html(labname[type]);
    $('#secondName').html(labname[type]);
	 var htmls="";
     //console.log(data)
	 if(type==0){
		 //日本
		 htmls+=' <li><span></span><a href="javascript:void(0);">冰箱D室</a>';
		 htmls+='<ul class="taiwei_hide">';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20160830QDZBX005","D4")>台位：D4 (在用)</li>';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20160830QDZBX005","D5")>台位：D5 (在用)</li>';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20160830QDZBX005","D6")>台位：D6 (在用)</li>';
		 htmls+='</ul>';
		 htmls+=' </li>';
		 findSensorByLabCenetrTabAjaxWorld("HR20160830QDZBX005","D4");
	 }else if(type==1){
		 //泰国
		 htmls+=' <li><span></span><a href="javascript:void(0);">焓差室</a>';
		 htmls+='<ul class="taiwei_hide">';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20160407QDZKA001","2AB")>台位：2AB (在用)</li>';
		 htmls+='</ul>';
		 htmls+=' </li>';
		 findSensorByLabCenetrTabAjaxWorld("HR20160407QDZKA001","2AB");
	 }else{
		 //新西兰
		 htmls+=' <li><span></span><a href="javascript:void(0);">冰箱B室</a>';
		 htmls+='<ul class="taiwei_hide">';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20170424QDZBX001","B4")>台位：B4 (在用)</li>';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20170424QDZBX001","B5")>台位：B5 (在用)</li>';
		 htmls+='<li onclick=findSensorByLabCenetrTabAjaxWorld("HR20170424QDZBX001","B6")>台位：B6 (在用)</li>';
		 htmls+='</ul>';
		 htmls+=' </li>';
		 findSensorByLabCenetrTabAjaxWorld("HR20170424QDZBX001","B4");
	 }
    
     $("#lab_unit_selected_center_world").html(htmls);


        $(".sheshi_tab_list #lab_unit_selected_center_world>li").click(function () {
            $(".sheshi_tab").eq(1).trigger('click');
            $(this).children('.taiwei_hide').slideToggle();
            $(this).find('a').css('color',"66ffcc").siblings().css('color','#66ccff');
        });

        $('.taiwei_hide>li').click(function () {
            $(".sheshi_tab").eq(1).trigger('click');
            $(this).addClass('taiwei_hide_active').siblings().removeClass('taiwei_hide_active');
        })

  
}
function resetDataCenterLabWorld(){
	myChartWorld1= echarts.init(document.getElementById('main1_world'));
	myChartWorld2= echarts.init(document.getElementById('main2_world'));
	myChartWorld1.clear();
	myChartWorld2.clear();
	$("#legend_ul_world").html('');
	legendDataWorld=[];
	legendNumDataWorld=[];
	showlegendDataWorld=[];//需要展示图例 自定义
	seriesTopDataWorld=[];
	seriesBottomDataWorld=[];
	topParamWorld=[];//上方y参数单位
	bottomParamWorld=[];//下方y轴单位
	totalLegendNameWorld=[];//图例全称 包含单位 ['1:频率(Hz)','2:M1(℃)']
	interval_count1World=0;
	interval_count2World=0;
}

//获取传感器信息 用于生成y轴
function findSensorByLabCenetrTabAjaxWorld(labTypeCode,testUnitId){
	resetDataCenterLabWorld();
    currentDataWorld=mSensor;
    //根据实验室-台位-传感器对照表 生成y轴信息 最多8个轴 如果多于8 其余默认展示左下
    $.each(mSensor,function(index,item){
        if(index<4){
            topParamWorld.push(item.unit);
        }else if(index>=4&&index<8){
            bottomParamWorld.push(item.unit);
        }
    });
    //获取曲线具体数据
    //findSensorDataCenetrTabAjax2(labTypeCode,testUnitId);
    findSensorDataCenetrTabAjaxWorld(labTypeCode,testUnitId);
}
function findSensorDataCenetrTabAjaxWorld(labTypeCode,testUnitId){
    mlabTypeCode=labTypeCode;mtestUnitId=testUnitId;
    $.post(contextPath+"/lab/getJsonFile",{"fileName":labTypeCode+"-"+testUnitId+".json"},function(data){
    	//console.log(data)
    	data=eval("("+data+")");
        if(data==""){
            //alert("暂未开测");
            return;
        }
        myChartWorld1.clear();
        myChartWorld2.clear();
        $("#legend_ul_world").html('');
        //console.log(data)
        dataBase=data;
        //根据传感器具体数据 生成图例
        $.each(data.list,function(index,item){
            totalLegendNameWorld.push(item.name);
            legendNumDataWorld.push(item.data[item.data.length-1].value+increaseBracketForObj(item.name))
        });
        legendDataWorld=dealBracket(totalLegendNameWorld);
        randomLegendWorld();
        $("#center_sybh_id_world").html(data.sybh);
        $("#center_ypbm_id_world").html(data.ybbh);
        $("#center_cpxh_id_world").html(data.cpxh);
        $("#center_testPro_id_world").html(data.testPro);
        //showlegendDataWorld=legendDataWorld;//默认全选
        //console.log(showlegendDataWorld)
        createLegendHtmlsWorld();
        createEchartsWorld(true);
        //因为每个30s加载部分数据，所以在再次点击图例的时候，baseBase还是老数据  所以最好每隔一段时间 进行整体刷新

    });
}
function randomLegendWorld(){
	var num=0;
	$.each(totalLegendNameWorld,function(index,item){
		if(item.indexOf("℃")==-1){
			showlegendDataWorld.push(dealBracketForObj(item));
		}else if(num<15){
			showlegendDataWorld.push(dealBracketForObj(item));
			num++;
		}
	})
}
function dealSeriesDataWorld(){
	seriesTopDataWorld=[];
	seriesBottomDataWorld=[];
	for(var x=0;x<totalLegendNameWorld.length;x++){
		var currentName=totalLegendNameWorld[x];
		var data=[];
		for(var i=0;i<dataBase.list.length;i++){
			if(dataBase.list[i].name==currentName){
				data=dataBase.list[i].data;
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
					seriesTopDataWorld.push(joinSeriseWorld(data,currentName,topIndex,x));
				}else if(bottomIndex>-1&&isHasElementOne(showlegendDataWorld,dealBracketForObj(currentName))>-1){
					//展示在下半部分
					seriesBottomDataWorld.push(joinSeriseWorld(data,currentName,bottomIndex,x));
				}
			}else{
				//没有配置 默认画到左下
				seriesBottomDataWorld.push(joinSeriseOtherWorld(data,currentName,x));
			}
		}
	}
	console.log(seriesTopDataWorld)
	console.log(xDataWorld)
};
//处理线series
function dealSeriesData2World(obj){
	seriesTopDataWorld=[];
	seriesBottomDataWorld=[];
	for(var x=0;x<totalLegendNameWorld.length;x++){
		var currentName=totalLegendNameWorld[x];
		var data=[];
		for(var i=0;i<dataBase.list.length;i++){
			if(dataBase.list[i].name==currentName){
				data=dataBase.list[i].data;
			}
		};
		var topIndex=isHasElementOne(topParamWorld,dealUnit(currentName));
		var bottomIndex=isHasElementOne(bottomParamWorld,dealUnit(currentName));
		if(topIndex>-1||bottomIndex>-1){
			if(topIndex>-1&&isHasElementOne(showlegendDataWorld,dealBracketForObj(currentName))>-1){
				//展示在上半部分
				seriesTopDataWorld.push(joinSeriseWorld(data,currentName,topIndex,x));
			}else if(bottomIndex>-1&&isHasElementOne(showlegendDataWorld,dealBracketForObj(currentName))>-1){
				//展示在下半部分
				seriesBottomDataWorld.push(joinSeriseWorld(data,currentName,bottomIndex,x));
			}
		}else{
			//没有配置 默认画到左下
			var checked=false;
			$('input[name="legendcheckbox_world"]:checked').each(function(){ 
				if($(this).val()==dealBracketForObj(currentName)){
					checked=true;
				}; 
			});  
			if(checked){
				seriesBottomDataWorld.push(joinSeriseOtherWorld(data,currentName,x));
			};
		}
	}
};

function joinSeriseWorld(data,name,index,colorIndex){
	var dataArr=[];
	xDataWorld=[];
	//获取最后时间
	var endStart=parseFloat(data[data.length-1].name)*60;
	var startTime=parseInt(endStart)-60*2;
	for(var x=0;x<data.length;x++){
		var value=data[x].value;
		if(value!="N"&&startTime<=parseInt(parseFloat(data[x].name)*60)){
			dataArr.push(value);
			xDataWorld.push(parseInt(parseFloat(data[x].name)*60));
		}
	};
	//模拟空白x轴
	mockXdataMethodWorld(endStart);
		//console.log(dataArr)
	var item= {
	            name:dealBracketForObj(name),
	            symbol:'none',  //这句就是去掉点的  
	            type:'line',  
	            smooth:true,  //这句就是让曲线变平滑的  
 	            data:dataArr,
 	            itemStyle:{
 	        	  normal:{
 	        		  color:colorData[colorIndex]
 	        	  }
 	           },
 	           show:false
 	        };
	if(index>0){
		item.yAxisIndex=index;
	}
	return item;
}
function joinSeriseOtherWorld(data,name,colorIndex){
	var dataArr=[];
	xDataWorld=[];
	var endStart=parseFloat(data[data.length-1].name)*60;
	var startTime=parseInt(endStart)-60*2;
	for(var x=0;x<data.length;x++){
		var value=data[x].value;
		if(value!="N"&&startTime<=parseInt(parseFloat(data[x].name)*60)){
			dataArr.push(value);
			xDataWorld.push(parseInt(parseFloat(data[x].name)*60));
		}
	};
	//模拟空白x轴
	mockXdataMethodWorld(endStart);
	var item= {
	            name:dealBracketForObj(name),
	            symbol:'none',  //这句就是去掉点的  
	            type:'line',  
	            smooth:true,  //这句就是让曲线变平滑的  
 	            data:dataArr,
 	            itemStyle:{
 	        	  normal:{
 	        		  color:colorData[colorIndex]
 	        	  }
 	           },
 	           show:false
 	        };
	//item.yAxisIndex=1;
	return item;
}
//模拟空白x轴
function mockXdataMethodWorld(endStart){
	mockXdataWorld=[];
	//模拟空白x轴
	for(var x=1;x<90;x++){
		var value=parseInt((parseFloat(endStart)+x));
		mockXdataWorld.push(value);
	}
}
//生成echarts图形
function createEchartsWorld(isFirst,obj){
	if(isFirst){
		dealSeriesDataWorld();
		getChartsWorld1();	
		getChartsWorld2();	
	}else{
		//重绘线
		dealSeriesData2World(obj);
		var opt1=myChartWorld1.getOption();
		var opt2=myChartWorld2.getOption();
		myChartWorld1.clear();
		myChartWorld2.clear();
		opt1.xAxis=[{data:xDataWorld.concat(mockXdataWorld)}];
		opt1.series=seriesTopDataWorld;
		myChartWorld1.setOption(opt1);
	    
	    opt2.xAxis=[{data:xDataWorld.concat(mockXdataWorld)}];
		opt2.series=seriesBottomDataWorld;
		myChartWorld2.setOption(opt2);
	}
}
//生成图例控制
function createLegendHtmlsWorld() {
    var htmls = '';
    var width=10*bodyScale+"px";
    for (var x = 0; x < legendDataWorld.length; x++) {
        //如果是默认选择的 复选选中
        if(isHasElementOne(showlegendDataWorld,legendDataWorld[x])!=-1){
            htmls += '<input style="margin-right: 2%;margin-top: 0;float: left;width:'+width+';height:'+width+'" type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" checked><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><li  style="color:#fff;display: inline-block;float:left" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '&nbsp;<span style="color: #66ccff;">'+legendNumDataWorld[x]+'</span></li><br>'
        }else{
            htmls += '<input style="margin-right: 2%;margin-top: 0;float: left;width:'+width+';height:'+width+'" type="checkbox" name="legendcheckbox_world" onclick="resetOptionsWorld(this)" value="' + legendDataWorld[x] + '" ><span style="background-color:' + colorData[x] + ';display: inline-block;width:1em;height: 1em;margin-right: 2%;float: left"></span><li  style="color:#fff;display: inline-block;float:left" name="' + legendDataWorld[x] + '">' + legendDataWorld[x] + '&nbsp;<span style="color: #66ccff">'+legendNumDataWorld[x]+'</span></li><br>'
        }

    }
    $("#legend_ul_world").html(htmls);
}
function resetOptionsWorld(obj){
	showLegendDataWorld=checkBoxValesWorld();
	interval_count1World=0;
	interval_count2World=0;
	createEchartsWorld(false,obj);
}
function checkBoxValesWorld(){ //jquery获取复选框值 
	var chk_value =[]; 
	$('input[name="legendcheckbox_world"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	return chk_value;
} 
function getChartsWorld1() {
	
    option_world = {
        tooltip: {
            trigger: 'axis',
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
            x2: '10%',
            y2: '3%'                //下移负数 使两个图重叠
        },
        dataZoom: [{
            start: 0,
            end:100,
            show:false
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
                        fontSize: 9 * bodyScale
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#66ccff'
                    }
                },
                data: xDataWorld.concat(mockXdataWorld)
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: "℃",
                max:90,
                min:-30,
                /*max:currentDataWorld[0].highvalue,
                 min:currentDataWorld[0].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
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
                name: "Hz",
                max:100,
                min:0,
                /* max:currentDataWorld[1].highvalue,
                 min:currentDataWorld[1].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                position: 'left',
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
                name: "%",
                /* max:currentDataWorld[2].highvalue,
                 min:currentDataWorld[2].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                position: 'right',
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
                offset: 40 * bodyScale,
                name: "",
                /* max:currentDataWorld[3].highvalue,
                 min:currentDataWorld[3].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                position: 'right',
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
        series:getAnimation(seriesTopDataWorld)
    });
    // intevalChart1=setInterval("intervalChangeData()", 60000);
    /* setInterval(function () {
     var preStart=myChartWorld1.getOption().dataZoom[0].start;
     var preEnd=myChartWorld1.getOption().dataZoom[0].end;
     myChartWorld1.setOption({
     dataZoom: [{
     start: parseFloat(interval_count1World),
     end:5+parseFloat(interval_count1World)
     }, {
     type: 'inside'
     }],
     });
     if(parseFloat(preEnd)>99.9){
     interval_count1World=0;
     myChartWorld1.setOption({
     dataZoom: [{
     start: 0,
     end:5
     }, {
     type: 'inside'
     }],
     });
     }else{
     interval_count1World=parseFloat(interval_count1World)+0.01;
     }
     //console.log("myChartWorld1---"+preStart+"--"+preEnd)
     },30000);*/
}

function getChartsWorld2() {

    option2_world = {
        tooltip: {
            trigger: 'axis',
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
            x2: '10%',
            y: '-2%',
            y2: '14%'
        },
        dataZoom: [{
            start: 0,
            end:100,
            show:false
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
                    // rotate: 30,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9 * bodyScale
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
                name: "V",
                max:300,
                min:0,
                /* max:currentDataWorld[4].highvalue,
                 min:currentDataWorld[4].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                nameLocation: 'start',
                /*      min: 0,
                 max: 100, */
                position: 'left',
                offset: 40 * bodyScale,
                axisLabel: {
                    formatter: function (params, index) {
                        //console.log(params+"--"+index+"--"+typeof(params))
                        /* if(index==7){
                         return ""
                         } */
                        return params;
                    },
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 10 * bodyScale
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
                name: "A",
                /* max:currentDataWorld[5].highvalue,
                 min:currentDataWorld[5].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                nameLocation: 'start',
                position: 'left',
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 9 * bodyScale
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
                name: "W",
                /* max:currentDataWorld[6].highvalue,
                 min:currentDataWorld[6].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                nameLocation: 'start',
                /*      min: 0,
                 max: 100, */
                position: 'right',

                axisLabel: {
                    formatter: function (params, index) {
                        //console.log(params+"--"+index+"--"+typeof(params))
                        /* if(index==7){
                         return ""
                         } */
                        return params;
                    },
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 9 * bodyScale
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
                name: "kW·h",
                /* max:currentDataWorld[7].highvalue,
                 min:currentDataWorld[7].lowvalue,*/
                nameTextStyle: {
                    color: '#66ccff'
                },
                nameLocation: 'start',
                offset: 40 * bodyScale,
                position: 'right',
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: '#66ccff',
                        fontSize: 9 * bodyScale
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

                symbolSize:1 * bodyScale,
            }
        ],
        series: seriesBottomDataWorld
    };
    // myChartWorld2.clear();
    myChartWorld2.setOption(option2_world);

    echarts.connect([myChartWorld1, myChartWorld2]);
    myChartWorld2.setOption({
        series:getAnimation(seriesBottomDataWorld)
    });
    /* myChartWorld2.setOption({
     series:getAnimation(seriesBottomDataWorld)
     });
     setInterval(function () {
     for(var i=0; i<seriesBottomDataWorld.length;i++){
     seriesBottomDataWorld[i].data.shift();
     seriesBottomDataWorld[i].data.push(parseInt(Math.random() * 30));
     }
     var month = xDataWorld.shift();
     xDataWorld.push(month)

     myChartWorld2.setOption({
     xAxis:[
     {data:xDataWorld}],
     series: seriesBottomDataWorld,
     });
     // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~seriesBottomDataWorld: ", seriesBottomDataWorld[0].data)
     // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~xDataWorld: ", xDataWorld)
     }, 2000);*/
    /* setInterval(function () {
     var preStart=myChartWorld2.getOption().dataZoom[0].start;
     var preEnd=myChartWorld2.getOption().dataZoom[0].end;
     myChartWorld2.setOption({
     dataZoom: [{
     start:parseFloat(interval_count2World),
     end:5+parseFloat(interval_count2World)
     }, {
     type: 'inside'
     }],
     });
     if(parseFloat(preEnd)>99.9){
     interval_count2World=0;
     myChartWorld1.setOption({
     dataZoom: [{
     start: 0,
     end:5
     }, {
     type: 'inside'
     }],
     });
     }else{
     interval_count2World=parseFloat(interval_count2World)+0.01;
     }

     //console.log("myChartWorld2---"+preStart+"--"+preEnd)
     },30000);*/

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

