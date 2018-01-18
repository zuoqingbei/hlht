
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
 * @todo   信用类
 */
@TableBind(tableName = "credit_admin_penalty",pkName="rowid")
public class CreditModel extends Model<CreditModel> {
	public static final CreditModel dao = new CreditModel();
	private static final long serialVersionUID = 4762813779629969917L;

	public List<CreditModel> updateHash(){
		String sql="select rowid,penalty_entity,legal_person from credit_admin_penalty where verify_hash is null ";
		List<CreditModel> list=dao.find(sql);
        List<String> sqlList=new ArrayList<String>();
		for(CreditModel m:list){
			String hashStr=MD5Util.getStringMD5(m.get("penalty_entity")+"@#&"+m.get("legal_person")).toLowerCase();
			String update="update credit_admin_penalty set verify_hash='"+hashStr+"' where rowid='"+m.get("rowid")+"'  ";
			sqlList.add(update);
			Db.update(update);
		}
		//Db.batch(sqlList, sqlList.size());
		return list;
	}
}
