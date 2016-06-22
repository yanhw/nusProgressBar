'use strict';

var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var MyPlan = require("../modulePlan/modulePlan.js")

var AppBody = {
	run: function(){
		ModuleInfo.setup();
		ModuleTable.setup();
	},
	request: function(origin, type, data) {
		switch(origin) {
			case "moduleSearchBox" :
				console.log("search request recieved " + data);
				ModuleInfo.display(data);
				if (MyPlan.isInsidePlan(data))
					ModuleInfo.setButton("Remove");
				else
					ModuleInfo.setButton("Add");
				break;

			case "addModuleButton" :
				if (type === "Add") {
					var hasModule = ModuleInfo.hasModule();
					var isInsidePlan = MyPlan.isInsidePlan(data);
					if ((!isInsidePlan) && (hasModule)) {
						ModuleTable.standby(data);
					}
				}
				else {
					MyPlan.removeModule(data);
					var target = ModuleTable.getTileByCode(data);
					if (ModuleTable.hasSelected())
						ModuleTable.removeSelection(target);
					ModuleTable.removeModule(target);
					ModuleInfo.setButton("Add");
				}
				break;

			case "addModuleToTile" :				
				ModuleTable.removeStandby();
				var semester = ModuleTable.getSemesterByTile(type);
				ModuleTable.addModule(type, data);
				MyPlan.add(data,semester);
				ModuleInfo.setButton("Remove");
				break;

			case "selectThisModule" :
				var realtives = MyPlan.getRelatives(data);
				ModuleTable.select(type, realtives);
				ModuleInfo.display(data);
				ModuleInfo.setButton("Remove");
				break;

			case "removeSelection" :
				ModuleTable.removeSelection(data);
				break;

			case "swapToEmptyTile" :
				var moduleCode = ModuleTable.getCodeByTile(type);
				ModuleTable.removeSelection(type);
				ModuleTable.removeModule(type);
				ModuleTable.addModule(data, moduleCode);
				break;

			case "swapToOccupiedTile" :
				var firstModuleCode = ModuleTable.getCodeByTile(type);
				var secondModuleCode = ModuleTable.getCodeByTile(data);
				ModuleTable.removeSelection(type);
				ModuleTable.addModule(type, secondModuleCode);
				ModuleTable.addModule(data, firstModuleCode);
				break;

			default: 
				alert("unrecorded request!  " + origin);
		}
	}
}


module.exports = AppBody;