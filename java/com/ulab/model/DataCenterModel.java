package com.ulab.model;

import java.util.List;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
/**
 * 
 * @time   2017年10月19日 上午5:50:01
 * @author zuoqb
 * @todo   数据中心基础信息
 */
@TableBind(tableName = "t_b_data_center",pkName="id")
public class DataCenterModel extends Model<DataCenterModel>{
	private static final long serialVersionUID = 1L;
	public static final DataCenterModel dao = new DataCenterModel();
	/**
	 * 
	 * @time   2017年10月19日 上午5:59:18
	 * @author zuoqb
	 * @todo   查询数据中心 包含层级关系
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findAllDataCenter(){
		List<Record> list=findDataCenterByLevel("1");
		for(Record center:list){
			if("1".equals(center.getStr("haschildren"))){
				center.set("children", findDataCenterByParentId(center.get("id")));
			}
		}
		return list;
		
	}
	/**
	 * 
	 * @time   2017年10月19日 上午5:54:59
	 * @author zuoqb
	 * @todo   根据等级查询数据中心
	 * @param  @param level
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findDataCenterByLevel(Object level){
		String sql="select * from t_b_data_center where center_level='"+level+"' and del_flag=0 order by order_num";
		return Db.find(sql);
	}
	/**
	 * 
	 * @time   2017年10月19日 上午5:56:17
	 * @author zuoqb
	 * @todo   根据父级ID查询数据中心
	 * @param  @param parentId
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findDataCenterByParentId(Object parentId){
		String sql="select * from t_b_data_center where parent_id='"+parentId+"' and del_flag=0 order by order_num";
		List<Record> list=Db.find(sql);
		for(Record center:list){
			if("1".equals(center.getStr("haschildren"))){
				center.set("children", findDataCenterByParentId(center.get("id")));
			}
		}
		return list;
	}
	/**
	 * 
	 * @time   2017年10月26日 下午9:37:34
	 * @author zuoqb
	 * @todo   根据数据中心查询实验室 level为3(单位/产品)
	 * @param  @param dataCenterId
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findDataCenterLab(String dataCenterId){
		String sql="select * from t_b_data_center where parent_id='"+dataCenterId+"' and center_level=3 and del_flag=0 order by order_num";
		List<Record> list=Db.find(sql);
		for(Record center:list){
			List<Record> labs = LabCodeModel.dao
					.findLabByDataCenterId(center.getStr("id"));
			center.set("children", labs);
		}
		return list;
	}
}