
package com.ulab.model;

import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
/**
 * 
 * @time   2018年1月25日 下午3:16:56
 * @author zuoqb
 * @todo   站点信息
 */
@TableBind(tableName = "site_admin_info",pkName="rowid")
public class SiteModel extends Model<SiteModel> {
	public static final SiteModel dao = new SiteModel();
	private static final long serialVersionUID = 4762813779629969917L;
	public List<SiteModel> findAllSite(){
		return SiteModel.dao.find("select * from site_admin_info where del_flag=0");
	}
}
