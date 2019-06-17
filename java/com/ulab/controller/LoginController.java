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
     * @todo 进入登录页面
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
     * @todo 进入登录页面
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
        if (Boolean.parseBoolean(map.get("success").toString())) {
            //登陆成功
            setSessionAttr("user", map.get("user"));
            redirect("/admin/mapList");
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
     * @time 2018年1月31日 下午1:12:39
     * @author zuoqb
     * @todo 退出
     * @return_type void
     */
    public void logout() {
        setSessionAttr("user", null);
        redirect("/login/home");
    }

}
