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

Date: 2017-12-11 09:30:26
*/


-- ----------------------------
-- Table structure for T_B_PERSON_DETAIL
-- ----------------------------
DROP TABLE "LHJX01"."T_B_PERSON_DETAIL";
CREATE TABLE "LHJX01"."T_B_PERSON_DETAIL" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"LAB_ID" VARCHAR2(255 BYTE) NULL ,
"NAME" VARCHAR2(255 BYTE) NULL ,
"NUM" VARCHAR2(255 BYTE) NULL ,
"TYPE" VARCHAR2(255 BYTE) NULL ,
"DEL_FLAG" VARCHAR2(20 BYTE) NULL ,
"ORDER_NO" NUMBER NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_PERSON_DETAIL" IS '人员信息详细';
COMMENT ON COLUMN "LHJX01"."T_B_PERSON_DETAIL"."LAB_ID" IS '实验室ID t_b_person_data主键';
COMMENT ON COLUMN "LHJX01"."T_B_PERSON_DETAIL"."NAME" IS '名称';
COMMENT ON COLUMN "LHJX01"."T_B_PERSON_DETAIL"."NUM" IS '数量';
COMMENT ON COLUMN "LHJX01"."T_B_PERSON_DETAIL"."TYPE" IS '类型 1:学历情况 2:工作年限情况 3:批准权限';

