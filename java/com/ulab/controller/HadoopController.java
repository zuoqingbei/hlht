package com.ulab.controller;

import java.util.List;

import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.BaseController;
import com.ulab.model.HadoopSensorTypeInfo;
import com.ulab.model.HadoopTestData;
import com.ulab.model.HadoopTestUnitInfo;
import com.ulab.model.LabCodeModel;
//import com.ulab.model.LabModel;
//import com.ulab.util.JsonUtils;

/**
 * 
 * @time   2017年9月21日 上午9:45:59
 * @author zuoqb
 * @todo   实验室曲线Hadoop
 */
@ControllerBind(controllerKey = "/hadoop")
public class HadoopController extends BaseController {
	/**
	 * 
	 * @time   2017年9月21日 上午9:48:36
	 * @author zuoqb
	 * @todo   查询实验室包含对应台位
	 * @param  
	 * @return_type   void
	 */
	public void unitInfo() {
		String configName = getPara("configName");
		String labCode = getPara("labCode");
		List<Record> testUnitList = HadoopTestUnitInfo.dao.findTestUnitListByLabCode(this, configName, labCode);
		renderJson(testUnitList);
	}
	/**
	 * 
	 * @time   2017年9月21日 上午9:48:39
	 * @author zuoqb
	 * @todo   根据实验室编码获取传感器类型信息 生成y轴
	 * @param  
	 * @return_type   void
	 */
	public void sensorTypeInfo() {
		String configName = getPara("configName");
		String labCode = getPara("labCode");
		renderJson(HadoopSensorTypeInfo.dao.findSensorTypeInfoByLabCode(this,configName, labCode));
	}
	/**
	 * 
	 * @time   2017年9月21日 上午9:48:45
	 * @author zuoqb
	 * @todo   测试数据
	 * @param  
	 * @return_type   void
	 */
	public void testData() {
		String configName = getPara("configName");
		String labCode = getPara("labCode");
		String testUnitId = getPara("testUnitId");
		String startTime = getPara("startTime");//毫秒
		String interval = getPara("interval", "180");//单位 分钟
		Record lab=LabCodeModel.dao.findLabByCode(labCode);
		if(lab!=null){
			//如果是检测中心 整机模块 则需要把时间差距加大 否则没有数据
			if("46".equals(lab.getStr("data_center_id"))||"51".equals(lab.getStr("data_center_id"))){
				interval=300*60+"";
			}
		}
		renderJson(HadoopTestData.dao.findTestData(this,configName, labCode, testUnitId, startTime,
				Float.parseFloat(interval)));
	}

}
