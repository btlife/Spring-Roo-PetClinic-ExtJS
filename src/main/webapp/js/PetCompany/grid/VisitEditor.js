Ext.ns('PetCompany.grid');
Ext.util.JSON.encodeDate = function(o) 
{ 
return '"' + o.format('m/d/y') + '"'; 
}
PetCompany.grid.VisitEditor = Ext.extend(Ext.grid.EditorGridPanel, {
	url 			: 'visits',
    loadMask   		: true,
    stripeRows 		: true,
    viewConfig    	: { forceFit : true },
    columns       	:  [
        {
            id: 'description',
            header: 'Description',
            dataIndex: 'description',
            width: 220,
            sortable: true,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
		},
        {
            id: 'visitDate',
            header: 'Visit Date',
            dataIndex: 'visitDate',
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
			id : 'pet',
			header : 'Pet',
			dataIndex : 'petId',
			editor : new Ext.form.ComboBox({
	    	   	name			: 'petName',
			  	triggerAction 	: 'all',
			  	displayField  	: 'name',
			  	valueField 		: 'id',
			  	selectOnFocus	: true,
			  	mode			: 'remote',
			  	hiddenName		: 'petId',
			  	value			: 'petName',
			  	typeAhead 		: false,
			  	store         	: {
			  		xtype  : 'jsonstore',
			  		root   : 'data',
		            fields : ['id', 'name','ownerId','ownerName','sendReminders','type','weight', 'version'],
			  		proxy  :   new Ext.data.HttpProxy({
				  			url    :  'pets',
				  			method : 'GET'
				  		})
			  	}
			})
       },
       {
			id : 'vet',
			header : 'Vet',
			dataIndex : 'vetId',
			editor : new Ext.form.ComboBox({
	    	   	name: 'vetName',
			  	triggerAction : 'all',
			  	displayField  : 'lastName',
			  	valueField : 'id',
			  	selectOnFocus:true,
			  	mode:'remote',
			  	hiddenName: 'vetId',
			  	value: 'vetName',
			  	typeAhead : false,
			  	store         : {
			  		xtype  : 'jsonstore',
			  		root   : 'data',
		            fields : ['id', 'firstName','lastName','address',{name: 'birthDay', type: 'date', dateFormat: 'm/d/y'},{name: 'employedSince', type: 'date', dateFormat: 'Y-m-d'},'city','email','homePage','telephone','specialty', 'version'],
			  		proxy  :   new Ext.data.HttpProxy({
				  			url    :  'vets',
				  			method : 'GET'
				  		})
			  	}
			})
      }
		
	],
	initComponent 	: function() {
		var config = {};
		
		this.buildConfig(config);
 
		// apply config
        Ext.apply(this, Ext.apply(this.initialConfig, config));
		
        PetCompany.grid.VisitEditor.superclass.initComponent.call(this);
        this.store.load();
	},
	buildConfig : function(config) {
		this.store = this.buildStore(config);
		this.tbar = this.buildTopToolbar(config);
	},
	buildStore : function(config) {
		config.store = new Ext.data.JsonStore({
        	restful			: true,
            url		        : 'visits',
            storeId         : 'visitStore',
            root            : 'data',
            autoLoad        : false,
            totalProperty   : 'total',
            remoteSort      : false,
            fields          : ['id', 'description','petId','petName','vetId','vetName',{name: 'visitDate', type: 'date', dateFormat: 'm/d/y'}, 'version'],
			sortInfo		: {field: 'visitDate', direction: "ASC"},
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

Ext.reg('visiteditor', PetCompany.grid.VisitEditor);