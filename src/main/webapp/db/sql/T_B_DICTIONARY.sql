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

Date: 2017-12-11 09:29:51
*/


-- ----------------------------
-- Table structure for T_B_DICTIONARY
-- ----------------------------
DROP TABLE "LHJX01"."T_B_DICTIONARY";
CREATE TABLE "LHJX01"."T_B_DICTIONARY" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"NAME" VARCHAR2(255 BYTE) NULL ,
"SHORT_NAME" VARCHAR2(255 BYTE) NULL ,
"PARENT_ID" VARCHAR2(20 BYTE) NULL ,
"TYPE" VARCHAR2(20 BYTE) NULL ,
"ORDER_NO" NUMBER(7) NULL ,
"DEL_FLAG" CHAR(2 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_DICTIONARY" IS '字典表';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."ID" IS '主键 字典编码';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."NAME" IS '字典名称';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."SHORT_NAME" IS '简称';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."PARENT_ID" IS '父级ID 如果没有父级  默认0';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."TYPE" IS '字典类型。实验室性质分类：properties_type；可开展实验类别：carry_out_type，产线：line_type；
实验室类型：lab_type；区域：area_type';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."ORDER_NO" IS '排序';
COMMENT ON COLUMN "LHJX01"."T_B_DICTIONARY"."DEL_FLAG" IS '是否删除，0：未删除 1：已删除';

-- ----------------------------
-- Records of T_B_DICTIONARY
-- ----------------------------
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('1', '检测中心', '检测中心', '0', 'lab_type', '2', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('2', '研发类', '研发实验室', '0', 'lab_type', '1', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('3', '模块商', '模块商实验室', '0', 'lab_type', '4', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('4', '工厂类', '工厂实验室', '0', 'lab_type', '3', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('7', 'EMC', 'EMC', '0', 'properties_type', '5', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('8', '运输', '运输', '0', 'properties_type', '4', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('9', '可靠性', '可靠性', '0', 'properties_type', '3', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('10', '用户模拟/用户体验', '用户体验', '0', 'properties_type', '6', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('12', '比对试验', '比对试验', '0', 'carry_out_type', '1', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('13', '新品调试', '新品调试', '0', 'carry_out_type', '2', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('14', '新品确认', '新品确认', '0', 'carry_out_type', '3', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('16', '小批验证', '小批验证', '0', 'carry_out_type', '5', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('18', '入厂/出厂', '入厂/出厂', '0', 'carry_out_type', '7', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('19', '年度型检', '年度型检', '0', 'carry_out_type', '8', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('20', '监督抽测', '监督抽测', '0', 'carry_out_type', '9', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('21', '冰冷 ', '冰&emsp;冷', '0', 'line_type', '1', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('22', '洗涤', '洗&emsp;涤', '0', 'line_type', '2', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('23', '家空', '家&emsp;空', '0', 'line_type', '3', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('24', '商空', '商&emsp;空', '0', 'line_type', '4', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('25', '热水器', '热水器', '0', 'line_type', '5', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('26', '厨电', '厨&emsp;电', '0', 'line_type', '6', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('5', '性能', '性能', '0', 'properties_type', '1', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('6', '安全', '安全', '0', 'properties_type', '2', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('27', '其它', '其&emsp;他', '0', 'line_type', '7', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('30', '机械', '机械', '0', 'professional_type', '2', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('31', 'EMC', 'EMC', '0', 'professional_type', '5', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('32', '电气', '电气', '0', 'professional_type', '3', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('33', '化学', '化学', '0', 'professional_type', '1', '0 ');
INSERT INTO "LHJX01"."T_B_DICTIONARY" VALUES ('34', '日用消费品', '日用消费品', '0', 'professional_type', '4', '0 ');

-- ----------------------------
-- Indexes structure for table T_B_DICTIONARY
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_DICTIONARY
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_DICTIONARY" ADD CHECK ("ID" IS NOT NULL);
ALTER TABLE "LHJX01"."T_B_DICTIONARY" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_DICTIONARY
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_DICTIONARY" ADD PRIMARY KEY ("ID");
