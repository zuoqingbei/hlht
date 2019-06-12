/*
Navicat Oracle Data Transfer
Oracle Client Version : 12.1.0.2.0

Source Server         : 测试
Source Server Version : 110200
Source Host           : 10.138.8.233:1521
Source Schema         : LHJX01

Target Server Type    : ORACLE
Target Server Version : 110200
File Encoding         : 65001

Date: 2017-12-11 09:30:15
*/


-- ----------------------------
-- Table structure for T_B_LAB_MAP
-- ----------------------------
DROP TABLE "LHJX01"."T_B_LAB_MAP";
CREATE TABLE "LHJX01"."T_B_LAB_MAP" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"NAME" VARCHAR2(255 BYTE) NULL ,
"SHORT_NAME" VARCHAR2(255 BYTE) NULL ,
"LNG" VARCHAR2(20 BYTE) NULL ,
"LAT" VARCHAR2(20 BYTE) NULL ,
"SHOW_IN_MAP" CHAR(2 BYTE) NULL ,
"DEL_FLAG" CHAR(2 BYTE) NULL ,
"LOCATION" VARCHAR2(255 BYTE) NULL ,
"LAB_TYPE" VARCHAR2(255 BYTE) NULL ,
"DATA_CENTER_ID" VARCHAR2(100 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_LAB_MAP" IS '平面图展示数据';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."ID" IS '主键 字典编码';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."NAME" IS '字典名称';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."SHORT_NAME" IS '简称';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."LNG" IS '经度';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."LAT" IS '维度';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."SHOW_IN_MAP" IS '是否展示在地图';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."DEL_FLAG" IS '是否删除，0：未删除 1：已删除';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."LOCATION" IS '所在地方';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."LAB_TYPE" IS '实验室类型';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_MAP"."DATA_CENTER_ID" IS '数据中心ID';

-- ----------------------------
-- Records of T_B_LAB_MAP
-- ----------------------------
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('1', '黄岛园区', '黄岛园区', '120.0461', '35.8726', '1 ', '0 ', '黄岛', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('2', '郑州园区', '郑州园区', '113.6253', '34.7466', '1 ', '0 ', '郑州', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('3', '大连园区', '大连园区', '121.618622', '38.914589', '1 ', '0 ', '大连', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('4', '青岛园区', '青岛园区', '120.355171', '36.082981', '1 ', '0 ', '青岛', '工厂类', '1');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('5', '泰国模块中心', '泰国模块中心', '100.9925', '15.87', '1 ', '0 ', '泰国', '模块商', '9');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('6', '印尼模块中心', '印尼模块中心', '113.9213', '-0.7892', '1 ', '0 ', '印尼', '模块商', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('7', '巴基斯坦模块中心', '巴基斯坦模块中心', '69.3451', '30.3753', '1 ', '0 ', '巴基斯坦', '模块商', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('8', '海外工厂印度尼西亚园区', '海外工厂印度尼西亚园区', '113.9213', '-0.7892', '1 ', '0 ', '印度尼西亚', '工厂类', '21');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('9', '胶州园区', '胶州园区', '120.006203', '36.285877', '1 ', '0 ', '胶州', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('10', '日本研发中心', '日本研发中心', '138.2529', '36.2048', '1 ', '0 ', '日本', '研发类', '11');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('11', '海外工厂尼日利亚园区', '海外工厂尼日利亚园区', '8.6752', '9.0819', '1 ', '0 ', '尼日利亚', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('12', '墨西哥模块中心', '墨西哥模块中心', '-102.5527', '23.6345', '1 ', '0 ', '墨西哥', '模块商', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('13', '合肥园区', '合肥园区', '117.283043', '31.861191', '1 ', '0 ', '合肥', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('14', '武汉园区', '武汉园区', '114.298569', '30.584354', '1 ', '0 ', '武汉', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('15', '德国研发中心', '德国研发中心', '10.4515', '51.1656', '1 ', '0 ', '德国', '研发类', '19');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('16', '印度研发中心', '印度研发中心', '78.9628', '20.5936', '1 ', '0 ', '印度', '研发类', '21');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('17', '墨西哥研发中心', '墨西哥研发中心', '-102.5527', '23.6345', '1 ', '0 ', '墨西哥', '研发类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('18', '海外工厂越南园区', '海外工厂越南园区', '108.2771', '14.0583', '1 ', '0 ', '越南', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('19', '重庆园区', '重庆园区', '106.504959', '29.533155', '1 ', '0 ', '重庆', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('20', '胶南园区', '胶南园区', '119.9835', '35.8786', '1 ', '0 ', '胶南', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('21', '沈阳园区', '沈阳园区', '123.429092', '41.796768', '1 ', '0 ', '沈阳', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('22', '美国模块中心', '美国模块中心', '-95.7128', '37.0902', '1 ', '0 ', '美国', '模块商', '12');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('23', '越南模块中心', '越南模块中心', '108.2771', '14.0583', '1 ', '0 ', '越南', '模块商', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('24', '海外工厂印度园区', '海外工厂印度园区', '78.9628', '20.5936', '1 ', '0 ', '印度', '工厂类', '21');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('25', '海外工厂突尼斯园区', '海外工厂突尼斯园区', '9.5374', '33.8869', '1 ', '0 ', '突尼斯', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('26', '新西兰模块中心', '新西兰模块中心', '174.9738', '-41.0208', '1 ', '0 ', '新西兰', '模块商', '10');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('27', '中国模块中心', '中国模块中心', '104.1953', '35.8616', '1 ', '0 ', '中国', '模块商', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('28', '上海研发中心', '上海研发中心', '121.472641', '31.231707', '1 ', '0 ', '上海', '研发类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('43', '美国埃文斯维尔研发中心', '美国埃文斯维尔研发中心', '-87.57108', '37.971559', '1 ', '0 ', '美国', '研发类', '12');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('30', '海外工厂美国园区', '海外工厂美国园区', '-78.1677', '39.1833', '1 ', '0 ', '美国', '工厂类', '12');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('31', '三水园区', '三水园区', '112.899414', '23.165039', '1 ', '0 ', '三水', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('32', '顺德园区', '顺德园区', '113.281822', '22.758511', '1 ', '0 ', '顺德', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('33', '海外工厂约旦园区', '海外工厂约旦园区', '36.2384', '30.5851', '1 ', '0 ', '约旦', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('34', '海外工厂泰国园区', '海外工厂泰国园区', '98.9318', '18.4275', '1 ', '0 ', '泰国', '工厂类', '9');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('35', '俄罗斯模块中心', '俄罗斯模块中心', '105.3187', '61.524', '1 ', '0 ', '俄罗斯', '模块商', '20');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('36', '青岛研发中心', '青岛研发中心', '120.4815', '36.2165', '1 ', '0 ', '青岛', '检测中心', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('37', '韩国研发中心', '韩国研发中心', '127.7669', '35.9077', '1 ', '0 ', '韩国', '研发类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('38', '新西兰研发中心', '新西兰研发中心', '174.8859', '-40.9005', '1 ', '0 ', '新西兰', '研发类', '10');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('39', '贵州园区', '贵州园区', '106.713478', '26.578342', '1 ', '0 ', '贵州', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('40', '海外工厂巴基斯坦园区', '海外工厂巴基斯坦园区', '64.1162', '25.5622', '1 ', '0 ', '巴基斯坦', '工厂类', null);
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('41', '海外工厂俄罗斯园区', '海外工厂俄罗斯园区', '93.5156', '62.4514', '1 ', '0 ', '俄罗斯', '工厂类', '20');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('42', '印度模块中心', '印度模块中心', '77.6953', '12.1252', '1 ', '0 ', '印度', '模块商', '21');
INSERT INTO "LHJX01"."T_B_LAB_MAP" VALUES ('29', '美国肯塔基州研发中心', '美国肯塔基州研发中心', '-84.270017', '37.839333', '1 ', '0 ', '印度', '模块商', '21');

-- ----------------------------
-- Indexes structure for table T_B_LAB_MAP
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_LAB_MAP
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_LAB_MAP" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_LAB_MAP
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_LAB_MAP" ADD PRIMARY KEY ("ID");
