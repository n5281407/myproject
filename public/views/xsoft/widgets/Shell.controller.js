sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, MessageToast, Fragment, Controller, JSONModel) {
	"use strict";
 
	var ControllerController = Controller.extend("xsoft.views.Shell", {
		onInit: function() {
			var oData = {
                logo: jQuery.sap.getModulePath("sap.ui.core", '/') + "mimes/logo/sap_50x26.png",
                TileCollection: [
                    {
                        "icon" : "sap-icon://hint",
                        "type" : "Monitor",
                        "title" : "Tiles: a modern UI design pattern for overview & navigation."
                    },
                    {
                        "icon" : "sap-icon://inbox",
                        "number" : "89",
                        "title" : "Approve Leave Requests",
                        "info" : "Overdue",
                        "infoState" : "Error"
                    },
                    {
                        "type" : "Create",
                        "title" : "Create Leave Requests",
                        "info" : "28 Days Left",
                        "infoState" : "Success"
                    },
                    {
                        "icon" : "sap-icon://travel-expense-report",
                        "number" : "281",
                        "numberUnit" : "euro",
                        "title" : "Travel Reimbursement",
                        "info" : "1 day ago"
                    },
                    {
                        "icon" : "sap-icon://loan",
                        "number" : "2380",
                        "numberUnit" : "euro",
                        "title" : "My Salary",
                        "info" : "8 days ago"
                    },
                    {
                        "icon" : "sap-icon://lab",
                        "number" : "1",
                        "numberUnit" : "Invention",
                        "title" : "Test Lab Reports",
                        "info" : "8 Days Ago"
                    },
                    {
                        "icon" : "sap-icon://inbox",
                        "type" : "Monitor",
                        "title" : "Leave Request History"
                    },
                    {
                        "type" : "Create",
                        "title" : "Create Purchase Order",
                        "info" : "890€ Open Budget",
                        "infoState" : "Success"
                    },
                    {
                        "icon" : "sap-icon://stethoscope",
                        "number" : "3",
                        "title" : "Yearly Health Check",
                        "info" : "3 year overdue",
                        "infoState" : "Error"
                    },
                    {
                        "icon" : "sap-icon://meal",
                        "type" : "Monitor",
                        "title" : "Meal Schedule"
                    },
                    {
                        "icon" : "sap-icon://cart",
                        "number" : "787",
                        "numberUnit" : "euro",
                        "title" : "My Shopping Carts",
                        "info" : "Waiting for Approval",
                        "infoState" : "Warning"
                    },
                    {
                        "icon" : "sap-icon://factory",
                        "number" : "2",
                        "numberUnit" : "Outages",
                        "title" : "Factory Power Management",
                        "info" : "Production On Hold",
                        "infoState" : "Error"
                    },
                    {
                        "icon" : "sap-icon://calendar",
                        "title" : "Team Calendar"
                    },
                    {
                        "icon" : "sap-icon://pie-chart",
                        "number" : "5",
                        "title" : "Financial Reports",
                        "info" : "4 day ago",
                        "infoState" : "Warning"
                    }
                ]
            };
			var oModel = new JSONModel();
			oModel.setData(oData);
			this.getView().setModel(oModel);
		},
 
		handlePressConfiguration: function(oEvent) {
			var oItem = oEvent.getSource();
			var oShell = this.getView().byId("myShell");
			var bState = oShell.getShowPane();
			oShell.setShowPane(!bState);
			oItem.setShowMarker(!bState);
			oItem.setSelected(!bState);
		},
 
		handleLogoffPress: function(oEvent) {
			MessageToast.show("Logoff Button Pressed");
		},
 
		handleUserItemPressed: function(oEvent) {
			MessageToast.show("User Button Pressed");
		},
 
		handleSearchItemSelect: function(oEvent) {
			MessageToast.show("Search Entry Selected: " + oEvent.getSource().getTitle());
		},
 
		handleShellOverlayClosed: function() {
			MessageToast.show("Overlay closed");
		},
 
		handleSearchPressed: function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			if(sQuery == "") {
				return;
			}
 
			// create Overlay only once
			if (!this._overlay) {
				this._overlay = sap.ui.xmlfragment(
					"sap.ui.unified.sample.ShellBasic.ShellOverlay",
					this
				);
				this.getView().addDependent(this._overlay);
			}
 
			// mock data
			var aResultData = [];
			for(var i = 0; i < 10; i++) {
				aResultData.push({
									title:(i + 1) + ". " + sQuery,
									text:"Lorem ipsum sit dolem"
								});
			}
			var oData = {
							searchFieldContent: sQuery,
							resultData: aResultData
						};
			var oModel = new JSONModel();
			oModel.setData(oData);
			this._overlay.setModel(oModel);
 
			// set reference to shell and open overlay
			this._overlay.setShell(this.getView().byId("myShell"));
			this._overlay.open();
		}
	});
 
	return ControllerController;
 
});