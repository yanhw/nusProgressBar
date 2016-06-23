'use strict';

var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var MyPlan = require("../modulePlan/modulePlan.js")

var AppBody = {

	//Setup event listeners
	run: function(){
		ModuleInfo.setup();
		ModuleTable.setup();
	},

	//Handle request from listeners.
	request: function(origin, type, data) {
		switch(origin) {

			//type = "select", data = moduleCode
			case "moduleSearchBox" :
				console.log("search request recieved " + data);
				ModuleInfo.display(data);
				if (MyPlan.isInsidePlan(data))
					ModuleInfo.setButton("Remove");
				else
					ModuleInfo.setButton("Add");
				break;

			//type = "Add" or "Remove", data = moduleCode
			case "addModuleButton" :
				if (type === "Add") {
					var hasModule = ModuleInfo.hasModule();
					if (hasModule) {
						var isInsidePlan = MyPlan.isInsidePlan(data);
						var notPrecluded = MyPlan.checkPreclusion(data);
						if ((!isInsidePlan) && (notPrecluded)) {     		//isInsidePlan should always be false, to be removed in the future
							ModuleTable.standby(data);
						}
						if (!notPrecluded) {
							alert("You cannot add " + data + " because it is precluded!");
						}
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

			//type = clicked tile, data = module code of standing by module
			case "addModuleToTile" :				
				ModuleTable.removeStandby();
				var semester = ModuleTable.getSemesterByTile(type);
				ModuleTable.addModule(type, data);
				MyPlan.add(data,semester);
				ModuleInfo.setButton("Remove");
				break;

			//type = module tile, data = module code
			case "selectThisModule" :
				var realtives = MyPlan.getRelatives(data);
				ModuleTable.select(type, realtives);
				ModuleInfo.display(data);
				ModuleInfo.setButton("Remove");
				break;

			//type = null, data = selected module tile
			case "removeSelection" :
				ModuleTable.removeSelection(data);
				break;

			//type = selected module tile, data = target empty tile
			case "swapToEmptyTile" :
				var moduleCode = ModuleTable.getCodeByTile(type);
				ModuleTable.removeSelection(type);
				ModuleTable.removeModule(type);
				ModuleTable.addModule(data, moduleCode);
				break;

			//type = selected module tile, data = target module tile
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