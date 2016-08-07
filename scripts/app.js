'use strict';

var ApplicationView = require ("./common/views/applicationView");
var AppBody = require("./common/index.js");

var App = {
	start: function(){
		var numCol = ApplicationView.initialise();
		AppBody.run(numCol);
	}
};

module.exports = App;