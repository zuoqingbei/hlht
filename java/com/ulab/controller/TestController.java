package com.ulab.controller;

import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Page;
import com.ulab.aop.GlobalInterceptor;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.model.HshPageModel;
import com.ulab.util.FileUtil;
/**
 * 
 * @time   2017年4月11日 上午10:59:00
 * @author zuoqb
 * @todo   测试类
 */
@ControllerBind(controllerKey = "/test", viewPath = "/test")
@Before({GlobalInterceptor.class})
public class TestController extends BaseController {
	
    public void test() {
    	Page<HshPageModel> pages=HshPageModel.dao.paginate(1, 10);
        renderJson(pages);
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
    	String path=Constants.CREATE_FILE_PATH+fileName;
    	String htmlText=FileUtil.readFile(path);
    	renderHtml(htmlText);
    }
    public void tohtml(){
    	FileUtil.translateFileToHtml();
    	renderNull();
    }
   
/*    public void getJsonFile(){
    	String fileName=getPara("fileName","");
    	String path=getWebRootPath()+"/src/main/webapp/static/data/"+fileName;
    	String json=JsonUtils.readJson(path);
    	renderText(json);
    }
   */
}
