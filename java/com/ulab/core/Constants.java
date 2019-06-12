package com.ulab.core;

/**
 * 
 * @time   2017年4月11日 上午11:00:01
 * @author zuoqb
 * @todo   常量
 */
public class Constants {
	//用户
	public static final String SESSION_USER = "session_user";
	public static final String ATTR_TEMPLTE_DIR = "tpl_dir";
	public static final String LAYOUT_TEMPLTE_DIR = "/WEB-INF/pages/layout/";//layout模板路径
	public static final String TAG_TEMPLTE_DIR = "/tag/";//tag模板路径
	public static final int SHOW_IN_MAP = 1;//显示在地图
	public static final int DEL_FALG = 0;//未删除标志
	public static final String QD_LNG = "120.355171";//青岛经度
	public static final String QD_LAT = "36.082981";//青岛维度
	/**
	 * 量产缓存
	 */
	public static final String JIANC_EPRO_SESSION = "jianc_epro_session_";//产品型号检测结果属性
	public static final String JIANC_GAUSSIAN_SESSION = "jianc_gaussian_session_";

	/**
	 * 实验室数据源配置名称（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_THAILAND = "thailand";//泰国数据库
	/**
	 * 胶州海尔空调数据库（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_JZKT = "jzkt";//胶州海尔空调数据库
	/**
	 * 数据源表配置对应字段名称（对应T_B_DB_CONFIG中列名称 必须与表字段相同 不要随便改动）
	 */
	public static final String TESTMETADATA = "testmetadata";//测试数据元数据信息对应应表名称
	public static final String SENSORINFO = "sensorInfo";//传感器信息对应的表
	public static final String TESTUNITINFO = "testUnitInfo";//监测单元对应的表
	public static final String SENSORTYPEINFO = "sensorTypeInfo";//传感器类型对应的表
	public static final String TESTDATA = "testdata";//测试数据对应的表

	/**
	 * 重庆实验室hive测试库信息（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_HIVE = "chongqinghive";//hive实验室
	
	/**
	 * 胶南热水器数据库（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_JNRSQ = "jnrsq";//胶南热水器数据库
	/**
	 * 胶南洗涤数据库（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_JNXD = "jnxd";//胶南洗涤数据库
	public static final String CONFIGNAME_RUSSIA = "russia";//俄罗斯数据库
	/**
	 * 检测中心整机数据库（与表T_B_DB_CONFIG中config_name对应 不要随便改）
	 */
	public static final String CONFIGNAME_ZHBRZJ = "zhbrzj";//检测中心整机数据库
}
