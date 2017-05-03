sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/m/Dialog',
    'sap/m/TileContainer',
    'sap/m/StandardTile',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'xsoft/service/ServiceProxy'
], function (jQuery, MessageToast, Dialog, TileContainer, StandardTile, Fragment, Controller, JSONModel, ServiceProxy) {
    "use strict";

    var _app;
    var _currentPage;
    var ControllerController = Controller.extend("xsoft.views.Shell", {
        onInit: function () {
            this.properties = {};
            var that = this;
            xsoft.service.ServiceProxy.registerServices();
            var oData = {
                logo: jQuery.sap.getModulePath("sap.ui.core", '/') + "mimes/logo/sap_50x26.png",
            };
            var oModel = new JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);
            var tileContainer = new TileContainer();
            this.properties.tileContainer = tileContainer;
            var showroom = sap.ui.view({
                // id:"showroom",
                viewName:"xsoft.views.pages.Showroom",
                type:sap.ui.core.mvc.ViewType.XML});            
            var app = this.getView().byId("myApp");
            app.addPage(showroom);
            _currentPage = showroom;
            _app = app;
        },

        handlePressConfiguration: function (oEvent) {
            var oItem = oEvent.getSource();
            var oShell = this.getView().byId("myShell");
            var bState = oShell.getShowPane();
            oShell.setShowPane(!bState);
            oItem.setShowMarker(!bState);
            oItem.setSelected(!bState);
        },

        handleAddProductPress: function (oEvent) {
            var oModel = new sap.ui.model.json.JSONModel();
            var data  = {
                icon: "",
                number: null,
                numberUnit: "",
                title: "",
                info: "",
                infoState: "",
            };
            var that = this;
            oModel.setData(data);
            var vPanel = new sap.ui.layout.VerticalLayout({
                width: "100%",
                content: [
                    new sap.m.Label({
                        text: "Icon font for the product (e.g. sap-icon://inbox)",
                        labelFor: "input-icon"}),     
                    new sap.m.ComboBox("input-icon", {
                        width: "100%",
                        selectedKey: "sap-icon://sap-ui5",
                        items: [
                            new sap.ui.core.Item({text: "sap-icon://wrench", key: "sap-icon://wrench"}),
                            new sap.ui.core.Item({text: "sap-icon://web-cam", key: "sap-icon://web-cam"}),
                            new sap.ui.core.Item({text: "sap-icon://wallet", key: "sap-icon://wallet"}),
                            new sap.ui.core.Item({text: "sap-icon://video", key: "sap-icon://video"}),
                            new sap.ui.core.Item({text: "sap-icon://umbrella", key: "sap-icon://umbrella"}),
                            new sap.ui.core.Item({text: "sap-icon://tags", key: "sap-icon://tags"}),
                            new sap.ui.core.Item({text: "sap-icon://sys-monitor", key: "sap-icon://sys-monitor"}),
                            new sap.ui.core.Item({text: "sap-icon://suitcase", key: "sap-icon://suitcase"}),
                            new sap.ui.core.Item({text: "sap-icon://study-level", key: "sap-icon://study-level"}),
                            new sap.ui.core.Item({text: "sap-icon://stethoscope", key: "sap-icon://stethoscope"}),
                            new sap.ui.core.Item({text: "sap-icon://simulate", key: "sap-icon://simulate"}),
                            new sap.ui.core.Item({text: "sap-icon://projector", key: "sap-icon://projector"}),
                            new sap.ui.core.Item({text: "sap-icon://pharmacy", key: "sap-icon://pharmacy"}),
                            new sap.ui.core.Item({text: "sap-icon://sap-ui5", key: "sap-icon://sap-ui5"}),
                        ]
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value", "/icon"),
                    new sap.m.Label({
                        text: "Product price",
                        labelFor: "input-price"}),     
                    new sap.m.Input("input-price", {
                        type: sap.m.InputType.Number,
                        placeholder: "Input product price here..."
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value", "/number"),       
                    new sap.m.Label({
                        text: "Product price unit (e.g. EURO, USD...)",
                        labelFor: "input-unit"}),     
                    new sap.m.ComboBox("input-unit", {
                        width: "100%",
                        selectedKey: "USD",
                        items: [
                           new sap.ui.core.Item({text: "USD", key: "USD"}),
                           new sap.ui.core.Item({text: "EUR", key: "EUR"}),
                           new sap.ui.core.Item({text: "RMB", key: "RMB"}),
                           new sap.ui.core.Item({text: "CAD", key: "CAD"}),
                        ]
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value", "/numberUnit"),  
                    new sap.m.Label({
                        text: "Product title",
                        labelFor: "input-title"}),     
                    new sap.m.Input("input-title", {
                        value: {path: "title"},
                        type: sap.m.InputType.Text,
                        placeholder: "Input product title/name here..."
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value","/title"),          
                    new sap.m.Label({
                        text: "Product Information",
                        labelFor: "input-info"}),     
                    new sap.m.Input("input-info", {
                        type: sap.m.InputType.Text,
                        placeholder: "Input product information here..."
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value","/info"),        
                    new sap.m.Label({
                        text: "Product status (valid: Warning, Error, Success)",
                        labelFor: "input-status"}),     
                    new sap.m.ComboBox("input-status", {
                        width: "100%",
                        selectedKey: "S",
                        // type: sap.m.InputType.Text,
                        // placeholder: "Input product current status here..."
                        items: [
                            new sap.ui.core.Item({text: "Success", key: "S"}),
                            new sap.ui.core.Item({text: "Warning", key: "W"}),
                            new sap.ui.core.Item({text: "Error", key: "E"}),
                        ]
                    }).addStyleClass("sapUiSmallMarginBottom").bindProperty("value","/infoState"),                                                                                                                    
                ]
            }).addStyleClass("sapUiContentPadding");    

            vPanel.setModel(oModel);                 
            var dialog = new Dialog({
                title: "Add New Product",
                type: sap.m.DialogType.Standard,
                draggable: true,
                // content: [sap.m.Label({text: "Hello Me"})],
                content: vPanel,
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function(){
                        // MessageToast.show("product protent added");
                        var proxy = new ServiceProxy("xsoft.service.addProduct",true);
                        var oParam = data;
                        proxy.execute({
                            data: oParam,
                            succeeded: function(){
                                MessageToast.show("product added");                             
                                dialog.close();
                                // var oPage = sap.ui.view({
                                //     viewName:"xsoft.views.pages.Showroom",
                                //     type:sap.ui.core.mvc.ViewType.XML});
                                // xsoft.views.Shell.navTo(oPage);           
                                xsoft.views.Shell.goHome();
                            },
                            failed: function(){
                                dialog.close();
                            }
                        })
                        
                    }
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function(){
                        dialog.close();
                    }
                }),
                afterClose: function(){
                    dialog.destroy();
                }
            });
            dialog.open();
        },

        handlePressHome: function(oEvent){
            xsoft.views.Shell.goHome();
        },

        handleUserItemPressed: function (oEvent) {
            MessageToast.show("User Button Pressed");
        },

        handleSearchItemSelect: function (oEvent) {
            MessageToast.show("Search Entry Selected: " + oEvent.getSource().getTitle());
        },

        handleShellOverlayClosed: function () {
            MessageToast.show("Overlay closed");
        },

        handleSearchPressed: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            if (sQuery == "") {
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
            for (var i = 0; i < 10; i++) {
                aResultData.push({
                    title: (i + 1) + ". " + sQuery,
                    text: "Lorem ipsum sit dolem"
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
        },
    });

    xsoft.views.Shell.navTo = function(oPage){
        _app.removePage(_currentPage);
        _app.addPage(oPage);
        _currentPage.destroy();
        _currentPage = oPage;
    };

    xsoft.views.Shell.goHome = function(){
        var oPage = sap.ui.view({
            viewName:"xsoft.views.pages.Showroom",
            type:sap.ui.core.mvc.ViewType.XML});
        xsoft.views.Shell.navTo(oPage);    
    };

    return ControllerController;

});