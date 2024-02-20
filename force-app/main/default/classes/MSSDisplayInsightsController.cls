/* Class Name      : MSS_DisplayInsightsController
* Description      : This class called in lighting component, 
                     It is used to fetch insights and track the number of times 
                        Show Insights function is being used
* Created By       : 
* Created On       : 11/08/2022
* Test Class       : MSS_DisplayInsightsController
* Coverage         : 100% (18-08-2022)
*
*
* Modification Log:
* ----------------------------------------------------------------------------------------------------------------
* Developer                Date                             Description
* ----------------------------------------------------------------------------------------------------------------*/
public without sharing class MSSDisplayInsightsController {

    /**********************************************************************************************
    @author     : Mahesh
    @Method 	: checkPermissionSet
    @date       : 16/01/2024
    @description: PBI#-364256 check Show_Insights_Actions permissionSet is assigned to user or not
    **********************************************************************************************/
    @AuraEnabled(cacheable=true)
    public static Map<String, Boolean> hasShowInsightsPermissionSet(){
        List<PermissionSetAssignment> lstPSA= [SELECT AssigneeId,PermissionSetId,PermissionSet.Name FROM PermissionSetAssignment WHERE AssigneeId =:UserInfo.getUserId() AND PermissionSet.Name = 'Show_Insights_Actions'];       
        Map<String, Boolean> result = new Map<String, Boolean>();
        result.put('data', !lstPSA.isEmpty());
        return result;
    }
}