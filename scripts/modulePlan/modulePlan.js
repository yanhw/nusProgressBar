'use strict';

var ModuleUnit = require("./moduleUnit.js");
var modules = require("../../data/modules.json");
var moduleList = require("../../data/moduleList.json");

var myModules = [];
var year;
var programmes = [];
var numOfModules = 0;

var modulePlan = {

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

	add: function(moduleCode, semester) {
		var moduleToAdd = new ModuleUnit(getModuleByCode(moduleCode), semester);
		console.log(getModuleByCode(moduleCode).moduleCode);
		console.log(moduleToAdd.getModuleCode());
		if (myModules.length > numOfModules)
			myModules[numOfModules] = moduleToAdd;
		else
			myModules.push(moduleToAdd);
		numOfModules++;
		console.log(numOfModules);
	},

	getRelatives: function(moduleCode) {
		return "a list of modules";
	},

	removeModule: function(moduleCode) {
		for (var i = 0; i < numOfModules; i++) {
			if (myModules[i].moduleCode === moduleCode) {
				myModules.splice(i, 1);
				break;
			}
		}
		numOfModules--;
		console.log(numOfModules);
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