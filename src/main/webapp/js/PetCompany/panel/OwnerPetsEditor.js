Ext.ns('PetCompany.panel');

PetCompany.panel.OwnerPetEditor = Ext.extend(Ext.Panel, {
    border  : true,
    /**
     * @cfg {Object} layout  The layout that you desire to use.
     * defaults to { type : 'hbox', align : 'stretch' }
     */
    layout  : {
        type  : 'vbox',
        align : 'stretch'
    },
    //private
    defaults : {
        style : 'background-color: #DFE8F6; padding: 10px',
        flex  : 1
    },
    /**
     * @cfg {Object} msgs an object containing messages. <br />
     * defaults to { deptBreakdown : 'Department breakdown for year: {0}' }
     */
    msgs : {
        listTitle : '{0} for {1} {2}'
    },
    //private
    // Instantiates the instance of the CompanySnapshot and DepartmentBreakdown and configures accordingly.
    initComponent : function() {
        this.items = [{
	    	xtype : 'ownereditor', 
	    	id:'ownerEditor',
	        title: 'Owners',
	        flex: 1,
            listeners : {
                scope     : this,  
                rowclick : function(thisGrid, index, eventObj) {
                	var record = thisGrid.store.getAt(index);
                	
                	if(record && !record.dirty) {
                		this.getComponent('petEditor').loadStoreByParams({
                			find : 'ByOwnerId',
                			ownerId : record.get('id')
                		});
                        var msg = String.format(this.msgs.listTitle, 'Pets', record.get('firstName'), record.get('lastName'));
                        this.getComponent('petEditor').setTitle(msg);
                	}
                }
            }
	    }, {
	    	xtype : 'peteditor',
	    	id : 'petEditor',
	        title: 'Pets',
	        flex: 1
	        
	        
	    }];
        
        PetCompany.panel.OwnerPetEditor.superclass.initComponent.call(this);
    }
});

Ext.reg('ownerpeteditor', PetCompany.panel.OwnerPetEditor);
