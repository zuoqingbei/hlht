package com.ulab.model;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.ulab.util.HttpClientUtil;

/**
 * 
 * @time   2018年1月25日 下午3:16:56
 * @author zuoqb
 * @todo   异常日志
 */
@TableBind(tableName = "error_admin_log", pkName = "rowid")
public class LogModel extends Model<LogModel> {
	public static final LogModel dao = new LogModel();
	private static final long serialVersionUID = 4762813779629969917L;
	/**
	 * 
	 * @time   2018年1月25日 下午3:31:24
	 * @author zuoqb
	 * @todo   网站异常
	 * @param  
	 * @return_type   void
	 */
	public void WebException() {

	}
	/**
	 * 
	 * @time   2018年1月25日 下午3:32:09
	 * @author zuoqb
	 * @todo   采集异常
	 * @param  
	 * @return_type   void
	 */
	public void collectionException(){
		List<SiteModel> sites=SiteModel.dao.findAllSite();
		for(SiteModel site:sites){
			 Map<String,Object> result=HttpClientUtil.sendGet(site.getStr("site_url").trim());
			if("false".equals(result.get("success").toString())){
				//网站异常
				LogModel log=new LogModel();
				log.set("siteId",site.get("rowid")).set("site_name",site.getStr("site_name"));
				log.set("site_code",site.get("site_code")).set("site_url",site.getStr("site_url"));
				log.set("exception_desc",result.get("msg"));
				log.set("createDate",new Date());
				log.set("exception_type",1).set("monitor_mode",1).save();
			}
		}
	}
	public static void main(String[] args) {
		String url="http://www.zjzwfw.gov.cn/zjzw/punish/frontpunish/showadmins.do?webId=1&tabid=00001";
		String result;
		
		result=HttpClientUtil.sendGetRequestHsh(url);
		
		System.out.println(result);
	}
}
