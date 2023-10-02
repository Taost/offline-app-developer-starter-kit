# Create Contact Record

Create a contact record with customized layout.

## Add Offline Lookups Field

We recently added an an offline lookups example in Starter Kit. It demonstrates the capability to user on how to create/update record (e.g., Contact) which contains lookup field to other object (e.g., Account) in mobile offline app. When device is online, the lookup field searches records with network calls. In contrast, it searches records in cache when device is offline. To make the lookup records available offline, they need to be downloaded during briefcase priming. 

In addition to primed records, any existing drafts are also searchable in offline.

In the createContactRecord LWC example, we integrated a new base component lightning-record-picker , which allows user to search a list of account records while creating a contact record. 

Please note: this component is a Beta Service in Winter'24 release. It is targeted to be GA in the coming releases. https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_components.htm&release=246&type=5

## How to Use the Offline Lookups

1. Configure your Offline Briefcase to include the objects you want to see offline. In this example, you want to have records to be primed for Contact and Account objects. Especially, the primed account records will be searched when user lookup accounts in offline.
2. As a minimal, deploy the following LWCs to the org which can be added quick actions to the objects
    - viewAccountRecord (Account.view), viewContactRecord (Contact.view)
    - createAccountRecord (Account.create), createContactRecord (Contact.create)


3. Login to the Mobile Offline App. After the briefcase priming is completed, you should be able to view your records in offline.
4. In offline, create an account draft.
5. In offline, tap the New button from Contacts home page to create a contact.
    - Fill data in required fields, e.g., Last Name
    - Tap the Account lookup field at the bottom. It brings up a modal page with a search box. You can type any key to start search. The dropdown list shows any matched records in cache, including the drafts! Select an account record from the dropdown list. The modal page is automatically closed
    - Now you have the account record filled in the lookup field. You can go ahead to save it as a new contact draft.
6. Turn on network on device, let the drafts automatically synced up with server. You should see a new account and contact is created successfully!
