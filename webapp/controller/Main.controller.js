sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "at/clouddna/training02/zhoui5/data/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("at.clouddna.training02.zhoui5.controller.Main", {

            formatter: Formatter,
            onInit: function () {

            },

            onListItemClicked: function(oEvent) {
                let path = oEvent.getSource().getBindingContext().getPath().substring(1);
                this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                }, false);
            },


        });


    });
