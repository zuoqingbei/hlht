
package com.ulab.client.IntegrationService;

/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 2.4.3
 * 2017-05-02T15:46:28.122+08:00
 * Generated source version: 2.4.3
 * 
 */
public final class ServicePortType_ServiceHttpPort_Client {

    private static final QName SERVICE_NAME = new QName("http://DefaultNamespace", "service");

    private ServicePortType_ServiceHttpPort_Client() {
    }

    public static void main(String args[]) throws java.lang.Exception {
        URL wsdlURL = Service.WSDL_LOCATION;
        if (args.length > 0 && args[0] != null && !"".equals(args[0])) { 
            File wsdlFile = new File(args[0]);
            try {
                if (wsdlFile.exists()) {
                    wsdlURL = wsdlFile.toURI().toURL();
                } else {
                    wsdlURL = new URL(args[0]);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
      
        Service ss = new Service(wsdlURL, SERVICE_NAME);
        ServicePortType port = ss.getServiceHttpPort();  
        
        {
        System.out.println("Invoking getStdTermByStdId...");
        int _getStdTermByStdId_in0 = 0;
        com.ulab.client.IntegrationService.ArrayOfTbStdTerm _getStdTermByStdId__return = port.getStdTermByStdId(_getStdTermByStdId_in0);
        System.out.println("getStdTermByStdId.result=" + _getStdTermByStdId__return);


        }
        {
        System.out.println("Invoking getModuleCompanyInfo...");
        com.ulab.client.IntegrationService.ArrayOfModuleCompanyInfo _getModuleCompanyInfo__return = port.getModuleCompanyInfo();
        System.out.println("getModuleCompanyInfo.result=" + _getModuleCompanyInfo__return);


        }
        {
        System.out.println("Invoking getConnInfoByModuleCompanyId...");
        int _getConnInfoByModuleCompanyId_in0 = 0;
        int _getConnInfoByModuleCompanyId_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfConnInfo _getConnInfoByModuleCompanyId__return = port.getConnInfoByModuleCompanyId(_getConnInfoByModuleCompanyId_in0, _getConnInfoByModuleCompanyId_in1);
        System.out.println("getConnInfoByModuleCompanyId.result=" + _getConnInfoByModuleCompanyId__return);


        }
        {
        System.out.println("Invoking checkUser...");
        java.lang.String _checkUser_in0 = "";
        java.lang.String _checkUser_in1 = "";
        int _checkUser__return = port.checkUser(_checkUser_in0, _checkUser_in1);
        System.out.println("checkUser.result=" + _checkUser__return);


        }
        {
        System.out.println("Invoking getRoleInfo...");
        com.ulab.client.IntegrationService.ArrayOfRoleInfo _getRoleInfo__return = port.getRoleInfo();
        System.out.println("getRoleInfo.result=" + _getRoleInfo__return);


        }
        {
        System.out.println("Invoking isUserExisted...");
        java.lang.String _isUserExisted_in0 = "";
        int _isUserExisted__return = port.isUserExisted(_isUserExisted_in0);
        System.out.println("isUserExisted.result=" + _isUserExisted__return);


        }
        {
        System.out.println("Invoking deleteWebServiceInf...");
        int _deleteWebServiceInf_in0 = 0;
        boolean _deleteWebServiceInf__return = port.deleteWebServiceInf(_deleteWebServiceInf_in0);
        System.out.println("deleteWebServiceInf.result=" + _deleteWebServiceInf__return);


        }
        {
        System.out.println("Invoking getTestUnitByCode...");
        java.lang.String _getTestUnitByCode_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfTestUnitConfig _getTestUnitByCode__return = port.getTestUnitByCode(_getTestUnitByCode_in0);
        System.out.println("getTestUnitByCode.result=" + _getTestUnitByCode__return);


        }
        {
        System.out.println("Invoking getUserLab...");
        java.lang.String _getUserLab_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfUserLab _getUserLab__return = port.getUserLab(_getUserLab_in0);
        System.out.println("getUserLab.result=" + _getUserLab__return);


        }
        {
        System.out.println("Invoking getUserInfo...");
        java.lang.String _getUserInfo_in0 = "";
        java.lang.String _getUserInfo_in1 = "";
        com.ulab.client.IntegrationService.UserInfo _getUserInfo__return = port.getUserInfo(_getUserInfo_in0, _getUserInfo_in1);
        System.out.println("getUserInfo.result=" + _getUserInfo__return);


        }
        {
        System.out.println("Invoking updateWebServiceInf...");
        java.lang.String _updateWebServiceInf_in0 = "";
        java.lang.String _updateWebServiceInf_in1 = "";
        java.lang.String _updateWebServiceInf_in2 = "";
        java.lang.String _updateWebServiceInf_in3 = "";
        int _updateWebServiceInf_in4 = 0;
        boolean _updateWebServiceInf__return = port.updateWebServiceInf(_updateWebServiceInf_in0, _updateWebServiceInf_in1, _updateWebServiceInf_in2, _updateWebServiceInf_in3, _updateWebServiceInf_in4);
        System.out.println("updateWebServiceInf.result=" + _updateWebServiceInf__return);


        }
        {
        System.out.println("Invoking getResearchDevelopmentCenterInfo...");
        com.ulab.client.IntegrationService.ArrayOfResearchDevelopmentCenterInfo _getResearchDevelopmentCenterInfo__return = port.getResearchDevelopmentCenterInfo();
        System.out.println("getResearchDevelopmentCenterInfo.result=" + _getResearchDevelopmentCenterInfo__return);


        }
        {
        System.out.println("Invoking getConnInfoAllByUserName...");
        java.lang.String _getConnInfoAllByUserName_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfConnInfo _getConnInfoAllByUserName__return = port.getConnInfoAllByUserName(_getConnInfoAllByUserName_in0);
        System.out.println("getConnInfoAllByUserName.result=" + _getConnInfoAllByUserName__return);


        }
        {
        System.out.println("Invoking writeLog...");
        int _writeLog_in0 = 0;
        java.lang.String _writeLog_in1 = "";
        java.lang.String _writeLog_in2 = "";
        port.writeLog(_writeLog_in0, _writeLog_in1, _writeLog_in2);


        }
        {
        System.out.println("Invoking getSubWindowInfo...");
        int _getSubWindowInfo_in0 = 0;
        int _getSubWindowInfo_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfSubWindowInfo _getSubWindowInfo__return = port.getSubWindowInfo(_getSubWindowInfo_in0, _getSubWindowInfo_in1);
        System.out.println("getSubWindowInfo.result=" + _getSubWindowInfo__return);


        }
        {
        System.out.println("Invoking addUser...");
        java.lang.String _addUser_in0 = "";
        java.lang.String _addUser_in1 = "";
        java.lang.String _addUser_in2 = "";
        java.lang.String _addUser_in3 = "";
        java.lang.String _addUser_in4 = "";
        int _addUser_in5 = 0;
        java.lang.String _addUser_in6 = "";
        int _addUser_in7 = 0;
        java.lang.String _addUser_in8 = "";
        java.lang.String _addUser_in9 = "";
        java.lang.String _addUser_in10 = "";
        int _addUser__return = port.addUser(_addUser_in0, _addUser_in1, _addUser_in2, _addUser_in3, _addUser_in4, _addUser_in5, _addUser_in6, _addUser_in7, _addUser_in8, _addUser_in9, _addUser_in10);
        System.out.println("addUser.result=" + _addUser__return);


        }
        {
        System.out.println("Invoking deleteUser...");
        java.lang.String _deleteUser_in0 = "";
        boolean _deleteUser__return = port.deleteUser(_deleteUser_in0);
        System.out.println("deleteUser.result=" + _deleteUser__return);


        }
        {
        System.out.println("Invoking getConnInfoAll...");
        com.ulab.client.IntegrationService.ArrayOfConnInfo _getConnInfoAll__return = port.getConnInfoAll();
        System.out.println("getConnInfoAll.result=" + _getConnInfoAll__return);


        }
        {
        System.out.println("Invoking addAuthority...");
        java.lang.String _addAuthority_in0 = "";
        int _addAuthority_in1 = 0;
        int _addAuthority_in2 = 0;
        int _addAuthority__return = port.addAuthority(_addAuthority_in0, _addAuthority_in1, _addAuthority_in2);
        System.out.println("addAuthority.result=" + _addAuthority__return);


        }
        {
        System.out.println("Invoking getIndustrialParkInfo...");
        com.ulab.client.IntegrationService.ArrayOfIndustrialParkInfo _getIndustrialParkInfo__return = port.getIndustrialParkInfo();
        System.out.println("getIndustrialParkInfo.result=" + _getIndustrialParkInfo__return);


        }
        {
        System.out.println("Invoking getItemContentNum...");
        java.lang.String _getItemContentNum_in0 = "";
        java.lang.String _getItemContentNum_in1 = "";
        java.lang.String _getItemContentNum_in2 = "";
        com.ulab.client.IntegrationService.ArrayOfTestProdInfoValue _getItemContentNum__return = port.getItemContentNum(_getItemContentNum_in0, _getItemContentNum_in1, _getItemContentNum_in2);
        System.out.println("getItemContentNum.result=" + _getItemContentNum__return);


        }
        {
        System.out.println("Invoking getConnInfoByRDCId...");
        int _getConnInfoByRDCId_in0 = 0;
        int _getConnInfoByRDCId_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfConnInfo _getConnInfoByRDCId__return = port.getConnInfoByRDCId(_getConnInfoByRDCId_in0, _getConnInfoByRDCId_in1);
        System.out.println("getConnInfoByRDCId.result=" + _getConnInfoByRDCId__return);


        }
        {
        System.out.println("Invoking getWindowInfo...");
        int _getWindowInfo_in0 = 0;
        int _getWindowInfo_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfWindowInfo _getWindowInfo__return = port.getWindowInfo(_getWindowInfo_in0, _getWindowInfo_in1);
        System.out.println("getWindowInfo.result=" + _getWindowInfo__return);


        }
        {
        System.out.println("Invoking updateDepartment...");
        int _updateDepartment_in0 = 0;
        java.lang.String _updateDepartment_in1 = "";
        java.lang.String _updateDepartment_in2 = "";
        boolean _updateDepartment__return = port.updateDepartment(_updateDepartment_in0, _updateDepartment_in1, _updateDepartment_in2);
        System.out.println("updateDepartment.result=" + _updateDepartment__return);


        }
        {
        System.out.println("Invoking insertWebServiceInf...");
        java.lang.String _insertWebServiceInf_in0 = "";
        java.lang.String _insertWebServiceInf_in1 = "";
        java.lang.String _insertWebServiceInf_in2 = "";
        java.lang.String _insertWebServiceInf_in3 = "";
        int _insertWebServiceInf_in4 = 0;
        int _insertWebServiceInf__return = port.insertWebServiceInf(_insertWebServiceInf_in0, _insertWebServiceInf_in1, _insertWebServiceInf_in2, _insertWebServiceInf_in3, _insertWebServiceInf_in4);
        System.out.println("insertWebServiceInf.result=" + _insertWebServiceInf__return);


        }
        {
        System.out.println("Invoking getKeyItem...");
        java.lang.String _getKeyItem_in0 = "";
        java.lang.String _getKeyItem_in1 = "";
        com.ulab.client.IntegrationService.ConnInfoItemVo _getKeyItem__return = port.getKeyItem(_getKeyItem_in0, _getKeyItem_in1);
        System.out.println("getKeyItem.result=" + _getKeyItem__return);


        }
        {
        System.out.println("Invoking insertUserLab...");
        java.lang.String _insertUserLab_in0 = "";
        java.lang.String _insertUserLab_in1 = "";
        java.lang.String _insertUserLab_in2 = "";
        boolean _insertUserLab__return = port.insertUserLab(_insertUserLab_in0, _insertUserLab_in1, _insertUserLab_in2);
        System.out.println("insertUserLab.result=" + _insertUserLab__return);


        }
        {
        System.out.println("Invoking insertDepartment...");
        java.lang.String _insertDepartment_in0 = "";
        java.lang.String _insertDepartment_in1 = "";
        java.lang.String _insertDepartment_in2 = "";
        int _insertDepartment__return = port.insertDepartment(_insertDepartment_in0, _insertDepartment_in1, _insertDepartment_in2);
        System.out.println("insertDepartment.result=" + _insertDepartment__return);


        }
        {
        System.out.println("Invoking getCoordinationInfo...");
        int _getCoordinationInfo_in0 = 0;
        int _getCoordinationInfo_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfCoordinationInfo _getCoordinationInfo__return = port.getCoordinationInfo(_getCoordinationInfo_in0, _getCoordinationInfo_in1);
        System.out.println("getCoordinationInfo.result=" + _getCoordinationInfo__return);


        }
        {
        System.out.println("Invoking updateUserPWD...");
        java.lang.String _updateUserPWD_in0 = "";
        java.lang.String _updateUserPWD_in1 = "";
        int _updateUserPWD__return = port.updateUserPWD(_updateUserPWD_in0, _updateUserPWD_in1);
        System.out.println("updateUserPWD.result=" + _updateUserPWD__return);


        }
        {
        System.out.println("Invoking getStdByPDName...");
        java.lang.String _getStdByPDName_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfTbStd _getStdByPDName__return = port.getStdByPDName(_getStdByPDName_in0);
        System.out.println("getStdByPDName.result=" + _getStdByPDName__return);


        }
        {
        System.out.println("Invoking deleteAuthority...");
        java.lang.String _deleteAuthority_in0 = "";
        boolean _deleteAuthority__return = port.deleteAuthority(_deleteAuthority_in0);
        System.out.println("deleteAuthority.result=" + _deleteAuthority__return);


        }
        {
        System.out.println("Invoking getTestProdInfoNewest...");
        java.lang.String _getTestProdInfoNewest_in0 = "";
        int _getTestProdInfoNewest_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfTestProdInfoValue _getTestProdInfoNewest__return = port.getTestProdInfoNewest(_getTestProdInfoNewest_in0, _getTestProdInfoNewest_in1);
        System.out.println("getTestProdInfoNewest.result=" + _getTestProdInfoNewest__return);


        }
        {
        System.out.println("Invoking getUsersByDepartId...");
        int _getUsersByDepartId_in0 = 0;
        com.ulab.client.IntegrationService.ArrayOfUserInfo _getUsersByDepartId__return = port.getUsersByDepartId(_getUsersByDepartId_in0);
        System.out.println("getUsersByDepartId.result=" + _getUsersByDepartId__return);


        }
        {
        System.out.println("Invoking getVideoInformationInfo...");
        int _getVideoInformationInfo_in0 = 0;
        com.ulab.client.IntegrationService.ArrayOfVideoInformationInfo _getVideoInformationInfo__return = port.getVideoInformationInfo(_getVideoInformationInfo_in0);
        System.out.println("getVideoInformationInfo.result=" + _getVideoInformationInfo__return);


        }
        {
        System.out.println("Invoking getWebServiceInfoByusername...");
        java.lang.String _getWebServiceInfoByusername_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfWebServiceInfo _getWebServiceInfoByusername__return = port.getWebServiceInfoByusername(_getWebServiceInfoByusername_in0);
        System.out.println("getWebServiceInfoByusername.result=" + _getWebServiceInfoByusername__return);


        }
        {
        System.out.println("Invoking getCoordinationInfomation...");
        int _getCoordinationInfomation_in0 = 0;
        int _getCoordinationInfomation_in1 = 0;
        int _getCoordinationInfomation_in2 = 0;
        com.ulab.client.IntegrationService.ArrayOfCoordinationInfo _getCoordinationInfomation__return = port.getCoordinationInfomation(_getCoordinationInfomation_in0, _getCoordinationInfomation_in1, _getCoordinationInfomation_in2);
        System.out.println("getCoordinationInfomation.result=" + _getCoordinationInfomation__return);


        }
        {
        System.out.println("Invoking getWebServiceInfo...");
        int _getWebServiceInfo_in0 = 0;
        com.ulab.client.IntegrationService.ArrayOfWebServiceInfo _getWebServiceInfo__return = port.getWebServiceInfo(_getWebServiceInfo_in0);
        System.out.println("getWebServiceInfo.result=" + _getWebServiceInfo__return);


        }
        {
        System.out.println("Invoking deleteDepartment...");
        int _deleteDepartment_in0 = 0;
        java.lang.Boolean _deleteDepartment_in1 = null;
        boolean _deleteDepartment__return = port.deleteDepartment(_deleteDepartment_in0, _deleteDepartment_in1);
        System.out.println("deleteDepartment.result=" + _deleteDepartment__return);


        }
        {
        System.out.println("Invoking getConnInfoByIndustrialParkId...");
        int _getConnInfoByIndustrialParkId_in0 = 0;
        int _getConnInfoByIndustrialParkId_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfConnInfo _getConnInfoByIndustrialParkId__return = port.getConnInfoByIndustrialParkId(_getConnInfoByIndustrialParkId_in0, _getConnInfoByIndustrialParkId_in1);
        System.out.println("getConnInfoByIndustrialParkId.result=" + _getConnInfoByIndustrialParkId__return);


        }
        {
        System.out.println("Invoking countByItem...");
        java.lang.String _countByItem_in0 = "";
        java.lang.String _countByItem_in1 = "";
        java.lang.String _countByItem_in2 = "";
        int _countByItem__return = port.countByItem(_countByItem_in0, _countByItem_in1, _countByItem_in2);
        System.out.println("countByItem.result=" + _countByItem__return);


        }
        {
        System.out.println("Invoking getWebServiceBySampleNo...");
        java.lang.String _getWebServiceBySampleNo_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfWebServiceInfo _getWebServiceBySampleNo__return = port.getWebServiceBySampleNo(_getWebServiceBySampleNo_in0);
        System.out.println("getWebServiceBySampleNo.result=" + _getWebServiceBySampleNo__return);


        }
        {
        System.out.println("Invoking getVideoInformationAll...");
        com.ulab.client.IntegrationService.ArrayOfVideoInformationInfo _getVideoInformationAll__return = port.getVideoInformationAll();
        System.out.println("getVideoInformationAll.result=" + _getVideoInformationAll__return);


        }
        {
        System.out.println("Invoking getSubWindowInformation...");
        int _getSubWindowInformation_in0 = 0;
        int _getSubWindowInformation_in1 = 0;
        int _getSubWindowInformation_in2 = 0;
        com.ulab.client.IntegrationService.ArrayOfSubWindowInfo _getSubWindowInformation__return = port.getSubWindowInformation(_getSubWindowInformation_in0, _getSubWindowInformation_in1, _getSubWindowInformation_in2);
        System.out.println("getSubWindowInformation.result=" + _getSubWindowInformation__return);


        }
        {
        System.out.println("Invoking updateUser...");
        java.lang.String _updateUser_in0 = "";
        java.lang.String _updateUser_in1 = "";
        java.lang.String _updateUser_in2 = "";
        java.lang.String _updateUser_in3 = "";
        java.lang.String _updateUser_in4 = "";
        int _updateUser_in5 = 0;
        java.lang.String _updateUser_in6 = "";
        int _updateUser_in7 = 0;
        java.lang.String _updateUser_in8 = "";
        java.lang.String _updateUser_in9 = "";
        java.lang.String _updateUser_in10 = "";
        int _updateUser__return = port.updateUser(_updateUser_in0, _updateUser_in1, _updateUser_in2, _updateUser_in3, _updateUser_in4, _updateUser_in5, _updateUser_in6, _updateUser_in7, _updateUser_in8, _updateUser_in9, _updateUser_in10);
        System.out.println("updateUser.result=" + _updateUser__return);


        }
        {
        System.out.println("Invoking getDepartmentUserCount...");
        int _getDepartmentUserCount_in0 = 0;
        int _getDepartmentUserCount__return = port.getDepartmentUserCount(_getDepartmentUserCount_in0);
        System.out.println("getDepartmentUserCount.result=" + _getDepartmentUserCount__return);


        }
        {
        System.out.println("Invoking getSensorInfo...");
        int _getSensorInfo_in0 = 0;
        int _getSensorInfo_in1 = 0;
        com.ulab.client.IntegrationService.ArrayOfSensorInfo _getSensorInfo__return = port.getSensorInfo(_getSensorInfo_in0, _getSensorInfo_in1);
        System.out.println("getSensorInfo.result=" + _getSensorInfo__return);


        }
        {
        System.out.println("Invoking unitStatus...");
        java.lang.String _unitStatus_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfTestUnitConfig _unitStatus__return = port.unitStatus(_unitStatus_in0);
        System.out.println("unitStatus.result=" + _unitStatus__return);


        }
        {
        System.out.println("Invoking getSensorInfo1...");
        int _getSensorInfo1_in0 = 0;
        int _getSensorInfo1_in1 = 0;
        int _getSensorInfo1_in2 = 0;
        com.ulab.client.IntegrationService.ArrayOfSensorInfo _getSensorInfo1__return = port.getSensorInfo1(_getSensorInfo1_in0, _getSensorInfo1_in1, _getSensorInfo1_in2);
        System.out.println("getSensorInfo1.result=" + _getSensorInfo1__return);


        }
        {
        System.out.println("Invoking getUserDepartment...");
        java.lang.String _getUserDepartment_in0 = "";
        com.ulab.client.IntegrationService.ArrayOfDepartment _getUserDepartment__return = port.getUserDepartment(_getUserDepartment_in0);
        System.out.println("getUserDepartment.result=" + _getUserDepartment__return);


        }
        {
        System.out.println("Invoking getProductInfo...");
        com.ulab.client.IntegrationService.ArrayOfProduct _getProductInfo__return = port.getProductInfo();
        System.out.println("getProductInfo.result=" + _getProductInfo__return);


        }

        System.exit(0);
    }

}
