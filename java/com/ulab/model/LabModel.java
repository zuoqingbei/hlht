
package com.ulab.model;

import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
@TableBind(tableName = "t_b_lab_info",pkName="id")
public class LabModel extends Model<LabModel> {
	private static final long serialVersionUID = 4762813779629969917L;
	public static final LabModel dao = new LabModel();
	public static final int SHOW_IN_MAP=0;//显示在地图
	public static final int DEL_FALG=0;//未删除标志
	/**
	 * 
	 * @time   2017年4月13日 上午9:46:53
	 * @author zuoqb
	 * @todo   查询展示在世界地图上的实验室-Map3D数据 数据是一级  二级
	 * 实验室等级 0：四大类 1：一级子类 2：二级子类
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> labShowWorldMap(){
		String pFromSql=" select distinct parent_id from t_b_lab_info where lab_level=1 and show_in_map="+LabModel.SHOW_IN_MAP+" and del_flag="+LabModel.DEL_FALG;
		String pSql=" select c.id,c.short_name as shortname,c.lng,c.lat,c. id as cid,c.parent_id as pid,nvl (n.num, 0) as value from ";
		pSql+=" (select * from t_b_lab_info where id in ("+pFromSql+")"+"  order by order_no) c ";
		//数量
		pSql+=" left join (select parent_id,	count (1) as num from	t_b_lab_info where parent_id in (";
		pSql+=" select id 	from 	t_b_lab_info where id in ("+pFromSql+")";
		pSql+=" 	)	group by parent_id) n on n.parent_id = c. id ";
		List<Record> parentList=Db.find(pSql);
    	for(Record r:parentList){
    		String fromSql="  from t_b_lab_info where parent_id="+r.get("id")+" and del_flag="+LabModel.DEL_FALG+" and show_in_map="+LabModel.SHOW_IN_MAP;
    		String sql=" select p.short_name as pshortname,p.lng as plng,p.lat as plat,c.short_name as shortname,c.lng,c.lat,c.id as cid,p.id as pid,nvl(n.num,0) as value ";
    		sql+="  from ("+" select * "+fromSql+" order by order_no ) c left join t_b_lab_info  p on c.parent_id=p.id ";
    		//统计数量
    		sql+=" left join (select parent_id,count(1) as num from t_b_lab_info where parent_id in(";
    		sql+=" select id "+fromSql+") and del_flag=0 and show_in_map=0 group by parent_id)n on n.parent_id=c.id";
    		List<Record> cList=Db.find(sql);
    		r.set("cList", cList);
    	}
    	return parentList;
	}
}
