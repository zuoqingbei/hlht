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
	public static final String READ_FILE_PATH="I:"+File.separator+"海联"+File.separator+"项目"+File.separator+"关于行政处罚类数据采集需求评估及POC"+File.separator+"代码"+
	File.separator+"clj"+File.separator+"采集附件-海联"+File.separator;//读取文件路径
	public static final String CREATE_FILE_PATH="D:"+File.separator+"kubi"+File.separator+"htmls"+File.separator;//生成文件路径
	public static final String CREATE_IMAGE_PATH="D:"+File.separator+"kubi"+File.separator+"images"+File.separator;//图片路径
	public static final String UNCOMPRESS_PATH="D:"+File.separator+"kubi"+File.separator+"uncompress";//解压后路径
	public static final String TEM_PATH="D:"+File.separator+"kubi"+File.separator+"backups";//备份文件路径
	public static final String FILE_ENCODE="gbk";//将文件转html时字符编码
	
}
