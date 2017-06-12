package com.ulab.model;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.Constants;

@TableBind(tableName = "t_b_lab_info", pkName = "id")
public class LabModel extends Model<LabModel> {
	private static final long serialVersionUID = 4762813779629969917L;
	public static final LabModel dao = new LabModel();

	/**
	 * 
	 * @time 2017年4月21日 下午2:38:19
	 * @author zuoqb
	 * @todo 查询展示在世界地图上的实验室-Map3D数据 数据是一级 二级 实验室等级 0：四大类 1：一级子类 2：二级子类
	 * @param @return
	 * @return_type List<Record>
	 */
	public List<Record> labShowWorldMap() {
		String pSql = "select id,d.short_name as shortname,'" + Constants.QD_LNG
				+ "' as lng,'" + Constants.QD_LAT
				+ "' as lat,a.num as value from t_b_dictionary d  ";
		pSql += " left join (select lab_type_code,count(1) as num from(select  lab_type_code,code from t_b_lab_info where del_flag="+Constants.DEL_FALG+" and show_in_map="+Constants.SHOW_IN_MAP+" and link_status=1 group by lab_type_code,code) group by lab_type_code ";
		pSql += " )a on d.id=a.lab_type_code where d.type='lab_type' and d.del_flag="+Constants.DEL_FALG+" order by d.order_no ";
		List<Record> parentList = Db.find(pSql);
		for (Record r : parentList) {
			String sql = "select p.short_name as pshortname,'"
					+ Constants.QD_LNG
					+ "' as plng,'"
					+ Constants.QD_LAT
					+ "' as plat,c.name as shortname,c.lng,c.lat,0 as value from t_b_lab_info c";
			sql += "  left join t_b_dictionary p on p.id=c.lab_type_code ";
			sql += "   where c.del_flag="+Constants.DEL_FALG+" and c.show_in_map="+Constants.SHOW_IN_MAP+" and c.lab_type_code='"
					+ r.get("id") + "'";
			List<Record> cList = Db.find(sql);
			r.set("cList", cList);
		}
		return parentList;
	}

	/**
	 * 
	 * @time 2017年4月14日 下午3:14:37
	 * @author zuoqb
	 * @todo 查询实验室总数
	 */
	public Integer findAllCount() {
		Record data = Db
				.findFirst("SELECT nvl(count(1),0) as count from(select  1 from t_b_lab_info lab where  lab.del_flag="
						+ Constants.DEL_FALG + " GROUP BY code ) ");
		return Integer.valueOf(data.getBigDecimal("count").toString());
	}

	/**
	 * 
	 * @time 2017年4月14日 下午3:14:37
	 * @author zuoqb
	 * @todo 查询实验室所分布大洲数量及国家数量
	 */
	public Record labSpread() {
		StringBuffer sb = new StringBuffer();
		sb.append(" select * from  ");
		sb.append("  (select nvl(count(distinct lab.location),0)   as areanum from t_b_lab_info lab where lab.del_flag="
				+ Constants.DEL_FALG  + " )a ");
		sb.append("  left join  ");
		sb.append("  (select nvl(count(distinct  lab.country),0) as countrynum from t_b_lab_info lab where lab.del_flag="
				+ Constants.DEL_FALG  + ")t ");
		sb.append("  on 1=1 ");
		sb.append("  left join  ");
		sb.append("  (select nvl(count(distinct  lab.belong_gl_code),0) as belongnum from t_b_lab_info lab where lab.del_flag="
				+ Constants.DEL_FALG  + " and lab.lab_type_code=4)t2 ");
		sb.append("  on 1=1 ");
		return Db.findFirst(sb.toString());
	}

	/**
	 * 
	 * @time 2017年4月14日 下午8:06:44
	 * @author zuoqb
	 * @todo 按照某维度统计数量
	 * @param @param filed:统计维度
	 * @param @return
	 * @return_type List<Record>
	 */
	public List<Record> labStatisByField(String sqlWhere, String field,String sort) {
		if(StringUtils.isBlank(sort)){
			sort=" desc ";
		}
		StringBuffer sb = new StringBuffer();
		sb.append(" select d.short_name as name, nvl(count(1),0) as count,d.id from   ");
		sb.append("  t_b_lab_info lab left join t_b_dictionary d on lab."
				+ field + "=d.id ");
		sb.append("  where lab.del_flag=" + Constants.DEL_FALG + " and lab." + field
				+ " is not null " + sqlWhere
				+ " group by d.name,d.short_name,d .order_no,d.id order by d.order_no  "+sort);
		List<Record> list=Db.find(sb.toString());
		/*if(Constants.MONI_JOIN_TIYAN&&"properties_code".equals(field)){
			//如果统计实验室性质，需要对用户体验与用户模拟做合并处理
			for(Record obj:list){
				if(Constants.EXPERIENCE_ID.equals(obj.get("id"))||Constants.SIMULATION_ID.equals(obj.get("id"))){
					String inside="";
					obj.set("name", Constants.SIMULATION_EXPERIENCE_JOIN_NAME);
					if(Constants.EXPERIENCE_ID.equals(obj.get("id"))){
						inside=Constants.SIMULATION_ID;
					}else{
						inside=Constants.EXPERIENCE_ID;
					}
					for(Record c:list){
						if(inside.equals(obj.get("id"))){
							int num=Integer.valueOf(obj.get("count")+"")+Integer.valueOf(c.get("count")+"");
							obj.set("count", num);
							list.remove(c);
						}
					}
				}
			}
			return list;
		}else{
			return list;
		}*/
		return list;
	}

	/**
	 * 
	 * @time 2017年4月19日 下午3:17:48
	 * @author zuoqb
	 * @todo 实验室联通统计
	 * @param @return
	 * @return_type Record
	 */
	public Record labLink() {
		StringBuffer sb = new StringBuffer();
		sb.append(" select all_num,link_num,un_link_num,to_char(round(link_num/all_num*100))||'%' as link_rate ");
		sb.append("  from (select count (*) as all_num from(select 1 from t_b_lab_info lab where lab.del_flag="+Constants.DEL_FALG+" group by code) ) a ");
		sb.append("  left join (SELECT count(1) as link_num from(select 1 as link_num from t_b_lab_info lab where lab.del_flag="+Constants.DEL_FALG+" and lab.link_status=1 group by code))b on 1=1  ");
		sb.append("  left join ( SELECT count(1) as un_link_num from(select 1 as un_link_num from t_b_lab_info lab where lab.del_flag="+Constants.DEL_FALG+" and lab.link_status=0  group by code))b on 1=1 ");
		return Db.findFirst(sb.toString());
	}
}
