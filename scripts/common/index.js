'use strict';

var ChooseProgramme = require("./chooseProgramme.js");
var ModuleTable = require("../moduleTable/index.js");
var ModuleInfo = require("../moduleInfo/index.js");
var ProgressBar = require("../progressBar/index.js");
var MessageArea = require("../messageArea/index.js");
var MyPlan = require("../modulePlan/modulePlan.js");

var AppliedMath = require("../../data/2015Bachelor of Science (Applied Mathematics).json");

var keepData = require("../localStorage.js");

var blocked = false;		//blocked is true when there is pop up windows in display
var hasProgramme = false;
var updatePackage = false;

var AppBody = {

	//Setup event listeners
	run: function(numCol){
		ModuleInfo.setup();
		ModuleTable.setup(numCol);
		ChooseProgramme.setup();

		//Use the line below if you want to refresh browser history
		//localStorage.setItem('modules', "[]");
		
		//keepData.retreiveCol();
		//keepData.retreiveProgramme();
		keepData.retreiveProgramme(ChooseProgramme);
		keepData.retreiveModules();

	},

	//Handle request from listeners.
	request: function(origin, type, data) {
		switch(origin) {

			//type = programmeObject, data = specialisation name
			case "saveProgramme" :
			    console.log('type');
			    console.log(type);
			    console.log('data');
			    console.log(data);
				var editedProgramme = MyPlan.saveAndEditProgramme(type, data);
				console.log('editedProgramme');
				ProgressBar.setup(editedProgramme);
				hasProgramme = true;
				if (hasProgramme) {
					updatePackage = MyPlan.getUpdate();
					ProgressBar.update(updatePackage);
					ModuleTable.refreshColour(updatePackage);
				}
				break;

			//type = "select", data = moduleCode
			case "moduleSearchBox" :
				if (blocked)
					return;
				console.log("search request recieved " + data);
				ModuleInfo.display(data);
				if (MyPlan.isInsidePlan(data)) {
					ModuleInfo.setButton("Remove");
					var target = ModuleTable.getTileByCode(data);
					var relatives = MyPlan.getRelatives(data);
					ModuleTable.select(target, relatives);
				}
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
						if ((!isInsidePlan)) {     		//isInsidePlan should always be false, to be removed in the future
							ModuleTable.standby(data);
						}
						// if (notPrecluded !== true) {
						// 	MessageArea.add(notPrecluded);
						// }
					}	
				}
				else {
					MyPlan.removeModule(data);
					var target = ModuleTable.getTileByCode(data);
					if (ModuleTable.hasSelected())
						ModuleTable.removeSelection(target);
					ModuleTable.removeModule(target);
					ModuleTable.refresh();
					ModuleInfo.setButton("Add");
					if (hasProgramme) {
						updatePackage = MyPlan.getUpdate();
						ProgressBar.update(updatePackage);
						ModuleTable.refreshColour(updatePackage);
					}

					var messagePackage = MyPlan.getMessages();
					MessageArea.display(messagePackage);
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

			//type = id of clicked tile, data = module code of standing by module
			case "addModuleToTile" :	
				if (blocked)
					return;			
				ModuleTable.removeStandby();
				// console.log('type');
				// console.log(type);
				var semester = ModuleTable.getSemesterByTileId(type);
				MyPlan.add(data,semester);
				ModuleTable.addModule(type, data); 
				ModuleTable.refresh();
				ModuleInfo.setButton("Remove");
				if (hasProgramme) {
					updatePackage = MyPlan.getUpdate();
					ProgressBar.update(updatePackage);
					ModuleTable.refreshColour(updatePackage);
				}

				var messagePackage = MyPlan.getMessages();
				MessageArea.display(messagePackage);
				break;

			//type = id of module tile, data = module code
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

			//type = selected module tile, data = id of target empty tile
			case "swapToEmptyTile" :
				if (blocked)
					return;
				var moduleCode = ModuleTable.getCodeByTile(type);
				ModuleTable.removeSelection(type);
				ModuleTable.removeModule(type);
				ModuleTable.addModule(data, moduleCode);		
				ModuleTable.refresh();		
				var semester = ModuleTable.getSemesterByTileId(data);
				MyPlan.changeSemester(moduleCode, semester);
				
				if (hasProgramme) {
					if (updatePackage === false)
						updatePackage = MyPlan.getUpdate();
					ModuleTable.refreshColour(updatePackage);
				}

				var messagePackage = MyPlan.getMessages();
				MessageArea.display(messagePackage);
				break;

			//type = selected module tile, data = id of target module tile
			case "swapToOccupiedTile" :
				if (blocked)
					return;
				var firstModuleCode = ModuleTable.getCodeByTile(type);
				var secondModuleCode = ModuleTable.getCodeByTile(data);
				var firstSemester = ModuleTable.getSemesterByTileId(type);
				var secondSemester = ModuleTable.getSemesterByTileId(data);
				ModuleTable.removeSelection(type);
				ModuleTable.removeModule(type);
				ModuleTable.removeModule(data);
				ModuleTable.addModule(type, secondModuleCode);
				ModuleTable.addModule(data, firstModuleCode);
				MyPlan.changeSemester(firstModuleCode, secondSemester);
				MyPlan.changeSemester(secondModuleCode, firstSemester);
				
				if (hasProgramme) {
					if (updatePackage === false)
						updatePackage = MyPlan.getUpdate();
					ModuleTable.refreshColour(updatePackage);
				}

				var messagePackage = MyPlan.getMessages();
				MessageArea.display(messagePackage);
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