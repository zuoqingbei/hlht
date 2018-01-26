package com.ulab.model;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
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
	public void siteException() {
		List<SiteModel> sites=SiteModel.dao.findAllSite();
		for(SiteModel site:sites){
			 Map<String,Object> result=HttpClientUtil.sendGet(site.getStr("site_url").trim());
			//之前的进行更新
			String update="update error_admin_log set del_flag=1 where siteid='"+site.get("rowid")+"' and exception_type=1 and monitor_mode=1 and del_flag=0";
			Db.update(update);
			if("false".equals(result.get("success").toString())){
				//网站异常
				LogModel log=new LogModel();
				log.set("siteId",site.get("rowid")).set("site_name",site.getStr("site_name"));
				log.set("site_code",site.get("site_code")).set("site_url",site.getStr("site_url"));
				log.set("exception_desc",result.get("msg"));
				log.set("createDate",new Date()).set("del_flag",0);
				log.set("exception_type",1).set("monitor_mode",1).save();
			}
		}
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
			String tableName=judgeTableBySite(site);
			if(StringUtils.isNotBlank(tableName)){
				String sql="select max(crawler_date) as crawler_date,timestampdiff(hour,crawler_date,now()) as intervals from "+tableName+" where source_name='"+site.getStr("site_name")+"'";
			    Record r=Db.findFirst(sql);
			    if(r!=null){
			    	//之前的进行更新
					String update="update error_admin_log set del_flag=1 where siteid='"+site.get("rowid")+"' and exception_type=2 and monitor_mode=1 and del_flag=0";
					Db.update(update);
			    	//判断是否超时
			    	String intervals=r.get("intervals")+"";
			    	if(StringUtils.isBlank(r.getStr("crawler_date"))){
			    		//从未采集
						LogModel log=new LogModel();
						log.set("siteId",site.get("rowid")).set("site_name",site.getStr("site_name"));
						log.set("site_code",site.get("site_code")).set("site_url",site.getStr("site_url"));
						log.set("exception_desc","该站点还未采集数据。");
						log.set("createDate",new Date()).set("del_flag",0);
						log.set("exception_type",2).set("monitor_mode",1).save();
			    	}else if(Integer.parseInt(intervals)>site.getInt("waring_time")){
			    		//大于阈值 进行报警
			    		LogModel log=new LogModel();
						log.set("siteId",site.get("rowid")).set("site_name",site.getStr("site_name"));
						log.set("site_code",site.get("site_code")).set("site_url",site.getStr("site_url"));
						log.set("exception_desc","最后采集日期为"+r.get("crawler_date")+",网站设定阈值为"+site.get("waring_time")+"小时,超出"+(Integer.parseInt(intervals)-site.getInt("waring_time"))+"小时。");
						log.set("createDate",new Date()).set("del_flag",0);
						log.set("exception_type",2).set("monitor_mode",1).save();
			    	}
			    }
			}
		}
	}
	/**
	 * 
	 * @time   2018年1月26日 上午9:52:00
	 * @author zuoqb
	 * @todo   根据站点信息获取数据存储的表
	 * @param  @param site
	 * @param  @return
	 * @return_type   String
	 */
	public static String judgeTableBySite(SiteModel site){
		String tableName="";
		switch (site.getStr("level2")) {
		case "信用":
			tableName="credit_admin_penalty";
			break;
		case "保险":
			tableName="insurance_admin_penalty";
			break;
		case "证券":
			tableName="";
			break;
		case "税务":
			tableName="";
			break;
		case "人行":
			tableName="";
			break;
		case "工商":
			tableName="";
			break;
		default:
			break;
		}
		return tableName;
	}
	public static void main(String[] args) {
		String url="http://www.zjzwfw.gov.cn/zjzw/punish/frontpunish/showadmins.do?webId=1&tabid=00001";
		String result;
		
		result=HttpClientUtil.sendGetRequestHsh(url);
		
		System.out.println(result);
	}
}
