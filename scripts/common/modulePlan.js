'use strict';

var myModules = [];

var modulePlan = {
	year : null,
	degree : "default",

	add: function(moduleCode) {
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
			myModules.push(moduleCode);
			return false;
		}
	}
};

module.exports = modulePlan;