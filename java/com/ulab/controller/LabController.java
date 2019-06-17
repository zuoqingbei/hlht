package com.ulab.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ulab.model.*;
import org.apache.commons.lang3.StringUtils;

import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.aop.LoginInterceptor;
import com.ulab.client.IntegrationService.IntegrationServiceClient;
import com.ulab.client.webServiceRerigerator.WebServiceRerigeratorClient;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;
import com.ulab.util.JsonUtils;
import com.ulab.util.NormalDistribution;
import com.ulab.util.ServerUtil;
import com.ulab.util.SqlUtil;

/**
 * @author zuoqb
 * @time 2017年4月11日 上午10:59:00
 * @todo 测试类
 */
@ControllerBind(controllerKey = "/lab", viewPath = "/lab")
@Before({LoginInterceptor.class})
public class LabController extends BaseController {
    public void full() {
        setAttr("fromPage", getPara("fromPage", ""));
        List<Record> labType = DicModel.dao.findDicByType("lab_type");
        List<Record> productLine = DicModel.dao.findDicByType("line_type");
        setAttr("labType", labType);
        setAttr("productLine", productLine);
        setSessionAttr("labType", labType);
        setSessionAttr("productLine", productLine);
        // 实验室轮播信息
        String sqlWhere = SqlUtil.commonWhereSql(this, null);
        List<Record> labInfo = LabMapModel.dao.labShowFlatMap2(sqlWhere);
        for (Record r : labInfo) {
            if (r.getStr("title").length() > 6) {
                r.set("title", r.getStr("title").substring(0, 6) + "...");
            }
        }
        setAttr("labInfo", labInfo);
        // 量产一致性保障 字典
        List<Record> providerDic = ProviderDicModel.dao.findProviderDic();
        setAttr("providerDic", providerDic);
        render("full.html");
    }

    /**
     * @param
     * @time 2017年4月19日 下午3:19:44
     * @author zuoqb
     * @todo 进入平面地图
     * @return_type void
     */
    public void flatMap() {
        render("flatMap.html");
    }

    public void sphereMap() {
        render("sphereMap.html");
    }

    public void wordCloud() {
        render("wordCloud.html");
    }

    public void iframe() {
        render("iframe.html");
    }

    public void wordCloudFull() {
        render("worldCloudFull.html");
    }

    /**
     * @param
     * @time 2017年4月19日 下午3:20:03
     * @author zuoqb
     * @todo 获取字典数据
     * @return_type void
     */
    public void dicAjax() {
        List<Record> labType = DicModel.dao.findDicByType("lab_type");
        List<Record> productLine = DicModel.dao.findDicByType("line_type");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("labType", labType);
        map.put("productLine", productLine);
        renderJson(map);
    }

    /**
     * @param
     * @time 2017年4月13日 上午9:38:56
     * @author zuoqb
     * @todo 全球实验室数据-地图
     * @return_type void
     */
    public void labAjax() {
        List<Record> parentList = LabModel.dao.labShowWorldMap();
        renderJson(parentList);
    }

    /**
     * @param
     * @time 2017年4月19日 上午9:53:33
     * @author zuoqb
     * @todo 平面图展示数据
     * @return_type void
     */
    public void labShowFlatMapAjax() {
        String sqlWhere = SqlUtil.commonWhereSql(this, null);
        List<Record> parentList = LabMapModel.dao.labShowFlatMap(sqlWhere);
        renderJson(parentList);
    }

    /**
     * @time 2017年4月14日 下午3:19:37
     * @author zuoqb
     * @todo 实验室数量统计
     */
    public void labNumStatisAjax() {
        renderJson(LabModel.dao.findAllCount());
    }

    /**
     * @time 2017年4月14日 下午4:59:52
     * @author zuoqb
     * @todo 实验室区域数量统计：大洲 国家
     */
    public void labSpreadAjax() {
        Record recode = LabModel.dao.labSpread();
        renderJson(recode);
    }

    /**
     * @time 2017年4月14日 下午3:19:37
     * @author zuoqb
     * @todo 按照某维度统计数量
     */
    public void labStatisByFiledAjax() {
        String field = getPara("field");
        String sqlWhere = SqlUtil.commonWhereSql(this, "t");
        String sort = getPara("sort");
        List<Record> labStatis = LabModel.dao.labStatisByField(sqlWhere, field,
                sort);
        renderJson(labStatis);
    }

    /**
     * @time 2017年4月21日12:12:13
     * @author zuoqb
     * @todo 开展类型数量统计-实验目的
     */
    public void labCarryNumStatisAjax() {
        String sqlWhere = SqlUtil.commonWhereSql(this, "lab");
        // 开展类型-实验目的
        List<Record> carryStatis = LabCarryModel.dao
                .labCarryNumStatis(sqlWhere);
        // 实验目的对应的订单量
        renderJson(carryStatis);
    }

