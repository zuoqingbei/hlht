package com.ulab.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.aop.GlobalInterceptor;
import com.ulab.client.IntegrationService.IntegrationServiceClient;
import com.ulab.client.webServiceRerigerator.WebServiceRerigeratorClient;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.model.CommunistModel;
import com.ulab.model.DicModel;
import com.ulab.model.EquipmentModel;
import com.ulab.model.JianCeModel;
import com.ulab.model.JianceProModel;
import com.ulab.model.LabAllData;
import com.ulab.model.LabCarryModel;
import com.ulab.model.LabData;
import com.ulab.model.LabDataResultModel;
import com.ulab.model.LabMapModel;
import com.ulab.model.LabModel;
import com.ulab.model.LabTestUnit;
import com.ulab.model.Line;
import com.ulab.model.OrderModel;
import com.ulab.model.PersonModel;
import com.ulab.model.ProviderDicModel;
import com.ulab.model.QuestionClosedModel;
import com.ulab.model.SatisfactionModel;
import com.ulab.model.SensorTypeDto;
import com.ulab.model.SensorTypeModel;
import com.ulab.model.Value;
import com.ulab.model.XbarModel;
import com.ulab.util.JsonUtils;
import com.ulab.util.NormalDistribution;
import com.ulab.util.SqlUtil;
/**
 * 
 * @time   2017年4月11日 上午10:59:00
 * @author zuoqb
 * @todo   测试类
 */
@ControllerBind(controllerKey = "/lab", viewPath = "/lab")
@Before({GlobalInterceptor.class})
public class LabController extends BaseController {
	
    public void index() {
    	List<Record> labType=DicModel.dao.findDicByType("lab_type");
    	List<Record> productLine=DicModel.dao.findDicByType("line_type");
    	setAttr("labType", labType);
    	setAttr("productLine", productLine);
    	setSessionAttr("labType", labType);
    	setSessionAttr("productLine", productLine);
    	//实验室轮播信息
    	String sqlWhere=SqlUtil.commonWhereSql(this,null);
    	List<Record> labInfo=LabMapModel.dao.labShowFlatMap2(sqlWhere);
    	for(Record r:labInfo){
    		if(r.getStr("title").length()>6){
    			r.set("title", r.getStr("title").substring(0,6)+"...");
    		}
    	}
    	setAttr("labInfo", labInfo);
    	//量产一致性保障 字典
    	List<Record> providerDic=ProviderDicModel.dao.findProviderDic();
    	setAttr("providerDic", providerDic);
        render("index.html");
    }
    /**
     * 
     * @time   2017年4月19日 下午3:19:44
     * @author zuoqb
     * @todo   进入平面地图
     * @param  
     * @return_type   void
     */
    public void flatMap() {
        render("flatMap.html");
    }
    public void sphereMap() {
        render("sphereMap.html");
    }
    public void wordCloud() {
        render("wordCloud.html");
    }
    /**
     * 
     * @time   2017年4月19日 下午3:20:03
     * @author zuoqb
     * @todo   获取字典数据
     * @param  
     * @return_type   void
     */
    public void dicAjax(){
    	List<Record> labType=DicModel.dao.findDicByType("lab_type");
    	List<Record> productLine=DicModel.dao.findDicByType("line_type");
    	Map<String,Object> map=new HashMap<String,Object>();
    	map.put("labType", labType);
    	map.put("productLine", productLine);
    	renderJson(map);
    }
    /**
     * 
     * @time   2017年4月13日 上午9:38:56
     * @author zuoqb
     * @todo   全球实验室数据-地图
     * @param  
     * @return_type   void
     */
    public void labAjax(){
    	List<Record> parentList=LabModel.dao.labShowWorldMap();
    	renderJson(parentList);
    }
    /**
     * 
     * @time   2017年4月19日 上午9:53:33
     * @author zuoqb
     * @todo   平面图展示数据
     * @param  
     * @return_type   void
     */
    public void labShowFlatMapAjax(){
    	String sqlWhere=SqlUtil.commonWhereSql(this,null);
    	List<Record> parentList=LabMapModel.dao.labShowFlatMap(sqlWhere);
    	renderJson(parentList);
    }
    
    
    /**
     * 
     * @time   2017年4月14日 下午3:19:37
     * @author zuoqb
     * @todo   实验室数量统计
     */
    public void labNumStatisAjax(){
		renderJson(LabModel.dao.findAllCount());
    }
   
