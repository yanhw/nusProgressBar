'use strict';

var ApplicationView = require ("./common/views/applicationView");

var App = {
	start: function(){
		ApplicationView.initialise();
	}
};

module.exports = App;