    /**
     * @time 2017年4月14日 下午4:59:52
     * @author zuoqb
     * @todo 实验室联通数据统计
     */
    public void labLinkAjax() {
        Record recode = LabModel.dao.labLink();
        renderJson(recode);
    }

    // //////////////////////////////////右侧////////////////////////////
    public void right() {
        render("index_right.html");
    }

    /**
     * @param
     * @time 2017年4月23日 下午12:07:14
     * @author zuoqb
     * @todo 标准状态数据统计
     * @return_type void
     */
    public void standardStatusAjax() {
        Record recode = LabDataResultModel.dao.standardStatus();
        renderJson(recode);
    }

    /**
     * @param
     * @time 2017年4月23日 下午12:07:14
     * @author zuoqb
     * @todo 能力状态数据统计
     * @return_type void
     */
    public void abilityStatusAjax() {
        Integer allNum = LabDataResultModel.dao.resultNumStatisticBType(3);
        List<Record> list = LabDataResultModel.dao.dataResultBType(1);
        Record result = new Record();
        result.set("allNum", allNum);
        result.set("data", list);
        renderJson(result);
    }

    /**
     * @param
     * @time 2017年5月12日 上午7:45:55
     * @author zuoqb
     * @todo 标准数量分布情况
     * @return_type void
     */
    public void standardDispersedAjax() {
        String type = getPara("type");
        String filedVaule = getPara("filedVaule");
        String filed = getPara("filed");
        List<Record> recode = LabDataResultModel.dao.dataResultBTypeAndName(
                type, filed, filedVaule);
        renderJson(recode);
    }

    /**
     * @param
     * @time 2017年5月12日 上午7:45:55
     * @author zuoqb
     * @todo 不同产线的能力状态分布
     * @return_type void
     */
    public void abilityByProductLineAjax() {
        List<Record> productLine = getSessionAttr("productLine");
        if (productLine == null) {
            productLine = DicModel.dao.findDicByType("line_type");
        }
        String type = getPara("type", "1");
        String filed = getPara("filed", "product_code");
        List<List<Record>> map = new ArrayList<List<Record>>();
        List<List<Record>> needmap = new ArrayList<List<Record>>();
        for (Record r : productLine) {
            String filedVaule = r.get("id").toString();
            map.add(LabDataResultModel.dao.dataResultBTypeAndName(type, filed,
                    filedVaule));
            needmap.add(LabDataResultModel.dao.dataResultBTypeAndName(3, filed,
                    filedVaule));
        }
        List<List<List<Record>>> list = new ArrayList<List<List<Record>>>();
        list.add(map);
        list.add(needmap);
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo 获取某一年订单整体及时率
     * @return_type void
     */
    public void orderYearRateAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        List<Record> list = new ArrayList<Record>();
        list.add(OrderModel.dao.findOrderRate("2016", labTypeCode));
        list.add(OrderModel.dao.findOrderRate("2017", labTypeCode));
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo 按照产线统计某年整体订单及时率
     * @return_type void
     */
    public void findOrderYearRateForProductAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        List<List<Record>> list = new ArrayList<List<Record>>();
        List<Record> list2016 = OrderModel.dao.findOrderYearRateForProduct(
                "2016", labTypeCode);
        List<Record> list2017 = OrderModel.dao.findOrderYearRateForProduct(
                "2017", labTypeCode);
        if (list2016 != null && list2016.size() > 0) {
            list.add(sort(list2016));
        }
        if (list2017 != null && list2017.size() > 0) {
            list.add(sort(list2017));
        }
        renderJson(list);
    }

    // 数据结果 订单及时率 产线逆时针排序
    public List<Record> sort(List<Record> list) {
        List<Record> r = new ArrayList<Record>();
        r.add(list.get(0));
        list.remove(0);
        for (int x = list.size() - 1; x >= 0; x--) {
            r.add(list.get(x));
        }
        return r;
    }

