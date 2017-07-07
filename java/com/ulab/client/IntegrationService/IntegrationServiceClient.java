package com.ulab.client.IntegrationService;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.ulab.client.webServiceRerigerator.ArrayOfTestMetadata;
import com.ulab.client.webServiceRerigerator.ArrayOfTestProdInfoItem;
import com.ulab.client.webServiceRerigerator.ArrayOfTestUnitInfo;
import com.ulab.client.webServiceRerigerator.TestMetadata;
import com.ulab.client.webServiceRerigerator.TestProdInfoItem;
import com.ulab.client.webServiceRerigerator.TestUnitInfo;
import com.ulab.model.LabAllData;
import com.ulab.model.LabData;
import com.ulab.model.LabSingleData;
import com.ulab.model.LabTestUnit;

/**
 * @ClassName: IntegrationServiceClient
 * @Description: 中心实验室汇总
 * @Author     Jilei
 * @Date  2017-5-27 下午4:12:37
 */
public class IntegrationServiceClient {
	
	/**
	 * @Title: searchLabAllData
	 * @Description: 查询实验室汇总信息
	 * @return    设定文件
	 * @return LabAllData    返回类型
	 * @throws
	 */
	public LabAllData searchLabAllData() {
		LabAllData labAllData = new LabAllData();
		int labCount = 0;
		float lowMonthRate = 0f;
		float highMonthRate = 0f;
		float aveMonthRate = 0f;
		int equipmentCount = 0;
		int finishOrderCount = 0;
		int testingOrderCount = 0;
		List<LabSingleData> labSingleDataList = new ArrayList<LabSingleData>();
		
		Service service = new Service();
		ServicePortType port = service.getServiceHttpPort();
		
		ArrayOfConnInfo connInfos = port.getConnInfoAll();
		for(ConnInfo connInfo : connInfos.getConnInfo()){
//			if("aircondition".equals(connInfo.getLabCode()) || "washerkekao01".equals(connInfo.getLabCode()) || !connInfo.getUrl().startsWith("http")) continue;
			if(!connInfo.getUrl().startsWith("http")) continue;
			labCount++;
			String labCode = connInfo.getLabCode();
			LabSingleData labSingleData = new LabSingleData();
			labSingleData.setLabCode(labCode);
			labSingleData.setLabName(connInfo.getWsName());
			labSingleData.setUrl(connInfo.getUrl());
			try {
				com.ulab.client.webServiceRerigerator.Service service2 = new com.ulab.client.webServiceRerigerator.Service(new URL(connInfo.getUrl()));
				com.ulab.client.webServiceRerigerator.ServicePortType port2 = service2.getServiceHttpPort();
				ArrayOfTestUnitInfo testUnitInfos = port2.getTestUnitInfo(labCode);
				//实验室总台位数
				int testUnitAll = testUnitInfos.getTestUnitInfo().size();
				labSingleData.setEquipmentCount(testUnitAll);
				equipmentCount = equipmentCount + testUnitAll;
				//录入条目
				ArrayOfTestProdInfoItem testProdInfoItems = port2.getTestProdInfoItemByLabCode(labCode);
				String flag = getLabFlag(testProdInfoItems, labCode);
				
				Calendar calendar =Calendar.getInstance();
				Date now = calendar.getTime();
				//获取当年第一天,统计已测订单
				int year = calendar.get(Calendar.YEAR);
				StringBuilder firstDaybBuilder = new StringBuilder();
				firstDaybBuilder.append(year).append("-01-01 00:00:00").append(flag);
				String firstDayFlag = firstDaybBuilder.toString();
				//查询订单开始日期，统计负荷率,为避免漏数，前推3个月查询订单，然后筛选1个月内订单
				calendar.add(Calendar.MONTH, -1);
				Date orderStart1 = calendar.getTime();
				calendar.add(Calendar.MONTH, -2);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String orderStart2 = sdf.format(calendar.getTime());
				String orderStartFlag = orderStart2 + flag;
				int stopProcessOrderNum = 0;
				int processingOrderNum = 0;
				StringBuilder processingUnits = new StringBuilder();
				int processingUnitNum = 0;
				//当年已测订单
				ArrayOfTestMetadata stopTestMetadatas = port2.getMetaData(labCode, 0, firstDayFlag);
				if(null != stopTestMetadatas && null != stopTestMetadatas.getTestMetadata()){
					stopProcessOrderNum = stopTestMetadatas.getTestMetadata().size();
				}
				labSingleData.setFinishOrderCount(stopProcessOrderNum);
				finishOrderCount = finishOrderCount + stopProcessOrderNum;
				//在测订单
				ArrayOfTestMetadata testMetadatas = port2.getMetaData(labCode, 1, flag);
				//实验室状态
				String labStatus;
				if(null != testMetadatas && null != testMetadatas.getTestMetadata() && testMetadatas.getTestMetadata().size() > 0){
					labStatus = "在用";
					for(TestMetadata testMetadata : testMetadatas.getTestMetadata()){
						processingOrderNum++;
						if(!(processingUnits.toString().contains(testMetadata.getTestUnitId() + ","))){
							processingUnits.append(testMetadata.getTestUnitId()).append(",");
							processingUnitNum ++;
						}				
					}
				}else {
					labStatus = "停测";			
				}
				//月负荷率
				ArrayOfTestMetadata allTestMetadatas = port2.getMetaData(labCode, -1, orderStartFlag);
				long alltime = 0;
				if(null != allTestMetadatas && null != allTestMetadatas.getTestMetadata() && allTestMetadatas.getTestMetadata().size() > 0){
					for(TestMetadata testMetadata : allTestMetadatas.getTestMetadata()){
						String testBeginTime = testMetadata.getTestBeginTime();
						Date testBeginDate = sdf.parse(testBeginTime);
						//已结束订单
						if(testMetadata.getIsTesting() == 0){
							String testEndTime = testMetadata.getTestEndTime();
							if(StringUtils.isBlank(testEndTime)) continue;
							Date testEndDate = sdf.parse(testEndTime);
							if(testEndDate.after(orderStart1)){								
								if(testBeginDate.after(orderStart1)){
									alltime = alltime + (testEndDate.getTime() - testBeginDate.getTime());
								}else {
									alltime = alltime + (testEndDate.getTime() - orderStart1.getTime());
								}
							}
						} else {
							//在测订单
							if(testBeginDate.after(orderStart1)){
								alltime = alltime + (now.getTime() - testBeginDate.getTime());
							}else {
								alltime = alltime + (now.getTime() - orderStart1.getTime());
							}
						}
					}
				}
				float rate = (float)alltime/((now.getTime() - orderStart1.getTime()) * testUnitAll);
				if(lowMonthRate == 0f){
					lowMonthRate = rate;
				} else {
					if(rate < lowMonthRate){
						lowMonthRate = rate;
					}
				}
				if (highMonthRate == 0f) {
					highMonthRate = rate;
				} else {
					if(rate > highMonthRate){
						highMonthRate = rate;
					}
				}
				aveMonthRate = aveMonthRate + rate;
				labSingleData.setMonthRate(getRate(rate));
				labSingleData.setLabStatus(labStatus);
				String testUnitStatus = processingUnitNum+"/"+testUnitAll;
				labSingleData.setTestUnitStatus(testUnitStatus);
				labSingleData.setTestingOrderCount(processingOrderNum);
				testingOrderCount = testingOrderCount + processingOrderNum;
				labSingleDataList.add(labSingleData);
			} catch (MalformedURLException e) {
				java.util.logging.Logger.getLogger(Service.class.getName())
                .log(java.util.logging.Level.INFO, 
                     "Can not initialize the default wsdl from {0}", connInfo.getUrl());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		labAllData.setLabCount(labCount);
		labAllData.setLowMonthRate(getRate(lowMonthRate));
		labAllData.setHighMonthRate(getRate(highMonthRate));
		labAllData.setAveMonthRate(getRate(aveMonthRate/labCount));
		labAllData.setEquipmentCount(equipmentCount);
		labAllData.setFinishOrderCount(finishOrderCount);
		labAllData.setTestingOrderCount(testingOrderCount);
		labAllData.setLabSingleDataList(labSingleDataList);
		return labAllData;
	}

	/**
	 * @Title: searchLabData
	 * @Description: 查询实验室明细
	 * @return    设定文件
	 * @return List<LabData>    返回类型
	 * @throws
	 */
	public List<LabData> searchLabData() {
		List<LabData> labDataList = new ArrayList<LabData>();
		Service service = new Service();
		ServicePortType port = service.getServiceHttpPort();
		
		ArrayOfConnInfo connInfos = port.getConnInfoAll();
		for(ConnInfo connInfo : connInfos.getConnInfo()){			
			String labCode = connInfo.getLabCode();			
			if(!connInfo.getUrl().startsWith("http")) continue;
			LabData labData = new LabData();
			labData.setLabCode(labCode);
			labData.setLabName(connInfo.getWsName());
			labData.setUrl(connInfo.getUrl());
			try {
				com.ulab.client.webServiceRerigerator.Service service2 = new com.ulab.client.webServiceRerigerator.Service(new URL(connInfo.getUrl()));
				com.ulab.client.webServiceRerigerator.ServicePortType port2 = service2.getServiceHttpPort();
				//录入条目
				ArrayOfTestProdInfoItem testProdInfoItems = port2.getTestProdInfoItemByLabCode(labCode);
				String flag = getLabFlag(testProdInfoItems, labCode);
				//在测订单
				ArrayOfTestMetadata testMetadatas = port2.getMetaData(labCode, 1, flag);
				//在测台位列表
				List<Integer> processingUnits = new ArrayList<Integer>();
				if(null != testMetadatas && null != testMetadatas.getTestMetadata() && testMetadatas.getTestMetadata().size() > 0){
					for(TestMetadata testMetadata : testMetadatas.getTestMetadata()){
						if(!(processingUnits.contains(testMetadata.getTestUnitId()))){
							processingUnits.add(testMetadata.getTestUnitId());
						}				
					}
				}
				//台位明细
				ArrayOfTestUnitInfo testUnitInfos = port2.getTestUnitInfo(labCode);				
				List<LabTestUnit> labTestUnitList = new ArrayList<LabTestUnit>();
				for(TestUnitInfo testUnitInfo : testUnitInfos.getTestUnitInfo()){
					LabTestUnit labTestUnit = new LabTestUnit();
					labTestUnit.setTestUnitId(testUnitInfo.getTestUnitId());
					labTestUnit.setTestUnitName(testUnitInfo.getTestUnitName());
					String testUnitStatus = "";
					if(processingUnits.contains(testUnitInfo.getTestUnitId())){
						testUnitStatus = "在用";
					} else {
						testUnitStatus = "停测";
					}
					labTestUnit.setTestUnitStatus(testUnitStatus);
					labTestUnitList.add(labTestUnit);
				}
			labData.setTestUnitList(labTestUnitList);
			labDataList.add(labData);
			} catch (MalformedURLException e) {
				java.util.logging.Logger.getLogger(Service.class.getName())
                .log(java.util.logging.Level.INFO, 
                     "Can not initialize the default wsdl from {0}", connInfo.getUrl());
			}
		}
			
		return labDataList;
		
	}
	
	/**
	 * @Title: getLabFlag
	 * @Description: 实验室查询参数
	 * @param testProdInfoItems
	 * @param labCode
	 * @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	private String getLabFlag(ArrayOfTestProdInfoItem testProdInfoItems, String labCode) {
		int num = 0;		
		
		for(TestProdInfoItem testProdInfoItem : testProdInfoItems.getTestProdInfoItem()){
			if(1 == testProdInfoItem.getQueryCondition()){
				num++;
			}			
		}
		StringBuilder flagBuilder = new StringBuilder("@@");
		for(int i = 0; i < num; i++){
			flagBuilder.append("@");
		}
		return flagBuilder.toString();
	}
	
	/**
	 * @Title: getRate
	 * @Description: 返回百分比
	 * @param rate
	 * @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	private String getRate(float rate){
		NumberFormat format = NumberFormat.getPercentInstance();// 获取格式化类实例
        format.setMinimumFractionDigits(2);// 设置小数位
        return format.format(rate);
	}

}
