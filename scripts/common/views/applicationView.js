'use strict';

var drawDefaultProgressBar = require('./drawDefaultProgressBar');
var drawEmptyModuleTable = require('./drawEmptyModuleTable');
var drawDefaultModuleInfo = require('./drawDefaultModuleInfo');

var ApplicationView = {
	//Build default view for the enitre app
	initialise: function() {
		drawDefaultModuleInfo.draw();
		drawEmptyModuleTable.draw();
		drawDefaultProgressBar.draw();
	}
};

module.exports = ApplicationView;