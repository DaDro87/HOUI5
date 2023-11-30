sap.ui.define([
    "at/clouddna/training02/zhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "at/clouddna/training02/zhoui5/data/formatter/Formatter",
    "at/clouddna/training02/zhoui5/controller/formatter/HOUI5Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,
	MessageBox,
	Formatter,
	HOUI5Formatter ) {
        "use strict";

        return BaseController.extend("at.clouddna.training02.zhoui5.controller.Main", {...HOUI5Formatter,

            formatter: HOUI5Formatter,
            onInit: function () {

            },

            onListItemClicked: function(oEvent) {
                
                let oRouter = this.getOwnerComponent().getRouter();

                let sPath = oEvent.getSource().getBindingContext().getPath();

                oRouter.navTo("RouteCustomer", { path: encodeURIComponent(sPath) });
                
                
                
                // const sPath = oEvent.getSource().getBindingContext().getPath().substring(1);
            
                // this.getRouter().navTo("RouteCustomer", {
                //     path: sPath
               
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
                // const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            
                MessageBox.warning(this.getLocalizedText("sureToDeleteQuestion"), {
                    title: this.getLocalizedText("sureToDeleteTitle"),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: (oAction)=>{
                        if(MessageBox.Action.YES === oAction){
                            this.getView().setBusy(true);
            
                            oModel.remove(sPath, {
                                success: (oData, response) => {
                                    this.getView().setBusy(false);
            
                                    MessageBox.success(this.getLocalizedText("dialog.delete.success"));
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
