/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"atclouddnatraining02/zhoui5/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
