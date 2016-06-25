'use strict';

var myModuleList;
var length;

var CheckPrerequisite = {
	check: function (requirement, moduleList) {
		myModuleList = moduleList;
		length = moduleList.length;
		return checkRecur(requirement);
	}
};

function checkRecur (requirement) {
	if (requirement === "nil")
		return true;
	else if (requirement.hasOwnProperty(" and ")) {
		return checkAnd(requirement[" and "]);
	}
	else if (requirement.hasOwnProperty(" or ")) {
		return checkOr(requirement[" or "]);
	}
	else {
		return checkModule(requirement);
	}
}

function checkAnd (requirement) {
	var count = 0;
	for (var i = 0; i < requirement.length; i++) {
		if (checkRecur(requirement[i]))
			count++;
	}
	if (count === requirement.length)
		return true;
	else
		return false;
}

function checkOr (requirement) {
	for (var i = 0; i < requirement.length; i++) {
		if (checkRecur(requirement[i]))
			return true;
	}
	return false;
}

function checkModule(requirement) {
	for (var i = 0; i < length; i++) {
		if (myModuleList[i] === requirement)
			return true;
	}
	return false;
}

module.exports = CheckPrerequisite;