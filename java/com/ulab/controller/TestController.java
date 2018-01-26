package com.ulab.controller;

import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Page;
import com.ulab.aop.GlobalInterceptor;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.model.CreditModel;
import com.ulab.model.HshPageModel;
import com.ulab.model.InsuranceModel;
import com.ulab.model.LogModel;
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
	
	public void list() {
		render("list.html");
	}
    public void listData() {
    	int pageNum=getParaToInt("pageNum",1);
    	int pageSize=getParaToInt("pageSize",10);
    	Page<HshPageModel> pages=HshPageModel.dao.paginate(pageNum, pageSize);
        renderJson(pages);
    }
  
    
    /**
     * 
     * @time   2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo   获取File文件数据
     * @param  
     * @return_type   void
     */
    public void getFileFile(){
    	String fileName=getPara("fileName","");
    	String path=Constants.CREATE_FILE_PATH+fileName;
    	String htmlText=FileUtil.readFile(path);
    	//替换图片路径
    	htmlText=htmlText.replaceAll(Constants.CREATE_IMAGE_PATH, "/file/");
    	renderHtml(htmlText);
    }
    public void tohtml(){
    	FileUtil.translateFileToHtml();
    	renderNull();
    }
    
    public void to1(){
    	InsuranceModel.dao.updateHash();
    	renderNull();
    }
    public void to2(){
    	CreditModel.dao.updateHash();
    	renderNull();
    }
    /**
     * 
     * @time   2018年1月25日 下午3:50:20
     * @author zuoqb
     * @todo   网站访问异常监控
     * @param  
     * @return_type   void
     */
    public void siteException(){
		Thread th=new Thread(new Runnable() {
			@Override
			public void run() {
				LogModel.dao.siteException();
			}
		});
		th.start();
    	renderText("网站访问异常监控已启动");
    }
    public void collectionException(){
  		Thread th=new Thread(new Runnable() {
  			@Override
  			public void run() {
  				LogModel.dao.collectionException();
  			}
  		});
  		th.start();
      	renderText("网站采集异常监控已启动");
      }
}
