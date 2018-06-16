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

Date: 2017-12-11 09:41:59
*/


-- ----------------------------
-- Table structure for PHM_FAULT
-- ----------------------------
DROP TABLE "LHJX01"."PHM_FAULT";
CREATE TABLE "LHJX01"."PHM_FAULT" (
"ID" VARCHAR2(40 BYTE) NOT NULL ,
"SNCODE" VARCHAR2(255 BYTE) NULL ,
"FAULT_APPEARANCE" VARCHAR2(255 BYTE) NULL ,
"FAULT_SEAT_NUMBER" VARCHAR2(255 BYTE) NULL ,
"FAULT_REPAIR" VARCHAR2(255 BYTE) NULL ,
"FAULT_NAME" VARCHAR2(255 BYTE) NULL ,
"FAULT_TIME" DATE NULL ,
"FAULT_REPAIR_ID" VARCHAR2(255 BYTE) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."ID" IS 'ID';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."SNCODE" IS '设备编码';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_APPEARANCE" IS '故障现象';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_SEAT_NUMBER" IS '位号';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_REPAIR" IS '维修措施';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_NAME" IS '故障名称';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_TIME" IS ' 故障发生时间';
COMMENT ON COLUMN "LHJX01"."PHM_FAULT"."FAULT_REPAIR_ID" IS '维修措施ID';

-- ----------------------------
-- Records of PHM_FAULT
-- ----------------------------
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('b49b316025ca45d48cbfa28d11ca107f', '20171026BX005', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('e0c899d1049d46ddb8eb8cb9cb085a08', '20171026BX004', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('ec894629847d437096cb2e25aab306ea', '20171026BX004', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('f100069e46894f6086f56632d46cb200', '20171026BX004', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('f95da89b536b477c847fbbf56c01b6fd', '20171026BX004', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('4f35d115c8ef4bc99c40ec802b4b4d74', '20171026BX004', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('08e4b1d22c1a4b3c8d13de4054a20b09', '20171026BX004', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('eca6cce5dc294456abf34ac72f59ed37', '20171026BX005', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('42501e24a8614c248ea7908379e1d586', '20171026BX005', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('c63bb03e8f5f4e549c73c7fb6ac756b0', '20171026BX005', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('986a236b642a4cf4bb53bbb51af84611', '20171026BX005', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('0c9e4fb693f1450588ae415ba1d897dc', '20171026BX005', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('feeb8715cf394019a2a02fbe0f21aa72', '20171026BX006', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('daa71c8309614498880b917ad4813520', '20171026BX006', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('0836269f697841038420f2a406e61d5a', '20171026BX006', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('068d87530b1f41d0b39c24e66023f0f5', '20171026BX006', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('7c0cfd0303f64eaea1126fb80642fdaa', '20171026BX006', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('ce89eab9a3024b988ab8efa0a9f06993', '20171026BX006', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('409b3e64e4594a75b48a2e8cdd457244', '20171026BX007', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('ca658a8a8ade4e25b31ea0b66a4984f8', '20171026BX007', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('b604e8b1fe79433ab97d07236145af3a', '20171026BX007', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('cbb3f86745f542d1ad31b4f43c9801f0', '20171026BX007', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('0efde90ede6042b390fa2e8307995237', '20171026BX007', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('554fe62fedcb45729bc028e57a338212', '20171026BX007', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('915635d48ff6473b994309bc75736040', '20171026BX001', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('02430a5d8b51444198f127854cfba942', '20171026BX001', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('02afa073e4fa4a88b4e0569f7bd7547b', '20171026BX001', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('1d28a9d88304454b862d08b88080d964', '20171026BX001', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('a9564dd329374780b6f7be2d91f4b79d', '20171026BX001', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('d40cf87f5d84476bad436fc0011c0dce', '20171026BX001', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('66c4a31857ae4b14b589c83b0b2bdf12', '20171026BX008', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('dcad74fdbfe240688077cfa2de9fe04f', '20171026BX008', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('e87fbe8af40f4c8b823130a64a25356d', '20171026BX008', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('770ec80d22294248b629f84ce769c891', '20171026BX008', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('7c18c865d4af4feea3c0c45fe0394efa', '20171026BX008', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('d05d4592d861405a9e694201b7f54450', '20171026BX008', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('edde90ee593e4aea9998869f1b349c56', '20171026BX009', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('9bd82c519d4842868c600d927fa8817c', '20171026BX009', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('06fbbed845e34d29946f41534a1a5ed5', '20171026BX009', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('ac74e7e719274ae18cc41d3b8946403b', '20171026BX009', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('1273899d2dde4abfa95f66203f612544', '20171026BX009', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('9b6cd76bc47141d68a247cb5740d9e68', '20171026BX009', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('bcb687d993a44d4d99685899c07a9e27', '20171026BX010', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('495e222f3b4c44e596476ef08a1bd17e', '20171026BX010', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('e3a6e68db79a43aaa4b8222291c687b7', '20171026BX010', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('88ef8a7003754592ba20ca4399742a22', '20171026BX010', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('77801cf5cab84b7b8137d90efa9ce102', '20171026BX010', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('a6d323f8d8614f1eaf0bcf95ef08e285', '20171026BX010', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('d20c04fc5deb41469a9dc6de1a9026e7', '20171026BX002', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('f7394c1756904b8d98f790dc203ff9eb', '20171026BX002', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('0d75c5722c50400580e7089006103421', '20171026BX002', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('02e20176acff4809b8aa0f84059c5f2c', '20171026BX002', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('0b948de789d54e5aa2acd1abd9c525d9', '20171026BX002', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('a057463a43534fdf8e9bce00612fe13a', '20171026BX002', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('cb1ddace07bb44cba3e707fa3679b89d', '20171026BX003', '冷藏风机输出功能失效', 'C2', '冷藏风机维修指导,电磁阀维修指导', '主控板', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('e41bffdf84274f11ab465a4c6a2782dd', '20171026BX003', '冷藏风机输出功能失效', 'L01', '冷藏风机维修指导,电磁阀维修指导', '冷藏风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('9485b5617eed4a4eab94f55caf6c2e6b', '20171026BX003', '冷藏风机输出功能失效', 'L1', '冷藏风机维修指导,电磁阀维修指导', '电磁阀', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('894adf7a36264193b1f3d19f9c4cd900', '20171026BX003', '冷藏风机输出功能失效', 'BZ', '冷藏风机维修指导,电磁阀维修指导', '冷冻风机', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('65ccf69e6ad244b3a3abfaf86f7ec5d0', '20171026BX003', '冷藏风机输出功能失效', 'N2', '冷藏风机维修指导,电磁阀维修指导', '冷藏化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');
INSERT INTO "LHJX01"."PHM_FAULT" VALUES ('87adf81ebf7c422ca485a0af6fcb7dcf', '20171026BX003', '冷藏风机输出功能失效', 'SNB', '冷藏风机维修指导,电磁阀维修指导', '冷冻化霜加热丝', TO_DATE('2017-08-02 17:20:13', 'YYYY-MM-DD HH24:MI:SS'), '5a23a2d0de4a0c5bc7777,5a23a2d0de4a0c5bc7778');

-- ----------------------------
-- Indexes structure for table PHM_FAULT
-- ----------------------------

-- ----------------------------
-- Checks structure for table PHM_FAULT
-- ----------------------------
ALTER TABLE "LHJX01"."PHM_FAULT" ADD CHECK ("ID" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table PHM_FAULT
-- ----------------------------
ALTER TABLE "LHJX01"."PHM_FAULT" ADD PRIMARY KEY ("ID");