    /**
     * @param
     * @time 2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo 按照产线统计某年各月份详细订单及时率
     * @return_type void
     */
    public void findOrderMonthRateForProductAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        //endDate = dealEndTime(endDate);
        List<List<Record>> list = new ArrayList<List<Record>>();
        List<Record> productLine = getSessionAttr("productLine");
        if (productLine == null) {
            productLine = DicModel.dao.findDicByType("line_type");
        }
        for (Record r : productLine) {
            List<Record> data = OrderModel.dao.findOrderMonthRateForProduct(
                    startDate, endDate, r.get("id").toString(), labTypeCode);
            //data = dealTimeForLast(data, "name", "rate");
            if (data != null && data.size() > 0) {
                list.add(data);
            }
        }
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月13日 下午1:08:58
     * @author zuoqb
     * @todo 按照产线统计某年各月份详细订单类别
     * @return_type void
     */
    public void findOrderMonthTypeForProductAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        String desName = getPara("desName", "");
        List<List<Record>> list = new ArrayList<List<Record>>();
        List<Record> productLine = getSessionAttr("productLine");
        if (productLine == null) {
            productLine = DicModel.dao.findDicByType("line_type");
        }
        for (Record r : productLine) {
            List<Record> data = OrderModel.dao.findOrderMonthTypeForProduct(r
                    .get("id").toString(), labTypeCode, desName);
            if (data != null && data.size() > 0) {
                list.add(data);
            }
        }
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月20日 上午11:55:08
     * @author zuoqb
     * @todo 整机 模块 订单类别占全部订单占比统计
     * @return_type void
     */
    public void findOrderTypePercentTab3Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        Record data = OrderModel.dao.findOrderTypePercentTab3(labTypeCode);
        if (data == null) {
            data = new Record();
        }
        renderJson(data);
    }

    /**
     * 六个指数中的订单量动态变化-测试
     *
     * @param
     * @time 2018年5月15日 上午10:33:23
     * @author dsh
     * @todo TODO
     * @return_type void
     */
    public void getDingdan() {
        String labTypeCode = getPara("labTypeCode", "");
        String num = getPara("num", "0");
        List<Record> data = OrderModel.dao.findDingdan(labTypeCode, num);
        if (data == null) {
            data = (List<Record>) new Record();
        }
        renderJson(data);
    }

    /**
     * @param
     * @time 2017年5月14日 上午8:59:27
     * @author zuoqb
     * @todo 一次合格率具体到产线
     * @return_type void
     */
    public void findOrderPassForProAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        String desName = getPara("desName", "");
        String name = getPara("name", "");
        List<Record> list = OrderModel.dao.findOrderPassForPro(null,
                labTypeCode, desName, name);
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月14日 上午8:59:27
     * @author zuoqb
     * @todo 一次合格率 整体统计
     * @return_type void
     */
    public void findOrderPassForAllAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        List<Record> list = new ArrayList<Record>();
        Record r1 = OrderModel.dao.findOrderPassForAll(null, labTypeCode, "整机");
        if (r1 == null) {
            r1 = new Record();
        }
        list.add(r1);
        Record r2 = OrderModel.dao.findOrderPassForAll(null, labTypeCode, "模块");
        if (r2 == null) {
            r2 = new Record();
        }
        list.add(r2);
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月14日 上午10:07:01
     * @author zuoqb
     * @todo 订单及时率 tab1
     * @return_type void
     */

    public void findOrderYearRateForTab1Ajax() {
        /*
         * String labTypeCode=getPara("labTypeCode",""); String
         * date=getPara("date","2017"); List<List<Record>> list=new
         * ArrayList<List<Record>>();
         * list.add(OrderModel.dao.findOrderYearRateForTab1(date,labTypeCode,
         * "整机"));
         * list.add(OrderModel.dao.findOrderYearRateForTab1(date,labTypeCode,
         * "模块")); renderJson(list);
         */
        String plCode = getPara("plCode", "");
        String labTypeCode = getPara("labTypeCode", "");
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        endDate = dealEndTime(endDate);
        renderJson(OrderModel.dao.findOrderMonthRateForAll(startDate, endDate,
                plCode, labTypeCode));
    }

    public void findOrderYearRateForJSLAjax() {
        String labName = getPara("labName", "");
        String startDate = getPara("startDate");
        String endDate = getPara("endDate", "");
        renderJson(JSLModel.dao.findOrderMonthRateForAll(startDate, endDate, labName));
    }

    /**
     * @param
     * @time 2017年5月14日 上午11:04:34
     * @author zuoqb
     * @todo 一次合格率 总状态
     * @return_type void
     */
    public void findOrderPassForTab1Ajax() {
        renderJson(OrderModel.dao.findOrderPassForAll(null, null, null));
    }

    /**
     * @param
     * @time 2017年5月17日 上午9:49:23
     * @author zuoqb
     * @todo 人员状态-总
     * @return_type void
     */
    public void findPersonStatusTab1Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        String type = getPara("type", "");
        String plCode = getPara("plCode", "");
        renderJson(PersonModel.dao.personDetail(type, plCode, labTypeCode));
    }

    /**
     * @param
     * @time 2017年5月17日 下午1:26:59
     * @author zuoqb
     * @todo 实验室状态tab2-人员状态数据
     * @return_type void
     */
    public void personForTab2Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        String type = getPara("type", "");
        List<List<Record>> list = new ArrayList<List<Record>>();
        List<Record> productLine = getSessionAttr("productLine");
        if (productLine == null) {
            productLine = DicModel.dao.findDicByType("line_type");
        }
        for (Record r : productLine) {
            List<Record> data = PersonModel.dao.personForTab2(type, r.get("id")
                    .toString(), labTypeCode);
            if (data != null && data.size() > 0) {
                list.add(data);
            }
        }
        renderJson(list);
    }

    // 共产 一致数据统计

    /**
     * @param
     * @time 2017年5月18日 上午9:55:48
     * @author zuoqb
     * @todo 共产 一致比重统计
     * @return_type void
     */
    public void communistGravityStatisticForTab1Ajax() {
        String plCode = getPara("plCode", "");
        String labTypeCode = getPara("labTypeCode", "");
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        endDate = dealEndTime(endDate);
        renderJson(CommunistModel.dao.communistGravityStatistic(startDate,
                endDate, plCode, labTypeCode));
    }

    /**
     * @param
     * @time 2017年5月18日 上午9:59:03
     * @author zuoqb
     * @todo 根据类型 时间 统计共产 一致个月份数量
     * @return_type void
     */
    public void communistStatisticForMonthForTab1Ajax() {
        String plCode = getPara("plCode", "");
        String labTypeCode = getPara("labTypeCode", "");
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        // endDate=dealEndTime(endDate);
        List<List<Record>> list = new ArrayList<List<Record>>();
        list.add(CommunistModel.dao.communistStatisticForMonth(startDate,
                endDate, plCode, labTypeCode, "1"));
        list.add(CommunistModel.dao.communistStatisticForMonth(startDate,
                endDate, plCode, labTypeCode, "2"));
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月19日 上午11:04:03
     * @author zuoqb
     * @todo 获取产品检测结果对应属性
     * @return_type void
     */
    public void jianCeXhProForTab1Ajax() {
        String xhCode = getPara("xhCode", "");// 型号
        String redis_key = Constants.JIANC_EPRO_SESSION + xhCode;
        Record pro = getSessionAttr(redis_key);
        if (pro == null) {
            pro = JianceProModel.dao.findProByFiled(xhCode);
            setSessionAttr(redis_key, pro);
        }
        if (pro == null) {
            pro = new Record();
        }
        renderJson(pro);
    }

    /**
     * @param
     * @time 2017年5月18日 下午4:18:54
     * @author zuoqb
     * @todo 直方图 检测数据
     * @return_type void
     */
    public void jianCeDataForTab1Ajax() {
        String xhCode = getPara("xhCode", "");// 型号
        List<Record> list = JianCeModel.dao.findProviderDicByPid(xhCode);
        //获取最大值和最小值，并计算出刻度值
        List<Record> minMax = JianCeModel.dao.findProviderDicMaxMinByPid(xhCode);
        double min = Double.parseDouble(minMax.get(0).get("min").toString());
        double max = Double.parseDouble(minMax.get(0).get("max").toString());
        double scale = (max - min) / 12;
        Record r = new Record();
        r.set("scale", scale);
        minMax.add(r);
        /*
         * String redis_key=Constants.JIANC_EPRO_SESSION+xhCode; Record
         * pro=getSessionAttr(redis_key); if(pro==null){
         * pro=JianceProModel.dao.findProByFiled(xhCode);
         * setSessionAttr(redis_key, pro);
         *
         * } double pj=Double.parseDouble(pro.get("pj_value").toString());
         * double fc=Double.parseDouble(pro.get("fc_value").toString());
         * for(Record r:list){ r.set("wkq_num2",
         * NormalDistribution.calc(Double.parseDouble(r.getStr("wkq_num")), pj,
         * fc)); }
         */
        // List<Record> gaussian=gaussian(xhCode);
        List<List<Record>> re = new ArrayList<List<Record>>();
        re.add(list);
        re.add(minMax);
        // re.add(gaussian);
        renderJson(re);
    }

    /**
     * @param
     * @time 2017年5月22日 上午10:55:03
     * @author zuoqb
     * @todo 模拟正态分布曲线数据
     * @return_type void
     */
    public List<Record> gaussian(String xhCode) {
        /*
         * String redis_key=Constants.JIANC_EPRO_SESSION+xhCode; String
         * gaussian_key=Constants.JIANC_GAUSSIAN_SESSION+xhCode; Record
         * pro=getSessionAttr(redis_key); if(pro==null){
         * pro=JianceProModel.dao.findProByFiled(xhCode);
         * setSessionAttr(redis_key, pro); } List<Record>
         * list=getSessionAttr(gaussian_key); if(pro!=null&&list==null){
         * list=new ArrayList<Record>(); double
         * pj=Double.parseDouble(pro.get("pj_value").toString()); double
         * fc=Double.parseDouble(pro.get("fc_value").toString()); for(int
         * x=0;x<500000;x++){ Record r=new Record();
         * list.add(r.set("num",NormalDistribution.calc(pj, fc))); }
         * setSessionAttr(gaussian_key, list); }
         */
        String redis_key = Constants.JIANC_EPRO_SESSION + xhCode;
        Record pro = getSessionAttr(redis_key);
        if (pro == null) {
            pro = JianceProModel.dao.findProByFiled(xhCode);
            setSessionAttr(redis_key, pro);
        }
        List<Record> list = new ArrayList<Record>();
        if (pro != null) {
            list = new ArrayList<Record>();
            double pj = Double.parseDouble(pro.get("pj_value").toString());
            double fc = Double.parseDouble(pro.get("fc_value").toString());
            for (int x = 0; x < 100000; x++) {
                Record r = new Record();
                list.add(r.set("num", NormalDistribution.calc(pj, fc)));
            }
        }
        return list;
    }

    /**
     * @param
     * @time 2017年5月18日 下午4:18:54
     * @author zuoqb
     * @todo xbar数据
     * @return_type void
     */
    public void jianCeXbarForTab1Ajax() {
        String xhName = getPara("xhName", "");// 型号
        String type = getPara("type", "");
        List<Record> list = XbarModel.dao.findXbarData(xhName, type);
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月19日 下午3:43:37
     * @author zuoqb
     * @todo 检测中心 到整机的订单合格率（具体到月份）
     * @return_type void
     */
    public void orderRateForCenterLabAjax() {
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        //endDate = dealEndTime(endDate);
        List<Record> list = OrderModel.dao.findOrderRateForMonth(startDate,
                endDate);
        //dealTimeForLast(list, "name", "rate");
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月20日 上午10:33:50
     * @author zuoqb
     * @todo 设备状态统计
     * @return_type void
     */
    public void equipmentTotalForLab1Ajax() {
        String dataType = getPara("dataType", "1");// 1:当前2：同比
        String labName = getPara("labName", "");
        List<Record> list = EquipmentModel.dao
                .equipmentTotal(dataType, labName);
        renderJson(list);
    }

    /**
     * @param type 类型 0：实验室在线率 1：设备完好率 2：设备利用率
     * @time 2017年5月20日 上午10:33:50
     * @author zuoqb
     * @todo 设备状态统计 到产线 for tab2
     * @return_type void
     */
    public void equipmentStatisForPlForLab2Ajax() {
        String type = getPara("type", "0");
        String labTypeCode = getPara("labTypeCode", "");
        List<Record> list = EquipmentModel.dao.equipmentStatisForPl(type,
                labTypeCode);
        renderJson(list);
    }

    /**************** 满意度统计 ****************/
    /**
     * @param
     * @time 2017年5月20日 下午1:15:38
     * @author zuoqb
     * @todo 满意度 到月份数据统计tab1
     * @return_type void
     */
    public void satisfactionStatisForMonthForTab3Ajax() {
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        //endDate = dealEndTime(endDate);
        String labTypeCode = getPara("labTypeCode", "");
        List<Record> list = SatisfactionModel.dao.satisfactionStatisForMonth(
                startDate, endDate, labTypeCode);
        //list = dealTimeForLast(list, "name", "rate");
        renderJson(list);
    }

    /**
     * @param
     * @time 2017年5月20日 下午1:15:38
     * @author zuoqb
     * @todo 同期 环比满意度占比统计
     * @return_type void
     */
    public void satisfactionChangeForTab1Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        Record r = SatisfactionModel.dao.satisfactionChange(labTypeCode);
        if (r == null) {
            r = new Record();
        }
        renderJson(r);
    }

    /**
     * @param
     * @time 2017年5月20日 下午1:55:53
     * @author zuoqb
     * @todo tab3 某一年分 到产线满意度统计
     * @return_type void
     */
    // 原方法备份
    /*
     * public void satisfactionStatisForYearTab3Ajax(){ String
     * labTypeCode=getPara("labTypeCode",""); String year=getPara("year","");
     * renderJson
     * (SatisfactionModel.dao.satisfactionStatisForYear(year,labTypeCode)); }
     */
    public void satisfactionStatisForYearTab3Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        String year = getPara("year", "");
        String year2 = getPara("year2", "");
        ArrayList<List<Record>> list = new ArrayList<List<Record>>();
        list.add(SatisfactionModel.dao.satisfactionStatisForYear(year,
                labTypeCode));
        list.add(SatisfactionModel.dao.satisfactionStatisForYear(year2,
                labTypeCode));
        renderJson(list);
        // renderJson(SatisfactionModel.dao.satisfactionStatisForYear(year,labTypeCode));
    }

    /**
     * @param
     * @time 2017年5月20日 下午2:24:57
     * @author zuoqb
     * @todo 用户满意度趋势变化 满意度到产线 到月数据统计 tab3
     * @return_type void
     */
    public void productLineAndMonthForTab3Ajax() {
        String startDate = getPara("startDate", dealStartTime());
        String endDate = getPara("endDate", "");
        //endDate = dealEndTime(endDate);
        String labTypeCode = getPara("labTypeCode", "");
        List<List<Record>> list = new ArrayList<List<Record>>();
        List<Record> productLine = getSessionAttr("productLine");
        if (productLine == null) {
            productLine = DicModel.dao.findDicByType("line_type");
        }
        for (Record r : productLine) {
            List<Record> data = SatisfactionModel.dao.productLineAndMonth(
                    startDate, endDate, r.get("id").toString(), labTypeCode);
            //data = dealTimeForLast(data, "name", "rate");
            if (data != null && data.size() > 0) {
                list.add(data);
            }
        }
        renderJson(list);
    }

    // 问题闭环率

    /**
     * @param
     * @time 2017年5月20日 下午3:53:01
     * @author zuoqb
     * @todo 统计当前以及同比 模块 整机问题闭环率tab1
     * @return_type void
     */
    public void questionForMkZjTab1Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        renderJson(QuestionClosedModel.dao.questionForMkZj(labTypeCode));
    }

    /**
     * @param
     * @time 2017年5月20日 下午3:53:01
     * @author zuoqb
     * @todo 统计当前以及同比 模块 整机问题闭环率tab3
     * @return_type void
     */
    public void productLineForTab3Tab3Ajax() {
        String labTypeCode = getPara("labTypeCode", "");
        String dataType = getPara("dataType", "0");// dataType 0 :当前 1：同比
        String type = getPara("type", "");// type 0：整机 1：模块
        renderJson(QuestionClosedModel.dao.productLineForTab3(dataType, type,
                labTypeCode));
    }

    /**
     *
     * @time 2017年5月27日 下午1:51:24
     * @author zuoqb
     * @todo 加载实验室与台位对照关系
     * @param
     * @return_type void
     */
	/*public void loadLabUnitInfoCenterTabAjax() {
		IntegrationServiceClient client = new IntegrationServiceClient();
		List<LabData> labDataList = client.searchLabData();
		renderJson(labDataList);
	}*/

    /**
     * @param
     * @time 2017年11月16日 下午1:41:53
     * @author zuoqb
     * @todo 获取检测中心实验室
     * @return_type void
     */
    public void loadLabSearchLabConnectAjax() {
        IntegrationServiceClient client = new IntegrationServiceClient();
        List<LabData> labDataList = client.searchLabConnect();
        renderJson(labDataList);
    }

    /**
     * @param
     * @time 2017年11月16日 下午1:42:07
     * @author zuoqb
     * @todo 根据实验室编码和url获取检测中心台位信息
     * @return_type void
     */
    public void loadSearchLabDataByConnectUrlAjax() {
        IntegrationServiceClient client = new IntegrationServiceClient();
        String labCode = getPara("labCode");
        String url = getPara("url");
        List<LabTestUnit> labDataList = client.searchLabDataByConnectUrl(labCode, url);
        renderJson(labDataList);
    }

    /**
     * @param
     * @time 2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo 获取传感器信息 用于生成y轴
     * @return_type void
     */
    public void findSensorByLabCenetrTabAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        String testUnitId = getPara("testUnitId", "");
        List<Record> sensorList = SensorTypeModel.dao.findSensorByLab(
                labTypeCode, testUnitId);
        if (sensorList == null) {
            sensorList = new ArrayList<Record>();
        }
        /*
         * if(sensorList.size()<8){ for(int x=sensorList.size();x<8;x++){
         * sensorList.add(new Record()); } }
         */
        renderJson(sortSensor(sensorList));
    }

    /**
     * @param @param  sensorList
     * @param @return
     * @time 2017年6月1日 下午2:16:14
     * @author zuoqb
     * @todo 对y轴进行人为排序
     * @return_type List<Record>
     */
    public List<Record> sortSensor(List<Record> sensorList) {
        String[] units = {"℃", "Hz", "%", "", "V", "A", "W", "kW·h"};
        List<Record> list = new ArrayList<Record>();
        for (String unit : units) {
            Record mSen = new Record();
            for (Record r : sensorList) {
                if (r.getStr("unit").equals(unit)) {
                    mSen = r;
                    break;
                }
            }
            list.add(mSen);
        }
        return list;
    }

    /**
     * @param
     * @time 2017年5月31日 下午3:40:01
     * @author zuoqb
     * @todo 曲线数据
     * @return_type void
     */
    public void searchRealTimeDataCenterTabAjax() {
        String labTypeCode = getPara("labTypeCode", "");
        String url = getPara("url", "");
        String testUnitId = getPara("testUnitId", "");
        String data = "";
        WebServiceRerigeratorClient client = new WebServiceRerigeratorClient();
        String interval = getPara("interval", "3");
        LabTestUnit labTestUnit = client.searchRealTimeData(labTypeCode, url,
                Integer.valueOf(testUnitId), Float.parseFloat(interval));
        // System.out.println(labTestUnit.getRealTimeData());
        if (labTestUnit != null
                && StringUtils.isNotBlank(labTestUnit.getRealTimeData())) {
            data = labTestUnit.getRealTimeData();
        }
        renderText(data);
    }

    /**
     * @param
     * @time 2017年5月26日 下午2:13:12
     * @author zuoqb
     * @todo 获取json文件数据
     * @return_type void
     */
    public void getJsonFile() {
        String serverType = ServerUtil.getServerId();
        String fileName = getPara("fileName", "");
        String dir = "";
        if ("tomcat".equals(serverType)) {
            dir = getRequest().getRealPath("/") + "/static/data/";
        } else {
            dir = getWebRootPath() + "/src/main/webapp/static/data/";
        }
        String path = dir + fileName;
        String json = JsonUtils.readJson(path);
        renderText(json);
    }

    /**
     * @param
     * @time 2017年5月31日 下午12:00:34
     * @author zuoqb
     * @todo 检测中心所有实验室-webservice接口
     */
    public void labAllForCenterLabAjax() {
        IntegrationServiceClient client = new IntegrationServiceClient();
        LabAllData labAllData = client.searchLabAllData();
        renderJson(labAllData);
    }

    /**
     * @param @param  list：原始数据
     * @param @param  key：时间轴键
     * @param @param  key2：时间对应数据键
     * @param @return
     * @time 2017年7月4日 下午3:08:05
     * @author zuoqb
     * @todo 处理月份进行补全
     * @return_type List<Record>
     */
    public List<Record> dealTimeForLast(List<Record> list, String key,
                                        String key2) {
        List<Record> mList = list;
        if (list == null || list.size() == 0) {
            return mList;
        }
        Record last = list.get(list.size() - 1);
        String startDate = last.getStr(key);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        String endDate = sdf.format(new Date());
        for (int x = Integer.valueOf(startDate) + 1; x <= Integer
                .valueOf(endDate); x++) {
            Record r = new Record();
            r.set(key, String.valueOf(x));
            r.set(key2, "0");
            mList.add(r);
        }
        return mList;
    }

    /**
     * @param @param  endDate
     * @param @return
     * @time 2017年7月4日 下午3:09:53
     * @author zuoqb
     * @todo 处理结束时间
     * @return_type String
     */
    public String dealEndTime(String endDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        if (StringUtils.isBlank(endDate)) {
            endDate = sdf.format(new Date());
        }
        return endDate;
    }

    public String dealStartTime() {
        String startDate;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        startDate = sdf.format(new Date()) + "01";
        return startDate;
    }

    public void index() {

        UserModel user = (UserModel) getRequest().getSession().getAttribute("user");
        if(user == null){
            redirect("/login/home");
            return;
        }
        List<Record> labType = DicModel.dao.findDicByType("lab_type");
        List<Record> productLine = DicModel.dao.findDicByType("line_type");
        setAttr("toLabData", getPara("toLabData", ""));
        setAttr("labType", labType);
        setAttr("productLine", productLine);
        setSessionAttr("labType", labType);
        setSessionAttr("productLine", productLine);
        // 实验室轮播信息
        String sqlWhere = SqlUtil.commonWhereSql(this, null);
        List<Record> labInfo = LabMapModel.dao.labShowFlatMap2(sqlWhere);
        for (Record r : labInfo) {
            if (r.getStr("title").length() > 6) {
                r.set("title", r.getStr("title").substring(0, 6) + "...");
            }
        }
        setAttr("labInfo", labInfo);
        // 量产一致性保障 字典
        List<Record> providerDic = ProviderDicModel.dao.findProviderDic();
        setSessionAttr("providerDic", providerDic);
        // 获取初始化工位信息
        List<Record> providerDicStation = ProviderDicModel.dao
                .findProviderDicStationInit();
        setSessionAttr("providerDicStation", providerDicStation);
        // setCookie("providerDicStation",
        // JSON.toJSON(providerDicStation).toString(), 1000);
        render("index.html");
    }

    /***
     * 根据型号获取工位
     *
     * @author Tom
     */
    public void labGetStationAjax() {
        String id = getPara("id", "");
        List<Record> providerDicStation = ProviderDicModel.dao
                .findProviderDicStationByParentId(id);
        renderJson(providerDicStation);
    }

    /**
     * @time 2017年10月19日 上午6:03:13
     * @author zuoqb
     * @todo 查询全部数据中心数据（包含层级关系）
     */
    public void loadAllDataCenterAjax() {
        List<Record> centerDataList = DataCenterModel.dao.findAllDataCenter();
        renderJson(centerDataList);
    }

    /**
     * @param 查询数据中心下实验室 level为3(单位/产品) 4（模块/整机）
     * @time 2017年10月26日 下午9:39:43
     * @author zuoqb
     * @todo TODO
     * @return_type void
     */
    public void loadAllDataCenterLabAjax() {
        String dataCenterId = getPara("dataCenterId", "1");
        List<Record> centerDataList = DataCenterModel.dao
                .findDataCenterLab(dataCenterId);
        renderJson(centerDataList);
    }

    /**
     * @time 2017年10月19日 上午6:03:13
     * @author zuoqb
     * @todo 查询监控数据
     */
    public void loadVideosByDataCenterAjax() {
        String dataCenterId = getPara("dataCenterId");
        List<Record> videoList = getSessionAttr("list_dataCenterId_" + dataCenterId);
        if (videoList == null || videoList.size() == 0) {
            videoList = LabVideoModel.dao
                    .findVideosByDataCenterId(dataCenterId);
            //setSessionAttr("list_dataCenterId_"+dataCenterId, videoList);
        }
        renderJson(videoList);
    }

    /**
     * @param
     * @time 2017年10月19日 上午6:28:39
     * @author zuoqb
     * @todo 根据实验室编码查询某个实验室的画中画监控
     * @return_type void
     */
    public void loadTopVideoByLabCodeAjax() {
        String labCode = getPara("labCode");
        Record topVideo = (Record) (getSessionAttr("record_code_" + labCode) == null ? LabVideoModel.dao.findTopVideoByLabCode(labCode) : getSessionAttr("record_code_" + labCode));
        setSessionAttr("record_code_" + labCode, topVideo);
        if (topVideo == null) {
            topVideo = new Record();
            topVideo.set("videl_url", "");
        }
        renderJson(topVideo);
    }

    /**
     * @param
     * @time 2017年10月19日 上午6:28:39
     * @author zuoqb
     * @todo 数据中心json文件读取属性
     * @return_type void
     */
    public void loadJsonProByDataCenterIdAjax() {
        String labCode = getPara("labCode");
        List<Record> topVideo = JsonPropertyModel.dao
                .findJsonProperty(labCode);
        renderJson(topVideo);
    }

    /**
     * @param
     * @time 2017年11月3日 上午10:20:56
     * @author zuoqb
     * @todo 根据数据中心（三级ID）获取实验室信息
     * @return_type void
     */
    public void loadLabCodeByDataCenterIdAjax() {
        String dataCenterId = getPara("dataCenterId");
        List<Record> labs = LabCodeModel.dao
                .findLabByDataCenterId(dataCenterId);
        renderJson(labs);
    }

    /**
     * @param
     * @time 2018年6月24日 下午3:49:27
     * @author zuoqb
     * @todo 全流程测试指标监控(月)
     * @return_type void
     */
    public void orderNumsAjax() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String now = sdf.format(new Date());
        List<OrderNumModel> orderNums = OrderNumModel.dao.findOrderNums();
        for (OrderNumModel n : orderNums) {
            if (now.equals(n.getStr("last_time"))) {
                //上一次请求时间就是当前天 取变化后数据
                n.put("nums", n.get("now_num"));
            } else {
                //更新
                n.set("last_time", now).set("now_num", n.get("last_num")).update();
                //当日第一次请求 获取基数
                n.put("nums", n.get("last_num"));
            }
        }
        renderJson(orderNums);
    }

    /**
     * @param
     * @time 2018年6月24日 下午4:00:26
     * @author zuoqb
     * @todo 更新
     * @return_type void
     */
    public void updateOrderNumsAjax() {
        String id = getPara("id");
        String change = getPara("change");
        OrderNumModel order = OrderNumModel.dao.findById(id);
        order.set("now_num", Integer.parseInt(order.get("now_num") + "") + Integer.parseInt(change)).update();
        renderJson(order);
    }
}
