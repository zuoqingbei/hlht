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

Date: 2017-12-11 09:30:08
*/


-- ----------------------------
-- Table structure for T_B_LAB_CODE
-- ----------------------------
DROP TABLE "LHJX01"."T_B_LAB_CODE";
CREATE TABLE "LHJX01"."T_B_LAB_CODE" (
"ID" VARCHAR2(20 BYTE) NOT NULL ,
"DATA_CENTER_ID" VARCHAR2(20 BYTE) NULL ,
"LAB_CODE" VARCHAR2(100 BYTE) NOT NULL ,
"LAB_NAME" VARCHAR2(100 BYTE) NULL ,
"INDUSTRY" VARCHAR2(100 BYTE) NULL ,
"AREA" VARCHAR2(100 BYTE) NULL ,
"IS_CHOUYANG" VARCHAR2(20 BYTE) NULL ,
"VIDEO" VARCHAR2(20 BYTE) NULL ,
"DATA_SOURCE" VARCHAR2(20 BYTE) NULL ,
"SOUCE_VALUE" VARCHAR2(4000 BYTE) NULL ,
"ORDER_NUM" NUMBER NULL ,
"DEL_FLAG" VARCHAR2(2 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON TABLE "LHJX01"."T_B_LAB_CODE" IS '实验室编码表';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."DATA_CENTER_ID" IS '数据中心ID（所属单位 3级）';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."LAB_CODE" IS '实验室编码';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."LAB_NAME" IS '实验室名称';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."INDUSTRY" IS '产线名称';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."AREA" IS '园区名称';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."IS_CHOUYANG" IS '抽样室 0-不是 1-是';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."VIDEO" IS '是否接视频 0-不接 1-接';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."DATA_SOURCE" IS '数据源 db-直连数据库； url-第三方链接；
webservice-连接webservice；json-读取json文件
';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."SOUCE_VALUE" IS '表示data_source的实际值 当为db值是数据库配置名称，当为webservice为wsdl信息；当为json是html用于生成下拉';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."ORDER_NUM" IS '排序';
COMMENT ON COLUMN "LHJX01"."T_B_LAB_CODE"."DEL_FLAG" IS '删除标志位0 正常 1 -删除';

-- ----------------------------
-- Records of T_B_LAB_CODE
-- ----------------------------
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('77', '57', 'USLABKT', 'Air conditioners', '空调', '美国空调', '0', '0', 'json', null, '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('78', '58', 'USLABBX', 'AP-5 Thermal', '冰箱', '美国冰箱', '0', '0', 'json', null, '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('83', '29', 'RUSBXX001', '冰箱性能室', '冰箱', '俄罗斯园区', '0', '0', 'db', 'russia', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('84', '29', 'RUSBXC001', '冰箱抽样室', '冰箱', '俄罗斯园区', '0', '0', 'db', 'russia', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('1', '4', 'JZKTC001', '抽样室(性能)', '空调', '胶州园区', '0', '0', 'db', 'jzkt', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('2', '4', 'JZKTC002', '抽样室(安全)', '空调', '胶州园区', '0', '0', 'db', 'jzkt', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('3', '48', 'JZKTC003', '抽样室(性能)', '空调', '胶州园区', '0', '0', 'db', 'jzkt', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('4', '48', 'JZKTC004', '抽样室(安全)', '空调', '胶州园区', '0', '0', 'db', 'jzkt', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('5', '31', 'TGBXA', '冰箱型式A室', '冰箱', '泰国园区', '0', '0', 'db', 'thailand', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('6', '31', 'TGBXB', '冰箱型式B室', '冰箱', '泰国园区', '0', '0', 'db', 'thailand', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('7', '31', 'TGBXC', '冰箱型式C室', '冰箱', '泰国园区', '0', '0', 'db', 'thailand', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('8', '31', 'TGBXD', '冰箱型式D室', '冰箱', '泰国园区', '0', '0', 'db', 'thailand', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('9', '50', 'TGKTA', '空调焓差室', '空调', '泰国园区', '0', '0', 'db', 'thailand', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('21', '39', 'JNRSQC002', '太阳能热水器抽样室', '热水器', '胶南园区', '0', '0', 'db', 'jnrsq', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('10', '34', 'USLABXYJ', 'Home Laundry', '洗衣机', '美国洗衣机', '0', '0', 'json', null, '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('14', '39', 'JNRSQX001', '热泵热水器性能室', '热水器', '胶南园区', '0', '0', 'db', 'jnrsq', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('15', '39', 'JNRSQK001', '热泵热水器可靠性室', '热水器', '胶南园区', '0', '0', 'db', 'jnrsq', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('16', '39', 'JNRSQC001', '热泵抽样室', '热水器', '胶南园区', '0', '0', 'db', 'jnrsq', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('17', '51', 'ZXYSHJ001', '步入式高温试验箱', '整机', '检测中心', '0', '0', 'db', 'zhbrzj', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('18', '51', 'ZXYSHJ002', '步入式低温试验箱', '整机', '检测中心', '0', '0', 'db', 'zhbrzj', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('19', '51', 'ZXAGFH001', '防火A室', '整机', '检测中心', '0', '0', 'db', 'zhbrzj', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('20', '51', 'ZXAGFH002', '防火B室', '整机', '检测中心', '0', '0', 'db', 'zhbrzj', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('22', '46', 'ZXCLHJ001', '冷热冲击箱', '检测中心', '青岛园区', '0', '0', 'db', 'zhbrzj', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('23', '46', 'ZXCLHJ002', '恒温恒湿箱', '检测中心', '青岛园区', '0', '0', 'db', 'zhbrzj', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('24', '51', 'zhbrwebservice', '检测中心', '整机', '检测中心', '0', '0', 'webservice', null, '5', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('25', '51', 'znjdtyg', '智能家电体验馆', '整机', '检测中心', '0', '0', 'url', 'http://10.130.96.178:8080/xtest/toshow.jsp?token=QAZXC-PLMNB', '0', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('13', '33', 'HR20170424QDZBX001', 'Refrigeration TL(日本)', null, '日本', '0', '0', 'json', null, '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('12', '32', 'HR20160830QDZBX005', 'Refrigeration TL（新西兰）', null, '新西兰', '0', '0', 'json', null, '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('26', '44', 'CQBXX001', '型式1室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('27', '44', 'CQBXX002', '型式2室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('28', '44', 'CQBXX003', '型式3室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('29', '44', 'CQBXX004', '型式4室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('30', '44', 'CQBXX005', '型式5室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '5', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('31', '44', 'CQBXC001', '抽样1室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '6', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('32', '44', 'CQBXC002', '抽样2室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '7', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('33', '44', 'CQBXC003', '抽样3室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '8', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('34', '44', 'CQBXC004', '抽样4室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '9', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('35', '44', 'CQBXC005', '抽样5室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '10', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('36', '44', 'CQBXK001', '可靠性室', '冰箱', '重庆园区', '0', '0', 'db', 'chongqinghive', '11', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('37', '45', 'GZBXX001', '型式性能1室', '冰箱', '贵州园区', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('38', '45', 'GZBXX002', '型式性能2室', '冰箱', '贵州园区', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('39', '45', 'GZBXA001', '型式安全室', '冰箱', '贵州园区', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('40', '52', 'WHLGX001', '型式1室', '冷柜', '武汉冷柜', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('41', '52', 'WHLGX002', '型式2室', '冷柜', '武汉冷柜', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('42', '52', 'WHLGK001', '可靠性1室', '冷柜', '武汉冷柜', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('43', '52', 'WHLGK002', '可靠性2室', '冷柜', '武汉冷柜', '0', '0', 'db', 'chongqinghive', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('44', '54', 'DLBXX001', '型式1室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('45', '54', 'DLBXX002', '型式2室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('46', '54', 'DLBXX003', '型式3室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('47', '54', 'DLBXX004', '型式4室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('48', '54', 'DLBXK001', '可靠性1室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '5', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('49', '54', 'DLBXK002', '可靠性2室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '6', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('50', '54', 'DLBXC001', '抽样1室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '7', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('51', '54', 'DLBXC002', '抽样2室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '8', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('52', '54', 'DLBXC003', '抽样3室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '9', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('53', '54', 'DLBXC004', '抽样4室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '10', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('54', '54', 'DLBXC005', '抽样5室', '冰箱', '大连冰箱', '0', '0', 'db', 'chongqinghive', '11', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('55', '55', 'SYBXC001', '抽样1室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('56', '55', 'SYBXC002', '抽样2室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('57', '55', 'SYBXX001', '型式1室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('58', '55', 'SYBXX002', '型式2室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('59', '55', 'SYBXX003', '型式3室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '5', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('60', '55', 'SYBXX004', '型式4室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '6', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('61', '55', 'SYBXK001', '可靠性1室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '7', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('62', '55', 'SYBXK002', '可靠性2室', '冰箱', '沈阳冰箱', '0', '0', 'db', 'chongqinghive', '8', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('63', '56', 'SDBXX001', '型式1室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('64', '56', 'SDBXX002', '型式2室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('65', '56', 'SDBXX003', '型式3室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('66', '56', 'SDBXX004', '型式4室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '4', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('67', '56', 'SDBXX005', '型式5室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '5', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('68', '56', 'SDBXX006', '型式6室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '6', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('69', '56', 'SDBXK001', '可靠性1室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '7', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('70', '56', 'SDBXK002', '可靠性2室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '8', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('71', '56', 'SDBXK003', '可靠性3室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '9', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('72', '56', 'SDBXC001', '抽样1室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '10', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('73', '56', 'SDBXC002', '抽样2室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '11', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('74', '56', 'SDBXC003', '抽样3室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '12', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('75', '56', 'SDBXC004', '抽样4室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '13', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('76', '56', 'SDBXC005', '抽样5室', '冷柜', '佛山冷柜', '0', '0', 'db', 'chongqinghive', '14', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('79', '35', 'JNHERXYJ1', '性能', '洗涤', '胶南园区', '0', '0', 'db', 'jnxd', '1', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('80', '35', 'JNHERXYJ1', '安全', '洗涤', '胶南园区', '0', '0', 'db', 'jnxd', '2', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('81', '35', 'JNHERXYJ2', '高低温', '洗涤', '胶南园区', '0', '0', 'db', 'jnxd', '3', '0');
INSERT INTO "LHJX01"."T_B_LAB_CODE" VALUES ('82', '35', 'JNHERXYJ1', '燃气实验室', '洗涤', '胶南园区', '0', '0', 'db', 'jnxd', '4', '0');

-- ----------------------------
-- Indexes structure for table T_B_LAB_CODE
-- ----------------------------

-- ----------------------------
-- Checks structure for table T_B_LAB_CODE
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD CHECK ("ID" IS NOT NULL);
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD CHECK ("LAB_CODE" IS NOT NULL);
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD CHECK ("LAB_CODE" IS NOT NULL);
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table T_B_LAB_CODE
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD PRIMARY KEY ("ID");

-- ----------------------------
-- Foreign Key structure for table "LHJX01"."T_B_LAB_CODE"
-- ----------------------------
ALTER TABLE "LHJX01"."T_B_LAB_CODE" ADD FOREIGN KEY ("DATA_CENTER_ID") REFERENCES "LHJX01"."T_B_DATA_CENTER" ("ID") DISABLE;
