package com.ulab.controller;

import java.text.SimpleDateFormat;
import java.util.*;

import com.jfinal.aop.Before;
import com.ulab.aop.LoginInterceptor;
import com.ulab.model.*;
import org.apache.commons.lang3.StringUtils;

import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.BaseController;
import com.ulab.util.MD5Util;
import com.ulab.util.UUIDTool;

/**
 * @author zuoqb
 * @time 2018年1月30日 下午12:55:15
 * @todo 后台管理相关
 */
@ControllerBind(controllerKey = "/admin", viewPath = "/admin")
@Before({ LoginInterceptor.class })
public class AdminController extends BaseController {
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public void userList() {
        render("userList.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:11:06
     * @author zuoqb
     * @todo 用户列表数据
     * @return_type void
     */
    public void userData() {
        int pageNumber = getParaToInt("pageNumber", 1);//当前页码
        int pageSize = getParaToInt("pageSize", 10);//每页条数
        Page<UserModel> pager = UserModel.dao.pager(pageSize, pageNumber, this);
        renderJson(pager);
    }

    public void userForm() {
        UserModel model = new UserModel();
        String id = getPara("id");
        if (StringUtils.isNotBlank(id)) {
            model = UserModel.dao.findById(id);
        }
        setAttr("model", model);
        render("userForm.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午1:06:57
     * @author zuoqb
     * @todo 更新或者插入用户
     * @return_type void
     */
    public void updateUser() {
        UserModel user = new UserModel();
        String uid = getPara("uid");
        String name = getPara("name");
        String login_name = getPara("login_name");
        String pwd = getPara("pwd");
        String forbid = getPara("forbid", "0");
        String del_flag = getPara("del_flag", "0");
        if (StringUtils.isNotBlank(uid)) {
            user = UserModel.dao.findById(uid);
            user.set("update_date", sdf.format(new Date()));
        } else {
            user.set("id", UUIDTool.getOrderIdByUUId());
            user.set("create_date", sdf.format(new Date()));
        }
        if (StringUtils.isNotBlank(name)) {
            user.set("name", name);
        }
        if (StringUtils.isNotBlank(login_name)) {
            user.set("login_name", login_name);
        }
        if (StringUtils.isNotBlank(pwd)) {
            user.set("pwd", MD5Util.getStringMD5(pwd));
        }
        if (StringUtils.isNotBlank(forbid)) {
            user.set("forbid", forbid);
        }
        user.set("del_flag", del_flag);
        if (StringUtils.isNotBlank(uid)) {
            user.update();
        } else {
            user.save();
        }
        renderJson(user);
    }

    /**
     * @param
     * @time 2018年1月31日 上午9:38:45
     * @author zuoqb
     * @todo 平面地图数据列表页面
     * @return_type void
     */
    public void mapList() {
        //查询四大类
        setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
        UserModel user = getSessionAttr("user");
        setAttr("user", user == null ? new UserModel() : user);
        render("mapList.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:11:06
     * @author zuoqb
     * @todo 分页查询平面地图上实验室数据
     * @return_type void
     */
    public void mapListData() {
        int pageNumber = getParaToInt("pageNumber", 1);//当前页码
        int pageSize = getParaToInt("pageSize", 10);//每页条数
        Page<LabMapModel> pager = LabMapModel.dao.pager(pageSize, pageNumber, this);
        renderJson(pager);
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:57:12
     * @author zuoqb
     * @todo 进入平面地图数据修改页面
     * @return_type void
     */
    public void mapForm() {
        LabMapModel model = new LabMapModel();
        String id = getPara("id");
        if (StringUtils.isNotBlank(id)) {
            model = LabMapModel.dao.findById(id);
        }
        setAttr("model", model);
        //查询数据中心下拉
        List<Record> dataCenters = DataCenterModel.dao.findAllDataCenter();
        for (Record center : dataCenters) {
            if ("0".equals(center.getStr("haschildren"))) {
                //如果是检测中心  模拟子类
                List<Record> c = new ArrayList<Record>();
                c.add(center);
                center.set("children", c);
            }
        }
        //查询四大类
        setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
        setAttr("dataCenters", dataCenters);
        render("mapForm.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午1:06:57
     * @author zuoqb
     * @todo 更新或者插入平面地图数据
     * @return_type void
     */
    public void updateMap() {
        LabMapModel model = new LabMapModel();
        String id = getPara("id");
        String name = getPara("name");
        String short_name = getPara("short_name");
        String lng = getPara("lng");
        String lat = getPara("lat");
        String show_in_map = getPara("show_in_map", "0");
        String del_flag = getPara("del_flag", "0");

        String location = getPara("location");
        String lab_type = getPara("lab_type");
        String data_center_id = getPara("data_center_id");
        if (StringUtils.isNotBlank(id)) {
            model = LabMapModel.dao.findById(id);
            model.set("update_date", sdf.format(new Date()));
        } else {
            model.set("id", UUIDTool.getOrderIdByUUId());
            model.set("create_date", sdf.format(new Date()));
        }
        if (StringUtils.isNotBlank(name)) {
            model.set("name", name);
        }
        if (StringUtils.isNotBlank(short_name)) {
            model.set("short_name", short_name);
        }
        if (StringUtils.isNotBlank(lng)) {
            model.set("lng", lng);
        }
        if (StringUtils.isNotBlank(lat)) {
            model.set("lat", lat);
        }
        if (StringUtils.isNotBlank(show_in_map)) {
            model.set("show_in_map", show_in_map);
        }
        if (StringUtils.isNotBlank(del_flag)) {
            model.set("del_flag", del_flag);
        }
        if (StringUtils.isNotBlank(location)) {
            model.set("location", location);
        }
        if (StringUtils.isNotBlank(lab_type)) {
            model.set("lab_type", lab_type);
        }
        if (StringUtils.isNotBlank(data_center_id)) {
            model.set("data_center_id", data_center_id);
        }
        if (StringUtils.isNotBlank(id)) {
            model.update();
        } else {
            model.save();
        }
        renderJson(model);
    }

    /**
     * @param
     * @time 2018年1月31日 上午9:38:45
     * @author zuoqb
     * @todo 实验室列表页面
     * @return_type void
     */
    public void labInfoList() {
        //查询四大类
        setAttr("labTypes", DicModel.dao.findDicByType("lab_type"));
        //可开展实验类别
        setAttr("carryList", DicModel.dao.findDicByType("carry_out_type"));
        UserModel user = getSessionAttr("user");
        setAttr("user", user == null ? new UserModel() : user);
        render("labInfoList.html");
    }

    /**
     * @param
     * @time 2018年1月30日 下午4:11:06
     * @author zuoqb
     * @todo 分页查询实验室数据
     * @return_type void
     */
    public void labInfoListData() {
        int pageNumber = getParaToInt("pageNumber", 1);//当前页码
        int pageSize = getParaToInt("pageSize", 10);//每页条数
        Page<Record> pager = LabModel.dao.pager(pageSize, pageNumber, this);
        renderJson(pager);
    }

    /**
     * @param
     * @time 2018年2月1日 上午9:38:30
     * @author zuoqb
     * @todo 实验室表单页面  修改 新增跳转
     * @return_type void
     */
    public void labInfoForm() {
        Record model = new Record();
        String labCode = getPara("labCode");
        if (StringUtils.isNotBlank(labCode)) {
            model = LabModel.dao.findLabByCode(labCode);
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
				//如果是检测中心  模拟子类
				List<Record> c=new ArrayList<Record>();
				c.add(center);
				center.set("children",c);
			}
		}
		setAttr("dataCenters",dataCenters);*/
        //归类
        setAttr("glTypes", LabMapModel.dao.find("select * from t_b_lab_map where del_flag=0 "));
        render("labInfoForm.html");
    }

    ;

    /**
     * @param
     * @time 2018年2月1日 上午9:39:04
     * @author zuoqb
     * @todo 删除实验室信息
     * @return_type void
     */
    public void delLabInfo() {
        String labCode = getPara("labCode");
        boolean result = LabModel.dao.delLabByCode(labCode);
        renderJson(result);
    }

    /**
     * @param
     * @time 2018年2月1日 上午10:35:49
     * @author zuoqb
     * @todo 实验室新增或者修改
     * @return_type void
     */
    public void updateLabInfo() {
        String labCode = getPara("labCode");
        String name = getPara("name");
        String jiance37_name = getPara("jiance37_name");
        String lab_type_code = getPara("lab_type_code");
        String lab_type_name = getPara("lab_type_name");
        String belong_gl_code = getPara("belong_gl_code");
        String belong_gl_name = getPara("belong_gl_name");
        String product_code = getPara("product_codes");//逗号拼接
        String product_name = getPara("product_name");//逗号拼接
        String properties_code = getPara("properties_code");
        String properties_name = getPara("properties_name");
        String professional_code = getPara("professional_code");
        String professional_name = getPara("professional_name");
        String link_status = getPara("link_status");
        String location = getPara("location");
        String country = getPara("country");
        String city = getPara("city");
        String lng = getPara("lng");
        String lat = getPara("lat");
        String show_in_map = getPara("show_in_map", "0");
        String del_flag = getPara("del_flag", "0");
        String carryTypeCodes = getPara("carryTypeCodes");//可开展实验类别
        String carryTypeNames = getPara("carryTypeName");
        boolean isInsert = false;
        if (StringUtils.isNotBlank(labCode)) {
            //之前有 那么先删除
            LabModel.dao.delLabByCode(labCode);
        } else {
            //之前没有 自动生成labCode
            labCode = LabModel.dao.genLabCode();
            isInsert = true;
        }
        //循环产线 进行插入实验室数据
        if (StringUtils.isNotBlank(product_code) && StringUtils.isNotBlank(product_name)) {
            String[] productCodes = product_code.split(",");
            String[] productNames = product_name.split(",");
            for (int x = 0; x < productCodes.length; x++) {
                LabModel model = new LabModel();
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
                model.set("link_status", link_status);
                model.set("location", location);
                model.set("country", country);
                model.set("city", city);
                model.set("lng", lng);
                model.set("lat", lat);
                model.set("show_in_map", show_in_map);
                model.set("del_flag", del_flag);
                if (isInsert) {
                    model.set("create_date", sdf.format(new Date()));
                } else {
                    model.set("update_date", sdf.format(new Date()));
                }
                model.save();
            }
        }
        //插入可开展实验类别数据
        if (StringUtils.isNotBlank(carryTypeCodes) && StringUtils.isNotBlank(carryTypeNames)) {
            String[] codes = carryTypeCodes.split(",");
            String[] names = carryTypeNames.split(",");
            for (int x = 0; x < codes.length; x++) {
                LabCarryModel carry = new LabCarryModel();
                carry.set("id", UUIDTool.getOrderIdByUUId());
                carry.set("lab_code", labCode);
                carry.set("carry_code", codes[x]);
                carry.set("carry_name", names[x]);
                carry.set("del_flag", 0);
                carry.save();
            }
        }
        Record lab = LabModel.dao.findLabByCode(labCode);
        renderJson(lab);
    }


    // ============================================实验室订单 START ===================================//

    /**
     * @Description: 到实验室订单列表页面
     * @Date: 2019/5/31 15:03
     * @return: void
     * @Author: suncy
     **/
    public void orderList() {
        render("orderList.html");
    }

    /**
     * @Description: 查询实验室订单数据
     * @Date: 2019/5/31 15:03
     * @return: void
     **/
    public void orderListData() {
        Map<String, Object> resultMap = new HashMap<>();

        // 查询列表数据
        int pageNumber = getParaToInt("pageNumber", 1);//当前页码
        int pageSize = getParaToInt("pageSize", 999999999);//每页条数
        Page<OrderListModel> pager = OrderListModel.dao.pager(pageSize, pageNumber, this);
        resultMap.put("itemList", pager.getList());
        renderJson(resultMap);
    }

    /***
     * @Description: 前台显示订单列表和订单统计信息
     * @Date: 2019/6/13 13:46

     * @return: void
     * @Author: suncy
     **/
    public void orderListDataIndex() {
        Map<String, Object> resultMap = new HashMap<>();

        // 查询订单统计信息
        List<OrderTotalModel> headerList = OrderTotalModel.dao.findList();
        if (headerList != null && headerList.size() > 0) {
            resultMap.put("header", headerList.get(0));
        }

        // 查询列表数据
        int pageNumber = getParaToInt("pageNumber", 1);//当前页码
        int pageSize = getParaToInt("pageSize", 999999999);//每页条数
        Page<OrderListModel> pager = OrderListModel.dao.pager(pageSize, pageNumber, this);
        resultMap.put("itemList", pager.getList());
        renderJson(resultMap);
    }

    /***
     * @Description: 订单统计数据
     * @Date: 2019/6/12 17:20

     * @return: void
     * @Author: suncy
     **/
    public void orderTotalData() {
        Map<String, Object> resultMap = new HashMap<>();

        List<OrderTotalModel> headerList = OrderTotalModel.dao.findList();
        if (headerList != null && headerList.size() > 0) {
            resultMap.put("orderTotal", headerList.get(0));
        }
        renderJson(resultMap);
    }

    /**
     * @Description: 实验室订单新增/修改页面
     * @Date: 2019/5/31 15:03
     * @return: void
     **/
    public void orderForm() {
        render("orderForm.html");
    }

    /***
     * @Description: 添加修改实验室订单数据
     * @Date: 2019/5/30 17:35
     * @return: void
     **/
    public void updateOrderList() {

        Map<String, Object> resultMap = new HashMap<>();

        OrderListModel orderListModel = new OrderListModel();
        try {
            String id = getPara("id");
            String testNumber = getPara("test_number");
            String creationDate = getPara("creation_date");
            String creationTime = getPara("creation_time");
            String step = getPara("step");
            String step1Name = getPara("step1_name", "");
            String step1Tel = getPara("step1_tel", "");
            String step2Name = getPara("step2_name", "");
            String step2Tel = getPara("step2_tel", "");
            String step3Name = getPara("step3_name", "");
            String step3Tel = getPara("step3_tel", "");
            String step4Name = getPara("step4_name", "");
            String step4Tel = getPara("step4_tel", "");
            String step5Name = getPara("step5_name", "");
            String step5Tel = getPara("step5_tel", "");
            String step6Name = getPara("step6_name", "");
            String step6Tel = getPara("step6_tel", "");
            String step7Name = getPara("step7_name", "");
            String step7Tel = getPara("step7_tel", "");
            String del_flag = getPara("del_flag", "0");

            if (StringUtils.isNotBlank(id)) {
                orderListModel = OrderListModel.dao.findById(id);
                orderListModel.set("UPDATE_DATE", sdf.format(new Date()));
            } else {
                orderListModel.set("ID", UUIDTool.getOrderIdByUUId());
                orderListModel.set("CREATE_DATE", sdf.format(new Date()));
            }
            orderListModel.set("TEST_NUMBER", testNumber);
            orderListModel.set("STEP", step);
            orderListModel.set("CREATION_DATE", creationDate);
            orderListModel.set("CREATION_TIME", creationTime);
            orderListModel.set("STEP1_NAME", step1Name);
            orderListModel.set("STEP1_TEL", step1Tel);
            orderListModel.set("STEP2_NAME", step2Name);
            orderListModel.set("STEP2_TEL", step2Tel);
            orderListModel.set("STEP3_NAME", step3Name);
            orderListModel.set("STEP3_TEL", step3Tel);
            orderListModel.set("STEP4_NAME", step4Name);
            orderListModel.set("STEP4_TEL", step4Tel);
            orderListModel.set("STEP5_NAME", step5Name);
            orderListModel.set("STEP5_TEL", step5Tel);
            orderListModel.set("STEP6_NAME", step6Name);
            orderListModel.set("STEP6_TEL", step6Tel);
            orderListModel.set("STEP7_NAME", step7Name);
            orderListModel.set("STEP7_TEL", step7Tel);
            orderListModel.set("del_flag", del_flag);

            if (StringUtils.isNotBlank(id)) {
                orderListModel.update();
            } else {
                orderListModel.save();
            }
            resultMap.put("result", true);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", false);
        }

        renderJson(resultMap);
    }

    /***
     * @Description: 删除实验室订单数据
     * @Date: 2019/5/31 16:34

     * @return: void
     * @Author: suncy
     **/
    public void delOrderInfo() {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            String id = getPara("id");
            resultMap.put("result", OrderListModel.dao.deleteById(id));
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", false);
        }
        renderJson(resultMap);
    }

    /***
     * @Description: 订单统计信息
     * @Date: 2019/5/31 15:02
     * @return: void
     **/
    public void orderTotal() {
        List<OrderTotalModel> list = OrderTotalModel.dao.findList();
        renderJson(list);
    }

    /***
     * @Description: 修改订单上部分的统计
     * @Date: 2019/6/12 17:02
     * @return: void
     * @Author: suncy
     **/
    public void updateOrderTotal() {

        Map<String, Object> resultMap = new HashMap<>();
        OrderTotalModel orderTotalModel = new OrderTotalModel();
        try {
            String id = getPara("id");
            String TOTAL_NUM = getPara("total_num", "");
            String UNDER_TEST = getPara("under_test", "");
            String TO_BE_DISTRIBUTED = getPara("to_be_distributed", "");
            String TESTING = getPara("testing", "");
            String COMPLETED = getPara("completed", "");
            String COMPLETION = getPara("completion", "");

            if (StringUtils.isNotBlank(id)) {
                orderTotalModel = OrderTotalModel.dao.findById(id);
            } else {
                orderTotalModel.set("ID", UUIDTool.getOrderIdByUUId());
            }
            orderTotalModel.set("TOTAL_NUM", TOTAL_NUM);
            orderTotalModel.set("UNDER_TEST", UNDER_TEST);
            orderTotalModel.set("TO_BE_DISTRIBUTED", TO_BE_DISTRIBUTED);
            orderTotalModel.set("TESTING", TESTING);
            orderTotalModel.set("COMPLETED", COMPLETED);
            orderTotalModel.set("COMPLETION", COMPLETION);
            orderTotalModel.set("del_flag", "0");
            if (StringUtils.isNotBlank(id)) {
                orderTotalModel.update();
            } else {
                orderTotalModel.save();
            }
            resultMap.put("result", true);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", false);
        }

        renderJson(resultMap);
    }


    // ============================================实验室订单 END ===================================//

    /**
     * 前端开发，先渲染页面
     *
     * @param
     * @time 2019-5-30 15:34:07
     * @author ljl
     * @todo 页面其他数据修改
     * @return_type void
     */
    public void otherDataForm() {
        render("otherDataForm.html");
    }

    /**
     * 前端开发，先渲染页面
     *
     * @param
     * @time 2019-5-30 15:34:07
     * @author ljl
     * @todo 页面其他数据修改
     * @return_type void
     */
    public void comNav() {
        render("com_nav.html");
    }

    /**
     * @Description: 其他信息展示
     * @Date: 2019/6/13 10:13
     * @return: void
     * @Author: suncy
     **/
    public void otherData() {

        Map<String, Object> resultMap = new HashMap<>();

        List<OtherDataModel> list = OtherDataModel.dao.findList();

        if (list != null && list.size() > 0) {
            OtherDataModel otherDataModel = list.get(0);
            resultMap.put("id", otherDataModel.get("id"));

            Map<String, Object> titleMap = new HashMap<>();
            titleMap.put("t_name", otherDataModel.get("t_name"));
            titleMap.put("t_en_name", otherDataModel.get("t_en_name"));
            titleMap.put("t_zh", otherDataModel.get("t_zh"));
            titleMap.put("t_en", otherDataModel.get("t_en"));
            resultMap.put("title", titleMap);

            Map<String, Object> distributionMap = new HashMap<>();
            distributionMap.put("d_name", otherDataModel.get("d_name"));
            distributionMap.put("d_dazhou", otherDataModel.get("d_dazhou"));
            distributionMap.put("d_guojia", otherDataModel.get("d_guojia"));
            distributionMap.put("d_zhongxin", otherDataModel.get("d_zhongxin"));
            distributionMap.put("d_yuanqu", otherDataModel.get("d_yuanqu"));
            distributionMap.put("d_gongchang", otherDataModel.get("d_gongchang"));
            resultMap.put("distribution", distributionMap);

            Map<String, Object> linkMap = new HashMap<>();
            linkMap.put("l_name", otherDataModel.get("l_name"));
            linkMap.put("l_quanqiu_lab", otherDataModel.get("l_quanqiu_lab"));
            linkMap.put("l_quanqiu_link", otherDataModel.get("l_quanqiu_link"));
            linkMap.put("l_yanfa_lab", otherDataModel.get("l_yanfa_lab"));
            linkMap.put("l_yanfa_link", otherDataModel.get("l_yanfa_link"));
            linkMap.put("l_jiance_lab", otherDataModel.get("l_jiance_lab"));
            linkMap.put("l_jiance_link", otherDataModel.get("l_jiance_link"));
            linkMap.put("l_zhizao_lab", otherDataModel.get("l_zhizao_lab"));
            linkMap.put("l_zhizao_link", otherDataModel.get("l_zhizao_link"));
            resultMap.put("link", linkMap);

            Map<String, Object> managementIndicatorsMap = new HashMap<>();
            managementIndicatorsMap.put("m_name", otherDataModel.get("m_name"));
            managementIndicatorsMap.put("m_lab", otherDataModel.get("m_lab"));
            managementIndicatorsMap.put("m_personnel", otherDataModel.get("m_personnel"));
            managementIndicatorsMap.put("m_device", otherDataModel.get("m_device"));
            managementIndicatorsMap.put("m_order", otherDataModel.get("m_order"));
            resultMap.put("managementIndicators", managementIndicatorsMap);

        }
        renderJson(resultMap);
    }

    /**
     * @Description: 维护其他数据信息
     * @Date: 2019/6/13 10:13
     * @return: void
     * @Author: suncy
     **/
    public void updateOtherData() {

        Map<String, Object> resultMap = new HashMap<>();
        OtherDataModel otherDataModel = new OtherDataModel();
        try {
            String id = getPara("id");

            String T_NAME = getPara("title[t_name]", "");
            String T_EN_NAME = getPara("title[t_en_name]", "");
            String T_ZH = getPara("title[t_zh]", "");
            String T_EN = getPara("title[t_en]", "");

            String D_NAME = getPara("distribution[d_name]", "");
            String D_DAZHOU = getPara("distribution[d_dazhou]", "");
            String D_GUOJIA = getPara("distribution[d_guojia]", "");
            String D_ZHONGXIN = getPara("distribution[d_zhongxin]", "");
            String D_YUANQU = getPara("distribution[d_yuanqu]", "");
            String D_GONGCHANG = getPara("distribution[d_gongchang]", "");

            String L_NAME = getPara("link[l_name]", "");
            String L_QUANQIU_LAB = getPara("link[l_quanqiu_lab]", "");
            String L_QUANQIU_LINK = getPara("link[l_quanqiu_link]", "");
            String L_YANFA_LAB = getPara("link[l_yanfa_lab]", "");
            String L_YANFA_LINK = getPara("link[l_yanfa_link]", "");
            String L_JIANCE_LAB = getPara("link[l_jiance_lab]", "");
            String L_JIANCE_LINK = getPara("link[l_jiance_link]", "");
            String L_ZHIZAO_LAB = getPara("link[l_zhizao_lab]", "");
            String L_ZHIZAO_LINK = getPara("link[l_zhizao_link]", "");

            String M_NAME = getPara("managementIndicators[m_name]", "");
            String M_LAB = getPara("managementIndicators[m_lab]", "");
            String M_PERSONNEL = getPara("managementIndicators[m_personnel]", "");
            String M_DEVICE = getPara("managementIndicators[m_device]", "");
            String M_ORDER = getPara("managementIndicators[m_order]", "");

            if (StringUtils.isNotBlank(id)) {
                otherDataModel = OtherDataModel.dao.findById(id);
            } else {
                otherDataModel.set("ID", UUIDTool.getOrderIdByUUId());
            }
            otherDataModel.set("T_NAME", T_NAME);
            otherDataModel.set("T_EN_NAME", T_EN_NAME);
            otherDataModel.set("T_ZH", T_ZH);
            otherDataModel.set("T_EN", T_EN);
            otherDataModel.set("D_NAME", D_NAME);
            otherDataModel.set("D_DAZHOU", D_DAZHOU);
            otherDataModel.set("D_GUOJIA", D_GUOJIA);
            otherDataModel.set("D_ZHONGXIN", D_ZHONGXIN);
            otherDataModel.set("D_YUANQU", D_YUANQU);
            otherDataModel.set("D_GONGCHANG", D_GONGCHANG);
            otherDataModel.set("L_NAME", L_NAME);
            otherDataModel.set("L_QUANQIU_LAB", L_QUANQIU_LAB);
            otherDataModel.set("L_QUANQIU_LINK", L_QUANQIU_LINK);
            otherDataModel.set("L_YANFA_LAB", L_YANFA_LAB);
            otherDataModel.set("L_YANFA_LINK", L_YANFA_LINK);
            otherDataModel.set("L_JIANCE_LAB", L_JIANCE_LAB);
            otherDataModel.set("L_JIANCE_LINK", L_JIANCE_LINK);
            otherDataModel.set("L_ZHIZAO_LAB", L_ZHIZAO_LAB);
            otherDataModel.set("L_ZHIZAO_LINK", L_ZHIZAO_LINK);
            otherDataModel.set("M_NAME", M_NAME);
            otherDataModel.set("M_LAB", M_LAB);
            otherDataModel.set("M_PERSONNEL", M_PERSONNEL);
            otherDataModel.set("M_DEVICE", M_DEVICE);
            otherDataModel.set("M_ORDER", M_ORDER);
            if (StringUtils.isNotBlank(id)) {
                otherDataModel.update();
            } else {
                otherDataModel.save();
            }
            resultMap.put("result", true);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", false);
        }

        renderJson(resultMap);
    }


}
