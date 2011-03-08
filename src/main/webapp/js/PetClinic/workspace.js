Ext.ns("PetClinic");
Ext.chart.Chart.CHART_URL='resources/js/overrides/chart/charts.swf';
Ext.Ajax.defaultHeaders = {'Accept': 'application/json' };

/**
 * @class FRAP.workspace
 * NEEDS DESCRIPTION
 * <br />
 * @constructor
 * @singleton
 **/
PetClinic.workspace = function() {
    var viewport, treePanel, contentPanel
	
    return {
        init : function() {
			this.buildViewport();
        },
        
        buildViewport : function() {
        	var contentPanel = {
        			id: 'content-panel',
        			region: 'center', // this is what makes this panel into a region within the containing layout
        			layout: 'card',
        			margins: '2 5 5 0',
        			activeItem: 0,
        			border: false,
        			items: [
						{
						    id: 'start-panel',
						    title: 'Welcome',
						    layout: 'fit',
						    bodyStyle: 'padding:25px',
						    contentEl: 'start-div'  // pull existing content from the page
						},
        				{ 
							xtype: 'ownerpeteditor', 
							id:'create_owner-panel',
							title: 'Owner & Pets'
						},
						{
							xtype:'ownerlist',
							id:'list_owners-panel',
							title:'List All Owners'
						},
        				{ 
							id: 'create_pet-panel',
							title: 'Pet Editor',
							layout: 'fit',
							html : '<p>Pet editing is handled in the Master/Detail Owner Pet Editor under Owner | Create new Owner</p>'
						},
						{
							xtype:'petlist',
							id:'list_pets-panel',
							title:'List All Pets'
						},
        				{ 
							id: 'pet_find_by_name_and_weight-panel',
							title: 'Pet Find By Name and Weight',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'pet_find_by_owner-panel',
							title: 'Pet Find By Owner',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'pet_find_by_send_reminders_and_weight_less_than-panel',
							title: 'Pet Find By Send Reminders and Weight less than',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'pet_find_by_type_and_name_like-panel',
							title: 'Pet Find By Type and Name',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
						{ 
							xtype: 'veteditor', 
							id: 'create_vet-panel',
							title: 'Vet Editor'
						},
						{
							xtype:'vetlist',
							id:'list_vets-panel',
							title:'List All Vets'
						},
        				{ 
							xtype: 'visiteditor', 
							id: 'create_visit-panel',
							title : 'Visit Editor'
						},
						{
							xtype:'visitlist',
							id:'list_visits-panel',
							title:'List All Visits'
						},
        				{ 
							id: 'visit_find_by_description_and_visit_date-panel',
							title: 'Visit Find By Description and Visit Date',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'visit_find_by_visit_date_between-panel',
							title: 'Visit Find By Visit Date',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'visit_find_by_description_like-panel',
							title: 'Visit Find By Description',
							layout: 'fit',
							html : '<p>To be developed</p>'
						},
        				{ 
							id: 'visit_find_by_type_and_name_like-panel',
							title: 'Visit Find By Type and Name',
							layout: 'fit',
							html : '<p>To be developed</p>'
						}
        			]
        		};
		    treePanel = new Ext.tree.TreePanel({
				id: 'tree-panel',
				title: 'Navigation',
				region:'west',
				split: true,
				height: 300,
				width : 200,
				minSize: 200,
				autoScroll: true,
				
				// tree-specific configs:
				rootVisible: false,
				lines: false,
				singleExpand: true,
				useArrows: true,
				
				loader: new Ext.tree.TreeLoader({
					dataUrl:'/petclinic/resources/js/PetClinic/menu-tree.txt',
					requestMethod : 'GET'
				}),
				
				root: new Ext.tree.AsyncTreeNode()
			});
			
			// Assign the changeLayout function to be called on tree node click.
			treePanel.on('click', function(n){
				var sn = this.selModel.selNode || {}; // selNode is null on initial selection
				if(n.leaf && n.id != sn.id){  // ignore clicks on folders and currently selected node 
					Ext.getCmp('content-panel').layout.setActiveItem(n.id + '-panel');
					// If panel has a refreshView then call it
					if(Ext.getCmp('content-panel').layout.activeItem.refreshView) {
						Ext.getCmp('content-panel').layout.activeItem.refreshView();
					}
				}
			});
			viewport = new Ext.Viewport({
				layout: 'border',
				boxMaxWidth  : 800,
				items: [
				// create instance immediately
				new Ext.BoxComponent({
					region: 'north',
					contentEl: 'north-header'
				}), {
					// lazily created panel (xtype:'panel' is default)
					region: 'south',
					contentEl: 'south-footer',
					split: true,
					height: 100,
					minSize: 100,
					maxSize: 200,
					collapsible: true,
					title: 'South',
					margins: '0 0 0 0'
				},
				treePanel,
				contentPanel
				]
			});
			Ext.getBody().unmask();
        },
        destroy : function() {
            viewport.destroy();
            viewport  = null;
            this.init();
        }
    };
}();


Ext.onReady(PetClinic.workspace.init, PetClinic.workspace);