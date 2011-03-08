Ext.ns("PetCompany.listpanel");

/**
 * @class PetCompany.listpanel.VetList
 * @extends PetCompany.listpanel.AbstractListPanel
 * A configuration instance of {@link PetCompany.listpanel.AbstractListPanel}
 * <br />
 * @constructor
 * @param {Object} config The config object
 **/
PetCompany.listpanel.VisitList = Ext.extend(PetCompany.listpanel.AbstractListPanel, {
    url : 'visits',
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
                          id: 'vetName',
                          header: 'Vet',
                          dataIndex: 'vetName',
                          sortable: true
              		},
                      {
                          id: 'petName',
                          header: 'Pet Name',
                          dataIndex: 'petName',
                          sortable: true
              		},
                      {
                          id: 'description',
                          header: 'Description',
                          dataIndex: 'description',
                          sortable: true
              		},
                      {
                          id: 'visitDate',
                          header: 'Visit Date',
                          dataIndex: 'visitDate',
                          xtype : 'datecolumn',
                          format : 'm/d/y',
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
            fields          : ['id', 'description','petId','petName','vetId','vetName',{name: 'visitDate', type: 'date', dateFormat: 'm/d/y'}, 'version'],
            sortInfo : {
                field : 'petName',
                dir   : 'ASC'
            }
        };
    }

});	

Ext.reg('visitlist', PetCompany.listpanel.VisitList);	
