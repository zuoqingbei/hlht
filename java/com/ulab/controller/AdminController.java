package com.ulab.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.BaseController;
import com.ulab.model.DataCenterModel;
import com.ulab.model.DicModel;
import com.ulab.model.LabCarryModel;
import com.ulab.model.LabMapModel;
import com.ulab.model.LabModel;
import com.ulab.model.UserModel;
import com.ulab.util.MD5Util;
import com.ulab.util.UUIDTool;

/**
 * 
 * @time   2018年1月30日 下午12:55:15
 * @author zuoqb
 * @todo  后台管理相关
 */
@ControllerBind(controllerKey = "/admin", viewPath = "/admin")
//@Before({ LoginInterceptor.class })
public class AdminController extends BaseController {
	private SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public void userList() {
		render("userList.html");
	};
	/**
	 * 
	 * @time   2018年1月30日 下午4:11:06
	 * @author zuoqb
	 * @todo   用户列表数据
	 * @param  
	 * @return_type   void
	 */
	public void userData() {
		int pageNumber=getParaToInt("pageNumber",1);//当前页码
		int pageSize=getParaToInt("pageSize",10);//每页条数
		Page<UserModel> pager=UserModel.dao.pager(pageSize, pageNumber,this);
		renderJson(pager);
	}
	public void userForm() {
		UserModel model=new UserModel();
		String id=getPara("id");
		if(StringUtils.isNotBlank(id)){
			model=UserModel.dao.findById(id);
		}
		setAttr("model", model);
		render("userForm.html");
	}
	/**
	 * 
	 * @time   2018年1月30日 下午1:06:57
	 * @author zuoqb
	 * @todo   更新或者插入用户
	 * @param  
	 * @return_type   void
	 */
	public void updateUser() {
		UserModel user=new UserModel();
		String uid=getPara("uid");
		String name=getPara("name");
		String login_name=getPara("login_name");
		String pwd=getPara("pwd");
		String forbid=getPara("forbid","0");
		String del_flag=getPara("del_flag","0");
		if(StringUtils.isNotBlank(uid)){
			user=UserModel.dao.findById(uid);
			user.set("update_date", sdf.format(new Date()));
		}else{
			user.set("id", UUIDTool.getOrderIdByUUId());
			user.set("create_date", sdf.format(new Date()));
		}
		if(StringUtils.isNotBlank(name)){
			user.set("name", name);
		}
		if(StringUtils.isNotBlank(login_name)){
			user.set("login_name", login_name);		
		}
		if(StringUtils.isNotBlank(pwd)){
			user.set("pwd", MD5Util.getStringMD5(pwd));
		}
		if(StringUtils.isNotBlank(forbid)){
			user.set("forbid", forbid);
		}
		user.set("del_flag", del_flag);
		if(StringUtils.isNotBlank(uid)){
			user.update();
		}else{
			user.save();
		}
		renderJson(user);
	}
	/**
	 * 
	 * @time   2018年1月31日 上午9:38:45
	 * @author zuoqb
	 * @todo   平面地图数据列表页面
	 * @param  
	 * @return_type   void
	 */
	public void mapList() {
		//查询四大类
		setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
		UserModel user=getSessionAttr("user");
		setAttr("user", user==null?new UserModel():user);
		render("mapList.html");
	};
	/**
	 * 
	 * @time   2018年1月30日 下午4:11:06
	 * @author zuoqb
	 * @todo  分页查询平面地图上实验室数据
	 * @param  
	 * @return_type   void
	 */
	public void mapListData() {
		int pageNumber=getParaToInt("pageNumber",1);//当前页码
		int pageSize=getParaToInt("pageSize",10);//每页条数
		Page<LabMapModel> pager=LabMapModel.dao.pager(pageSize, pageNumber,this);
		renderJson(pager);
	};
	/**
	 * 
	 * @time   2018年1月30日 下午4:57:12
	 * @author zuoqb
	 * @todo   进入平面地图数据修改页面
	 * @param  
	 * @return_type   void
	 */
	public void mapForm() {
		LabMapModel model=new LabMapModel();
		String id=getPara("id");
		if(StringUtils.isNotBlank(id)){
			model=LabMapModel.dao.findById(id);
		}
		setAttr("model", model);
		//查询数据中心下拉
		List<Record> dataCenters=DataCenterModel.dao.findAllDataCenter();
		for(Record center:dataCenters){
			if("0".equals(center.getStr("haschildren"))){
				//如果是中海博睿  模拟子类
				List<Record> c=new ArrayList<Record>();
				c.add(center);
				center.set("children",c);
			}
		}
		//查询四大类
		setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
		setAttr("dataCenters",dataCenters);
		render("mapForm.html");
	}
	
