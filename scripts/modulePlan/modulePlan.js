'use strict';

var ModuleUnit = require("./moduleUnit.js");
var CheckPrerequisite = require("./checkPrerequisite.js");
var Relatives = require("./relative.js");
var modules = require("../../data/modules.json");
var moduleList = require("../../data/moduleList.json");
var Message = require("../common/message.js");
var EditProgramme = require("./editProgramme.js");
var CheckProgress = require("./checkProgress.js");

var myProgramme;
var myModules = [];			//List of modules inside module table
var year;					//Year of matric
var programmes = [];		//List of programmes chosen
var numOfModules = 0;		//Number of modules inside module table

var modulePlan = {

	//Check if a given module code is inside module table, return type: boolean
	isInsidePlan: function(moduleCode) {
		var isInsidePlan = false;
//		console.log(myModules.length);
		for (var i = 0; i < numOfModules; i++) {
			if (moduleCode === myModules[i].getModuleCode()) {
				isInsidePlan = true;
			}
//			console.log(myModules[i].moduleCode);
		}
		if (isInsidePlan) {	
			// alert(moduleCode + "is already inside your plan");
			return true;
		}
		else {
			return false;
		}
	},

	//Add a module to module plan. This should be the only point that adds module!
	add: function(moduleCode, semester) {
		var moduleToAdd = new ModuleUnit(getModuleByCode(moduleCode), semester);
//		console.log(getModuleByCode(moduleCode).moduleCode);
//		console.log(moduleToAdd.getModuleCode());
		if (myModules.length > numOfModules)
			myModules[numOfModules] = moduleToAdd;
		else
			myModules.push(moduleToAdd);
		numOfModules++;
		console.log(numOfModules);

		var moduleArray = getCodeArray(0, 20);
		var update = CheckProgress.check(moduleArray, myProgramme);

		$("#the-progress-bar").val(update.count*100/40);
		return "module-list-1";
	},

	//Return other modules that are related to selected module
	getRelatives: function(moduleCode) {
		var targetModule = getModuleByCode(moduleCode);
		var moduleCodeList = getCodeArray(getModuleUnitByCode(moduleCode).getSemester(), 20);
		var relatives = new Relatives(targetModule);

		var chosenChildrenList = [];
		for (var i = 0; i < moduleCodeList.length; i++) {
			var tempModule = getModuleByCode(moduleCodeList[i]);
			for (var j = 0; j < tempModule.prerequisiteList.length; j++) {
				if (tempModule.prerequisiteList[j] === moduleCode) {
					chosenChildrenList.push(moduleCodeList[i]);
					console.log(moduleCodeList[i]);
					break;
				}
			}
		}
		relatives.setChosenChildrenList(chosenChildrenList);
		return relatives;
	},

	//Remove a module from module plan. This should be the only point that removes module!
	removeModule: function(moduleCode) {
		for (var i = 0; i < numOfModules; i++) {
			if (myModules[i].getModuleCode() === moduleCode) {
				myModules.splice(i, 1);
				break;
			}
		}
		numOfModules--;
		console.log(numOfModules);
	},

	//Check if a given module is precluded by any existing modules
	checkPreclusion: function(moduleCode) {
		var targetModule = getModuleByCode(moduleCode);
		var notPrecluded = true;
		for (var i = 0; i < targetModule.preclusionList.length; i++) {
			for (var j = 0; j < numOfModules; j++) {
				if (targetModule.preclusionList[i] === myModules[j].getModuleCode())
					notPrecluded = new Message("warning", "You cannot add this module because it is precluded by " + myModules[j].getModuleCode(), moduleCode);
			}
		}

		return notPrecluded;
	},

	//Check if preprequisite of this module is fullfilled
	checkPrerequisiteStatus: function (moduleCode, semester) {
		var requirement = getModuleByCode(moduleCode).parsedPrerequisite;
		var moduleCodeList = getCodeArray(0, semester);
		var result = CheckPrerequisite.check(requirement, moduleCodeList);
		if (result === true)
			return result;
		else 
			return new Message("error", "You have not fullfilled prerequisite of" + moduleCode);
	},

	//Check prerequisite status for all modules in the module table
	checkAllPrerequisiteStatus: function() {
		for (var i = 0; i < numOfModules; i++) {
			var requirement = myModules[i].getParsedPrerequisite();
			var semester = myModules[i].getSemester();
			checkPrerequisiteStatus(requirement, semester);
		}
	},

	//Change semester of this module
	changeSemester: function(moduleCode, semester) {
		var thisModule = getModuleUnitByCode(moduleCode);
		thisModule.setSemester(semester);
	},

	//Saves the programme
	saveAndEditProgramme: function(programme) {
		myProgramme = EditProgramme.edit(programme);
		return myProgramme;
	}
};

//We need to change to binary search!
function getModuleByCode (code) {
	var index;
	for (var i = 0; i < moduleList.length; i++) {
		if (code === moduleList[i])
			index = i;
	}
	return modules[index];
}

function getModuleUnitByCode (code) {
	var targetModule;
	for (var i = 0; i < numOfModules; i++) {
		if (code === myModules[i].getModuleCode())
			targetModule = myModules[i];
	}
	return targetModule;
}

//Creaate an array of module codes, exclusive beginSemester and endSemester
function getCodeArray (beginSemester, endSemester) {
	var moduleCodeArray = [];
	for (var i = 0; i < numOfModules; i++) {
		if ((myModules[i].getSemester() > beginSemester) && (myModules[i].getSemester() < endSemester))
			moduleCodeArray.push(myModules[i].getModuleCode());
	}

	return moduleCodeArray;
}

module.exports = modulePlan;