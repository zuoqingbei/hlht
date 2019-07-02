package com.ulab.model;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.jfinal.kit.JsonKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.ulab.core.BaseController;
import com.ulab.core.Constants;

/**
 * @author zuoqb
 * @time 2017年9月20日15:54:19
 * @todo 测试数据对应的表（传感器生成的测试数据）
 */
public class HadoopTestData {
    public static final HadoopTestData dao = new HadoopTestData();

    /**
     * @param @param  configName
     * @param @param  testIdentification
     * @param @param  startHowLong
     * @param @param  endHowLong
     * @param @return
     * @time 2017年9月20日 下午5:32:33
     * @author zuoqb
     * @todo 根据时间间隔、测试主键查询测试数据
     * @return_type List<Record>
     */
    @Deprecated
    public List<Record> findDataByTestIdentification(BaseController c, String configName, String testIdentification, Float startHowLong, Float endHowLong) {
        String tableName = DbConfigModel.dao.getTableNameByColumn(c, configName, Constants.TESTDATA);
        String sql = "select * from " + tableName + " where testIdentification='" + testIdentification + "'  ";
        if (startHowLong != null) {
            sql += " and howlong > " + startHowLong;
        }
        if (endHowLong != null) {
            sql += " and howlong < " + endHowLong;
        }
        return Db.use(configName).find(sql);
    }

    /**
     * @param @param  configName
     * @param @param  testIdentification
     * @param @param  startHowLong
     * @param @param  endHowLong
     * @param @param  sensorInfoList:传感器集合 用于删选查询字段 如果日此全部 查询太慢
     * @param @return
     * @time 2017年9月20日 下午6:00:17
     * @author zuoqb
     * @todo 根据时间间隔、测试主键查询测试数据
     * @return_type List<Record>
     */
    public List<Record> findDataByTestIdentification(BaseController c, String configName, String testIdentification, Float startHowLong, Float endHowLong, List<Record> sensorInfoList, String labCode) {
        String tableName = DbConfigModel.dao.getTableNameByColumn(c, configName, Constants.TESTDATA);
        String sql = "select howlong  ";
        for (Record sInfo : sensorInfoList) {
            sql += " , sensorvalue_" + sInfo.get("sensorid");
        }
        sql += " from " + tableName + " where testIdentification='" + testIdentification + "'  " + DbConfigModel.dao.getPartitionSql(c, configName, labCode);
        if (startHowLong != null) {
            sql += " and howlong > " + startHowLong;
        }
        if (endHowLong != null) {
            sql += " and howlong < " + endHowLong;
        }
        return Db.use(configName).find(sql);
    }

    public List<Record> findHiveDataByTestIdentification(BaseController c, String configName, String testIdentification,
                                                         Float startHowLong, Float endHowLong, List<Record> sensorInfoList, String labCode, String testUnitId) {
        String tableName = DbConfigModel.dao.getTableNameByColumn(c, configName, Constants.TESTDATA);
        String sql = "select howlong  ";
        for (Record sInfo : sensorInfoList) {
            sql += " , sensorvalue_" + sInfo.get("sensorid");
        }
        //sql+=" from "+tableName+" where primarykey='"+testIdentification+"'  "+DbConfigModel.dao.getPartitionSql(c, configName, labCode);
        sql += " from " + tableName + " where trim(primarykey)='" + testIdentification.trim() + "' and labcode='" + labCode + "' and testunitid='" + testUnitId + "' " + DbConfigModel.dao.getPartitionSql(c, configName, labCode);
		/*if(startHowLong!=null){
			sql+=" and howlong > "+startHowLong;
		}
		if(endHowLong!=null){
			sql+=" and howlong < "+endHowLong;
		}*/
        return Db.use(configName).find(sql);
    }

