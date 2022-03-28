/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ns/finalproject/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
