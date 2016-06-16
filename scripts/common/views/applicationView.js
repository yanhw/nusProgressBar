'use strict';

var drawDefaultProgressBar = require('./drawDefaultProgressBar');
var drawEmptyModuleTable = require('./drawEmptyModuleTable');
var drawDeafaultModuleInfo = require('./drawDeafaultModuleInfo');

var ApplicationView = {
	initialise: function(){
		drawDeafaultModuleInfo.draw();
	}
};

module.exports = ApplicationView;