'use strict';

// Constructor for module unit
function ModuleUnit(module, semester) {
	this.module = module;
	this.semester = semester;
	this.getModuleCode = function getModuleCode() {
		return this.module.moduleCode;
	}
	this.getSemester = function () {
		return this.semester;
	}
}

//ModuleUnit.prototype.

module.exports = ModuleUnit;