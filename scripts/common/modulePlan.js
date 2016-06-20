'use strict';

var myModules = [];
var year;
var programmes = [];


var modulePlan = {

	isInsidePlan: function(moduleCode) {
		var isInsidePlan = false;
		for (var i = 0; i < myModules.length; i++) {
			if (moduleCode === myModules[i]) {
				isInsidePlan = true;
			}
		}
		if (isInsidePlan) {	
			alert(moduleCode + "is already inside your plan");
			return true;
		}
		else {
			return false;
		}
	},

	add: function(moduleCode) {
		myModules.push(moduleCode);
	},

	getRelatives: function(moduleCode) {
		return "a list of modules";
	},

	removeModule: function(moduleCode) {
		for (var i = 0; i < myModules.length; i++) {
			if (myModules[i] === moduleCode) {
				myModules.splice(i, 1);
				break;
			}
		}
	}
};

module.exports = modulePlan;