-- ----------------------------
-- Records of T_B_PERSON_DETAIL
-- ----------------------------
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('82', '18', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('83', '19', '专科', '0', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('93', '29', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('94', '30', '专科', '43', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('104', '8', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('105', '9', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('114', '18', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('115', '19', '其他', '2', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('126', '30', '其他', '20', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('127', '31', '其他', '2', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('137', '9', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('138', '10', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('156', '28', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('157', '29', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('174', '14', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('175', '15', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('186', '26', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('187', '27', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('211', '19', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('212', '20', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('197', '5', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('198', '6', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('220', '28', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('221', '29', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('232', '8', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('233', '9', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('245', '21', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('246', '22', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('259', '3', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('260', '4', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('274', '18', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('275', '19', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('1', '1', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('2', '2', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('3', '3', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('4', '4', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('5', '5', '研究生', '1', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('6', '6', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('7', '7', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('8', '8', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('9', '9', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('10', '10', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('11', '11', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('12', '12', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('13', '13', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('14', '14', '研究生', '1', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('15', '15', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('16', '16', '研究生', '3', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('17', '17', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('18', '18', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('19', '19', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('20', '20', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('21', '21', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('22', '22', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('23', '23', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('24', '24', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('25', '25', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('26', '26', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('27', '27', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('28', '28', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('29', '29', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('30', '30', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('31', '31', '研究生', '0', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('32', '32', '研究生', '1', '1', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('33', '1', '本科', '13', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('34', '2', '本科', '7', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('35', '3', '本科', '4', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('36', '4', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('37', '5', '本科', '3', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('38', '6', '本科', '2', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('39', '7', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('40', '8', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('41', '9', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('42', '10', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('43', '11', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('44', '12', '本科', '5', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('45', '13', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('46', '14', '本科', '7', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('47', '15', '本科', '2', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('48', '16', '本科', '4', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('49', '17', '本科', '2', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('50', '18', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('51', '19', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('52', '20', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('53', '21', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('54', '22', '本科', '2', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('55', '23', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('56', '24', '本科', '3', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('57', '25', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('58', '26', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('59', '27', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('60', '28', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('61', '29', '本科', '0', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('62', '30', '本科', '1', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('63', '31', '本科', '2', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('64', '32', '本科', '12', '1', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('65', '1', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('66', '2', '专科', '4', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('67', '3', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('68', '4', '专科', '1', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('69', '5', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('70', '6', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('71', '7', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('72', '8', '专科', '1', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('73', '9', '专科', '2', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('74', '10', '专科', '0', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('75', '11', '专科', '2', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('76', '12', '专科', '21', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('77', '13', '专科', '6', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('78', '14', '专科', '11', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('79', '15', '专科', '5', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('80', '16', '专科', '4', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('81', '17', '专科', '9', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('84', '20', '专科', '2', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('85', '21', '专科', '1', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('86', '22', '专科', '2', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('87', '23', '专科', '7', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('88', '24', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('89', '25', '专科', '1', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('90', '26', '专科', '4', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('91', '27', '专科', '3', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('92', '28', '专科', '6', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('95', '31', '专科', '81', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('96', '32', '专科', '5', '1', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('97', '1', '其他', '4', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('98', '2', '其他', '4', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('99', '3', '其他', '2', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('100', '4', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('101', '5', '其他', '2', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('102', '6', '其他', '2', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('103', '7', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('106', '10', '其他', '3', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('107', '11', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('108', '12', '其他', '3', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('109', '13', '其他', '6', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('110', '14', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('111', '15', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('112', '16', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('113', '17', '其他', '5', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('116', '20', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('117', '21', '其他', '7', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('118', '22', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('119', '23', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('120', '24', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('121', '25', '其他', '7', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('122', '26', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('123', '27', '其他', '0', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('124', '28', '其他', '3', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('125', '29', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('128', '32', '其他', '1', '1', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('129', '1', '大于15年', '6', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('130', '2', '大于15年', '4', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('131', '3', '大于15年', '3', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('132', '4', '大于15年', '1', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('133', '5', '大于15年', '2', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('134', '6', '大于15年', '2', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('135', '7', '大于15年', '1', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('136', '8', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('139', '11', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('140', '12', '大于15年', '7', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('141', '13', '大于15年', '10', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('142', '14', '大于15年', '1', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('143', '15', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('144', '16', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('145', '17', '大于15年', '5', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('146', '18', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('147', '19', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('148', '20', '大于15年', '1', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('149', '21', '大于15年', '3', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('150', '22', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('151', '23', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('152', '24', '大于15年', '1', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('153', '25', '大于15年', '3', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('154', '26', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('155', '27', '大于15年', '0', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('158', '30', '大于15年', '8', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('159', '31', '大于15年', '11', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('160', '32', '大于15年', '3', '2', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('161', '1', '8-15年', '8', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('162', '2', '8-15年', '6', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('163', '3', '8-15年', '3', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('164', '4', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('165', '5', '8-15年', '3', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('166', '6', '8-15年', '2', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('167', '7', '8-15年', '2', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('168', '8', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('169', '9', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('170', '10', '8-15年', '2', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('171', '11', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('172', '12', '8-15年', '6', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('173', '13', '8-15年', '2', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('176', '16', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('177', '17', '8-15年', '5', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('178', '18', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('179', '19', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('180', '20', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('181', '21', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('182', '22', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('183', '23', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('184', '24', '8-15年', '0', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('185', '25', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('188', '28', '8-15年', '3', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('189', '29', '8-15年', '1', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('190', '30', '8-15年', '17', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('191', '31', '8-15年', '6', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('192', '32', '8-15年', '12', '2', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('193', '1', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('194', '2', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('195', '3', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('196', '4', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('199', '7', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('200', '8', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('201', '9', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('202', '10', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('203', '11', '3-8年', '1', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('204', '12', '3-8年', '4', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('205', '13', '3-8年', '0', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('206', '14', '3-8年', '10', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('207', '15', '3-8年', '4', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('208', '16', '3-8年', '7', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('209', '17', '3-8年', '3', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('210', '18', '3-8年', '0', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('213', '21', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('214', '22', '3-8年', '3', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('215', '23', '3-8年', '7', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('216', '24', '3-8年', '5', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('217', '25', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('218', '26', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('219', '27', '3-8年', '2', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('222', '30', '3-8年', '31', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('223', '31', '3-8年', '16', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('224', '32', '3-8年', '4', '2', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('225', '1', '3年以下', '4', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('226', '2', '3年以下', '3', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('227', '3', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('228', '4', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('229', '5', '3年以下', '3', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('230', '6', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('231', '7', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('234', '10', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('235', '11', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('236', '12', '3年以下', '12', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('237', '13', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('238', '14', '3年以下', '8', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('239', '15', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('240', '16', '3年以下', '4', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('241', '17', '3年以下', '3', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('242', '18', '3年以下', '3', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('243', '19', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('244', '20', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('247', '23', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('248', '24', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('249', '25', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('250', '26', '3年以下', '1', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('251', '27', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('252', '28', '3年以下', '5', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('253', '29', '3年以下', '2', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('254', '30', '3年以下', '8', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('255', '31', '3年以下', '52', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('256', '32', '3年以下', '0', '2', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('257', '1', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('258', '2', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('261', '5', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('262', '6', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('263', '7', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('264', '8', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('265', '9', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('266', '10', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('267', '11', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('268', '12', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('269', '13', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('270', '14', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('271', '15', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('272', '16', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('273', '17', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('276', '20', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('277', '21', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('278', '22', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('279', '23', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('280', '24', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('281', '25', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('282', '26', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('283', '27', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('284', '28', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('285', '29', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('286', '30', '批准权限', '1', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('287', '31', '批准权限', '0', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('288', '32', '批准权限', '2', '3', '0', '1');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('289', '1', '审核权限', '8', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('290', '2', '审核权限', '6', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('291', '3', '审核权限', '3', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('292', '4', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('293', '5', '审核权限', '3', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('294', '6', '审核权限', '2', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('295', '7', '审核权限', '2', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('296', '8', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('297', '9', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('298', '10', '审核权限', '2', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('299', '11', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('300', '12', '审核权限', '6', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('301', '13', '审核权限', '2', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('302', '14', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('303', '15', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('304', '16', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('305', '17', '审核权限', '5', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('306', '18', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('307', '19', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('308', '20', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('309', '21', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('310', '22', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('311', '23', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('312', '24', '审核权限', '0', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('313', '25', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('314', '26', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('315', '27', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('316', '28', '审核权限', '3', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('317', '29', '审核权限', '1', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('318', '30', '审核权限', '17', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('319', '31', '审核权限', '6', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('320', '32', '审核权限', '12', '3', '0', '2');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('321', '1', '出具报告权限', '12', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('322', '2', '出具报告权限', '10', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('323', '3', '出具报告权限', '6', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('324', '4', '出具报告权限', '2', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('325', '5', '出具报告权限', '8', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('326', '6', '出具报告权限', '7', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('327', '7', '出具报告权限', '3', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('328', '8', '出具报告权限', '2', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('329', '9', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('330', '10', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('331', '11', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('332', '12', '出具报告权限', '28', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('333', '13', '出具报告权限', '12', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('334', '14', '出具报告权限', '12', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('335', '15', '出具报告权限', '5', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('336', '16', '出具报告权限', '0', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('337', '17', '出具报告权限', '6', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('338', '18', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('339', '19', '出具报告权限', '0', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('340', '20', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('341', '21', '出具报告权限', '3', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('342', '22', '出具报告权限', '2', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('343', '23', '出具报告权限', '4', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('344', '24', '出具报告权限', '5', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('345', '25', '出具报告权限', '3', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('346', '26', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('347', '27', '出具报告权限', '2', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('348', '28', '出具报告权限', '3', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('349', '29', '出具报告权限', '1', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('350', '30', '出具报告权限', '52', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('351', '31', '出具报告权限', '10', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('352', '32', '出具报告权限', '13', '3', '0', '3');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('353', '1', '检测权限', '2', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('354', '2', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('355', '3', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('356', '4', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('357', '5', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('358', '6', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('359', '7', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('360', '8', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('361', '9', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('362', '10', '检测权限', '2', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('363', '11', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('364', '12', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('365', '13', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('366', '14', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('367', '15', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('368', '16', '检测权限', '10', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('369', '17', '检测权限', '6', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('370', '18', '检测权限', '2', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('371', '19', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('372', '20', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('373', '21', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('374', '22', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('375', '23', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('376', '24', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('377', '25', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('378', '26', '检测权限', '3', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('379', '27', '检测权限', '0', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('380', '28', '检测权限', '4', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('381', '29', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('382', '30', '检测权限', '1', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('383', '31', '检测权限', '74', '3', '0', '4');
INSERT INTO "LHJX01"."T_B_PERSON_DETAIL" VALUES ('384', '32', '检测权限', '0', '3', '0', '4');

-- ----------------------------
-- Indexes structure for table T_B_PERSON_DETAIL
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_PERSON_DETAIL
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_PERSON_DETAIL" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_PERSON_DETAIL
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_PERSON_DETAIL" ADD PRIMARY KEY ("ID");