    /**
     * @param @param  configName
     * @param @param  labCode
     * @param @param  testUnitId
     * @param @param  startTime
     * @param @param  interval：查询时间间隔
     * @param @return
     * @time 2017年9月21日 上午9:07:02
     * @author zuoqb
     * @todo 查询曲线数据
     * @return_type Record
     */
    public Record findTestData(BaseController c, String configName, String labCode, String testUnitId, String startTime, Float interval) {
        Record finalTestData = new Record();
        Record metaData = null;
        if (configName.indexOf("hive") != -1) {
            metaData = HadoopTestMetadata.dao.findHiveLastTestMetadata(c, configName, labCode, testUnitId);
        } else {
            metaData = HadoopTestMetadata.dao.findLastTestMetadata(c, configName, labCode, testUnitId);
        }
        if (metaData != null) {
            String testIdentification = metaData.getStr("testidentification");//实验编号
            //获取当前台位实时曲线
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date testBeginTime = null;//开始测试时间
            Date now = new Date();
            boolean isOpt = true;
            long distance = 0;
            try {

                testBeginTime = sdf.parse(metaData.get("testbegintime") + "");//开始测试时间
                System.out.println("testBeginTime=" + sdf.format(testBeginTime));
                if (isOpt && configName.indexOf("hive") == -1) {
                    Double maxHowLong = getMaxHowLong(c, configName, testIdentification, labCode);//目前测试数据中最大时间
                    System.out.println("maxHowLong=" + maxHowLong);
                    Date realEndDate = new Date(testBeginTime.getTime() + Math.round(maxHowLong) * 60 * 1000);//实际结算时间
                    System.out.println("realEndDate=" + sdf.format(realEndDate));
                    distance = CalculateTime(sdf.format(realEndDate));//实际结算时间一当前时间间隔
                    System.out.println("realEndDate=" + distance);
                    if (StringUtils.isNotBlank(startTime)) {
                        now = sdf.parse(startTime);
                    }
                    now = new Date(now.getTime() - distance * 60 * 1000);//进行时间平移 保证有数据
                } else {
                    if (StringUtils.isNotBlank(startTime)) {
                        now = sdf.parse(startTime);
                    }
                }

                System.out.println("now=" + sdf.format(now));
            } catch (Exception e) {
                e.printStackTrace();
            }

            float f2 = (now.getTime() - testBeginTime.getTime()) / 60000f;//已经测试时长 分钟
            float startHowLong = f2 - interval > 0 ? f2 - interval : 0;
            float endHowLong = startHowLong + interval;
            if (configName.indexOf("hive") != -1) {
                joinHiveTestData(c, configName, startHowLong, endHowLong, finalTestData, metaData, labCode, testUnitId);
                //hive数据库不能使用testidentification查询测试数据，需要使用primarykey（开测时间+测试单元 例如2017-08-1213:50:3222     ）
            } else {
                joinTestData(c, configName, startHowLong, endHowLong, finalTestData, metaData, labCode);
            }
        }
        System.out.println(JsonKit.toJson(finalTestData));
        return finalTestData;
    }

    /**
     * 由过去的某一时间,计算距离当前的时间
     */
    public long CalculateTime(String time) {
        long nowTime = System.currentTimeMillis(); //获取当前时间的毫秒数
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//指定时间格式
        Date setTime = null; //指定时间
        try {
            setTime = sdf.parse(time); //将字符串转换为指定的时间格式
        } catch (ParseException e) {

            e.printStackTrace();
        }

        long reset = setTime.getTime(); //获取指定时间的毫秒数
        long dateDiff = nowTime - reset;

        if (dateDiff < 0) {
            return 0;
        } else {

            long dateTemp1 = dateDiff / 1000; //秒
            long dateTemp2 = dateTemp1 / 60; //分钟
            return dateTemp2;
        }

    }

    public Double getMaxHowLong(BaseController c, String configName, String testIdentification, String labCode) {
        String tableName = DbConfigModel.dao.getTableNameByColumn(c, configName, Constants.TESTDATA);
        String sql = " select	max(howlong) as  howlong from " + tableName + " where testIdentification = '" + testIdentification + "' " + DbConfigModel.dao.getPartitionSql(c, configName, labCode);
        String key = "testIdentification_long_reocrd_" + testIdentification;
        Record r = c.getSessionAttr(key);
        if (r == null) {
            r = Db.use(configName).findFirst(sql);
            c.setSessionAttr(key, r);
        }
        if (r != null) {
            if (r.get("howlong") != null && StringUtils.isNotBlank(r.get("howlong").toString()))
                return Double.parseDouble(r.get("howlong") + "");
        }
        return 0d;
    }

    /**
     * @param @param  configName
     * @param @param  labCode
     * @param @param  testUnitId
     * @param @param  startHowLong
     * @param @param  endHowLong
     * @param @return
     * @time 2017年9月20日 下午6:01:27
     * @author zuoqb
     * @todo 组装曲线数据格式
     * @return_type Record
     */
    public Record findTestData(BaseController c, String configName, String labCode, String testUnitId, Float startHowLong, Float endHowLong) {
        Record finalTestData = new Record();
        //step1 查询测试基础信息 根据实验室以及测试单元编码获取最后一次测试信息
        Record metaData = HadoopTestMetadata.dao.findLastTestMetadata(c, configName, labCode, testUnitId);
        joinTestData(c, configName, startHowLong, endHowLong, finalTestData, metaData, labCode);
        return finalTestData;
    }

