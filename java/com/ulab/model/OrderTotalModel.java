package com.ulab.model;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.ulab.core.Constants;

import java.util.List;

/***
 * @Description: 订单统计数据
 * @Date: 2019/5/31 11:29
 * @Author: suncy
 **/
@TableBind(tableName = "t_b_order_total", pkName = "id")
public class OrderTotalModel extends Model<OrderTotalModel> {

    private static final long serialVersionUID = 4762813779629969917L;
    public static final OrderTotalModel dao = new OrderTotalModel();

    /***
     * @Description: 查询list
     **/
    public List<OrderTotalModel> findList() {
        String fromSql = "from t_b_order_total where del_flag='" + Constants.DEL_FALG + "' ";
        List<OrderTotalModel> list = OrderTotalModel.dao.find("select *", fromSql);
        return list;
    }
}
