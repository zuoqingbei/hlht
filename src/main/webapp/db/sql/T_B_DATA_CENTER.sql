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

Date: 2017-12-11 09:24:22
*/


-- ----------------------------
-- Table structure for T_B_DATA_CENTER
-- ----------------------------
DROP TABLE "LHJX01"."T_B_DATA_CENTER";
CREATE TABLE "LHJX01"."T_B_DATA_CENTER" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"CENTER_NAME" VARCHAR2(200 BYTE) NULL ,
"CENTER_DESC" VARCHAR2(4000 BYTE) NULL ,
"IMG_CONTENT" VARCHAR2(4000 BYTE) NULL ,
"DATA_TYPE" VARCHAR2(20 BYTE) NULL ,
"CENTER_LEVEL" VARCHAR2(20 BYTE) NULL ,
"HASCHILDREN" VARCHAR2(20 BYTE) NULL ,
"PARENT_ID" VARCHAR2(20 BYTE) NULL ,
"DATA_SOURCE" VARCHAR2(20 BYTE) NULL ,
"SOUCE_VALUE" VARCHAR2(4000 BYTE) NULL ,
"ORDER_NUM" NUMBER NULL ,
"DEL_FLAG" CHAR(2 BYTE) NULL ,
"ISSHOW_NAME" CHAR(255 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_DATA_CENTER" IS '实验中心基础信息表';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."CENTER_NAME" IS '数据中心名称';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."CENTER_DESC" IS '中心简介 支持html';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."IMG_CONTENT" IS '图片介绍内容 支持html';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."DATA_TYPE" IS '数据类型 0：国内 1：国外';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."CENTER_LEVEL" IS '中心等级 根等级为0';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."HASCHILDREN" IS '是否有子节点 0：没有 1：有';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."PARENT_ID" IS '父级菜单ID';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."DATA_SOURCE" IS '数据源 db-直连数据库； url-第三方链接；
webservice-连接webservice；json-读取json文件
';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."SOUCE_VALUE" IS '表示data_source的实际值 当为db值是数据库配置名称，当为webservice为wsdl信息；当为json是html用于生成下拉';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."ORDER_NUM" IS '排序';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."DEL_FLAG" IS '删除标示 0：未删除 1：删除';
COMMENT ON COLUMN "LHJX01"."T_B_DATA_CENTER"."ISSHOW_NAME" IS '是否显示名字 0-显示 1-不显示';

-- ----------------------------
-- Records of T_B_DATA_CENTER
-- ----------------------------
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('19', '德国研发中心', 'Europe Center', null, '1', '2', '0', '7', null, null, '15', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('3', '中国模块商数据中心', 'Chinese Module Center', null, '0', '1', '0', '-1', 'url', 'http://sqm.haier.net/', '31', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('4', '胶州海尔空调一期', null, null, '0', '3', '0', '15', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('20', '俄罗斯园区数据中心', 'Russia Center', '../static/img/labMain/RussiaCenter.jpg', '1', '2', '0', '8', null, null, '23', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('21', '印度园区数据中心', 'India Center', '../static/img/labMain/IndiaCenter.jpg', '1', '2', '0', '8', null, null, '24', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('7', '海外研发中心', 'Oversea R&D Center', null, '1', '1', '1', '-1', null, null, '11', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('8', '海外工厂', 'Oversea Park', null, '1', '1', '1', '-1', null, null, '21', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('9', '泰国园区数据中心', 'Haier Thailand ACF have own testing laboratory，which can do the normal cooling capacity testing with our engineer. ACF also can develop new product with local parts.', '../static/img/labMain/Thailand.jpg', '1', '2', '0', '8', null, null, '22', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('10', '新西兰研发中心', '3 main labs on Auckland site: Refrigeration Test Lab，Refrigeration Evaluation Lab，Laundry Evaluation Lab<br>　　2 main labs on Dunedin site: Cooking Evaluation Lab，Dishwashing Evaluation LabLab capacity including hundreds of testing items for both Compliance Testing & Development Testing based on advanced and reliable measurement system and skilled lab techs.', '../static/img/labMain/NewZealandCenter.jpg', '1', '2', '0', '7', null, null, '13', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('11', '日本研发中心', 'Japan Center', '../static/img/labMain/JapanCenter.jpg', '1', '2', '0', '7', null, null, '14', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('12', 'GEA美国研发中心', 'US_GEA_LAB', '../static/img/labMain/US_GEA.jpg', '1', '2', '0', '7', null, null, '12', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('2', '产线', null, null, '0', '1', '1', '-1', null, null, '2', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('13', '冰冷数据中心', 'Ice-cold Center', null, '0', '2', '0', '2', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('14', '洗涤数据中心', 'Washing Center', null, '0', '2', '0', '2', null, null, '2', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('15', '家空数据中心', 'Home-air Center', null, '0', '2', '0', '2', null, null, '3', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('16', '商空数据中心', 'Business-air Center', null, '0', '2', '0', '2', null, null, '4', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('17', '厨电数据中心', 'Cooking-electic Center', null, '0', '2', '0', '2', null, null, '5', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('18', '热水器数据中心', 'Hot-water Center', null, '0', '2', '0', '2', null, null, '6', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('44', '重庆冰箱', null, null, '0', '3', '0', '13', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('46', '模块', null, null, '0', '3', '0', '1', null, null, '3', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('29', '俄罗斯冰箱', null, null, '1', '3', '0', '20', null, null, '23', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('27', '德国研发中心', null, null, '1', '3', '0', '19', null, null, '15', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('51', '整机', null, null, '0', '3', '0', '1', null, null, '2', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('30', '印度园区数据中心', null, null, '1', '3', '0', '21', null, null, '24', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('31', '泰国冰箱', null, null, '1', '3', '0', '9', null, null, '22', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('32', '新西兰研发中心', null, null, '1', '3', '0', '10', null, null, '13', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('33', '日本研发中心', null, null, '1', '3', '0', '11', null, null, '14', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('34', ' Washers and Dryers', null, null, '1', '3', '0', '12', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('35', '胶南洗衣机', null, null, '0', '3', '0', '14', null, null, '2', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('57', 'Air conditioners', null, null, '1', '3', '0', '12', null, null, '2', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('37', '商空数据中心', null, null, '0', '3', '0', '16', null, null, '4', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('38', '厨电数据中心', null, null, '0', '3', '0', '17', null, null, '5', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('39', '胶州热水器', null, null, '0', '3', '0', '18', null, null, '6', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('58', 'Refrigerator', null, null, '1', '3', '0', '12', null, null, '0', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('41', 'GEA韩国研发中心', null, null, '1', '3', '0', '24', null, null, '16', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('42', 'GEA印度研发中心', null, null, '1', '3', '0', '25', null, null, '17', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('43', 'GEA墨西哥研发中心', null, null, '1', '3', '0', '26', null, null, '18', '0 ', '1                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('52', '武汉冷柜', null, null, '0', '3', '0', '13', null, null, '3', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('53', '合肥冰箱', null, null, '0', '3', '0', '13', null, null, '4', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('54', '大连冰箱', null, null, '0', '3', '0', '13', null, null, '5', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('55', '沈阳冰箱', null, null, '0', '3', '0', '13', null, null, '6', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('56', '佛山冷柜', null, null, '0', '3', '0', '13', null, null, '7', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('48', '胶州海尔空调二期', null, null, '0', '3', '0', '15', null, null, '999', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('50', '泰国空调', null, null, '1', '3', '0', '9', null, null, '22', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('1', '检测中心', '   <p>
                                    检测中心为原海尔集团质量监测中心，建于1998年12月，累计投资近2.0亿，占地约10000㎡，专业实验室66间，涉及家电、机械和电子电器产品领域，覆盖运输、安全、性能、EMC、噪音、可靠性、用户体验、智能成套家电评测和零部件材料、环保模块等专业的500多项标准2000多个项目的检测能力； </p>
                                <p>
                                    中心拥有一支经验丰富的专业团队，在电子电器产品及关键模块领域具有主导和参与重要标准制定的能力，致力于打造集个性定制、智能检测、并联增值为一体的互联互通平台，满足用户个性化需求。 </p>
                                <p>
                                    通过长期与VDE、UL、JET、ETL、TUV莱茵、Intertek、BV、CSA、KTL、CQC、SII等多家国际权威认证检测机构的紧密合作，实现数据互认，逐渐发展为一个开放的检测资源共享平台，无需跨出国门，即可提供国际化的专业服务，从而以最快的速度、最优质的服务、最经济的成本，满足海尔全球产品的当地化需求，支撑产品用户体验引领。 </p>', '../static/img/labMain/labmain-1.png', '0', '1', '0', '-1', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('45', '贵州冰箱', null, null, '0', '3', '0', '13', null, null, '1', '0 ', '0                                                                                                                                                                                                                                                              ');
INSERT INTO "LHJX01"."T_B_DATA_CENTER" VALUES ('47', '海尔智能家居', null, null, '0', '3', '0', '51', 'url', 'http://10.130.96.107:8080/xtest/toshow.jsp?token=QAZXC-PLMNB', '1', '0 ', '0                                                                                                                                                                                                                                                              ');

-- ----------------------------
-- Indexes structure for table T_B_DATA_CENTER
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_DATA_CENTER
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_DATA_CENTER" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_DATA_CENTER
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_DATA_CENTER" ADD PRIMARY KEY ("ID");
