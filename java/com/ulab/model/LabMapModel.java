
package com.ulab.model;

import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.Constants;
@TableBind(tableName = "t_b_lab_map",pkName="id")
public class LabMapModel extends Model<LabModel> {
	private static final long serialVersionUID = 4762813779629969917L;
	public static final LabMapModel dao = new LabMapModel();
	
	/**
	 * 
	 * @time   2017年4月18日 下午5:16:53
	 * @author zuoqb
	 * @todo   展示在平面图上的数据
	 * @param  @param productCode
	 * @param  @param labType
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> labShowFlatMap(String sqlWhere){
		String sWhere=" del_flag="+Constants.DEL_FALG;
		sWhere+=sqlWhere;
    	String sql="";
    	sql+=" select m.lng,m.lat,m.short_name as title,m.name,lab.num,'' as datetime,m.location,m.lab_type  from t_b_lab_map m inner join (";
    	sql+=" select belong_gl_code,count(1) as num from t_b_lab_info lab where "+sWhere+" group by lab.belong_gl_code ";
    	sql+=" ) lab on lab.belong_gl_code=m.id ";
		return Db.find(sql);
	}
	public List<Record> labShowFlatMap2(String sqlWhere){
		String sWhere=" del_flag="+Constants.DEL_FALG;
		sWhere+=sqlWhere;
    	String sql="";
    	sql+=" select distinct name as title,lab_type_name as lab_type,city as location  from t_b_lab_info where del_flag=0 and link_status=1";
		return Db.find(sql);
	}
}