	/**
	 * 
	 * @time   2018年1月30日 下午1:06:57
	 * @author zuoqb
	 * @todo   更新或者插入平面地图数据
	 * @param  
	 * @return_type   void
	 */
	public void updateMap() {
		LabMapModel model=new LabMapModel();
		String id=getPara("id");
		String name=getPara("name");
		String short_name=getPara("short_name");
		String lng=getPara("lng");
		String lat=getPara("lat");
		String show_in_map=getPara("show_in_map","0");
		String del_flag=getPara("del_flag","0");
		
		String location=getPara("location");
		String lab_type=getPara("lab_type");
		String data_center_id=getPara("data_center_id");
		if(StringUtils.isNotBlank(id)){
			model=LabMapModel.dao.findById(id);
			model.set("update_date", sdf.format(new Date()));
		}else{
			model.set("id", UUIDTool.getOrderIdByUUId());
			model.set("create_date", sdf.format(new Date()));
		}
		if(StringUtils.isNotBlank(name)){
			model.set("name", name);
		}
		if(StringUtils.isNotBlank(short_name)){
			model.set("short_name", short_name);
		}
		if(StringUtils.isNotBlank(lng)){
			model.set("lng", lng);
		}
		if(StringUtils.isNotBlank(lat)){
			model.set("lat", lat);
		}
		if(StringUtils.isNotBlank(show_in_map)){
			model.set("show_in_map", show_in_map);
		}
		if(StringUtils.isNotBlank(del_flag)){
			model.set("del_flag", del_flag);
		}
		if(StringUtils.isNotBlank(location)){
			model.set("location", location);
		}
		if(StringUtils.isNotBlank(lab_type)){
			model.set("lab_type", lab_type);
		}
		if(StringUtils.isNotBlank(data_center_id)){
			model.set("data_center_id", data_center_id);
		}
		if(StringUtils.isNotBlank(id)){
			model.update();
		}else{
			model.save();
		}
		renderJson(model);
	}
	
