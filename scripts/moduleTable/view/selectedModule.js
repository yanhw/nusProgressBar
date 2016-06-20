'use strict';

var ModuleTable = require("../index.js");  			//This line is not working, and I have no idea why
var selectedTile = null;

var selectedModule = {
	select: function(target, relatives) {
		var ModuleTable = require("../index.js");  	//This line works here, and I have no idea why

		if(ModuleTable.hasSelected()) {
			alert("some other tile is selected");
		}
		else {
			$(target).addClass("selected-module-tile");
			$(target).removeClass("occupied-module-tile");
			
		}
	}
};

module.exports = selectedModule;