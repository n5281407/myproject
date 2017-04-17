sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
], function(Controller, JSONModel){
    "use strict";

    return Controller.extend("xsoft.views.App", {
        onInit: function(){
            var oData = {
                recipient: {
                    name: "World"
                }
            };
            this.properties = {
                message: "hello world 1-1"
            }
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onShowHello: function(){
            alert(this.properties.message);
        }
    })
});