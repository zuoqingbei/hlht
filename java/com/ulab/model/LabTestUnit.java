package com.ulab.model;

/**
 * @ClassName: LabTestUnit
 * @Description: 实验室台位
 * @Author     Jilei
 * @Date  2017-5-30 下午1:47:39
 */
public class LabTestUnit {
	
	
	/**
	 * @Fields testUnitId : 台位ID
	 */
	int testUnitId;
	/**
	 * @Fields testUnitName : 台位名称
	 */
	String testUnitName;
	/**
	 * @Fields realTimeData : 实时数据
	 */
	String realTimeData;
	/**
	 * @Fields labStatus : 台位状态（在用/停测)
	 */
	String testUnitStatus;
	
	
	public int getTestUnitId() {
		return testUnitId;
	}
	public void setTestUnitId(int testUnitId) {
		this.testUnitId = testUnitId;
	}
	public String getTestUnitName() {
		return testUnitName;
	}
	public void setTestUnitName(String testUnitName) {
		this.testUnitName = testUnitName;
	}
	public String getRealTimeData() {
		return realTimeData;
	}
	public void setRealTimeData(String realTimeData) {
		this.realTimeData = realTimeData;
	}
	public String getTestUnitStatus() {
		return testUnitStatus;
	}
	public void setTestUnitStatus(String testUnitStatus) {
		this.testUnitStatus = testUnitStatus;
	}

}
