package com.ulab.controller;

//import java.util.ArrayList;
//import java.util.HashMap;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import com.jfinal.ext.route.ControllerBind;
import com.ulab.core.BaseController;
import com.ulab.model.UserModel;

/**
 * @author zuoqb
 * @time 2018年1月30日 下午12:55:15
 * @todo 登陆管理相关
 */
@ControllerBind(controllerKey = "/login", viewPath = "/admin")
public class LoginController extends BaseController {
    /**
     * @param
     * @time 2018年1月30日 下午4:09:50
     * @author zuoqb
     * @todo 进入前台登录页面
     * @return_type void
     */
    public void home() {
        setAttr("error", getPara("error", ""));
        setAttr("name", getPara("name", ""));
        render("labLogin.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:09:59
     * @author zuoqb
     * @todo 用户登陆验证
     * @return_type void
     */
    public void labLoginValidate() {
        String loginName = getPara("name");
        String pwd = getPara("pwd");
        Map<String, Object> map = UserModel.dao.login(loginName, pwd);
        if (Boolean.parseBoolean(map.get("success").toString())) {
            //登陆成功
            setSessionAttr("user", map.get("user"));
            redirect("/lab/index");
        } else {
            try {
                redirect("/login/home?error=" + URLEncoder.encode(map.get("msg").toString(), "UTF-8")
                        + "&name=" + URLEncoder.encode(loginName, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:09:50
     * @author zuoqb
     * @todo 进入首页
     * @return_type void
     */
    public void index() {
        setAttr("error", getPara("error", ""));
        setAttr("name", getPara("name", ""));
        render("login.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:09:59
     * @author zuoqb
     * @todo 用户登陆验证
     * @return_type void
     */
    public void loginValidate() {
        String loginName = getPara("name");
        String pwd = getPara("pwd");
        Map<String, Object> map = UserModel.dao.login(loginName, pwd);

        // 校验成功
        if (Boolean.parseBoolean(map.get("success").toString())) {

            if ("1".equals(((UserModel) map.get("user")).get("role"))) {

                //登陆成功
                setSessionAttr("user", map.get("user"));
                redirect("/admin/mapList");
            } else {
                map.put("success", false);
                map.put("msg", "5");// 请使用管理员账号登陆系统！
                try {
                    redirect("/login/login?error=" + URLEncoder.encode(map.get("msg").toString(), "UTF-8")
                            + "&name=" + URLEncoder.encode(loginName, "UTF-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
        } else {
            try {
                redirect("/login/login?error=" + URLEncoder.encode(map.get("msg").toString(), "UTF-8")
                        + "&name=" + URLEncoder.encode(loginName, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
    }

    /***
     * @Description: 前台退出
     * @Date: 2019/6/17 15:33
     * @return: void
     * @Author: suncy
     **/
    public void logout() {
        setSessionAttr("user", null);
        redirect("/login/home");
    }

    /***
     * @Description: 后台退出
     * @Date: 2019/6/17 15:33
     * @return: void
     * @Author: suncy
     **/
    public void logoutForAdmin() {
        setSessionAttr("user", null);
        redirect("/login/index");
    }

}
