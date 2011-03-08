Ext.ns("PetCompany.listpanel");

/**
 * @class PetCompany.listpanel.OwnerList
 * @extends PetCompany.listpanel.AbstractListPanel
 * A configuration instance of {@link PetCompany.listpanel.AbstractListPanel}
 * <br />
 * @constructor
 * @param {Object} config The config object
 **/
PetCompany.listpanel.PetList = Ext.extend(PetCompany.listpanel.AbstractListPanel, {
    url : 'pets',
    title : 'Owners',
    layout : 'fit',
    buildListView : function() {
        return {
            xtype         : 'listview',
            singleSelect  : true,
            store         : this.buildStore(),
            style         : 'background-color: #FFFFFF;',
            columns: [
                      {
                          id: 'name',
                          header: 'Name',
                          dataIndex: 'name',
                          sortable: true
              		},
                      {
                          id: 'ownerName',
                          header: 'Owner',
                          dataIndex: 'ownerName',
                          sortable: true
              		},
                      {
                          id: 'sendReminders',
                          header: 'Send Reminders?',
                          dataIndex: 'sendReminders',
                          xtype : 'booleancolumn',
                          sortable: true
              		},
                      {
                          id: 'petType',
                          header: 'Type',
                          dataIndex: 'type',
                          sortable: true
              		},
                      {
                          id: 'weight',
                          header: 'Weight',
                          dataIndex: 'weight',
                          sortable: true
              		}
                      
            ]
        };
    },
    
    buildStore : function() {
        return  {
            xtype    : 'jsonstore',
            autoLoad : true,
            url      : this.url,
            root 	 : 'data',
            fields          : ['id', 'name','ownerId','ownerName','sendReminders','type','weight', 'version'],
            sortInfo : {
                field : 'name',
                dir   : 'ASC'
            }
        };
    }

});	

Ext.reg('petlist', PetCompany.listpanel.PetList);	
