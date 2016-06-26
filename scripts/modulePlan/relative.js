'use strict';

function Relatives (module) {
	this.module = module;
	this.lockedModules = module.lockedModules;
	this.prerequisiteList = module.prerequisiteList;

	this.getLockedModules = function() {
		return this.lockedModules;
	}

	this.getPrerequisiteList = function() {
		return this.prerequisiteList;
	}
}

module.exports = Relatives;