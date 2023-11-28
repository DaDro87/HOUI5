sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("at.clouddna.training02.zhoui5.controller.Main", {
            onInit: function () {

            },

            genderFormatter: function (sKey) {
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
            },
            
            dateFormatter: function(date) {
                let dateObj = new Date(date);
                    
                return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
            },

            onListItemClicked: function(oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath();
            
                this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                }, false);
            }


        });


    });
