sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/m/TileContainer',
    'sap/m/StandardTile',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'xsoft/service/ServiceProxy'
], function (jQuery, MessageToast, TileContainer, StandardTile, Fragment, Controller, JSONModel, ServiceProxy) {
    "use strict";

    var ControllerController = Controller.extend("xsoft.views.Shell", {
        onInit: function () {
            this.properties = {};
            var that = this;
            //test code below
            var products = [];
            xsoft.service.ServiceProxy.registerServices();
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.getAllProducts", true);
            proxy.execute({
                succeeded: function (data) {
                    products = JSON.parse(data);
                }
            });
            //test code up
            var oData = {
                logo: jQuery.sap.getModulePath("sap.ui.core", '/') + "mimes/logo/sap_50x26.png",
                // TileCollection: products
            };
            var oModel = new JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);
            var tileContainer = new TileContainer();
            this.properties.tileContainer = tileContainer;
            this.properties.products = products;
            for(var i = 0; i < products.length; i++){
                var tile = new StandardTile({
                    icon: products[i].icon,
                    type: products[i].type,
                    number: products[i].number,
                    numberUnit: products[i].numberUnit,
                    title: products[i].title,
                    info: products[i].info,
                    infoState: products[i].infoState,
                });
                tile.attachPress(jQuery.proxy(that.onTilePress, that, i));
                tileContainer.addTile(tile);
            }
            var app = this.getView().byId("myApp");
            app.addPage(tileContainer);
            this.properties.app = app;
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
            MessageToast.show("Logoff Button Pressed");
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

        onTilePress: function(index){
            alert("me click " + index);
            // this.properties.app.removePage(this.properties.tileContainer);
        }
    });

    return ControllerController;

});