    private void joinTestData(BaseController c, String configName, Float startHowLong, Float endHowLong, Record finalTestData,
                              Record metaData, String labCode) {
        if (metaData != null) {
            /**
             * sybh:'实验编号',
             ybbh:'样品编号',
             cpxh:'产品型号',
             testUnitStatus:试验项目
             */
            String testIdentification = metaData.getStr("testidentification");//实验编号
            finalTestData.set("sybh", testIdentification);
            finalTestData.set("ybbh", metaData.get("sample_code"));
            finalTestData.set("cpxh", metaData.get("productmodel"));
            finalTestData.set("testunitstatus", metaData.get("testitemname"));
            //step2 :查询传感器信息
            List<Record> sensorInfoList = HadoopSensorInfo.dao.findSensorInfoByTestIdentification(c, configName, testIdentification, labCode);
            //step3 查询具体数据
            List<Record> allTestData = findDataByTestIdentification(c, configName, testIdentification, startHowLong, endHowLong, sensorInfoList, labCode);
            //step3 拼接结构
            /**
             *  {	name:'1:温度(℃)',
             data:[{name:'1月',value:'-55'},
             {name:'2月',value:'60'},
             {name:'3月',value:'447'} ]
             }
             */
            List<Record> dataList = new ArrayList<Record>();
            for (Record sensorInfo : sensorInfoList) {
                Record mData = new Record();
                mData.set("name", sensorInfo.get("legend"));
                List<Record> data = new ArrayList<Record>();
                for (Record testData : allTestData) {
                    Record innerData = new Record();
                    innerData.set("name", Float.parseFloat(testData.get("howlong") + "") / 60);
                    //传感器数据，跟sensorinfo中的sensorId对应
                    innerData.set("value", testData.get("sensorvalue_" + sensorInfo.get("sensorid")));
                    data.add(innerData);
                }
                mData.set("data", data);
                dataList.add(mData);
            }
            finalTestData.set("list", dataList);
        }
    }

    private void joinHiveTestData(BaseController c, String configName, Float startHowLong, Float endHowLong, Record finalTestData,
                                  Record metaData, String labCode, String testUnitId) {
        if (metaData != null) {
            /**
             * sybh:'实验编号',
             ybbh:'样品编号',
             cpxh:'产品型号',
             testUnitStatus:试验项目

             */
            String testIdentification = "" + metaData.get("primarykey");//实验编号
            finalTestData.set("sybh", testIdentification);
            finalTestData.set("ybbh", metaData.get("sample_code"));
            finalTestData.set("cpxh", metaData.get("productmodel"));
            finalTestData.set("testunitstatus", metaData.get("testitemname"));
            //step2 :查询传感器信息
            List<Record> sensorInfoList = HadoopSensorInfo.dao.findHiveSensorInfoByTestIdentification(c, configName, testIdentification, labCode);
            //testIdentification="2017-09-0413:38:4641          ";
            //step3 查询具体数据
            List<Record> allTestData = findHiveDataByTestIdentification(c, configName, testIdentification, startHowLong,
                    endHowLong, sensorInfoList, labCode, testUnitId);
            //step3 拼接结构
            /**
             *  {	name:'1:温度(℃)',
             data:[{name:'1月',value:'-55'},
             {name:'2月',value:'60'},
             {name:'3月',value:'447'} ]
             }
             */
            List<Record> dataList = new ArrayList<Record>();
            for (Record sensorInfo : sensorInfoList) {
                Record mData = new Record();
                mData.set("name", sensorInfo.get("legend"));
                List<Record> data = new ArrayList<Record>();
                for (Record testData : allTestData) {
                    Record innerData = new Record();
                    innerData.set("name", Float.parseFloat(testData.get("howlong") + "") / 60);
                    //传感器数据，跟sensorinfo中的sensorId对应
                    //innerData.set("value", dealSensorvalue(testData, sensorInfo));
                    innerData.set("value", testData.get("sensorvalue_" + sensorInfo.get("sensorid")));
                    data.add(innerData);
                }
                mData.set("data", data);
                dataList.add(mData);
            }
            finalTestData.set("list", dataList);
        }
    }

    public String dealSensorvalue(Record testData, Record sensorInfo) {
        String value = "";
        String sensorid = sensorInfo.get("sensorid") + "";
        String all = testData.get("sensorvalue") + "";
        if (StringUtils.isNotBlank(all)) {
            String[] arr = all.split("@");
            for (String s : arr) {
                if (s.startsWith(sensorid + ":")) {
                    value = s.replaceAll(sensorid + ":", "");
                    if (value == "N") {
                        value = "0";
                    }
                    break;
                }
            }
        }
        return value;

    }

    public Record findTestData(BaseController c, String configName, String labCode, String testUnitId, Float endHowLong) {
        return this.findTestData(c, configName, labCode, testUnitId, "", endHowLong);
    }

    public Record findTestData(BaseController c, String configName, String labCode, String testUnitId) {
        return this.findTestData(c, configName, labCode, testUnitId, null);
    }
}
