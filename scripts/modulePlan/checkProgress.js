'use strict';

// This algorithm is to run whenever there is changes in module plan.
// As a start, there are four steps (to be further developed)
// Step 1: Brute force matching between programme requirements and modules chossen. For each module, record all nodes that it matches to;
// Step 2: Fill up the modules to the programme by the order of rank of nodes, left over modules will be added to UE;
// Step 3: Trace the programme tree to mark fulfilled flag;
// Step 4: Generate outputs such as non-repeat list

var count;		//Number of modules counted towards programme requirement
var updatePackage;	//Update package for output

var checkProgress = {
	check: function (modules, programme) {
		
		count = 0;
		updatePackage = {};

		var moduleNodes = [];	//In step 1 it is 2D array to match tree nodes with modules, then it becomes 1D array as flag for modules
		var length = modules.length;
		for (var i = 0; i < length; i++) {
			moduleNodes.push([]);
		}

		var programmeTreeNodes = [];
		for (var i = 0; i < programme.mainList.length; i++) {
			buildTreeRecur(programmeTreeNodes, programme.mainList[i].list);
		}

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
					if (moduleNodes[i][j].rank === r) {
						moduleNodes[i][j].flag = true;
						moduleNodes[i] === true;
						break;
					}
				}
			}
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
		return updatePackage;
	}
};

function buildTreeRecur(programmeTreeNodes, list) {
	if (list.hasOwnProperty("and"))
		var array = list.and;
	if (list.hasOwnProperty("or"))
		var array = list.or;
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
	else if (list.hasOwnProperty("or"))
		return traceTreeOr(list);
	else return traceTreeModule(list);
}

function traceTreeAnd(list) {
	console.log("and");
	for (var i = 0; i < list.and.length; i++) {
		if (!traceTreeRecur(list.and[i]))
			return false;
	}
	list.fulfilled = true;
	return true;
}

function traceTreeOr(list) {
	for (var i = 0; i < list.or.length; i++) {
		if (traceTreeRecur(list.or[i])) {
			console.log("fulfilled");
			list.fulfilled = true;
			return true;
		}
	}
	return false;
}

function traceTreeModule(list) {
	if (list.flag === true) {
		console.log("found true flag");
		count++;
		return true;
	}
	else
		return false;
}

module.exports = checkProgress;