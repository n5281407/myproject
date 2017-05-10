sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'xsoft/views/model/formatter',
    'xsoft/service/ServiceProxy',
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageToast',
], function(Controller, formatter, ServiceProxy, JSONModel, MessageToast){
    "use strict";

    var _view;
    var ControllerController = Controller.extend("xsoft.views.pages.Product", {
        formatter : formatter,
        onInit : function(){
            this.properties = {};
        },
        load: function(index){
            var that = this;
            this.properties.pid = index;
            var oView = this.getView();
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.getProduct", true);
            proxy.execute({
                param: {
                    pid: index
                },
                succeeded: function(data){
                    data = JSON.parse(data);
                    that.properties.modelData = data;
                    var oModel = new JSONModel();
                    oModel.setData(data);
                    oView.setModel(oModel); 
                    oView.bindElement("/");                   
                }
            })            
        },
        handleCancelButtonPress: function(){
            xsoft.views.Shell.goHome();
        },
        handleDelButtonPress: function(){
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.delProduct", true);
            proxy.execute({
                param: {
                    pid: this.properties.pid
                },
                succeeded: function(data){
                    MessageToast.show("product deleted");                             
                    var oPage = sap.ui.view({id:"showroom",
                        viewName:"xsoft.views.pages.Showroom",
                        type:sap.ui.core.mvc.ViewType.XML});
                    xsoft.views.Shell.navTo(oPage);                       
                }
            })
        },
        handleUpdateButtonPress: function(){
            var proxy = new xsoft.service.ServiceProxy("xsoft.service.updateProduct", true);
            var state = "";
            if(this.properties.modelData.status == "S"){
                state = "Success";
            }else if(this.properties.modelData.status == "E"){
                state = "Error";
            }else if(this.properties.modelData.status == "W"){
                state = "Warning";
            }
            console.log("yyy: " + this.properties.modelData.pid);
            var data = {
                icon: this.properties.modelData.icon,
                number: this.properties.modelData.Price,
                numberUnit: this.properties.modelData.Unit,
                title: this.properties.modelData.title,
                info: this.properties.modelData.info,
                infoState: state,
                pid: this.properties.modelData.pid,
            };
            proxy.execute({
                data: data,
                param: {
                    pid: this.properties.pid
                },
                succeeded: function(){
                    MessageToast.show("product updated");                             
                    var oPage = sap.ui.view({id:"showroom",
                        viewName:"xsoft.views.pages.Showroom",
                        type:sap.ui.core.mvc.ViewType.XML});
                    xsoft.views.Shell.navTo(oPage);                     
                }
            });
        },
    });
    return ControllerController;
});