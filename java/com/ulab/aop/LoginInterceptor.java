package com.ulab.aop;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

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
        if("XMLHttpRequest".equalsIgnoreCase((c.getRequest()).getHeader("X-Requested-With"))||
        		c.getRequestUrl().contains("/flatMap")){
        	ai.invoke();
        }else{
        	// 未登录
        	if (user == null) {
        		// 前台
        		if (!c.getRequestUrl().contains("/admin")) {
        			c.redirect("/login/home");
        		}
        		// 后台
        		if (c.getRequestUrl().contains("/admin")) {
        			c.redirect("/login/login");
        		}
        	}
        	// 已登录
        	else {
        		// 前台
        		if (!c.getRequestUrl().contains("/admin")) {
        			ai.invoke();
        		}
        		// 后台
        		else if (c.getRequestUrl().contains("/admin") && "1".equals(user.get("role"))) {
        			ai.invoke();
        		} else {
        			c.redirect("/login/login");
        		}
        	}
        }
    }

}
