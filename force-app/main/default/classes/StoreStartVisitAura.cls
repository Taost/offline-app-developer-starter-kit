// clang-format off
/*
Name            : StoreStartVisitAura
Author          : Kishan
Release         : R3 2018 GEM
Functionality   : Aura Class for StroreStartVisitComponent
Created         : May 28th 2018
----------------------------------------------------------------------------------------------------
Modification History:
BUGANIZER   DATE(MMDDYYYY)  AUTHOR              CHANGE
113516268   08/30/2018      Kishan              Exclude location capture in ctys where not allowed
113107818   08/27/2018      Kishan              Ensure only a particular country survey is shown
113116014   08/27/2018      Kishan              Show insight surveys based on the store country
GEM R219    03/01/2019      Kishan              Additional conditions in query to consider
131243849   04/25/2019      Kishan              Changed the query term to INCLUDES
148688129   9/22/2020       Likhitha Golla      Changed the criteria to display Surveys in Mobile.
172500856   11/10/2020      Likhitha Golla      Removed store events dependency from insight surveys
175645111   01/11/2021      Abhilash            Updated logic for Enabled countries
185279019   05/04/2021      Likhitha Golla      Added visit type field to the store visit queries
190723786   06/29/2021      Likhitha Golla      Truncated the store display name to 72 characters
204129934   10/11/2021      Hema                Added logic to update the Store Visit Status 
180762619   11/09/2021      Eshwar              Added logic to Email Alert Missed Visit at 4PM & 7PM
224547006   04/13/2022      Nilisha Kothari     Made Changes for missed visit notification at 7:30PM
245577031   09/21/2022      Eshwar              Added logic to create SVA based on Partner and Store
----------------------------------------------------------------------------------------------------
*/
// clang-format on
public with sharing class StoreStartVisitAura {

    @AuraEnabled(cacheable = true) 
    public static Boolean getVisitSchedulingEnabled(){
        return false;      
    }
}