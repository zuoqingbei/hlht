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

Date: 2017-12-11 09:29:55
*/


-- ----------------------------
-- Table structure for T_B_EQUIPMENT_DATA
-- ----------------------------
DROP TABLE "LHJX01"."T_B_EQUIPMENT_DATA";
CREATE TABLE "LHJX01"."T_B_EQUIPMENT_DATA" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"DATA_TYPE" VARCHAR2(255 BYTE) NULL ,
"LAB_NAME" VARCHAR2(255 BYTE) NULL ,
"PRODUCT_CODE" VARCHAR2(255 BYTE) NULL ,
"PRODUCT_NAME" VARCHAR2(255 BYTE) NULL ,
"TYPE" VARCHAR2(255 BYTE) NULL ,
"NUM" VARCHAR2(255 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_EQUIPMENT_DATA" IS '设备状态模拟数据';
COMMENT ON COLUMN "LHJX01"."T_B_EQUIPMENT_DATA"."DATA_TYPE" IS '0 :当前 1：同比';
COMMENT ON COLUMN "LHJX01"."T_B_EQUIPMENT_DATA"."LAB_NAME" IS '实验室名称';
COMMENT ON COLUMN "LHJX01"."T_B_EQUIPMENT_DATA"."PRODUCT_CODE" IS '产线编码';
COMMENT ON COLUMN "LHJX01"."T_B_EQUIPMENT_DATA"."PRODUCT_NAME" IS '产线名称';
COMMENT ON COLUMN "LHJX01"."T_B_EQUIPMENT_DATA"."TYPE" IS '类型  0：实验室在线率 1：设备完好率 2：设备利用率';

-- ----------------------------
-- Records of T_B_EQUIPMENT_DATA
-- ----------------------------
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('138', '2', '研发实验室', '25', '热水器', '2', '0.89580171397');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('139', '2', '研发实验室', '26', '厨电', '2', '0.90952429973');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('140', '2', '研发实验室', '27', '其它', '2', '0.93362159643');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('141', '2', '检测中心', '21', '冰冷', '2', '0.90980060425');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('142', '2', '检测中心', '22', '洗涤', '2', '0.90622496516');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('143', '2', '检测中心', '23', '家空', '2', '0.90654344767');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('144', '2', '检测中心', '24', '商空', '2', '0.94379495841');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('145', '2', '检测中心', '25', '热水器', '2', '0.93567431025');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('146', '2', '检测中心', '26', '厨电', '2', '0.93853492271');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('147', '2', '检测中心', '27', '其它', '2', '0.94049406317');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('148', '2', '工厂实验室', '21', '冰冷', '2', '0.8754772617');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('149', '2', '工厂实验室', '22', '洗涤', '2', '0.89341415134');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('150', '2', '工厂实验室', '23', '家空', '2', '0.87893537801');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('151', '2', '工厂实验室', '24', '商空', '2', '0.91530304865');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('152', '2', '工厂实验室', '25', '热水器', '2', '0.90903594599');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('153', '2', '工厂实验室', '26', '厨电', '2', '0.90506401623');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('154', '2', '工厂实验室', '27', '其它', '2', '0.92417867199');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('155', '1', null, '21', '冰冷', '2', '0.90663314443');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('156', '1', null, '22', '洗涤', '2', '0.9123328402');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('157', '1', null, '23', '家空', '2', '0.9050601932');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('158', '1', null, '24', '商空', '2', '0.93626632438');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('159', '1', null, '25', '热水器', '2', '0.93025114622');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('160', '1', null, '26', '厨电', '2', '0.93694272228');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('161', '1', null, '27', '其它', '2', '0.94771483425');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('162', '2', null, '21', '冰冷', '2', '0.88720342765');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('163', '2', null, '22', '洗涤', '2', '0.89497270505');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('164', '2', null, '23', '家空', '2', '0.88721698726');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('165', '2', null, '24', '商空', '2', '0.92491420426');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('166', '2', null, '25', '热水器', '2', '0.91350399007');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('167', '2', null, '26', '厨电', '2', '0.91770774622');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('168', '2', null, '27', '其它', '2', '0.93276477719');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('1', '1', '研发实验室', '21', '冰冷', '0', '0.96615128976');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('2', '1', '研发实验室', '22', '洗涤', '0', '0.96121081558');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('3', '1', '研发实验室', '23', '家空', '0', '0.96739020535');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('4', '1', '研发实验室', '24', '商空', '0', '0.96687623997');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('5', '1', '研发实验室', '25', '热水器', '0', '0.96763032372');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('6', '1', '研发实验室', '26', '厨电', '0', '0.97707456798');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('7', '1', '研发实验室', '27', '其它', '0', '0.96566784497');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('8', '1', '检测中心', '21', '冰冷', '0', '0.99');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('9', '1', '检测中心', '22', '洗涤', '0', '0.988');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('10', '1', '检测中心', '23', '家空', '0', '0.995');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('11', '1', '检测中心', '24', '商空', '0', '0.992');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('12', '1', '检测中心', '25', '热水器', '0', '0.986');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('13', '1', '检测中心', '26', '厨电', '0', '0.985');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('14', '1', '检测中心', '27', '其它', '0', '0.98');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('15', '1', '工厂实验室', '21', '冰冷', '0', '0.97218151672');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('16', '1', '工厂实验室', '22', '洗涤', '0', '0.95997834');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('17', '1', '工厂实验室', '23', '家空', '0', '0.96937646414');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('18', '1', '工厂实验室', '24', '商空', '0', '0.97284737117');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('19', '1', '工厂实验室', '25', '热水器', '0', '0.96886638446');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('20', '1', '工厂实验室', '26', '厨电', '0', '0.97413277354');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('21', '1', '工厂实验室', '27', '其它', '0', '0.96029385651');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('22', '2', '研发实验室', '21', '冰冷', '0', '0.93025744008');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('23', '2', '研发实验室', '22', '洗涤', '0', '0.92494990264');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('24', '2', '研发实验室', '23', '家空', '0', '0.93655789922');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('25', '2', '研发实验室', '24', '商空', '0', '0.92771083262');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('26', '2', '研发实验室', '25', '热水器', '0', '0.94166818551');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('27', '2', '研发实验室', '26', '厨电', '0', '0.94451161522');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('28', '2', '研发实验室', '27', '其它', '0', '0.94279820085');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('29', '2', '检测中心', '21', '冰冷', '0', '0.96023551994');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('30', '2', '检测中心', '22', '洗涤', '0', '0.95236642309');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('31', '2', '检测中心', '23', '家空', '0', '0.96400255253');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('32', '2', '检测中心', '24', '商空', '0', '0.96444393857');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('33', '2', '检测中心', '25', '热水器', '0', '0.9545340587');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('34', '2', '检测中心', '26', '厨电', '0', '0.94689791638');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('35', '2', '检测中心', '27', '其它', '0', '0.95201415137');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('36', '2', '工厂实验室', '21', '冰冷', '0', '0.948813553');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('37', '2', '工厂实验室', '22', '洗涤', '0', '0.93414710862');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('38', '2', '工厂实验室', '23', '家空', '0', '0.95327164259');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('39', '2', '工厂实验室', '24', '商空', '0', '0.95482422693');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('40', '2', '工厂实验室', '25', '热水器', '0', '0.93952478154');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('41', '2', '工厂实验室', '26', '厨电', '0', '0.95068566519');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('42', '2', '工厂实验室', '27', '其它', '0', '0.94391274164');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('43', '1', null, '21', '冰冷', '0', '0.97611093549');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('44', '1', null, '22', '洗涤', '0', '0.96972971853');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('45', '1', null, '23', '家空', '0', '0.9772555565');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('46', '1', null, '24', '商空', '0', '0.97724120371');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('47', '1', null, '25', '热水器', '0', '0.97416556939');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('48', '1', null, '26', '厨电', '0', '0.97873578051');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('49', '1', null, '27', '其它', '0', '0.96865390049');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('50', '2', null, '21', '冰冷', '0', '0.94643550434');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('51', '2', null, '22', '洗涤', '0', '0.93715447812');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('52', '2', null, '23', '家空', '0', '0.95127736478');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('53', '2', null, '24', '商空', '0', '0.94899299938');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('54', '2', null, '25', '热水器', '0', '0.94524234192');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('55', '2', null, '26', '厨电', '0', '0.9473650656');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('56', '2', null, '27', '其它', '0', '0.94624169796');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('57', '1', '研发实验室', '21', '冰冷', '1', '0.94544673054');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('58', '1', '研发实验室', '22', '洗涤', '1', '0.9650605587');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('59', '1', '研发实验室', '23', '家空', '1', '0.94720613142');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('60', '1', '研发实验室', '24', '商空', '1', '0.94942829276');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('61', '1', '研发实验室', '25', '热水器', '1', '0.93889932747');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('62', '1', '研发实验室', '26', '厨电', '1', '0.94491551428');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('63', '1', '研发实验室', '27', '其它', '1', '0.94453873006');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('64', '1', '检测中心', '21', '冰冷', '1', '0.965');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('65', '1', '检测中心', '22', '洗涤', '1', '0.97');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('66', '1', '检测中心', '23', '家空', '1', '0.966');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('67', '1', '检测中心', '24', '商空', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('68', '1', '检测中心', '25', '热水器', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('69', '1', '检测中心', '26', '厨电', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('70', '1', '检测中心', '27', '其它', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('71', '1', '工厂实验室', '21', '冰冷', '1', '0.93781440681');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('72', '1', '工厂实验室', '22', '洗涤', '1', '0.95447022669');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('73', '1', '工厂实验室', '23', '家空', '1', '0.94281964648');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('74', '1', '工厂实验室', '24', '商空', '1', '0.9473095052');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('75', '1', '工厂实验室', '25', '热水器', '1', '0.94235160237');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('76', '1', '工厂实验室', '26', '厨电', '1', '0.95257913417');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('77', '1', '工厂实验室', '27', '其它', '1', '0.94529648615');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('78', '2', '研发实验室', '21', '冰冷', '1', '0.94873977113');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('79', '2', '研发实验室', '22', '洗涤', '1', '0.95945986738');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('80', '2', '研发实验室', '23', '家空', '1', '0.95160562074');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('81', '2', '研发实验室', '24', '商空', '1', '0.94385499041');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('82', '2', '研发实验室', '25', '热水器', '1', '0.93068628547');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('83', '2', '研发实验室', '26', '厨电', '1', '0.95577212326');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('84', '2', '研发实验室', '27', '其它', '1', '0.95377318737');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('85', '2', '检测中心', '21', '冰冷', '1', '0.955');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('86', '2', '检测中心', '22', '洗涤', '1', '0.96');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('87', '2', '检测中心', '23', '家空', '1', '0.958');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('88', '2', '检测中心', '24', '商空', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('89', '2', '检测中心', '25', '热水器', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('90', '2', '检测中心', '26', '厨电', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('91', '2', '检测中心', '27', '其它', '1', '1');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('92', '2', '工厂实验室', '21', '冰冷', '1', '0.93722556154');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('93', '2', '工厂实验室', '22', '洗涤', '1', '0.95387628585');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('94', '2', '工厂实验室', '23', '家空', '1', '0.94936044836');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('95', '2', '工厂实验室', '24', '商空', '1', '0.94904936394');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('96', '2', '工厂实验室', '25', '热水器', '1', '0.94143241216');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('97', '2', '工厂实验室', '26', '厨电', '1', '0.9540207141');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('98', '2', '工厂实验室', '27', '其它', '1', '0.94192038451');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('99', '1', null, '21', '冰冷', '1', '0.94942037912');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('100', '1', null, '22', '洗涤', '1', '0.96317692846');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('101', '1', null, '23', '家空', '1', '0.95200859264');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('102', '1', null, '24', '商空', '1', '0.96557926599');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('103', '1', null, '25', '热水器', '1', '0.96041697661');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('104', '1', null, '26', '厨电', '1', '0.96583154948');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('105', '1', null, '27', '其它', '1', '0.9632784054');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('106', '2', null, '21', '冰冷', '1', '0.94698844422');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('107', '2', null, '22', '洗涤', '1', '0.95777871774');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('108', '2', null, '23', '家空', '1', '0.9529886897');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('109', '2', null, '24', '商空', '1', '0.96430145145');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('110', '2', null, '25', '热水器', '1', '0.95737289921');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('111', '2', null, '26', '厨电', '1', '0.96993094579');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('112', '2', null, '27', '其它', '1', '0.96523119063');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('113', '1', '研发实验室', '21', '冰冷', '2', '0.90227225452');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('114', '1', '研发实验室', '22', '洗涤', '2', '0.9035926975');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('115', '1', '研发实验室', '23', '家空', '2', '0.9011006387');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('116', '1', '研发实验室', '24', '商空', '2', '0.92727286841');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('117', '1', '研发实验室', '25', '热水器', '2', '0.91893851908');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('118', '1', '研发实验室', '26', '厨电', '2', '0.9376223915');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('119', '1', '研发实验室', '27', '其它', '2', '0.95013011488');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('120', '1', '检测中心', '21', '冰冷', '2', '0.91864796484');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('121', '1', '检测中心', '22', '洗涤', '2', '0.92421243429');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('122', '1', '检测中心', '23', '家空', '2', '0.91737879152');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('123', '1', '检测中心', '24', '商空', '2', '0.94867993398');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('124', '1', '检测中心', '25', '热水器', '2', '0.94466335852');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('125', '1', '检测中心', '26', '厨电', '2', '0.94643999282');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('126', '1', '检测中心', '27', '其它', '2', '0.9521187303');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('127', '1', '工厂实验室', '21', '冰冷', '2', '0.89897921393');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('128', '1', '工厂实验室', '22', '洗涤', '2', '0.90919338882');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('129', '1', '工厂实验室', '23', '家空', '2', '0.89670114939');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('130', '1', '工厂实验室', '24', '商空', '2', '0.93284617076');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('131', '1', '工厂实验室', '25', '热水器', '2', '0.92715156108');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('132', '1', '工厂实验室', '26', '厨电', '2', '0.92676578252');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('133', '1', '工厂实验室', '27', '其它', '2', '0.94089565757');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('134', '2', '研发实验室', '21', '冰冷', '2', '0.87633241701');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('135', '2', '研发实验室', '22', '洗涤', '2', '0.88527899866');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('136', '2', '研发实验室', '23', '家空', '2', '0.87617213609');
INSERT INTO "LHJX01"."T_B_EQUIPMENT_DATA" VALUES ('137', '2', '研发实验室', '24', '商空', '2', '0.91564460571');

-- ----------------------------
-- Indexes structure for table T_B_EQUIPMENT_DATA
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_EQUIPMENT_DATA
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_EQUIPMENT_DATA" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_EQUIPMENT_DATA
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_EQUIPMENT_DATA" ADD PRIMARY KEY ("ID");
