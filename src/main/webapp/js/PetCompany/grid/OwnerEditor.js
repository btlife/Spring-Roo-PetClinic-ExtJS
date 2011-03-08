Ext.ns('PetCompany.grid');
Ext.util.JSON.encodeDate = function(o) 
{ 
return '"' + o.format('m/d/y') + '"'; 
}
PetCompany.grid.OwnerEditor = Ext.extend(Ext.grid.EditorGridPanel, {
	url 			: 'owners',
    loadMask   		: true,
    stripeRows 		: true,
    viewConfig    	: { forceFit : true },
    columns       	:  [
        {
            id: 'firstName',
            header: 'First Name',
            dataIndex: 'firstName',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'lastName',
            header: 'Last Name',
            dataIndex: 'lastName',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'address',
            header: 'Address',
            dataIndex: 'address',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'birthDay',
            header: 'Birthday',
            dataIndex: 'birthDay',
            width: 220,
            sortable: true,
            renderer: function formatDate(value){
                return value ? value.dateFormat('m/d/y') : '';
            },

            editor: new Ext.form.DateField({
                format: 'm/d/y'
            })
		},
        {
            id: 'city',
            header: 'City',
            dataIndex: 'city',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'email',
            header: 'Email',
            dataIndex: 'email',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'homePage',
            header: 'Home Page',
            dataIndex: 'homePage',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'telephone',
            header: 'Telephone',
            dataIndex: 'telephone',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		}
		
	],
	initComponent 	: function() {
		var config = {};
		
		this.buildConfig(config);
 
		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
        PetCompany.grid.OwnerEditor.superclass.initComponent.call(this);
        this.store.load();
	},
	buildConfig : function(config) {
		this.store = this.buildStore(config);
		this.tbar = this.buildTopToolbar(config);
	},
	buildStore : function(config) {
		config.store = new Ext.data.JsonStore({
        	restful			: true,
            url		        : 'owners',
            storeId         : 'ownerStore',
            root            : 'data',
            autoLoad        : false,
            totalProperty   : 'total',
            remoteSort      : false,
            fields          : ['id', 'firstName','lastName','address',{name: 'birthDay', type: 'date', dateFormat: 'm/d/y'},'city','email','homePage','telephone', 'version'],
			sortInfo		: {field: 'lastName', direction: "ASC"},
            idProperty      : 'id',
            autoSave        : false,
            successProperty : 'success',
            writer          : new Ext.data.JsonWriter({
            	encode:true
                ,writeAllFields : true
        		,render          : function(params, baseParams, data) {
        			// override the render function to insert the raw JSON payload
        			params.jsonData = data;
        		}
            }),
            listeners       : {
                exception : function () {
                    console.info(arguments);
                }
            }
        });
	},
	buildTopToolbar : function(config) {
        config.tbar = [
         {
             text    : 'Save',
             scope   : this,
             handler : function () {
                 this.store.save();
             }
         },
         '-',
         {
             text    : 'Reset',
             scope   : this,
             handler : function () {
                 this.store.rejectChanges();
             }
         },
         '-',
         {
             text    : 'New',
             iconCls : 'icon-user_add',
             scope   : this,
             handler : function() {
             	 var newRecord        = new this.store.recordType();
             	 
             	 this.store.insert(0, newRecord);
             	 this.startEditing(0,0);

             }
         },
         '->',
         {
             text    : 'Delete',
             iconCls : 'icon-user_delete',
             scope   : this,
             handler : function() {
               var selected = this.getSelectionModel().getSelectedCell();
               if(!selected) {
               	return false;
               }
               var recordToDelete = this.store.getAt(selected[0]);

               this.store.remove(recordToDelete);
             }
         }
     ];
	},
    refreshView : function() {
        this.store.reload();
    }

});

Ext.reg('ownereditor', PetCompany.grid.OwnerEditor);