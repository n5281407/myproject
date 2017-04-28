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
            var showroom = sap.ui.view({id:"showroom",
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

        handleLogoffPress: function (oEvent) {
            // MessageToast.show("Logoff Button Pressed");
            // var hPanel1 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({
            //             text: "ICON: ",
            //             labelFor: "input-icon"}),
            //         new sap.m.Input("input-icon", {
            //             value: {path: "icon"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");
            // var hPanel2 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({
            //             text: "Price: ",
            //             labelFor: "input-price"}),
            //         new sap.m.Input("input-price",{
            //             value: {path: "number"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");
            // var hPanel3 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({text: "Unit: "}),
            //         new sap.m.Input({
            //             value: {path: "numberUnit"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");          
            // var hPanel4 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({text: "Title: "}),
            //         new sap.m.Input({
            //             value: {path: "title"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");         
            // var hPanel5 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({text: "Info: "}),
            //         new sap.m.Input({
            //             value: {path: "info"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");     
            // var hPanel6 = new sap.ui.layout.HorizontalLayout({
            //     content: [
            //         new sap.m.Label({text: "state: "}),
            //         new sap.m.Input({
            //             value: {path: "infoState"}
            //         })
            //     ]
            // }).addStyleClass("sapUiSmallMarginBottom");
            var vPanel = new sap.ui.layout.VerticalLayout({
                width: "100%",
                content: [
                    new sap.m.Label({
                        text: "Icon font for the product (e.g. sap-icon://inbox)",
                        labelFor: "input-icon"}),     
                    new sap.m.Input("input-icon", {
                        value: {path: "icon"},
                        type: sap.m.InputType.Url,
                        placeholder: "Input icon font URL here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),
                    new sap.m.Label({
                        text: "Product price",
                        labelFor: "input-price"}),     
                    new sap.m.Input("input-price", {
                        value: {path: "number"},
                        type: sap.m.InputType.Number,
                        placeholder: "Input product price here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),       
                    new sap.m.Label({
                        text: "Product price unit (e.g. EURO, USD...)",
                        labelFor: "input-unit"}),     
                    new sap.m.Input("input-unit", {
                        value: {path: "numberUnit"},
                        type: sap.m.InputType.Text,
                        placeholder: "Input product price unit here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),  
                    new sap.m.Label({
                        text: "Product title",
                        labelFor: "input-title"}),     
                    new sap.m.Input("input-title", {
                        value: {path: "title"},
                        type: sap.m.InputType.Text,
                        placeholder: "Input product title/name here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),          
                    new sap.m.Label({
                        text: "Product Information",
                        labelFor: "input-info"}),     
                    new sap.m.Input("input-info", {
                        value: {path: "info"},
                        type: sap.m.InputType.Text,
                        placeholder: "Input product information here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),        
                    new sap.m.Label({
                        text: "Product status (valid: Warning, Error, Success)",
                        labelFor: "input-status"}),     
                    new sap.m.Input("input-status", {
                        value: {path: "infoState"},
                        type: sap.m.InputType.Text,
                        placeholder: "Input product current status here..."
                    }).addStyleClass("sapUiSmallMarginBottom"),                                                                                                                    
                ]
            }).addStyleClass("sapUiContentPadding");                     
            var dialog = new Dialog({
                title: "Add New Product",
                type: sap.m.DialogType.Standard,
                // content: [sap.m.Label({text: "Hello Me"})],
                content: vPanel,
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function(){
                        MessageToast.show("product protent added");
                        dialog.close();
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
        _currentPage = oPage;
    }    

    return ControllerController;

});