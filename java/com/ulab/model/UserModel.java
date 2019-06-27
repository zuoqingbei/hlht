package com.ulab.model;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.util.MD5Util;

@TableBind(tableName = "t_b_user", pkName = "id")
public class UserModel extends Model<UserModel> {
    private static final long serialVersionUID = 4762813779629969917L;
    public static final UserModel dao = new UserModel();


    /**
     * @param @param  loginName
     * @param @return
     * @time 2018年1月30日 下午12:40:03
     * @author zuoqb
     * @todo 根据用户登陆名  密码 查询用户
     * @return_type UserModel
     */
    public UserModel getUserByLoginName(String loginName) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select * from t_b_user where login_name='" + loginName + "' and del_flag='" + Constants.DEL_FALG + "'");
        return UserModel.dao.findFirst(sb.toString());
    }

    /**
     * @param @param  loginName
     * @param @param  pwd
     * @param @return
     * @time 2018年1月30日 下午12:40:03
     * @author zuoqb
     * @todo 根据用户登陆名  密码 登陆
     * @return_type UserModel
     */
    public Map<String, Object> login(String loginName, String pwd) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserModel user = getUserByLoginName(loginName);
        if (user == null) {
            map.put("success", false);
            map.put("msg", "用户不存在！");
        } else {
            if (!"1".equals(user.getStr("role"))) {
                map.put("success", false);
                map.put("msg", "请使用管理员账号登陆系统！");
            } else if ("1".equals(user.getStr("forbid"))) {
                map.put("success", false);
                map.put("msg", "用户禁止登陆，请联系管理员！");
            } else {
                //判断密码是否正确
                if (MD5Util.getStringMD5(pwd).equals(user.getStr("pwd"))) {
                    map.put("success", true);
                    map.put("msg", "登陆成功！");
                    map.put("user", user);
                } else {
                    map.put("success", false);
                    map.put("msg", "密码错误！");
                }
            }
        }
        return map;
    }

    /**
     * @param @param  pageSize
     * @param @param  pageNumber
     * @param @return
     * @time 2018年1月30日 下午12:54:17
     * @author zuoqb
     * @todo 分页查询用户
     * @return_type Page<UserModel>
     */
    public Page<UserModel> pager(Integer pageSize, Integer pageNumber, BaseController c) {
        String fromSql = "from t_b_user where del_flag='" + Constants.DEL_FALG + "' ";
        fromSql += " ";
        if (StringUtils.isNotBlank(c.getPara("name"))) {
            fromSql += " and (name like '%" + c.getPara("name") + "%' or  login_name like '%" + c.getPara("name") + "%'  )";
        }
        if (StringUtils.isNotBlank(c.getPara("forbid"))) {
            fromSql += " and forbid='" + c.getPara("forbid") + "' ";
        }
        fromSql += " order by create_date desc ";
        Page<UserModel> pager = UserModel.dao.paginate(pageNumber, pageSize, "select *", fromSql);
        return pager;
    }
}
