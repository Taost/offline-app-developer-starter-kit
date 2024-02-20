public with sharing class LWCApex {
    @AuraEnabled(cacheable=true)
    public static List<String> relatedContacts(String recordId) {
        List<Contact> relations = [SELECT Name FROM Contact WHERE AccountId = :recordId];
        List<String> contactNames = new List<String>();
        for (Integer idx = 0; idx < relations.size(); idx++) {
            contactNames.add(relations.get(idx).Name);
        }
        return contactNames;
    }

    @AuraEnabled(cacheable=true)
    public static String apexMethod() {
        Datetime now = Datetime.now();
        return 'Hi from Apex! This apex function executed on the server at ' + now;
    }

    @AuraEnabled(cacheable=true)
    public static String komaciApexMethod(String recordId) {
        return 'Hi from Apex! ' + recordId;
    }

    @AuraEnabled(cacheable=true)
    public static Object handleContinuationResponse(List<String> labels, Object state) {
        Datetime now = Datetime.now();
        return 'Start time: ' + state + ' now: ' + now;
    }

    @AuraEnabled(continuation=true cacheable=true)
    public static Object apexContinuationMethod(Object state) {
        Datetime start = Datetime.now();

        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('callout:SalesforceHomePage');

        Continuation con = new Continuation(10);
        con.state = start;
        con.continuationMethod = 'handleContinuationResponse';
        con.addHttpRequest(req);

        return con;
    }
}