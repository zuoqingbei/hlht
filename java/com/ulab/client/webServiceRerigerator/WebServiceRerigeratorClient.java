package com.ulab.client.webServiceRerigerator;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.ulab.model.LabTestUnit;

/**
 * @ClassName: WebServiceRerigeratorClient
 * @Description: 实验室详细信息
 * @Author     Jilei
 * @Date  2017-5-30 下午2:10:56
 */
public class WebServiceRerigeratorClient {
	
	public LabTestUnit searchRealTimeData(String labCode, String url, int testUnitId) {
		return searchRealTimeData(labCode, url, testUnitId,3f);
	}
	/**
	 * @Title: searchRealTimeData
	 * @Description: 查询实验室单个单位实时数据
	 * @param labCode
	 * @param url
	 * @param testUnitId
	 * @return    设定文件
	 * @return LabTestUnit    返回类型
	 * @throws
	 */
	public LabTestUnit searchRealTimeData(String labCode, String url, int testUnitId,float interval) {
		LabTestUnit labTestUnit = new LabTestUnit();
		labTestUnit.setTestUnitId(testUnitId);
		try {
			Service service = new Service(new URL(url));
			ServicePortType port = service.getServiceHttpPort();
			//录入条目
			ArrayOfTestProdInfoItem testProdInfoItems = port.getTestProdInfoItemByLabCode(labCode);
			String flag = getLabFlag(testProdInfoItems, labCode);
			//获取当前台位在测订单
			TestMetadata testMetadata = new TestMetadata();
			ArrayOfTestMetadata testMetadatas = port.getMetaData(labCode, 1, flag);
			if(null != testMetadatas && null != testMetadatas.getTestMetadata()){
				for(TestMetadata testMetadata1 : testMetadatas.getTestMetadata()){
					if(testMetadata1.getTestUnitId() == testUnitId){
						testMetadata = testMetadata1;
					}
				}
			}
			//如果当前台位没有在测订单，直接返回
			if(null == testMetadata.getTestUnitId()){
				return labTestUnit;
			}
			List<String> inputContent = testMetadata.getInputContent().getString();
			String testNo = inputContent.get(0);
			String proNo = inputContent.get(1);
			String proName = inputContent.get(2);
			//获取当前在测数据传感器信息
			ArrayOfSensorInfo sensorInfos = port.getSensorInformation(labCode, testMetadata.getTestIdentification());			
			//获取当前台位传感器类型
			Map<String, String> sensorTypeMap = new HashMap<String, String>();
			ArrayOfSensorTypeInfo sensorTypeInfos = port.getTestUnitSensorTypeInfo(labCode, testUnitId);
			if(null != sensorTypeInfos && null != sensorTypeInfos.getSensorTypeInfo()){
				for(SensorTypeInfo sensorTypeInfo : sensorTypeInfos.getSensorTypeInfo()){
					sensorTypeMap.put(sensorTypeInfo.getSensorTypeId().toString(), sensorTypeInfo.getUnit());
				}
			}
			//获取当前台位实时曲线
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date start = null;
			try {
				start = sdf.parse(testMetadata.getTestBeginTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date now = new Date();
			float f2 = (now.getTime() - start.getTime())/3600000f;
			float f1 = f2 - interval> 0 ? f2-interval : 0;
			ArrayOfString datas = port.getSensorTestDataByTime(labCode, testMetadata.getTestIdentification(), f1, f2);
			StringBuilder realTimeData = new StringBuilder();
			realTimeData.append("{\n");
			realTimeData.append("sybh:'").append(testNo).append("',\n");
			realTimeData.append("ybbh:'").append(proNo).append("',\n");
			realTimeData.append("cpxh:'").append(proName).append("',\n");
			realTimeData.append("list:[\n");
			for(SensorInfo sensorInfo : sensorInfos.getSensorInfo()){
				if(sensorInfo.getSelected() != 1) continue;
				StringBuilder sensorData = new StringBuilder();
				sensorData.append("{ name:'").append(sensorInfo.getSensorId()).append(":").append(sensorInfo.getSensorName()).append("(").append(sensorTypeMap.get(sensorInfo.getSensorTypeId().toString())).append(")',\n");
				sensorData.append("data:[");
				List<String> d=datas.getString();
				String[] s ={};
				if(d!=null&&d.size()>0){
					s = d.get(0).split(";");
				}
				for(String data : s){
					String[] s1 = data.split(",");
					sensorData.append("{name:'").append(s1[0]);
					String[] s2 = s1[1].split("@");
					for(int i = 0; i < s2.length; i++){
						if(StringUtils.isNotBlank(s2[i])){
							String[] s3 = s2[i].split(":");
							if(s3[0].equals(sensorInfo.getSensorId().toString())){
								sensorData.append("',value:'").append(s3[1]).append("'},");
							} 
						}
					}					
				}
				if(d!=null&&d.size()>0){
					sensorData.deleteCharAt(sensorData.length() - 1).append("]\n},");
				}else{
					sensorData.append("]\n},");
				}
				realTimeData.append(sensorData);
			}
			realTimeData.deleteCharAt(realTimeData.length() - 1).append("\n");
			realTimeData.append("]\n");
			realTimeData.append("}");
			labTestUnit.setRealTimeData(realTimeData.toString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		return labTestUnit;
		
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

}
