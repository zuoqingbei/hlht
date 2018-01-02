package com.ulab.core;

import java.io.File;

/**
 * 
 * @time   2018年1月2日10:30:17
 * @author zuoqb
 * @todo   常量
 */
public class Constants {
	public static final String SESSION_USER = "session_user";
	public static final String ATTR_TEMPLTE_DIR = "tpl_dir";
	public static final String LAYOUT_TEMPLTE_DIR = "/WEB-INF/pages/layout/";//layout模板路径
	public static final String TAG_TEMPLTE_DIR = "/tag/";//tag模板路径
	public static final String READ_FILE_PATH="I:/海联/项目/关于行政处罚类数据采集需求评估及POC/代码/clj/采集附件-海联/";//读取文件路径
	public static final String CREATE_FILE_PATH="D:/kubi/htmls/";//生成文件路径
	/**
	 * https://www.cnblogs.com/eoooxy/p/6085255.html（参考）
	 * 图片路径 如果部署项目到tomcat下 需要在<host></host>之间配置文件增加虚拟路径 ：docBase是实际文件路径 path是页面上显示路径 
	 * 如果不增加  报错 Not allowed to load local resource
	 * <Context path="/file"      docBase="D:\kubi\images" debug="0" reloadable="true"/>
	 */
	public static final String CREATE_IMAGE_PATH="D:/kubi/images/";
	//public static final String  IMAGE_XNPATH=File.separator+"file"+File.separator;//图片虚拟路径
	public static final String UNCOMPRESS_PATH="D:/kubi/uncompress";//解压后路径
	public static final String TEM_PATH="D:/kubi/backups";//备份文件路径
	public static final String FILE_ENCODE="gbk";//将文件转html时字符编码
	
}
