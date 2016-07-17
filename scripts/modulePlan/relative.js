'use strict';

function Relatives (module) {
	this.module = module;
	this.lockedModules = module.lockedModules;
	this.prerequisiteList = module.prerequisiteList;

	//Modules immediately unlocked by this module, including modules that are chosen
	this.getLockedModules = function() {
		return this.lockedModules;
	}

	//Modules involved in the full prerequisite tree of this module
	this.getPrerequisiteList = function() {
		return this.prerequisiteList;
	}

	// this.setChildrenList = function(moduleList) {
	// 	this.childrenList = moduleList;
	// }

	// this.getChildrenList = function() {
	// 	return this.childrenList;
	// }

	this.setChosenChildrenList = function(moduleList) {
		this.chosenChildrenList = moduleList;
	}

	//Modules chosen and depends on this module
	this.getChosenChildrenList = function() {
		return this.chosenChildrenList;
	}
}

module.exports = Relatives;