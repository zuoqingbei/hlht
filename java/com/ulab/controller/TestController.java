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
import com.ulab.model.LabModel;
import com.ulab.model.Line;
import com.ulab.model.SensorTypeDto;
import com.ulab.model.Value;
import com.ulab.util.BrowseUtil;
import com.ulab.util.JsonUtils;
/**
 * 
 * @time   2017年4月11日 上午10:59:00
 * @author zuoqb
 * @todo   测试类
 */
@ControllerBind(controllerKey = "/test", viewPath = "/test")
@Before({GlobalInterceptor.class})
public class TestController extends BaseController {
	//dubbo注入 预留口
	/*@Inject.BY_NAME
	private BlogService blogService;*/
	
    public void test() {
        render("hello.html");
    }
    /**
     * 
     * @time   2017年4月11日 下午3:14:13
     * @author zuoqb
     * @todo   POST接口
     */
   /* @Before(POST.class)
    public void ajax() {
    	User user=User.dao.findById("7");
        renderJson(user);
    }*/
    public void index() {
        render("index.html");
    }
    public void flatMap() {
        render("flatMap.html");
    }
    /**
     * 
     * @time   2017年4月13日 上午9:38:56
     * @author zuoqb
     * @todo   全球实验室数据
     * @param  
     * @return_type   void
     */
    public void labAjax(){
    	List<Record> parentList=LabModel.dao.labShowWorldMap();
    	renderJson(parentList);
    }
    public void sort() {
        render("sort.html");
    }
    public void echart() {
        render("echart.html");
    }
    public void echartAjax(){
    	List<Record> r=new ArrayList<Record>();
    	Record obj=new Record();
    	obj.set("name", "key1");
    	obj.set("count", 10);
    	r.add(obj);
    	Record obj1=new Record();
    	obj1.set("name", "key2");
    	obj1.set("count", 60);
    	r.add(obj1);
    	renderJson(r);
    }
    /**
     * 
     * @time   2017年4月14日 下午2:03:12
     * @author zuoqb
     * @todo   双线
     * @param  
     * @return_type   void
     */
    public void monthConUser(){
		List<Record> list =new ArrayList<Record>();
		List<Record> list1 =new ArrayList<Record>();
		Random ran = new Random();  
		for(int x=0;x<12;x++){
			Record r=new Record();
			Record r1=new Record();
			r.set("count", ran.nextInt(100));
			r.set("name", x+1+"月");
			r1.set("count", ran.nextInt(100));
			r1.set("name", x+1+"月");
			list.add(r);
			list1.add(r1);
		}
		Map<String,Object> result=new HashMap<String, Object>();
		result.put(0+"", list);
		result.put(1+"", list1);
		renderJson(result);
	}
  //仪表盘数据
  	public void getGauge(){
  		Random ran = new Random();  
  		int result=ran.nextInt(100);
  		Record r=new Record();
  		r.set("result", result);
  		renderJson(r);
  	}
  	
    public void linkEchart() {
        render("linkEchart.html");
    }
    public void linkEchart2() {
        render("linkEchart2.html");
    }
    
    /**
     * 
     * @time   2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo   获取json文件数据
     * @param  
     * @return_type   void
     */
    public void getJsonFile(){
    	String fileName=getPara("fileName","");
    	String path=getWebRootPath()+"/src/main/webapp/static/data/"+fileName;
    	String json=JsonUtils.readJson(path);
    	renderText(json);
    }
    public void openURL(){
    	BrowseUtil.openURL("http://10.130.96.27/doc/page/login.asp?_1493774940116");
    	renderText("");
    }
    public static void main(String[] args) {
    	String path="D://unit.json";
    	System.out.println(JsonUtils.readJson(path));
	}
}
