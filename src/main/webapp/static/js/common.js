//{name:'福州',value:95}
function dataToObject(data){
	var item = new Object();
	item.name=data.shortname;
	item.value=data.value;
	return item;
}
/**
 * 
 * [
    {name:'福州',value:95},
    {name:'太原',value:90},
    {name:'长春',value:80},
    {name:'重庆',value:70},
    {name:'西安',value:60},
    {name:'成都',value:50},
    {name:'常州',value:40},
    {name:'北京',value:30},
    {name:'北海',value:20},
    {name:'海口',value:10}
]
 */
function dataToArray(data){
	//console.log(data.clist)
	var d = new Array();
	for(var x=0;x<data.clist.length;x++){
		d.push(dataToObject(data.clist[x]));
	}
	return d;
}
/**
 * [
    [{name:'广州'},{name:'福州',value:95}],
    [{name:'广州'},{name:'太原',value:90}],
    [{name:'广州'},{name:'长春',value:80}],
    [{name:'广州'},{name:'重庆',value:70}],
    [{name:'广州'},{name:'西安',value:60}],
    [{name:'广州'},{name:'成都',value:50}],
    [{name:'广州'},{name:'常州',value:40}],
    [{name:'广州'},{name:'北京',value:30}],
    [{name:'广州'},{name:'北海',value:20}],
    [{name:'广州'},{name:'海口',value:10}]
]
 */
function dataToArrayContinueArray(data){
	var d = new Array();
	for(var x=0;x<data.clist.length;x++){
		var obj=data.clist[x];
		var e= new Array();
		var item0 = new Object();
		item0.name=obj.pshortname;
		e.push(item0);
		e.push(dataToObject(obj));
		d.push(e);
	}
	return d;
}
/**
 * 
 * [
    [{name:'北京'},{name:'包头'}],
    [{name:'北京'},{name:'北海'}],
    [{name:'北京'},{name:'广州'}]
	]
 */
function dataToArrayAll(data){
	var d = new Array();
	for(var i=0;i<data.length;i++){
		for(var x=0;x<data[i].clist.length;x++){
			var obj=data[i].clist[x];
			var e= new Array();
			var item0 = new Object();
			item0.name=obj.pshortname;
			e.push(item0);
			var item1 = new Object();
			item1.name=obj.shortname;
			e.push(item1);
			d.push(e);
		}
	}
	return d;
}
/**
 * 经纬度
 * {
	'上海': [121.4648,31.2891],
	'东莞': [113.8953,22.901],
	'东营': [118.7073,37.5513]
    }
 */
function geoCoord(data){
	var r='{';
	for(var i=0;i<data.length;i++){
		r+="\""+data[i].shortname+"\":["+data[i].lng+","+data[i].lat+"],";
		for(var x=0;x<data[i].clist.length;x++){
			var obj=data[i].clist[x];
			var key=obj.shortname;
			r+="\""+key+"\":["+obj.lng+","+obj.lat+"],";
		}
		//r+="\"上海\":[121.4648,31.2891],";
	}
	r=r.substr(0,r.length-1)
	r+='}'
	return $.parseJSON(r);
}
function seriesData(data){
	 var seriesData = [];
	    var item={
	            name: '',
	            type: 'map',
	            roam: true,
	            hoverable: false,
	            mapType: 'world',
	            itemStyle:{
	                normal:{
	                    borderColor:'rgba(100,149,237,1)',
	                    borderWidth:0.5,
	                    areaStyle:{
	                        color: '#1b1b1b'
	                    }
	                }
	            },
	            data:[],
	            markLine : {
	                smooth:true,
	                symbol: ['none', 'circle'],
	                symbolSize : 1,
	                itemStyle : {
	                    normal: {
	                        color:'#fff',
	                        borderWidth:1,
	                        borderColor:'rgba(30,144,255,0.5)'
	                    }
	                },
	                data : dataToArrayAll(data),
	            },
	            geoCoord: geoCoord(data)
	        };
	    seriesData.push(item);
	    for(var i=0;i<data.length;i++){
	    	//var seriesData =dataToArray(data[i])
	    	item={
					name: data[i].shortname,
					type: 'map',
					mapType: 'world',
					data:[],
					markLine : {
						smooth:true,
						effect : {
							show: true,
							scaleSize: 1,
							period: 30,
							color: '#fff',
							shadowBlur: 10
						},
						itemStyle : {
							normal: {
								borderWidth:1,
								lineStyle: {
									type: 'solid',
									shadowBlur: 10
								}
							}
						},
						data : dataToArrayContinueArray(data[i])
					},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 10 + v/10
						},
						effect : {
							show: true,
							shadowBlur : 0
						},
						itemStyle:{
							normal:{
								label:{show:false}
							},
							emphasis: {
								label:{position:'top'}
							}
						},
						data : dataToArray(data[i])
					}
			}
	    	
	    	seriesData.push(item);
	    	
	    }
	    return seriesData;
}


/**
 * 
 *map3D
 */

//加载全部位置属性
function getAirports(data,markPointStyle){
	var d = new Array();
	for(var i=0;i<data.length;i++){
		var pitem0 = new Object();
		pitem0.geoCoord=[data[i].lng,data[i].lat];
		pitem0.itemStyle=markPointStyle;
		d.push(pitem0);
		for(var x=0;x<data[i].clist.length;x++){
			var obj=data[i].clist[x];
			var item0 = new Object();
			item0.geoCoord=[obj.lng,obj.lat];
			item0.itemStyle=markPointStyle;
			d.push(item0);
		}
	}
	return d;
}

 //legend标题
function legendData(data){
	var legendData = [];
	for(var i=0;i<data.length;i++) {
		var name = (data[i].shortname==null?data[i].shortname:data[i].shortname);// 名称
		legendData.push(name);
	}
	return legendData;
}
//拼接地图迁徙起点-终点坐标
/**
 * [
    [{geoCoord:'起点坐标'},{geoCoord:'终点坐标'}],
    [{geoCoord:'起点坐标'},{geoCoord:'终点坐标'}]
]
 */
function lineGeoCoord(data){
	var d = new Array();
	for(var x=0;x<data.clist.length;x++){
		var obj=data.clist[x];
		var e= new Array();
		var item0 = new Object();
		item0.geoCoord=[obj.plng,obj.plat];
		e.push(item0);
		var item1 = new Object();
		item1.geoCoord=[obj.lng,obj.lat];
		e.push(item1);
		d.push(e);
	}
	return d;
}