package com.ulab.client.IntegrationService;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.ulab.client.webServiceRerigerator.ArrayOfSensorTypeInfo;
import com.ulab.client.webServiceRerigerator.ArrayOfTestUnitInfo;
import com.ulab.client.webServiceRerigerator.ArrayOfSensorInfo;
import com.ulab.client.webServiceRerigerator.TestUnitInfo;
import com.ulab.client.webServiceRerigerator.SensorTypeInfo;
import com.ulab.client.webServiceRerigerator.SensorInfo;
import com.ulab.model.LabAllData;
import com.ulab.model.LabData;
import com.ulab.model.LabSingleData;
import com.ulab.model.LabTestUnit;

public class TestWebService {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
//		Service service = new Service();
//		ServicePortType port = service.getServiceHttpPort();
//		
//		ArrayOfConnInfo connInfos = port.getConnInfoAll();
//		System.out.println(connInfos.getConnInfo().size());
//		for(ConnInfo connInfo : connInfos.getConnInfo()){
//			if("aircondition".equals(connInfo.getLabCode()) || "washerkekao01".equals(connInfo.getLabCode()) || !connInfo.getUrl().startsWith("http")) continue;
//			System.out.println("------"+connInfo.getLabCode());
//			try {
//				com.ulab.client.webServiceRerigerator.Service service2 = new com.ulab.client.webServiceRerigerator.Service(new URL(connInfo.getUrl()));
//				com.ulab.client.webServiceRerigerator.ServicePortType port2 = service2.getServiceHttpPort();
////				ArrayOfTestUnitInfo testUnitInfos = port2.getTestUnitInfo(connInfo.getLabCode());
////				
////				for(TestUnitInfo testUnitInfo : testUnitInfos.getTestUnitInfo()){
////					ArrayOfSensorTypeInfo sensorTypeInfos = port2.getTestUnitSensorTypeInfo(connInfo.getLabCode(), testUnitInfo.getTestUnitId());
////					for(SensorTypeInfo sensorTypeInfo : sensorTypeInfos.getSensorTypeInfo()){
////						System.out.println(connInfo.getLabCode()+"="+ToStringBuilder.reflectionToString(sensorTypeInfo));
////					}
////				}
//				
//				ArrayOfSensorInfo sensorInfos = port2.getSensorConfig(connInfo.getLabCode());
//				
//				for(SensorInfo sensorInfo : sensorInfos.getSensorInfo()){
//					System.out.println(ToStringBuilder.reflectionToString(sensorInfo));
//				}
//			} catch (MalformedURLException e) {
//				java.util.logging.Logger.getLogger(Service.class.getName())
//                .log(java.util.logging.Level.INFO, 
//                     "Can not initialize the default wsdl from {0}", connInfo.getUrl());
//			}
//		}
//		}
		IntegrationServiceClient client = new IntegrationServiceClient();
//		LabAllData labAllData = client.searchLabAllData();
//		System.out.println(ToStringBuilder.reflectionToString(labAllData));
//		for(LabSingleData labSingleData : labAllData.getLabSingleDataList()){
//			System.out.println(ToStringBuilder.reflectionToString(labSingleData));
//		}
		List<LabData> list = client.searchLabData();
		for(LabData labData : list){
			System.out.println(ToStringBuilder.reflectionToString(labData));
			for(LabTestUnit labTestUnit : labData.getTestUnitList()){
				System.out.println(ToStringBuilder.reflectionToString(labTestUnit));
			}
		}

	}

}
