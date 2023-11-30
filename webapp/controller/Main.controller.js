sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "at/clouddna/training02/zhoui5/data/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Formatter ) {
        "use strict";

        return Controller.extend("at.clouddna.training02.zhoui5.controller.Main", {

            formatter: Formatter,
            onInit: function () {

            },

            onListItemClicked: function(oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath();
            
                this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                }, false);
            },

            _getVal: function(evt) {
                return evt.getSource().getText();
            },
            
            handleTelPress: function (evt) {
                sap.m.URLHelper.triggerTel(this._getVal(evt));
            },
            
            handleEmailPress: function (evt) {
                sap.m.URLHelper.triggerEmail(this._getVal(evt), "Info Request", false, false, false, true);
            },

            onCreatePressed: function() {
                this.getOwnerComponent().getRouter().navTo("CreateCustomer", null, false);
            },
            onDeletePressed: function(oEvent){
                const oListItem = oEvent.getParameters().listItem;
                const oModel = this.getView().getModel();
                const sPath = oListItem.getBindingContext().getPath();
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            
                MessageBox.warning(oResourceBundle.getText("sureToDeleteQuestion"), {
                    title: oResourceBundle.getText("sureToDeleteTitle"),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: (oAction)=>{
                        if(MessageBox.Action.YES === oAction){
                            this.getView().setBusy(true);
            
                            oModel.remove(sPath, {
                                success: (oData, response) => {
                                    this.getView().setBusy(false);
            
                                    MessageBox.success(oResourceBundle.getText("dialog.delete.success"));
                                    oModel.refresh(true);
                                },
                                error: (oError) => {
                                    this.getView().setBusy(false);
            
                                    MessageBox.error(oError.message);
                                }
                            });
                        }
                    }
                });
            },


        });


    });
