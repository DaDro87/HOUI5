sap.ui.define([

], function(
) {
	"use strict";

	return  {

        gender: function (sKey) {
            let oView = this.getView();
            let oI18nModel = oView.getModel("i18n");
            let oResourceBundle = oI18nModel.getResourceBundle();
            let sText = oResourceBundle.getText(sKey);
            return sText;
        },
        
        date: function(date) {
            let dateObj = new Date(date);
                
            return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
        },
	};
});