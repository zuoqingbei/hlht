package com.ulab.util;

import java.util.UUID;

public class UUIDTool {
	public UUIDTool() {
	}

	/**  
	 * 自动生成32位的UUid，对应数据库的主键id进行插入用。  
	 * @return  
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public static String get4UUID() {
		UUID id = UUID.randomUUID();
		String[] idd = id.toString().split("-");
		return idd[1];
	}

	/**
	 * 获得8个长度的十六进制的UUID
	 * @return UUID
	 */
	public static String get8UUID() {
		UUID id = UUID.randomUUID();
		String[] idd = id.toString().split("-");
		return idd[0];
	}

	/**
	 * 获得12个长度的十六进制的UUID
	 * @return UUID
	 */
	public static String get12UUID() {
		UUID id = UUID.randomUUID();
		String[] idd = id.toString().split("-");
		return idd[0] + idd[1];
	}
}
