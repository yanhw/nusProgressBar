'use strict';

var ChooseProgramme = require("./chooseProgramme.js");
var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var ProgressBar = require("../progressBar/index.js");
var MessageArea = require("../messageArea/index.js");
var MyPlan = require("../modulePlan/modulePlan.js");

var AppliedMath = require("../../data/Bachelor of Science (Applied Mathematics).json");

var blocked = false;		//blocked is true when there is pop up windows in display

var AppBody = {

	//Setup event listeners
	run: function(){
		ModuleInfo.setup();
		ModuleTable.setup();
		ChooseProgramme.setup();
		// ProgressBar.setup(programme);
	},

	//Handle request from listeners.
	request: function(origin, type, data) {
		switch(origin) {

			//type = null, data = programme name
			case "saveProgramme" :
				var programme;
				for (var i = 0; i < 3; i++) {				
				// for (var i = 0; i < AppliedMath.specialisations.size(); i++) {

					if (AppliedMath.specialisations[i].specialisationName === data)
						programme = AppliedMath.specialisations[i].lists;
				}
				ProgressBar.setup(programme);
				MyPlan.saveProgramme(programme);
				break;

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
						if (ModuleTable.hasSelected()) {
							var selected = ModuleTable.getSelectedTile();
							ModuleTable.removeSelection(selected);
						}
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
				var tileClass = MyPlan.add(data,semester);
				ModuleTable.addModule(type, data, tileClass);
				ModuleInfo.setButton("Remove");
				var fulfilledPrerequisite = MyPlan.checkPrerequisiteStatus(data, semester);
				if (!fulfilledPrerequisite) {
					alert("You have not fulfilled the prerequisite of " + data + "!");
				}
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
				var semester = ModuleTable.getSemesterByTile(data);
				MyPlan.changeSemester(moduleCode, semester);
				var fulfilledPrerequisite = MyPlan.checkPrerequisiteStatus(moduleCode, semester);
				if (!fulfilledPrerequisite) {
					alert("You have not fulfilled the prerequisite of " + moduleCode + "!");
				}
				break;

			//type = selected module tile, data = target module tile
			case "swapToOccupiedTile" :
				if (blocked)
					return;
				var firstModuleCode = ModuleTable.getCodeByTile(type);
				var secondModuleCode = ModuleTable.getCodeByTile(data);
				var firstSemester = ModuleTable.getSemesterByTile(type);
				var secondSemester = ModuleTable.getSemesterByTile(data);
				ModuleTable.removeSelection(type);
				ModuleTable.addModule(type, secondModuleCode);
				ModuleTable.addModule(data, firstModuleCode);
				MyPlan.changeSemester(firstModuleCode, secondSemester);
				MyPlan.changeSemester(secondModuleCode, firstSemester);
				var fulfilledPrerequisite = MyPlan.checkPrerequisiteStatus(firstModuleCode, secondSemester);
				if (!fulfilledPrerequisite) {
					alert("You have not fulfilled the prerequisite of " + firstModuleCode + "!");
				}
				var fulfilledPrerequisite2 = MyPlan.checkPrerequisiteStatus(secondModuleCode, firstSemester);
				if (!fulfilledPrerequisite2) {
					alert("You have not fulfilled the prerequisite of " + secondModuleCode + "!");
				}
				break;

			//type = module code, data = locked module tile
			case "selectLockedModule" :
				if (blocked)
					return;

				ModuleTable.recoverLockedModule();
				var isRecorded = ModuleInfo.display(type);
				var isInsidePlan = MyPlan.isInsidePlan(type);
				if (!isInsidePlan)
					ModuleInfo.setButton("Add");
				if (isRecorded) {
					ModuleTable.selectLockedModule(type, data);
				}
				break;

			//type = selected module code, data = selected locked module tile
			case "recoverLockedModule" :
				if (blocked)
					return;
				ModuleTable.recoverLockedModule();
				ModuleInfo.setButton("Remove");
				ModuleInfo.display(type);
				break;

			//This should not happen, only trigered by spelling mistake
			default: 
				alert("unrecorded request!  " + origin);
		}
	}
}


module.exports = AppBody;