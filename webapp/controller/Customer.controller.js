sap.ui.define([
    "at/clouddna/training02/zhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "at/clouddna/training02/zhoui5/data/formatter/Formatter",
    "at/clouddna/training02/zhoui5/controller/formatter/HOUI5Formatter",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,
	MessageBox,
	JSONModel,
	Fragment,
	Formatter,
    HOUI5Formatter,
    History) {
    /* ... */
        "use strict";

        return BaseController.extend("at.clouddna.training02.zhoui5.controller.Customer", {...HOUI5Formatter,

            _fragmentList: {},

            formatter: HOUI5Formatter,

            onInit: function () {
                let oEditModel = new JSONModel({
                    editMode: false
                });

                this.getView().setModel(oEditModel, "editModel");

                let oRouter = this.getOwnerComponent().getRouter();

                this.setContentDensity();
                            
                oRouter.getRoute("RouteCustomer").attachPatternMatched(this._onPatternMatched, this);

                oRouter.getRoute("CreateCustomer").attachPatternMatched(this._onCreatePatternMatched, this);
            },
                
                /*
                const oRouter = this.getOwnerComponent().getRouter();
                const oEditModel = new JSONModel({
                    editmode: false
                });

                this.setContentDensity();
            
                this.getView().setModel(oEditModel, "viewModel");
                            
                oRouter.getRoute("RouteCustomer").attachPatternMatched(this._onPatternMatched, this);
                oRouter.getRoute("CreateCustomer").attachPatternMatched(this._onCreatePatternMatched, this);

                */
          

            _onCreatePatternMatched: function (oEvent) {
                this.bCreate = true;
            
                let oNewCustomerContext = this.getView().getModel().createEntry("/Z_P_CUSTOMER");
                this.getView().bindElement(oNewCustomerContext.getPath());
            
                this.getView().getModel("editModel").setProperty("/editMode", true);
                this._showCustomerFragment("CustomerEdit");
            },
            
            _showCustomerFragment: function(sFragmentName) {
                let page = this.getView().byId("ObjectPageLayout");
                
                page.removeAllSections();
                
                if(this._fragmentList[sFragmentName]) {
                    page.addSection(this._fragmentList[sFragmentName]);
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: "at.clouddna.training02.zhoui5.view.fragment." + sFragmentName,
                        controller: this
                    }).then(function(oFragment) {
                        this._fragmentList[sFragmentName] = oFragment;
                        page.addSection(this._fragmentList[sFragmentName]);
                    }.bind(this));
                }
            },
            onEditPressed: function(){
                this._toggleEdit(true);
            },
            
            _toggleEdit: function(bEditMode){
                const oEditModel = this.getView().getModel("editModel");
            
                oEditModel.setProperty("/editMode", bEditMode);
            
                this._showCustomerFragment(bEditMode ? "CustomerEdit" : "CustomerDisplay");
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
            
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Main", {}, true);
                }
            },
            
            onSavePressed: function () {
            const oModel = this.getView().getModel();
            const sSuccessText = this.bCreate ? this.getView().getModel("i18n").getResourceBundle().getText("dialog.create.success") : this.getView().getModel("i18n").getResourceBundle().getText("dialog.edit.success");
        
            this.getView().setBusy(true);
        
            oModel.submitChanges({
                success: (oData, response) => {
                    this.getView().setBusy(false);
        
                    MessageBox.success(sSuccessText, {
                        onClose: () => {
                            if (this.bCreate) {
                                this._toggleEdit(false);
                                oModel.refresh(true);
                                this.onNavBack();
                            } else {
                                this._toggleEdit(false);
                            }
                        }
                    });
                },
                error: (oError) => {
                    this.getView().setBusy(false);
                    MessageBox.error(oError.message);
                }
            });
            
        },
            
            onCancelPressed: function () {
                const oModel = this.getView().getModel();
            
                if (oModel.hasPendingChanges()) {
                    oModel.resetChanges()
                }
            
                this._toggleEdit(false);
            
                if (this.bCreate) {
                    this.bCreate = !this.bCreate;
                    this.onNavBack();
                }
            },

            _onPatternMatched: function(oEvent) {
                const sPath = oEvent.getParameters().arguments.path;
            
                this.sCustomerPath = decodeURIComponent(sPath);
                this.getView().bindElement(this.sCustomerPath);
            
                this._showCustomerFragment("CustomerDisplay");
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


            genderFormatter: function(sKey){
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
            }
        });
    });
