package com.ulab.aop;

import java.io.UnsupportedEncodingException;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.ulab.core.BaseController;
import com.ulab.model.UserModel;

/**
 * @author zuoqb
 * @time 2018年1月30日13:46:53
 * @todo 用户登陆校验拦截器
 */
public class LoginInterceptor implements Interceptor {

    public void intercept(ActionInvocation ai) {
        BaseController c = (BaseController) ai.getController();
        try {
            c.getRequest().setCharacterEncoding("UTF-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        UserModel user = c.getSessionAttr("user");
        if (user == null) {
            //未登陆
            c.redirect("/login/index");
        } else {
            ai.invoke();
        }
        ai.invoke();
    }

}
