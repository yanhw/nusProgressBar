'use strict';

var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var MyPlan = require("./modulePlan.js")

var AppBody = {
	run: function(){
		ModuleInfo.setup();
		ModuleTable.setup();
	},
	request: function(origin, type, data) {
		switch(origin) {
			case "moduleSearchBox" :
				console.log("requrest recieved" + data);
				ModuleInfo.display(data);
				break;
			case "addModuleButton" :
				var isInsidePlan = MyPlan.add(data);
				if (!isInsidePlan) {
					ModuleTable.standby(data);
				}
		}
	},


	test: "test"
}


module.exports = AppBody;