    /**
     * 
     * @time   2017年4月14日 下午4:59:52
     * @author zuoqb
     * @todo   实验室区域数量统计：大洲 国家
     */
    public void labSpreadAjax(){
    	Record  recode=LabModel.dao.labSpread();
		renderJson(recode);
    }
    
    /**
     * 
     * @time   2017年4月14日 下午3:19:37
     * @author zuoqb
     * @todo  按照某维度统计数量
     */
    public void labStatisByFiledAjax(){
    	String field=getPara("field");
    	String sqlWhere=SqlUtil.commonWhereSql(this,"lab");
    	String sort=getPara("sort");
    	List<Record> labStatis=LabModel.dao.labStatisByField(sqlWhere,field,sort);
		renderJson(labStatis);
    }
    
    /**
     * 
     * @time   2017年4月21日12:12:13
     * @author zuoqb
     * @todo  开展类型数量统计-实验目的
     */
    public void labCarryNumStatisAjax(){
    	String sqlWhere=SqlUtil.commonWhereSql(this,"lab");
    	//开展类型-实验目的
    	List<Record> carryStatis=LabCarryModel.dao.labCarryNumStatis(sqlWhere);
    	//实验目的对应的订单量
		renderJson(carryStatis);
    }
    /**
     * 
     * @time   2017年4月14日 下午4:59:52
     * @author zuoqb
     * @todo   实验室联通数据统计
     */
    public void labLinkAjax(){
    	Record  recode=LabModel.dao.labLink();
		renderJson(recode);
    }
    ////////////////////////////////////右侧////////////////////////////
    public void right() {
        render("index_right.html");
    }
    /**
     * 
     * @time   2017年4月23日 下午12:07:14
     * @author zuoqb
     * @todo   标准状态数据统计
     * @param  
     * @return_type   void
     */
    public void standardStatusAjax(){
    	Record  recode=LabDataResultModel.dao.standardStatus();
		renderJson(recode);
    }
    /**
     * 
     * @time   2017年4月23日 下午12:07:14
     * @author zuoqb
     * @todo   能力状态数据统计
     * @param  
     * @return_type   void
     */
    public void abilityStatusAjax(){
    	Integer allNum=LabDataResultModel.dao.resultNumStatisticBType(3);
    	List<Record>  list=LabDataResultModel.dao.dataResultBType(1);
    	Record result=new Record();
    	result.set("allNum", allNum);
    	result.set("data", list);
		renderJson(result);
    }
    /**
     * 
     * @time   2017年5月12日 上午7:45:55
     * @author zuoqb
     * @todo   标准数量分布情况
     * @param  
     * @return_type   void
     */
    public void standardDispersedAjax(){
    	String type=getPara("type");
    	String filedVaule=getPara("filedVaule");
    	String filed=getPara("filed");
    	List<Record>  recode=LabDataResultModel.dao.dataResultBTypeAndName(type,filed,filedVaule);
		renderJson(recode);
    }
    /**
     * 
     * @time   2017年5月12日 上午7:45:55
     * @author zuoqb
     * @todo   不同产线的能力状态分布
     * @param  
     * @return_type   void
     */
    public void abilityByProductLineAjax(){
    	List<Record> productLine=getSessionAttr("productLine");
    	if(productLine==null){
    		productLine=DicModel.dao.findDicByType("line_type");
    	}
    	String type=getPara("type","1");
    	String filed=getPara("filed","product_code");
    	List<List<Record>> map=new ArrayList<List<Record>>();
    	List<List<Record>> needmap=new ArrayList<List<Record>>();
    	for(Record r:productLine){
    		String filedVaule=r.get("id").toString();
    		map.add(LabDataResultModel.dao.dataResultBTypeAndName(type,filed,filedVaule));
    		needmap.add(LabDataResultModel.dao.dataResultBTypeAndName(3,filed,filedVaule));
    	}
    	List<List<List<Record>>> list=new ArrayList<List<List<Record>>>();
    	list.add(map);
    	list.add(needmap);
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo   获取某一年订单整体及时率
     * @param  
     * @return_type   void
     */
    public void orderYearRateAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	List<Record> list=new ArrayList<Record>();
    	list.add(OrderModel.dao.findOrderRate("2016",labTypeCode));
    	list.add(OrderModel.dao.findOrderRate("2017",labTypeCode));
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo   按照产线统计某年整体订单及时率
     * @param  
     * @return_type   void
     */
    public void findOrderYearRateForProductAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	List<Record> list2016=OrderModel.dao.findOrderYearRateForProduct("2016",labTypeCode);
    	List<Record> list2017=OrderModel.dao.findOrderYearRateForProduct("2017",labTypeCode);
    	if(list2016!=null&&list2016.size()>0){
    		list.add(sort(list2016));
    	}
    	if(list2017!=null&&list2017.size()>0){
    		list.add(sort(list2017));
    	}
		renderJson(list);
    }
    //数据结果 订单及时率 产线逆时针排序
    public List<Record> sort(List<Record> list){
    	List<Record> r=new ArrayList<Record>();
    	r.add(list.get(0));
    	list.remove(0);
    	for(int x=list.size()-1;x>=0;x--){
    		r.add(list.get(x));
    	}
    	return r;
    }
    /**
     * 
     * @time   2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo   按照产线统计某年各月份详细订单及时率
     * @param  
     * @return_type   void
     */
    public void findOrderMonthRateForProductAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String startDate=getPara("startDate","201601");
    	String endDate=getPara("endDate","201612");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	List<Record> productLine=getSessionAttr("productLine");
    	if(productLine==null){
    		productLine=DicModel.dao.findDicByType("line_type");
    	}
    	for(Record r:productLine){
    		List<Record> data=OrderModel.dao.findOrderMonthRateForProduct(startDate,endDate,r.get("id").toString(),labTypeCode);
    		if(data!=null&&data.size()>0){
    			list.add(data);
    		}
    	}
		renderJson(list);
    }
    
    /**
     * 
     * @time   2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo    按照产线统计某年各月份详细订单类别
     * @param  
     * @return_type   void
     */
    public void findOrderMonthTypeForProductAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String desName=getPara("desName","");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	List<Record> productLine=getSessionAttr("productLine");
    	if(productLine==null){
    		productLine=DicModel.dao.findDicByType("line_type");
    	}
    	for(Record r:productLine){
    		List<Record> data=OrderModel.dao.findOrderMonthTypeForProduct(r.get("id").toString(),labTypeCode,desName);
    		if(data!=null&&data.size()>0){
    			list.add(data);
    		}
    	}
		renderJson(list);
    }
    
    /**
     * 
     * @time   2017年5月20日 上午11:55:08
     * @author zuoqb
     * @todo    整机 模块 订单类别占全部订单占比统计
     * @param  
     * @return_type   void
     */
    public void findOrderTypePercentTab3Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	Record data=OrderModel.dao.findOrderTypePercentTab3(labTypeCode);
    	if(data==null){
    		data=new Record();
    	}
		renderJson(data);
    }
    /**
     * 
     * @time   2017年5月14日 上午8:59:27
     * @author zuoqb
     * @todo   一次合格率具体到产线
     * @param  
     * @return_type   void
     */
    public void findOrderPassForProAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String desName=getPara("desName","");
    	String name=getPara("name","");
    	List<Record> list=OrderModel.dao.findOrderPassForPro(null, labTypeCode, desName, name);
		renderJson(list);
    }
    
    /**
     * 
     * @time   2017年5月14日 上午8:59:27
     * @author zuoqb
     * @todo   一次合格率  整体统计
     * @param  
     * @return_type   void
     */
    public void findOrderPassForAllAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	List<Record> list=new ArrayList<Record>();
    	Record r1=OrderModel.dao.findOrderPassForAll(null, labTypeCode, "整机");
    	if(r1==null){
    		r1=new Record();
    	}
    	list.add(r1);
    	Record r2=OrderModel.dao.findOrderPassForAll(null, labTypeCode, "模块");
    	if(r2==null){
    		r2=new Record();
    	}
    	list.add(r2);
		renderJson(list);
    }
    
    /**
     * 
     * @time   2017年5月14日 上午10:07:01
     * @author zuoqb
     * @todo   订单及时率  tab1
     * @param  
     * @return_type   void
     */
    
    public void findOrderYearRateForTab1Ajax(){
    	/*String labTypeCode=getPara("labTypeCode","");
    	String date=getPara("date","2017");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	list.add(OrderModel.dao.findOrderYearRateForTab1(date,labTypeCode, "整机"));
    	list.add(OrderModel.dao.findOrderYearRateForTab1(date,labTypeCode, "模块"));
		renderJson(list);*/
    	String plCode=getPara("plCode","");
    	String labTypeCode=getPara("labTypeCode","");
    	String startDate=getPara("startDate","201601");
    	String endDate=getPara("endDate","201612");
    	renderJson(OrderModel.dao.findOrderMonthRateForAll(startDate, endDate, plCode, labTypeCode));
    }
    
    /**
     * 
     * @time   2017年5月14日 上午11:04:34
     * @author zuoqb
     * @todo   一次合格率 总状态
     * @param  
     * @return_type   void
     */
    public void findOrderPassForTab1Ajax(){
		renderJson(OrderModel.dao.findOrderPassForAll(null, null, null));
    }
    /**
     * 
     * @time   2017年5月17日 上午9:49:23
     * @author zuoqb
     * @todo   人员状态-总
     * @param  
     * @return_type   void
     */
    public void findPersonStatusTab1Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String type=getPara("type","");
    	String plCode=getPara("plCode","");
  		renderJson(PersonModel.dao.personDetail(type, plCode, labTypeCode));
      }
    /**
     * 
     * @time   2017年5月17日 下午1:26:59
     * @author zuoqb
     * @todo   实验室状态tab2-人员状态数据
     * @param  
     * @return_type   void
     */
    public void personForTab2Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String type=getPara("type","");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	List<Record> productLine=getSessionAttr("productLine");
    	if(productLine==null){
    		productLine=DicModel.dao.findDicByType("line_type");
    	}
    	for(Record r:productLine){
    		List<Record> data=PersonModel.dao.personForTab2(type, r.get("id").toString(), labTypeCode);
    		if(data!=null&&data.size()>0){
    			list.add(data);
    		}
    	}
		renderJson(list);
    }
    //共产 一致数据统计
    /**
     * 
     * @time   2017年5月18日 上午9:55:48
     * @author zuoqb
     * @todo   共产 一致比重统计
     * @param  
     * @return_type   void
     */
    public void communistGravityStatisticForTab1Ajax(){
    	String plCode=getPara("plCode","");
    	String labTypeCode=getPara("labTypeCode","");
    	String startDate=getPara("startDate","201601");
    	String endDate=getPara("endDate","201612");
		renderJson(CommunistModel.dao.communistGravityStatistic(startDate, endDate, plCode, labTypeCode));
    }
    /**
     * 
     * @time   2017年5月18日 上午9:59:03
     * @author zuoqb
     * @todo   根据类型 时间 统计共产 一致个月份数量
     * @param  
     * @return_type   void
     */
    public void communistStatisticForMonthForTab1Ajax(){
    	String plCode=getPara("plCode","");
    	String labTypeCode=getPara("labTypeCode","");
    	String startDate=getPara("startDate","201601");
    	String endDate=getPara("endDate","201612");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	list.add(CommunistModel.dao.communistStatisticForMonth(startDate, endDate, plCode, labTypeCode, "1"));
    	list.add(CommunistModel.dao.communistStatisticForMonth(startDate, endDate, plCode, labTypeCode, "2"));
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月19日 上午11:04:03
     * @author zuoqb
     * @todo  获取产品检测结果对应属性
     * @param  
     * @return_type   void
     */
    public void jianCeXhProForTab1Ajax(){
    	String xhCode=getPara("xhCode","");//型号
    	String redis_key=Constants.JIANC_EPRO_SESSION+xhCode;
    	Record pro=getSessionAttr(redis_key);
    	if(pro==null){
    		pro=JianceProModel.dao.findProByFiled(xhCode);
    		setSessionAttr(redis_key, pro);
    	}
    	if(pro==null){
    		pro=new Record();
    	}
		renderJson(pro);
    }
    /**
     * 
     * @time   2017年5月18日 下午4:18:54
     * @author zuoqb
     * @todo   直方图 检测数据
     * @param  
     * @return_type   void
     */
    public void jianCeDataForTab1Ajax(){
    	String xhCode=getPara("xhCode","");//型号
    	List<Record> list=JianCeModel.dao.findProviderDicByPid(xhCode);
    /*	String redis_key=Constants.JIANC_EPRO_SESSION+xhCode;
    	Record pro=getSessionAttr(redis_key);
    	if(pro==null){
    		pro=JianceProModel.dao.findProByFiled(xhCode);
    		setSessionAttr(redis_key, pro);
    		
    	}
    	double pj=Double.parseDouble(pro.get("pj_value").toString());
		double fc=Double.parseDouble(pro.get("fc_value").toString());
    	for(Record r:list){
    		r.set("wkq_num2", NormalDistribution.calc(Double.parseDouble(r.getStr("wkq_num")), pj, fc));
    	}*/
    	//List<Record> gaussian=gaussian(xhCode);
    	List<List<Record>> re=new ArrayList<List<Record>>();
    	re.add(list);
    	//re.add(gaussian);
		renderJson(re);
    }
    /**
     * 
     * @time   2017年5月22日 上午10:55:03
     * @author zuoqb
     * @todo  模拟正态分布曲线数据
     * @param  
     * @return_type   void
     */
    public List<Record> gaussian(String xhCode){
    	/*String redis_key=Constants.JIANC_EPRO_SESSION+xhCode;
    	String gaussian_key=Constants.JIANC_GAUSSIAN_SESSION+xhCode;
    	Record pro=getSessionAttr(redis_key);
    	if(pro==null){
    		pro=JianceProModel.dao.findProByFiled(xhCode);
    		setSessionAttr(redis_key, pro);
    	}
    	List<Record> list=getSessionAttr(gaussian_key);
    	if(pro!=null&&list==null){
    		list=new ArrayList<Record>();
    		double pj=Double.parseDouble(pro.get("pj_value").toString());
    		double fc=Double.parseDouble(pro.get("fc_value").toString());
    		for(int x=0;x<500000;x++){
    			Record r=new Record();
    			list.add(r.set("num",NormalDistribution.calc(pj, fc)));
    		}
    		setSessionAttr(gaussian_key, list);
    	}*/
    	String redis_key=Constants.JIANC_EPRO_SESSION+xhCode;
    	Record pro=getSessionAttr(redis_key);
    	if(pro==null){
    		pro=JianceProModel.dao.findProByFiled(xhCode);
    		setSessionAttr(redis_key, pro);
    	}
    	List<Record> list=new ArrayList<Record>();
    	if(pro!=null){
    		list=new ArrayList<Record>();
    		double pj=Double.parseDouble(pro.get("pj_value").toString());
    		double fc=Double.parseDouble(pro.get("fc_value").toString());
    		for(int x=0;x<100000;x++){
    			Record r=new Record();
    			list.add(r.set("num",NormalDistribution.calc(pj, fc)));
    		}
    	}
    	return list;
    }
    /**
     * 
     * @time   2017年5月18日 下午4:18:54
     * @author zuoqb
     * @todo   xbar数据
     * @param  
     * @return_type   void
     */
    public void jianCeXbarForTab1Ajax(){
    	String xhName=getPara("xhName","");//型号
    	String type=getPara("type","");
    	List<Record> list=XbarModel.dao.findXbarData(xhName, type);
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月19日 下午3:43:37
     * @author zuoqb
     * @todo   中海博睿 到整机的订单合格率（具体到月份）
     * @param  
     * @return_type   void
     */
    public void orderRateForCenterLabAjax(){
    	String startDate=getPara("startDate","201606");
    	String endDate=getPara("endDate","201705");
    	List<Record> list=OrderModel.dao.findOrderRateForMonth(startDate, endDate);
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月20日 上午10:33:50
     * @author zuoqb
     * @todo   设备状态统计
     * @param  
     * @return_type   void
     */
    public void equipmentTotalForLab1Ajax(){
    	String dataType=getPara("dataType","1");// 1:当前2：同比
    	String labName=getPara("labName","");
    	List<Record> list=EquipmentModel.dao.equipmentTotal(dataType, labName);
		renderJson(list);
    }
    /**
     * 
     * @time   2017年5月20日 上午10:33:50
     * @author zuoqb
     * @todo   设备状态统计 到产线 for tab2
     * @param  type 类型  0：实验室在线率 1：设备完好率 2：设备利用率 
     * @return_type   void
     */
    public void equipmentStatisForPlForLab2Ajax(){
    	String type=getPara("type","0");
    	String labTypeCode=getPara("labTypeCode","");
    	List<Record> list=EquipmentModel.dao.equipmentStatisForPl(type, labTypeCode);
		renderJson(list);
    }
    
    /****************满意度统计****************/
    /**
     * 
     * @time   2017年5月20日 下午1:15:38
     * @author zuoqb
     * @todo   满意度 到月份数据统计tab1
     * @param  
     * @return_type   void
     */
    public void satisfactionStatisForMonthForTab1Ajax(){
    	String startDate=getPara("startDate","201606");
    	String endDate=getPara("endDate","201705");
    	String labTypeCode=getPara("labTypeCode","");
    	List<Record> list=SatisfactionModel.dao.satisfactionStatisForMonth(startDate, endDate,labTypeCode);
		renderJson(list);
    }
    
    /**
     * 
     * @time   2017年5月20日 下午1:15:38
     * @author zuoqb
     * @todo     同期 环比满意度占比统计
     * @param  
     * @return_type   void
     */
    public void satisfactionChangeForTab1Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	Record r=SatisfactionModel.dao.satisfactionChange(labTypeCode);
    	if(r==null){
    		r=new Record();
    	}
		renderJson(r);
    }
    /**
     * 
     * @time   2017年5月20日 下午1:55:53
     * @author zuoqb
     * @todo    tab3 某一年分 到产线满意度统计
     * @param  
     * @return_type   void
     */
    public void satisfactionStatisForYearTab3Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String year=getPara("year","");
		renderJson(SatisfactionModel.dao.satisfactionStatisForYear(year,labTypeCode));
    }
    /**
     * 
     * @time   2017年5月20日 下午2:24:57
     * @author zuoqb
     * @todo   用户满意度趋势变化 满意度到产线 到月数据统计 tab3
     * @param  
     * @return_type   void
     */
    public void productLineAndMonthForTab3Ajax(){
    	String startDate=getPara("startDate","201606");
    	String endDate=getPara("endDate","201705");
    	String labTypeCode=getPara("labTypeCode","");
    	List<List<Record>> list=new ArrayList<List<Record>>();
    	List<Record> productLine=getSessionAttr("productLine");
    	if(productLine==null){
    		productLine=DicModel.dao.findDicByType("line_type");
    	}
    	for(Record r:productLine){
    		List<Record>  data=SatisfactionModel.dao.productLineAndMonth(startDate,endDate,r.get("id").toString(),labTypeCode);
    		if(data!=null&&data.size()>0){
    			list.add(data);
    		}
    	}
		renderJson(list);
    }
    //问题闭环率
    /**
     * 
     * @time   2017年5月20日 下午3:53:01
     * @author zuoqb
     * @todo    统计当前以及同比 模块 整机问题闭环率tab1 
     * @param  
     * @return_type   void
     */
    public void questionForMkZjTab1Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
		renderJson(QuestionClosedModel.dao.questionForMkZj(labTypeCode));
    }
    /**
     * 
     * @time   2017年5月20日 下午3:53:01
     * @author zuoqb
     * @todo    统计当前以及同比 模块 整机问题闭环率tab3
     * @param  
     * @return_type   void
     */
    public void productLineForTab3Tab3Ajax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String dataType=getPara("dataType","0");//dataType  0 :当前 1：同比
    	String type=getPara("type","");//type   0：整机 1：模块
		renderJson(QuestionClosedModel.dao.productLineForTab3(dataType, type, labTypeCode));
    }
    
    /**
     * 
     * @time   2017年5月27日 下午1:51:24
     * @author zuoqb
     * @todo   加载实验室与台位对照关系 
     * @param  
     * @return_type   void
     */
    public void loadLabUnitInfoCenterTabAjax(){
    	IntegrationServiceClient client = new IntegrationServiceClient();
    	List<LabData> labDataList = client.searchLabData();
		renderJson(labDataList);
    }
    
    /**
     * 
     * @time   2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo   获取传感器信息 用于生成y轴
     * @param  
     * @return_type   void
     */
    public void findSensorByLabCenetrTabAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String testUnitId=getPara("testUnitId","");
    	List<Record> sensorList=SensorTypeModel.dao.findSensorByLab(labTypeCode,testUnitId);
    	if(sensorList==null){
    		sensorList=new ArrayList<Record>();
    	}
    /*	if(sensorList.size()<8){
    		for(int x=sensorList.size();x<8;x++){
    			sensorList.add(new Record());
    		}
    	}*/
		renderJson(sortSensor(sensorList));
    }
    /**
     * 
     * @time   2017年6月1日 下午2:16:14
     * @author zuoqb
     * @todo  对y轴进行人为排序
     * @param  @param sensorList
     * @param  @return
     * @return_type   List<Record>
     */
    public List<Record> sortSensor(List<Record> sensorList){
    	String[] units={"℃","Hz","%","","V","A","W","kW·h"};
    	List<Record> list=new ArrayList<Record>();
    	for(String unit:units){
    		Record mSen=new Record();
    		for(Record r:sensorList){
    			if(r.getStr("unit").equals(unit)){
    				mSen=r;
    				break;
    			}
    		}
    		list.add(mSen);
    	}
    	return list;
    }
    /**
     * 
     * @time   2017年5月31日 下午3:40:01
     * @author zuoqb
     * @todo   曲线数据
     * @param  
     * @return_type   void
     */
    public void searchRealTimeDataCenterTabAjax(){
    	String labTypeCode=getPara("labTypeCode","");
    	String url=getPara("url","");
    	String testUnitId=getPara("testUnitId","");
    	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    	String fileName=sdf.format(new Date())+"-"+labTypeCode+"-"+testUnitId;
    	String path=getWebRootPath()+"/src/main/webapp/static/data/"+fileName;
    	String data="";
    /*	if(JsonUtils.judeFileExists(path)){
    		//直接读取json文件
    		data=JsonUtils.readJson(path);
    	}else{
    		WebServiceRerigeratorClient client = new WebServiceRerigeratorClient();
    		LabTestUnit labTestUnit = client.searchRealTimeData(labTypeCode, url, Integer.valueOf(testUnitId));
    		System.out.println(labTestUnit.getRealTimeData());
    		if(labTestUnit!=null&&StringUtils.isNotBlank(labTestUnit.getRealTimeData())){
    			JsonUtils.writeJson(getWebRootPath()+"/src/main/webapp/static/data/", labTestUnit.getRealTimeData(), fileName);
    			data=labTestUnit.getRealTimeData();
    		}
    	}*/
    	WebServiceRerigeratorClient client = new WebServiceRerigeratorClient();
    	String interval=getPara("interval","3");
		LabTestUnit labTestUnit = client.searchRealTimeData(labTypeCode, url, Integer.valueOf(testUnitId),Float.parseFloat(interval));
		System.out.println(labTestUnit.getRealTimeData());
		if(labTestUnit!=null&&StringUtils.isNotBlank(labTestUnit.getRealTimeData())){
			data=labTestUnit.getRealTimeData();
		}
    	renderText(data);
    }
  
    /**
     * 
     * @time   2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo   获取json文件数据
     * @param  
     * @return_type   void
     */
    public void getJsonFile(){
    	String fileName=getPara("fileName","");
    	String path=getWebRootPath()+"/src/main/webapp/static/data/"+fileName;
    	String json=JsonUtils.readJson(path);
    	renderText(json);
    }
    
    /**
     * 
     * @time   2017年5月31日 下午12:00:34
     * @author zuoqb
     * @todo  中海博睿所有实验室-webservice接口
     * @param  
     */
    public void labAllForCenterLabAjax(){
    	IntegrationServiceClient client = new IntegrationServiceClient();
		LabAllData labAllData = client.searchLabAllData();
		renderJson(labAllData);
    }
}
