package com.ulab.config;

import java.util.ArrayList;
import java.util.List;

import com.ulab.aop.LoginInterceptor;
import org.apache.commons.lang3.StringUtils;
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
	/**
	 * 
	 * @time   2018年3月31日 下午8:52:19
	 * @author zuoqb
	 * @todo   检查配置文件是否存在
	 * @param  @param prefix
	 * @param  @return
	 * @return_type   boolean
	 */
	public boolean existConfig(String prefix){
		if(StringUtils.isBlank(this.getProperty(prefix+".url"))
				||StringUtils.isBlank(this.getProperty(prefix+".user"))
				||StringUtils.isBlank(this.getProperty(prefix+".driver"))){
			return false;
		}
		return true;
	}
	@Override
	public void configPlugin(Plugins me) {
		AutoTableBindPlugin arp = null;
		//Ulab库
		if(existConfig("ulab")){
			DruidPlugin dp = new DruidPlugin(this.getProperty("ulab.url"), this.getProperty("ulab.user"),
					this.getProperty("ulab.password"), getProperty("ulab.driver"));
			try {
				dp.start();
				dp.getDataSource().getConnection();
				me.add(dp);
				arp = new AutoTableBindPlugin(dp);// 设置数据库方言
				arp.setDialect(new OracleDialect());
				arp.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				arp.setShowSql(true);
				me.add(arp);
			} catch (Exception e) {
				System.err.println("Ulab库数据库启动异常");
				e.printStackTrace();
			}
			
		}
		if(existConfig("thailand")){
			/**泰国实验室START**/
			DruidPlugin druidPluginThailand = new DruidPlugin(this.getProperty("thailand.url"),
					this.getProperty("thailand.user"), this.getProperty("thailand.password"),
					getProperty("thailand.driver"));
			try {
				druidPluginThailand.start();
				druidPluginThailand.getDataSource().getConnection();
				me.add(druidPluginThailand);
				ActiveRecordPlugin thailandARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_THAILAND,
						druidPluginThailand);
				thailandARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				thailandARP.setShowSql(true);
				me.add(thailandARP);
			} catch (Exception e) {
				System.err.println("泰国实验室数据库启动异常");
				e.printStackTrace();
			}
			/**泰国实验室END**/
		}
		if(existConfig("jzhekt")){
			/**胶州海尔空调数据库START**/
			DruidPlugin jzhekt = new DruidPlugin(this.getProperty("jzhekt.url"), this.getProperty("jzhekt.user"),
					this.getProperty("jzhekt.password"), getProperty("jzhekt.driver"));
			try {
				jzhekt.start();
				jzhekt.getDataSource().getConnection();
				me.add(jzhekt);
				ActiveRecordPlugin jzhektARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_JZKT, jzhekt);
				jzhektARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				jzhektARP.setShowSql(true);
				me.add(jzhektARP);
			} catch (Exception e) {
				System.err.println("胶州海尔空调数据库启动异常");
				e.printStackTrace();
			}
			/**胶州海尔空调数据库END**/
		}
		if(existConfig("jnrsq")){
			/**胶南热水器数据库START**/
			DruidPlugin jnrsq = new DruidPlugin(this.getProperty("jnrsq.url"), this.getProperty("jnrsq.user"),
					this.getProperty("jnrsq.password"), getProperty("jnrsq.driver"));
			try {
				jnrsq.start();
				jnrsq.getDataSource().getConnection();
				me.add(jnrsq);
				ActiveRecordPlugin jnrsqARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_JNRSQ, jnrsq);
				jnrsqARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				jnrsqARP.setShowSql(true);
				me.add(jnrsqARP);
			} catch (Exception e) {
				System.err.println("胶南热水器数据库链接异常");
				e.printStackTrace();
			}
			/**胶南热水器数据库END**/
		}
		if(existConfig("zhbrzj")){
			/**检测中心整机数据库START**/
			DruidPlugin zhbrzj = new DruidPlugin(this.getProperty("zhbrzj.url"), this.getProperty("zhbrzj.user"),
					this.getProperty("zhbrzj.password"), getProperty("zhbrzj.driver"));
			try {
				zhbrzj.start();
				zhbrzj.getDataSource().getConnection();
				me.add(zhbrzj);
				ActiveRecordPlugin zhbrzjARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_ZHBRZJ, zhbrzj);
				zhbrzjARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				zhbrzjARP.setShowSql(true);
				me.add(zhbrzjARP);
			} catch (Exception e) {
				System.err.println("检测中心整机数据库启动异常");
				e.printStackTrace();
			}
			/**检测中心整机数据库END**/
		}
		if(existConfig("jnxd")){
			/**胶南洗涤数据库START**/
			DruidPlugin jnxd = new DruidPlugin(this.getProperty("jnxd.url"), this.getProperty("jnxd.user"),
					this.getProperty("jnxd.password"), getProperty("jnxd.driver"));
			try {
				jnxd.start();
				jnxd.getDataSource().getConnection();
				me.add(jnxd);
				ActiveRecordPlugin jnxdARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_JNXD, jnxd);
				jnxdARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				jnxdARP.setShowSql(true);
				me.add(jnxdARP);
			} catch (Exception e) {
				System.err.println("胶南洗涤数据库链接异常");
				e.printStackTrace();
			}
			/**胶南洗涤数据库END**/
		}
		
		if(existConfig("russia")){
			/**俄罗斯数据库START**/
			DruidPlugin russia = new DruidPlugin(this.getProperty("russia.url"), this.getProperty("russia.user"),
					this.getProperty("russia.password"), getProperty("russia.driver"));
			try {
				russia.start();
				russia.getDataSource().getConnection();
				me.add(russia);
				ActiveRecordPlugin russiaARP = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_RUSSIA, russia);
				russiaARP.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 忽略大小写
				russiaARP.setShowSql(true);
				me.add(russiaARP);
			} catch (Exception e) {
				System.err.println("俄罗斯数据库链接异常");
				e.printStackTrace();
			}
			/**俄罗斯数据库END**/
		}
		
		if(existConfig("hive")){
			/**重庆实验室hive测试库信息设置Impala数据源  **/
			
			DruidPlugin dsImpala = new DruidPlugin(this.getProperty("hive.url"), this.getProperty("hive.user"),
					this.getProperty("hive.password"), this.getProperty("hive.driver"));
			try {
				dsImpala.start();
				dsImpala.getDataSource().getConnection();
				me.add(dsImpala);
				
				ActiveRecordPlugin hive = new ActiveRecordPlugin(com.ulab.core.Constants.CONFIGNAME_HIVE, dsImpala);
				hive.setShowSql(true);
				me.add(hive);
			} catch (Exception e) {
				System.err.println("重庆实验室hive数据库连接异常");
				e.printStackTrace();
			}
			/**重庆实验室hive测试库信息 END**/
		}
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
