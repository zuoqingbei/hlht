package com.ulab.config;

import java.util.ArrayList;
import java.util.List;

import org.beetl.core.GroupTemplate;
import org.beetl.ext.jfinal.BeetlRenderFactory;

import cn.dreampie.quartz.QuartzPlugin;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.Controller;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.ext.plugin.tablebind.AutoTableBindPlugin;
import com.jfinal.ext.route.AutoBindRoutes;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;
import com.jfinal.plugin.activerecord.dialect.OracleDialect;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.ulab.core.BaseController;
import com.ulab.util.HTMLTagSupportWrapper;
import com.ulab.util.TemplteLayoutTag;

/**
 * 
 * @time   2017年4月10日 下午4:29:50
 * @author zuoqb
 * @todo   配置文件
 */
public class UlabCofig extends JFinalConfig {

	@Override
	public void configConstant(Constants me) {
		loadPropertyFile("config.txt");
		me.setDevMode(getPropertyToBoolean("devMode", true));
		//me.setError404View("${tpl_dir}404.htm");
		//me.setError500View("${tpl_dir}500.htm");
		me.setEncoding("UTF-8");
		me.setMaxPostSize(536870912);//512M
		//设置根页面路径
		me.setBaseViewPath("/WEB-INF/pages");
		me.setMainRenderFactory(new BeetlRenderFactory());

		GroupTemplate gt = BeetlRenderFactory.groupTemplate;
		gt.registerTag("htmltag", HTMLTagSupportWrapper.class);
		gt.registerTag("layout", TemplteLayoutTag.class);
	}

	@Override
	public void configRoute(Routes me) {
		// 自动装载Controller
		AutoBindRoutes routes = new AutoBindRoutes();
		List<Class<? extends Controller>> temp = new ArrayList<Class<? extends Controller>>(1);
		temp.add(BaseController.class);
		routes.addExcludeClasses(temp);
		me.add(routes);
	}

	@Override
	public void configPlugin(Plugins me) {
		AutoTableBindPlugin arp = null;
		//Ulab库
		DruidPlugin dp = new DruidPlugin(this.getProperty("ulab.url"), this.getProperty("ulab.user"),
				this.getProperty("ulab.password"), getProperty("ulab.driver"));
		dp.setInitialSize(5);
		dp.setMaxActive(5);
		dp.setMinIdle(3);
		dp.setValidationQuery("select 1 from dual");
		me.add(dp);
		arp = new AutoTableBindPlugin(dp);// 设置数据库方言
		arp.setDialect(new OracleDialect());
		arp.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
		arp.setShowSql(true);
		me.add(arp);

		/**泰国实验室START**/
		DruidPlugin druidPluginThailand = new DruidPlugin(this.getProperty("thailand.url"),
				this.getProperty("thailand.user"), this.getProperty("thailand.password"),
				getProperty("thailand.driver"));
		druidPluginThailand.setInitialSize(5);
		druidPluginThailand.setMaxActive(5);
		druidPluginThailand.setMinIdle(3);
		me.add(druidPluginThailand);
		ActiveRecordPlugin thailandARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_THAILAND,
				druidPluginThailand);
		thailandARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
		thailandARP.setShowSql(true);
		me.add(thailandARP);
		/**泰国实验室END**/

		/**胶州海尔空调数据库START**/
		DruidPlugin jzhekt = new DruidPlugin(this.getProperty("jzhekt.url"), this.getProperty("jzhekt.user"),
				this.getProperty("jzhekt.password"), getProperty("jzhekt.driver"));
		jzhekt.setInitialSize(5);
		jzhekt.setMaxActive(5);
		jzhekt.setMinIdle(3);
		me.add(jzhekt);
		ActiveRecordPlugin jzhektARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_JZKT, jzhekt);
		thailandARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
		thailandARP.setShowSql(true);
		me.add(jzhektARP);
		/**胶州海尔空调数据库END**/
		
		/**胶南热水器数据库START**/
		DruidPlugin jnrsq = new DruidPlugin(this.getProperty("jnrsq.url"), this.getProperty("jnrsq.user"),
				this.getProperty("jnrsq.password"), getProperty("jnrsq.driver"));
		jnrsq.setInitialSize(5);
		jnrsq.setMaxActive(5);
		jnrsq.setMinIdle(3);
		me.add(jnrsq);
		ActiveRecordPlugin jnrsqARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_JNRSQ, jnrsq);
		jnrsqARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
		jnrsqARP.setShowSql(true);
		me.add(jnrsqARP);
		/**胶南热水器数据库END**/
		
		/**中海博睿整机数据库START**/
		DruidPlugin zhbrzj = new DruidPlugin(this.getProperty("zhbrzj.url"), this.getProperty("zhbrzj.user"),
				this.getProperty("zhbrzj.password"), getProperty("zhbrzj.driver"));
		jnrsq.setInitialSize(5);
		jnrsq.setMaxActive(5);
		jnrsq.setMinIdle(3);
		me.add(zhbrzj);
		ActiveRecordPlugin zhbrzjARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_ZHBRZJ, zhbrzj);
		zhbrzjARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
		zhbrzjARP.setShowSql(true);
		me.add(zhbrzjARP);
		/**中海博睿整机数据库END**/

		/**重庆实验室hive测试库信息设置Impala数据源  **/


		DruidPlugin dsImpala = new DruidPlugin(this.getProperty("hive.url"), this.getProperty("hive.user"),
				"", this.getProperty("hive.driver"));
		me.add(dsImpala);

		ActiveRecordPlugin hive = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_HIVE, dsImpala);
		hive.setShowSql(true);
		me.add(hive);
		/**重庆实验室hive测试库信息 END**/

		//定时器
		QuartzPlugin quartzPlugin = new QuartzPlugin();
		quartzPlugin.setJobs("quartz.properties");
		me.add(quartzPlugin);

	}

	@Override
	public void configInterceptor(Interceptors me) {
		//设置全局拦截器
		me.add(new SessionInViewInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {
		me.add(new ContextPathHandler("contextPath"));
	}

	//main方法启动 需要放开pom中jetty-server的注释，并改beetl.properties中RESOURCE.root= /src/main/webapp
	public static void main(String[] args) {
		PathKit.setWebRootPath("src/main/webapp/");
		JFinal.start("src/main/webapp", 8080, "/hlht", 5);
	}
}
