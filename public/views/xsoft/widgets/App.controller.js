sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";

    return Controller.extend("xsoft.views.App", {
        onInit: function(){
            var oData = {
                recipient: {
                    name: "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onShowHello: function(){
            alert("Hello World");
        }
    })
});