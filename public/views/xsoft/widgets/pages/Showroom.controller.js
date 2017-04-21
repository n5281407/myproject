sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'xsoft/service/ServiceProxy',
    'sap/m/StandardTile',
], function(Controller, ServiceProxy, StandardTile){
    "use strict";

    var ControllerController = Controller.extend("xsoft.views.pages.Showroom", {
        onInit : function(){
            var that = this;
            var products = [];
            this.properties = {};
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.getAllProducts", true);
            proxy.execute({
                succeeded: function (data) {
                    products = JSON.parse(data);
                }
            });
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
                tile.attachPress(jQuery.proxy(that.onTilePress, that, products[i].pid));
                this.oView.byId("-tileContainer").addTile(tile);
            }                        
        },

        onTilePress: function(index){
            // alert("me click " + index);
            // this.properties.app.removePage(this.properties.tileContainer);
            var oPage = sap.ui.view({id:"product",
                viewName:"xsoft.views.pages.Product",
                type:sap.ui.core.mvc.ViewType.XML});
            oPage.getController().load(index);
            xsoft.views.Shell.navTo(oPage);
        },

    });
    
    return ControllerController;
});