Ext.ns('PetCompany.grid');
Ext.util.JSON.encodeDate = function(o) 
{ 
return '"' + o.format('m/d/y') + '"'; 
}
PetCompany.grid.PetEditor = Ext.extend(Ext.grid.EditorGridPanel, {
	url 			: 'pets',
    loadMask   		: true,
    stripeRows 		: true,
    viewConfig    	: { forceFit : true },
    ownerId         : 0,
    columns       	:  [
        {
            id: 'name',
            header: 'Name',
            dataIndex: 'name',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'sendReminders',
            header: 'Send Reminders?',
            dataIndex: 'sendReminders',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'checkbox'
            }
		},
		{
            header: 'Type',
            dataIndex: 'type',
            width: 130,
            editor: new Ext.form.ComboBox({
            	   typeAhead: true,
            	    triggerAction: 'all',
            	    lazyRender:true,
            	    mode: 'local',
            	    store: new Ext.data.ArrayStore({
            	        id: 0,
            	        fields: [
            	            'myId',
            	            'displayText'
            	        ],
            	        data: [['Dog', 'Dog'], ['Cat', 'Cat'], ['Bird', 'Bird']]
            	    }),
            	    valueField: 'myId',
            	    displayField: 'displayText'
            })
        },
        {
            id: 'weight',
            header: 'Weight',
            dataIndex: 'weight',
            width: 220,
            sortable: true,
            editor: new Ext.form.NumberField({
                allowBlank: false,
                allowNegative: false,
                maxValue: 500
            })
		}
		
	],
	initComponent 	: function() {
		var config = {};
		
		this.buildConfig(config);
 
		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
        PetCompany.grid.PetEditor.superclass.initComponent.call(this);
        this.store.load();
	},
	buildConfig : function(config) {
		this.store = this.buildStore(config);
		this.tbar = this.buildTopToolbar(config);
	},
	buildStore : function(config) {
		config.store = new Ext.data.JsonStore({
        	restful			: true,
            url		        : this.url,
            storeId         : 'petStore',
            root            : 'data',
            autoLoad        : this.autoLoadStore || false,
            totalProperty   : 'total',
            remoteSort      : false,
            fields          : ['id', 'name','ownerId','ownerName','sendReminders','type','weight', 'version'],
			sortInfo		:{field: 'name', direction: "ASC"},
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
             	 var newRecord        = new this.store.recordType({ ownerId : this.ownerId});
             	 
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
    },
    loadStoreByParams : function(params) {
    	this.ownerId = params.ownerId;
        params = params || {};
        
        this.getStore().load({params:params});
    }

});

Ext.reg('peteditor', PetCompany.grid.PetEditor);