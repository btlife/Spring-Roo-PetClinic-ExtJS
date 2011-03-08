Ext.ns('PetCompany.grid');
Ext.util.JSON.encodeDate = function(o) 
{ 
return '"' + o.format('m/d/y') + '"'; 
}
function formatDate(value){
    return value ? value.dateFormat('m/d/y') : '';
}
PetCompany.grid.VetEditor = Ext.extend(Ext.grid.EditorGridPanel, {
	url 			: 'vets',
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
            renderer: formatDate,

            editor: new Ext.form.DateField({
                format: 'm/d/y'
            })
		},
        {
            id: 'employedSince',
            header: 'Employed Since',
            dataIndex: 'employedSince',
            width: 220,
            sortable: true,
            renderer: formatDate,

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
		},
		{
            header: 'Specialty',
            dataIndex: 'specialty',
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
            	        data: [['Cardiology', 'Cardiology'], ['Dentistry', 'Dentistry'], ['Nutrition', 'Nutrition']]
            	    }),
            	    valueField: 'myId',
            	    displayField: 'displayText'
            })
        }
		
	],
	initComponent 	: function() {
		var config = {};
		
		this.buildConfig(config);
 
		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
        PetCompany.grid.VetEditor.superclass.initComponent.call(this);
        this.store.load();
	},
	buildConfig : function(config) {
		this.store = this.buildStore(config);
		this.tbar = this.buildTopToolbar(config);
	},
	buildStore : function(config) {
		config.store = new Ext.data.JsonStore({
        	restful			: true,
            url		        : 'vets',
            storeId         : 'vetStore',
            root            : 'data',
            autoLoad        : false,
            totalProperty   : 'total',
            remoteSort      : false,
            fields          : ['id', 'firstName','lastName','address',{name: 'birthDay', type: 'date', dateFormat: 'm/d/y'},{name: 'employedSince', type: 'date', dateFormat: 'm/d/y'},'city','email','homePage','telephone','specialty', 'version'],
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

Ext.reg('veteditor', PetCompany.grid.VetEditor);