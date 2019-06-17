
package com.ulab.model;

import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
@TableBind(tableName = "t_b_dictionary",pkName="id")
public class DicModel extends Model<DicModel> {
	private static final long serialVersionUID = 4762813779629969917L;
	public static final DicModel dao = new DicModel();

	public List<Record> findDicByType(String type){
		StringBuffer sb=new StringBuffer();
		sb.append(" select * from t_b_dictionary where type='"+type+"' and del_flag=0 order by order_no  ");
		return Db.find(sb.toString());
	}
	/**
	 *
	 * @time   2018年1月31日 下午4:01:04
	 * @author zuoqb
	 * @todo   根据实验室编码查询该实验室归属产线
	 * @param  @param labCode
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findProductTypeByLabCode(String labCode){
		StringBuffer sb=new StringBuffer();
		sb.append(" select  *from t_b_dictionary where id in(select product_code from t_b_lab_info where code='"+labCode+"' and del_flag=0) order by order_no ");
		return Db.find(sb.toString());
	}
}
