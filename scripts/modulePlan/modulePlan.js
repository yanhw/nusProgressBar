'use strict';

var ModuleUnit = require("./moduleUnit.js");
var modules = require("../../data/modules.json");
var moduleList = require("../../data/moduleList.json");

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
			alert(moduleCode + "is already inside your plan");
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
	},

	//Return other modules that are related to selected module
	getRelatives: function(moduleCode) {
		return "a list of modules";
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
					notPrecluded = false;
			}
		}

		return notPrecluded;
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

module.exports = modulePlan;