'use strict';

var drawDefaultProgressBar = require('./drawDefaultProgressBar');
var drawEmptyModuleTable = require('./drawEmptyModuleTable');
var drawDefaultModuleInfo = require('./drawDefaultModuleInfo');

var ApplicationView = {
	//Build default view for the enitre app
	initialise: function() {
		drawDefaultModuleInfo.draw();
		var numCol = drawEmptyModuleTable.draw();
		drawDefaultProgressBar.draw();
		return numCol;
	}
};

module.exports = ApplicationView;