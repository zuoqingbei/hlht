package com.ulab.model;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.ulab.core.Constants;

import java.util.List;

/**
 * @Description: 其他数据
 * @Date: 2019/6/13 10:06
 * @Author: suncy
 **/
@TableBind(tableName = "t_b_other_data", pkName = "id")
public class OtherDataModel extends Model<OtherDataModel> {

    private static final long serialVersionUID = 4762813779629969917L;
    public static final OtherDataModel dao = new OtherDataModel();

    /***
     * @Description: 查询list
     **/
    public List<OtherDataModel> findList() {
        String fromSql = "from t_b_other_data ";
        List<OtherDataModel> list = OtherDataModel.dao.find("select * " + fromSql);
        return list;
    }
}