	/**
	 * 
	 * @time   2018年1月31日 上午9:38:45
	 * @author zuoqb
	 * @todo   实验室列表页面
	 * @param  
	 * @return_type   void
	 */
	public void labInfoList() {
		//查询四大类
		setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
		//可开展实验类别
		setAttr("carryList", DicModel.dao.findDicByType("carry_out_type"));
		UserModel user=getSessionAttr("user");
		setAttr("user", user==null?new UserModel():user);
		render("labInfoList.html");
	};
	/**
	 * 
	 * @time   2018年1月30日 下午4:11:06
	 * @author zuoqb
	 * @todo  分页查询实验室数据
	 * @param  
	 * @return_type   void
	 */
	public void labInfoListData() {
		int pageNumber=getParaToInt("pageNumber",1);//当前页码
		int pageSize=getParaToInt("pageSize",10);//每页条数
		Page<Record> pager=LabModel.dao.pager(pageSize, pageNumber,this);
		renderJson(pager);
	};
	/**
	 * 
	 * @time   2018年2月1日 上午9:38:30
	 * @author zuoqb
	 * @todo   实验室表单页面  修改 新增跳转
	 * @param  
	 * @return_type   void
	 */
	public void labInfoForm() {
		Record model=new Record();
		String labCode=getPara("labCode");
		if(StringUtils.isNotBlank(labCode)){
			model=LabModel.dao.findLabByCode(labCode);
		}
		setAttr("model", model);
		//查询四大类
		setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
		//产线
		setAttr("productLines", DicModel.dao.findDicByType("line_type"));
		//可开展实验类别
		setAttr("carryTypes", DicModel.dao.findDicByType("carry_out_type"));
		//性质
		setAttr("propertiesType", DicModel.dao.findDicByType("properties_type"));
		//专业领域
		setAttr("professionalType", DicModel.dao.findDicByType("professional_type"));
		
		//查询数据中心下拉
		/*List<Record> dataCenters=DataCenterModel.dao.findAllDataCenter();
		for(Record center:dataCenters){
			if("0".equals(center.getStr("haschildren"))){
				//如果是中海博睿  模拟子类
				List<Record> c=new ArrayList<Record>();
				c.add(center);
				center.set("children",c);
			}
		}
		setAttr("dataCenters",dataCenters);*/
		//归类
		setAttr("glTypes", LabMapModel.dao.find("select * from t_b_lab_map where del_flag=0 "));
		render("labInfoForm.html");
	};
	/**
	 * 
	 * @time   2018年2月1日 上午9:39:04
	 * @author zuoqb
	 * @todo   删除实验室信息
	 * @param  
	 * @return_type   void
	 */
	public void delLabInfo(){
		String labCode=getPara("labCode");
		boolean result=LabModel.dao.delLabByCode(labCode);
		renderJson(result);
	}
	/**
	 * 
	 * @time   2018年2月1日 上午10:35:49
	 * @author zuoqb
	 * @todo  实验室新增或者修改
	 * @param  
	 * @return_type   void
	 */
	public void updateLabInfo() {
		String labCode=getPara("labCode");
		String name=getPara("name");
		String jiance37_name=getPara("jiance37_name");
		String lab_type_code=getPara("lab_type_code");
		String lab_type_name=getPara("lab_type_name");
		String belong_gl_code=getPara("belong_gl_code");
		String belong_gl_name=getPara("belong_gl_name");
		String product_code=getPara("product_codes");//逗号拼接
		String product_name=getPara("product_name");//逗号拼接
		String properties_code=getPara("properties_code");
		String properties_name=getPara("properties_name");
		String professional_code=getPara("professional_code");
		String professional_name=getPara("professional_name");
		String link_status=getPara("link_status");
		String location=getPara("location");
		String country=getPara("country");
		String city=getPara("city");
		String lng=getPara("lng");
		String lat=getPara("lat");
		String show_in_map=getPara("show_in_map","0");
		String del_flag=getPara("del_flag","0");
		String carryTypeCodes=getPara("carryTypeCodes");//可开展实验类别
		String carryTypeNames=getPara("carryTypeName");
		boolean isInsert=false;
		if(StringUtils.isNotBlank(labCode)){
			//之前有 那么先删除
			LabModel.dao.delLabByCode(labCode);
		}else{
			//之前没有 自动生成labCode
			labCode=LabModel.dao.genLabCode();
			isInsert=true;
		}
		//循环产线 进行插入实验室数据
		if(StringUtils.isNotBlank(product_code)&&StringUtils.isNotBlank(product_name)){
			String[] productCodes=product_code.split(",");
			String[] productNames=product_name.split(",");
			for(int x=0;x<productCodes.length;x++){
			    LabModel model=new LabModel();
				model.set("id", UUIDTool.getOrderIdByUUId());
				model.set("code", labCode);
				model.set("name", name);
				model.set("jiance37_name", jiance37_name);
				model.set("lab_type_code", lab_type_code);
				model.set("lab_type_name", lab_type_name);
				model.set("belong_gl_code", belong_gl_code);
				model.set("belong_gl_name", belong_gl_name);
				model.set("product_code", productCodes[x]);
				model.set("product_name", productNames[x]);
				model.set("properties_code", properties_code);
				model.set("properties_name", properties_name);
				model.set("professional_code", professional_code);
				model.set("professional_name", professional_name);
				model.set("link_status",link_status );
				model.set("location",location);
				model.set("country",country);
				model.set("city",city);
				model.set("lng", lng);
				model.set("lat", lat);
				model.set("show_in_map", show_in_map);
				model.set("del_flag", del_flag);
				if(isInsert){
					model.set("create_date", sdf.format(new Date()));
				}else{
					model.set("update_date", sdf.format(new Date()));
				};
				model.save();
			}
		}
		//插入可开展实验类别数据
		if(StringUtils.isNotBlank(carryTypeCodes)&&StringUtils.isNotBlank(carryTypeNames)){
			String[] codes=carryTypeCodes.split(",");
			String[] names=carryTypeNames.split(",");
			for(int x=0;x<codes.length;x++){
				LabCarryModel carry=new LabCarryModel();
				carry.set("id", UUIDTool.getOrderIdByUUId());
				carry.set("lab_code",labCode);
				carry.set("carry_code",codes[x]);
				carry.set("carry_name",names[x]);
				carry.set("del_flag",0);
				carry.save();
			}
		}
		Record lab=LabModel.dao.findLabByCode(labCode);
		renderJson(lab);
	}
    /**
     * 前端开发，先渲染页面
     * @time   2019年5月23日11:04:32
     * @author ljl
     * @todo   实验室订单列表页面
     * @param
     * @return_type   void
     */
    public void orderList() {
        render("orderList.html");
    };
    /**
     * 前端开发，先渲染页面
     * @time   2019年5月23日11:04:32
     * @author ljl
     * @todo   实验室订单新增/修改页面
     * @param
     * @return_type   void
     */
    public void orderForm() {
        render("orderForm.html");
    };


}
