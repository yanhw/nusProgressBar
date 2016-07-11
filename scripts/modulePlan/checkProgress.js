'use strict';

// This algorithm is to run whenever there is changes in module plan.
// As a start, there are four steps (to be further developed)
// Step 1: Brute force matching between programme requirements and modules chossen. For each module, record all nodes that it matches to;
// Step 2: Fill up the modules to the programme by the order of rank of nodes, left over modules will be added to UE;
// Step 3: Trace the programme tree to mark fulfilled flag;
// Step 4: Generate outputs such as non-repeat list

var count;

var checkProgress = {
	check: function (modules, programme) {
		
		var count = 0;
		var moduleNodes = [];
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

		//Step 3
		traceTreeRecur(programme);

		return true;
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
		else
			programmeTreeNodes.push(array[i]);
	}
}

function traceTreeRecur(list) {

}

module.exports = checkProgress;