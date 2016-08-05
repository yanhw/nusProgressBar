'use strict';

var ModuleUnit = require("./moduleUnit.js");
var CheckPrerequisite = require("./checkPrerequisite.js");
var Relatives = require("./relative.js");
// var modules = require("../../data/modules.json");
var moduleList = require("../../data/moduleList.json");
var Message = require("../common/message.js");
var EditProgramme = require("./editProgramme.js");
var CheckProgress = require("./checkProgress.js");

var myProgramme;
var myModules = [];			//List of modules inside module table
var year;					//Year of matric
var programmes = [];		//List of programmes chosen
var numOfModules = 0;		//Number of modules inside module table
var precludedArray = [];	//Array of module code of precluded modules
var numOfPreclusions = 0;	//Number of modules inside preclusion array

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
		console.log("adding " + moduleCode + " to plan");
		var moduleToAdd = new ModuleUnit(getModuleByCode(moduleCode), semester);
//		console.log(getModuleByCode(moduleCode).moduleCode);
//		console.log(moduleToAdd.getModuleCode());
		if (myModules.length > numOfModules)
			myModules[numOfModules] = moduleToAdd;
		else
			myModules.push(moduleToAdd);
		numOfModules++;
		updatePreclusionArray("add", moduleCode);
		console.log(numOfModules);

	},

	//Generate and return update package
	getUpdate: function() {
		var moduleArray = getCodeArray(0, 20);
		var update = CheckProgress.check(moduleArray, myProgramme, precludedArray);
		// console.log(moduleArray);
		// console.log(update);
		// console.log(myProgramme);
		return update;
	},

	//Generate and return messate package
	getMessages: function() {
		var messagePackage = [];
		messagePackage = messagePackage.concat(checkAllPreclusionStatus());
		messagePackage = messagePackage.concat(checkAllPrerequisiteStatus());
		return messagePackage;
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
					// console.log(moduleCodeList[i]);
					break;
				}
			}
		}
		relatives.setChosenChildrenList(chosenChildrenList);
		return relatives;
	},

	//Remove a module from module plan. This should be the only point that removes module!
	removeModule: function(moduleCode) {
		updatePreclusionArray("remove", moduleCode);
		for (var i = 0; i < numOfModules; i++) {
			if (myModules[i].getModuleCode() === moduleCode) {
				myModules.splice(i, 1);
				break;
			}
		}
		numOfModules--;		
		console.log(numOfModules);
	},

	//Change semester of this module
	changeSemester: function(moduleCode, semester) {
		var thisModule = getModuleUnitByCode(moduleCode);
		thisModule.setSemester(semester);
	},

	//Saves the programme
	saveAndEditProgramme: function(programme, specialisation) {
		myProgramme = {};
		myProgramme = EditProgramme.edit(programme, specialisation);
		return myProgramme;
	}
};

//Check if a given module is precluded by any existing modules
function checkPreclusion(module, semester) {
	var targetModule = module.getModule();
	var notPrecluded = true;
	var scanningArray = getCodeArray(0, semester+1);
	for (var i = 0; i < targetModule.preclusionList.length; i++) {
		for (var j = 0; j < scanningArray.length; j++) {
			if ((targetModule.preclusionList[i] === scanningArray[j]) && (targetModule.moduleCode !== scanningArray[j]))
				notPrecluded = new Message("preclusion", [module.getModuleCode(), scanningArray[j]]);
		}
	}
	return notPrecluded;
}

//Check preclusion status for all modules in the module table
function checkAllPreclusionStatus() {
	var resultArray = [];
	for (var i = 0; i < numOfModules; i++) {
		var semester = myModules[i].getSemester();
		var result = checkPreclusion(myModules[i], semester);
		if (result !== true)
			resultArray.push(result);
	}
	return resultArray;
}

//Check if preprequisite of this module is fullfilled
function checkPrerequisiteStatus(module, semester) {
	var requirement = module.getModule().parsedPrerequisite;
	var moduleCodeList = getCodeArray(0, semester);
	var result = CheckPrerequisite.check(requirement, moduleCodeList);
	if (result === true)
		return result;
	else 
		return new Message("prerequisite", module.getModuleCode());
}

//Check prerequisite status for all modules in the module table
function checkAllPrerequisiteStatus() {
	var resultArray = [];
	for (var i = 0; i < numOfModules; i++) {
		var semester = myModules[i].getSemester();
		var result = checkPrerequisiteStatus(myModules[i], semester);
		if (result !== true)
			resultArray.push(result);
	}
	return resultArray;
}

function getModuleByCode (code) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/data/modules/"+code+".json", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function getModuleUnitByCode (code) {
	var targetModule;
	for (var i = 0; i < numOfModules; i++) {
		if (code === myModules[i].getModuleCode())
			targetModule = myModules[i];
	}
	return targetModule;
}

//Create an array of module codes, exclusive beginSemester and endSemester
function getCodeArray (beginSemester, endSemester) {
	var moduleCodeArray = [];
	for (var i = 0; i < numOfModules; i++) {
		if ((myModules[i].getSemester() > beginSemester) && (myModules[i].getSemester() < endSemester))
			moduleCodeArray.push(myModules[i].getModuleCode());
	}

	return moduleCodeArray;
}

//Update an array of module code of precluded modules
function updatePreclusionArray (type, code) {
	var preclusions = getModuleUnitByCode(code).getPreclusionList();
	if (type === "add") {
		for (var i = 0; i < preclusions.length; i++) {
			if (precludedArray.length > numOfPreclusions)
				precludedArray[numOfPreclusions] = preclusions[i];
			else
				precludedArray.push(preclusions[i]);
			numOfPreclusions++;
		}
	}
	else {
		for (var i = 0; i < preclusions.length; i++) {
			for (var j = 0; j < numOfPreclusions; j++) {
				if (preclusions[i] === precludedArray[j]) {
					precludedArray.splice(j, 1);
					numOfPreclusions--;
				}
			}
		}
	}
}

module.exports = modulePlan;