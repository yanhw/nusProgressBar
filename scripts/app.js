'use strict';

var ApplicationView = require ("./common/views/applicationView");
var AppBody = require("./common/index.js");

var App = {
	start: function(){
		ApplicationView.initialise();
		AppBody.run();
	}
};

module.exports = App;