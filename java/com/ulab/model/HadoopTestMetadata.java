package com.ulab.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
/**
 * 
 * @time   2017年9月16日 下午5:00:58
 * @author zuoqb
 * @todo   测试数据元数据信息(每次测试生成一条信息)
 */
public class HadoopTestMetadata {
	public static final HadoopTestMetadata dao = new HadoopTestMetadata();
	/**
	 * 
	 * @time   2017年9月20日 上午11:17:52
	 * @author zuoqb
	 * @todo   根据实验室以及测试单元编码获取测试信息
	 * @param  @param configName
	 * @param  @param labCode
	 * @param  @param testUnitid
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public List<Record> findTestMetadata(BaseController c,String configName,String labCode,String testUnitid){
		String tableName=DbConfigModel.dao.getTableNameByColumn(c,configName, Constants.TESTMETADATA);
		String sql="select labcode,labname,testidentification,testunitid,testbegintime,testendtime,reportbegintime,reportendtime,istesting,reportno,productmodel,productcode,testitemname,testitemid from "+tableName+"  where testunitid='"+testUnitid+"' and  labcode='"+labCode+"' "+DbConfigModel.dao.getPartitionSql(c, configName, labCode)+" order by testbegintime desc  ";
		return Db.use(configName).find(sql);
	}
	
	/**
	 * 
	 * @time   2017年9月20日 上午11:17:52
	 * @author zuoqb
	 * @todo   根据实验室以及测试单元编码获取最后一次测试信息
	 * @param  @param configName
	 * @param  @param labCode
	 * @param  @param testUnitid
	 * @param  @return
	 * @return_type   List<Record>
	 */
	public Record findLastTestMetadata(BaseController c,String configName,String labCode,String testUnitId){
		String tableName=DbConfigModel.dao.getTableNameByColumn(c,configName, Constants.TESTMETADATA);
		String sql="select labcode,labname,testidentification,testunitid,testbegintime,testendtime,reportbegintime,reportendtime,istesting,reportno,productmodel,productcode,testitemname,testitemid from "+tableName+"  where testunitid='"+testUnitId+"' and  labcode='"+labCode+"' "+DbConfigModel.dao.getPartitionSql(c, configName, labCode,false)+" order by testbegintime desc  ";
		Record lab=LabCodeModel.dao.findLabByCode(labCode);
		if(lab!=null){
			//如果是检测中心 整机模块 则需要上一次测试 否则没有数据
			if("46".equals(lab.getStr("data_center_id"))||"51".equals(lab.getStr("data_center_id"))){
				List<Record> list=Db.use(configName).find(sql);
				if(list!=null&&list.size()>0){
					return list.get(1);
				}
			}
		}
		return Db.use(configName).findFirst(sql);
	}
	public Record findHiveLastTestMetadata(BaseController c,String configName,String labCode,String testUnitId){
		String tableName=DbConfigModel.dao.getTableNameByColumn(c,configName, Constants.TESTMETADATA);
		String sql="select labcode,labname,testidentification,testunitid,testbegintime,testendtime,reportbegintime,reportendtime,istesting,reportno,productmodel,productcode,testitemname,testitemid,primarykey from "+tableName+"  where testunitid='"+testUnitId+"' and  labcode='"+labCode+"' "+DbConfigModel.dao.getPartitionSql(c, configName, labCode)+" order by testbegintime desc  ";
		return Db.use(configName).findFirst(sql);
	}
}
