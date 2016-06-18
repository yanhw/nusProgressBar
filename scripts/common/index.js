'use strict';

var ModuleInfo = require("../moduleInfo/index.js");

var AppBody = {
	run: function(){
		ModuleInfo.setup();

	
	},
	request: function(origin, type, data) {

	}
}


module.exports = AppBody;


