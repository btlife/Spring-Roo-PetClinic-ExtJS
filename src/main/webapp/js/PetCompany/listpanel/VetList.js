Ext.ns("PetCompany.listpanel");

/**
 * @class PetCompany.listpanel.VetList
 * @extends PetCompany.listpanel.AbstractListPanel
 * A configuration instance of {@link PetCompany.listpanel.AbstractListPanel}
 * <br />
 * @constructor
 * @param {Object} config The config object
 **/
PetCompany.listpanel.VetList = Ext.extend(PetCompany.listpanel.AbstractListPanel, {
    url : 'vets',
    title : 'Vets',
    layout : 'fit',
    buildListView : function() {
        return {
            xtype         : 'listview',
            singleSelect  : true,
            store         : this.buildStore(),
            style         : 'background-color: #FFFFFF;',
            columns: [
                      {
                          id: 'firstName',
                          header: 'First Name',
                          dataIndex: 'firstName',
                          sortable: true
              		},
                      {
                          id: 'lastName',
                          header: 'Last Name',
                          dataIndex: 'lastName',
                          sortable: true
              		},
                      {
                          id: 'address',
                          header: 'Address',
                          dataIndex: 'address',
                          sortable: true
              		},
                      {
                          id: 'birthDay',
                          header: 'Birthday',
                          dataIndex: 'birthDay',
                          xtype : 'datecolumn',
                          format : 'm/d/y',
                          sortable: true
                               		
              		},
                    {
                        id: 'employedSince',
                        header: 'Employed Since',
                        dataIndex: 'employedSince',
                        xtype : 'datecolumn',
                        format : 'm/d/y',
                        sortable: true
                             		
            		},
                      {
                          id: 'city',
                          header: 'City',
                          dataIndex: 'city',
                          sortable: true
              		},
                      {
                          id: 'email',
                          header: 'Email',
                          dataIndex: 'email',
                          sortable: true
              		},
                      {
                          id: 'homePage',
                          header: 'Home Page',
                          dataIndex: 'homePage',
                          sortable: true
              		},
                      {
                          id: 'telephone',
                          header: 'Telephone',
                          dataIndex: 'telephone',
                          sortable: true
              		},
              		{
              			id: 'specialty',
              			header: 'Specialty',
              			dataIndex: 'specialty'
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
            fields   : ['id', 'firstName','lastName','address',{name: 'birthDay', type: 'date', dateFormat: 'm/d/y'},{name: 'employedSince', type: 'date', dateFormat: 'm/d/y'},'city','email','homePage','telephone','specialty', 'version'],
            sortInfo : {
                field : 'lastName',
                dir   : 'ASC'
            }
        };
    }

});	

Ext.reg('vetlist', PetCompany.listpanel.VetList);	
