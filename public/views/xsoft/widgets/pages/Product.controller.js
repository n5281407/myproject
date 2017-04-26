sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'xsoft/views/model/formatter',
    'xsoft/service/ServiceProxy',
    "sap/ui/model/json/JSONModel",
], function(Controller, formatter, ServiceProxy, JSONModel){
    "use strict";

    var _view;
    var ControllerController = Controller.extend("xsoft.views.pages.Product", {
        formatter : formatter,
        onInit : function(){

        },
        load: function(index){
            var that = this;
            var oView = this.getView();
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.getProduct", true);
            proxy.execute({
                param: {
                    pid: index
                },
                succeeded: function(data){
                    data = JSON.parse(data);
                    var oModel = new JSONModel();
                    oModel.setData(data);
                    oView.setModel(oModel); 
                    oView.bindElement("/");                   
                }
            })            
        }
    });
    return ControllerController;
});