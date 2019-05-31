package com.ulab.model;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.util.MD5Util;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

@TableBind(tableName = "t_b_order_list", pkName = "id")
public class OrderListModel extends Model<OrderListModel> {
    private static final long serialVersionUID = 4762813779629969917L;
    public static final OrderListModel dao = new OrderListModel();

    /**
     * @param pageSize:
     * @param pageNumber:
     * @param c:
     * @Description: 分页查询
     * @Date: 2019/5/30 17:31
     * @return: com.jfinal.plugin.activerecord.Page<com.ulab.model.OrderListModel>
     * @Author: suncy
     **/
    public Page<OrderListModel> pager(Integer pageSize, Integer pageNumber, BaseController c) {
        String fromSql = "from t_b_order_list where del_flag='" + Constants.DEL_FALG + "' ";
        fromSql += " order by create_date desc ";
        Page<OrderListModel> pager = OrderListModel.dao.paginate(pageNumber, pageSize, "select *", fromSql);
        return pager;
    }
}
