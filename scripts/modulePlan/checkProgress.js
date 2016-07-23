'use strict';

// This algorithm is to run whenever there is changes in module plan.
// As a start, there are four steps (to be further developed)
// Step 1: Brute force matching between programme requirements and modules chossen. For each module, record all nodes that it matches to;
// Step 2: Fill up the modules to the programme by the order of rank of nodes, left over modules will be added to UE;
// Step 3: Trace the programme tree to mark fulfilled flag;
// Step 4: Generate outputs such as non-repeat list

var count;			//Number of modules counted towards programme requirement
var updatePackage;	//Update package for output
// var fulfilledExclusive;

var moduleArray;
var preclusionArray;
var limitedArray;
var limitSize;
var limitCount;

var checkProgress = {
	check: function (modules, programme, preclusions) {
		
		moduleArray = modules;
		preclusionArray = preclusions;

		count = 0;
		updatePackage = {};

		limitedArray = [];
		limitCount = 0;
		limitSize = 0;
		if (programme.restriction.type === "cap") {
			limitedArray = programme.restriction.list;
			limitSize = programme.restriction.limit;
		}

		// fulfilledExclusive = [];
		

		var moduleNodes = [];	//In step 1 it is 2D array to match tree nodes with modules, then it becomes 1D array as flag for modules
		var length = modules.length;
		for (var i = 0; i < length; i++) {
			moduleNodes.push([]);
		}

		var programmeTreeNodes = [];
		for (var i = 0; i < programme.mainList.length; i++) {
			buildTreeRecur(programmeTreeNodes, programme.mainList[i].list);
		}

		var UE = [];

		//Step 1
		for (var i = 0; i < programmeTreeNodes.length; i++) {
			for (var j = 0; j < modules.length; j++) {
				if (programmeTreeNodes[i].code === modules[j]) {
					moduleNodes[j].push(programmeTreeNodes[i]);
					break;
				}
			}
		}
		
		//Step 2
		for (var r = 0; r <= 5; r++) {
			for (var i = 0; i < modules.length; i++) {
				if (moduleNodes[i] === true)
					continue;
				for (var j = 0; j < moduleNodes[i].length; j++) {
					if ((moduleNodes[i][j].rank === r) && (checkAndUpdateRestriction(modules[j]))) {
						moduleNodes[i][j].flag = true;
						moduleNodes[i] = true;
						break;
					}
				}
			}
			// console.log("r = " + r);
			// console.log(moduleNodes);
		}

		 // console.log("flag for ma1100: " + programme.mainList[0].list.and[0].or[0].or[0].flag);

		//Step 3
		var status = []
		for (var i = 0; i < programme.mainList.length; i++) {
			status.push(traceTreeRecur(programme.mainList[i].list));
		}

		//Step 4
		updatePackage.count = count;
		updatePackage.status = status;
        //2D array: each row is each div(1000,2000),each row has modules for that div
		updatePackage.nonRepeatList = [];
		updatePackage.chosenList = [];
		for (var i = 0; i < programme.mainList.length; i++) {
			updatePackage.nonRepeatList.push([]);
			updatePackage.chosenList.push([]);
		}

		for (var i = 0; i < programme.mainList.length; i++) {
			chosenListRecur(programme.mainList[i].list, i)
			nonRepeatListRecur(programme.mainList[i].list, i);
		}

		return updatePackage;
	}
};

function buildTreeRecur(programmeTreeNodes, list) {
	if (list.hasOwnProperty("and")) {
		list.fulfilled = false;
		var array = list.and;
	} 
	if (list.hasOwnProperty("or")) {
		list.fulfilled = false;
		var array = list.or;
	}
	for (var i = 0; i < array.length; i++) {
		if ((array[i].hasOwnProperty("and")) || (array[i].hasOwnProperty("or")))
			buildTreeRecur(programmeTreeNodes,array[i]);
		else {
			array[i].flag = false;
			programmeTreeNodes.push(array[i]);
		}
	}
}

function traceTreeRecur(list) {
	if (list.hasOwnProperty("and"))
		return traceTreeAnd(list);
	else if (list.hasOwnProperty("or")) {
		return traceTreeOr(list);
	}
	else return traceTreeModule(list);
}

function traceTreeAnd(list) {
	var flag = true;
	for (var i = 0; i < list.and.length; i++) {
		if (!traceTreeRecur(list.and[i]))
			flag = false;
	}
	if (flag === true)
		list.fulfilled = true;
	return flag;
}

function traceTreeOr(list) {
	for (var i = 0; i < list.or.length; i++) {
		if (traceTreeRecur(list.or[i])) {
			list.fulfilled = true;
			return true;
		}
	}
	return false;
}

function traceTreeModule(list) {
	if (list.flag === true) {
		count++;
		return true;
	}
	else
		return false;
}

function chosenListRecur(list, index) {
	if (list.hasOwnProperty("and"))
		chosenListAnd(list, index);
	else if (list.hasOwnProperty("or"))
		chosenListOr(list, index);
	else
		chosenListModule(list, index);
}

function chosenListAnd(list, index) {
	for (var i = 0; i < list.and.length; i++) {
		chosenListRecur(list.and[i], index);
	}
}

function chosenListOr(list, index) {
	if (list.fulfilled === false)
		return;
	else {
		// console.log(list.id);
		for (var i = 0; i < list.or.length; i++) {
			chosenListRecur(list.or[i], index);
		}
	}
}

function chosenListModule(list, index) {
	if (list.flag === true)
		updatePackage.chosenList[index].push(list.code);
}

function nonRepeatListRecur(list, index) {
	if (list.hasOwnProperty("and"))
		nonRepeatListAnd(list, index);
	else if (list.hasOwnProperty("or"))
		nonRepeatListOr(list, index);
	else
		nonRepeatListModule(list, index);
}

function nonRepeatListAnd(list, index) {
	if (list.fulfilled === true)
		return;
	else
		for (var i = 0; i < list.and.length; i++){
			nonRepeatListRecur(list.and[i], index)
		}
}

function nonRepeatListOr(list, index) {
	if (list.fulfilled === true)
		return;
	for (var i = 0; i < list.or.length; i++) {
		nonRepeatListRecur(list.or[i], index);
	}
}

function nonRepeatListModule(list, index) {
	if ((list.flag === false) && (!(search(list.code))) && (notPrecluded(list.code))) {
		if (nonRepeat(list.code, index)) {
			updatePackage.nonRepeatList[index].push(list.code);
		}
	}

}

function search(moduleCode) {
	for (var i = 0; i < moduleArray.length; i++) {
		if (moduleArray[i] === moduleCode) {
			return true;
		}
	}
	return false;
}

function nonRepeat(moduleCode, index) {
	for (var i = 0; i < updatePackage.nonRepeatList[index].length; i++) {
		if (updatePackage.nonRepeatList[index][i] === moduleCode) {
			return false;
		}
	}
	return true;
}

function notPrecluded(moduleCode) {
	for (var i = 0; i < preclusionArray.length; i++) {
		if (preclusionArray[i] === moduleCode)
			return false;
	}
	return true;
}

function checkAndUpdateRestriction(moduleCode) {
	var isInside = false;
	for (var i = 0; i < limitedArray.length; i++) {
		if (moduleCode === limitedArray[i])
			isInside = true;
	}
	if ((isInside) && (limitCount < limitSize)) {
		limitCount++;
		return true;
	}
	if ((isInside) && (limitCount >= limitSize)) {
		return false;
	}
	return true;
}

module.exports = checkProgress;