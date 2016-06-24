'use strict';

var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var MyPlan = require("../modulePlan/modulePlan.js")

var blocked = false;		//blocked is true when there is pop up windows in display

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
				if (blocked)
					return;
				console.log("search request recieved " + data);
				ModuleInfo.display(data);
				if (MyPlan.isInsidePlan(data))
					ModuleInfo.setButton("Remove");
				else {
					ModuleInfo.setButton("Add");
					if (ModuleTable.hasSelected()) {
						var selected = ModuleTable.getSelectedTile();
						ModuleTable.removeSelection(selected);
					}
				}
				break;

			//type = "Add" or "Remove", data = moduleCode
			case "addModuleButton" :
				if (blocked)
					return;
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

			//type = e, data = selectedModule
			case "showMoreButton" :
				if (blocked)
					return;
				if (data === null)
					return;				
				ModuleInfo.showFullDescription(type);
				blocked = true;
				
				break;

			//type = e, data = selectedModule
			case "hideFullDescription" :
				ModuleInfo.hideFullDescription(type);
				blocked = false;
				break;

			//type = clicked tile, data = module code of standing by module
			case "addModuleToTile" :	
				if (blocked)
					return;			
				ModuleTable.removeStandby();
				var semester = ModuleTable.getSemesterByTile(type);
				ModuleTable.addModule(type, data);
				MyPlan.add(data,semester);
				ModuleInfo.setButton("Remove");
				break;

			//type = module tile, data = module code
			case "selectThisModule" :
				if (blocked)
					return;
				var realtives = MyPlan.getRelatives(data);
				ModuleTable.select(type, realtives);
				ModuleInfo.display(data);
				ModuleInfo.setButton("Remove");
				break;

			//type = null, data = selected module tile
			case "removeSelection" :
				if (blocked)
					return;
				ModuleTable.removeSelection(data);
				break;

			//type = selected module tile, data = target empty tile
			case "swapToEmptyTile" :
				if (blocked)
					return;
				var moduleCode = ModuleTable.getCodeByTile(type);
				ModuleTable.removeSelection(type);
				ModuleTable.removeModule(type);
				ModuleTable.addModule(data, moduleCode);
				break;

			//type = selected module tile, data = target module tile
			case "swapToOccupiedTile" :
				if (blocked)
					return;
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