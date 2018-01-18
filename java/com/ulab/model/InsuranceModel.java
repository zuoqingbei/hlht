
package com.ulab.model;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.ulab.util.MD5Util;
/**
 * 
 * @time   2018年1月15日11:08:26
 * @author zuoqb
 * @todo   保险类
 */
@TableBind(tableName = "insurance_admin_penalty",pkName="rowid")
public class InsuranceModel extends Model<InsuranceModel> {
	public static final InsuranceModel dao = new InsuranceModel();
	private static final long serialVersionUID = 4762813779629969917L;

	public List<InsuranceModel> updateHash(){
		String sql="select rowid,title,source_name from insurance_admin_penalty where verify_hash is null ";
		List<InsuranceModel> list=dao.find(sql);
        List<String> sqlList=new ArrayList<String>();
		for(InsuranceModel m:list){
			String hashStr=MD5Util.getStringMD5(m.get("title")+"@#&"+m.get("source_name")).toLowerCase();
			String update="update insurance_admin_penalty set verify_hash='"+hashStr+"' where rowid='"+m.get("rowid")+"'  ";
			sqlList.add(update);
			Db.update(update);
		}
		//Db.batch(sqlList, sqlList.size());
		return list;
	}
}
