package com.ulab.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.aop.GlobalInterceptor;
import com.ulab.core.BaseController;
import com.ulab.model.DicModel;
import com.ulab.model.LabMapModel;
import com.ulab.model.LabModel;
import com.ulab.model.ProviderDicModel;
import com.ulab.util.JsonUtils;
import com.ulab.util.SqlUtil;
/**
 * 
 * @time   2017年4月11日 上午10:59:00
 * @author zuoqb
 * @todo   测试类
 */
@ControllerBind(controllerKey = "/layout", viewPath = "/layout")
@Before({GlobalInterceptor.class})
public class LayoutController extends BaseController {
	public void left() {
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
        render("left.html");
    }
	public void right() {
        render("right.html");
    }
}
