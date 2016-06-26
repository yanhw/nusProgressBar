'use strict';

// Constructor for module unit
function ModuleUnit(module, semester) {
	this.module = module;
	this.semester = semester;

	//Return module code
	this.getModuleCode = function getModuleCode() {
		return this.module.moduleCode;
	}

	//Return semester
	this.getSemester = function () {
		return this.semester;
	}

	//Return parsedPrerequisite
	this.getParsedPrerequisite = function() {
		return this.module.parsedPrerequisite;
	}
	
	//Change the semester of a module
	this.setSemester = function (sem) {
		this.semester = sem;
	}
	
	// //Check if preprequisite of this module is fullfilled
	// this.checkPrerequisiteStatus = function () {
	// 	requirement = this.module.parsedPrerequisite;
	// 	if (typeof requirement === "string")
	// 		return true;
	// 	else if (requirement.hasOwnProperty("AND")) {

	// 	}
	// 	else {

	// 	}
	// }
}

//ModuleUnit.prototype.

module.exports = ModuleUnit;