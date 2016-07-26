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

var orId;
var trackedId;
var orCount;

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
		orId = 1;
		trackedId = [];

		var moduleNodes = [];	//In step 1 it is 2D array to match tree nodes with modules, then it becomes 1D array as flag for modules
		var length = modules.length;
		for (var i = 0; i < length; i++) {
			moduleNodes.push([]);
		}

		var programmeTreeNodes = [];
		for (var i = 0; i < programme.mainList.length; i++) {
			orCount = 0;
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
					if ((moduleNodes[i][j].rank === r) && (checkAndUpdateRestriction(modules[j]) && (notOnTrackedOr(moduleNodes[i][j])))) {
						moduleNodes[i][j].flag = true;
						if (moduleNodes[i][j].hasOwnProperty("orId")) {
							trackedId.push(moduleNodes[i][j].orId);
						}
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

		//Specialisation

		var hasSpecialisation = false;
		var specialisationIdx = -1;
		for (var i = 0; i < programme.visibleLists.length; i++) {
			for (var j = 0; j < programme.specialisations.length; j++) {
				if (programme.visibleLists[i] === programme.specialisations[j].listName){
					hasSpecialisation = true;
					specialisationIdx = j;
				}
			}
		}

		if (hasSpecialisation) {
			var moduleNodes2 = [];	//In step 1 it is 2D array to match tree nodes with modules, then it becomes 1D array as flag for modules
			var length = modules.length;
			var specialisationList = programme.specialisations[specialisationIdx].list;
			orId = 1;
			trackedId = [];
		
			for (var i = 0; i < length; i++) {
				moduleNodes2.push([]);
			}

			var specialisationTreeNodes = [];
			orCount = 0;
			buildTreeRecur(specialisationTreeNodes, specialisationList);

			//Step 1
			for (var i = 0; i < specialisationTreeNodes.length; i++) {
				for (var j = 0; j < modules.length; j++) {
					if (specialisationTreeNodes[i].code === modules[j]) {
						moduleNodes2[j].push(specialisationTreeNodes[i]);
						break;
					}
				}
			}
			
			//Step 2
			for (var r = 0; r <= 5; r++) {
				for (var i = 0; i < modules.length; i++) {
					if (moduleNodes2[i] === true)
						continue;
					for (var j = 0; j < moduleNodes2[i].length; j++) {
						if ((moduleNodes2[i][j].rank === r) &&(notOnTrackedOr(moduleNodes2[i][j]))) {
							moduleNodes2[i][j].flag = true;
							moduleNodes2[i] = true;
							break;
						}
					}
				}
				// console.log("r = " + r);
				// console.log(moduleNodes);
			}

			//Step 3			
			traceTreeRecur(specialisationList);
			updatePackage.chosenList.push([]);
			updatePackage.nonRepeatList.push([]);

			chosenListRecur(specialisationList, updatePackage.chosenList.length-1);
			nonRepeatListRecur(specialisationList, updatePackage.nonRepeatList.length-1);

		}	//end of specialisation



		//FLR for science
		if (programme.faculty === "SCIENCE"){
			var ownBasket = programme.FLR.ownBasket;
			var others = programme.FLR.others;
			var FLRArray = [];
			var basketCount = 0;
			var countArray = [0,0,0,0,0,0];
			
			//match modules for other baskets
			var restrictTo1 = false;
			for (var i = 0; i < moduleArray.length; i++) {							//each module in module list
				var matchedFLR = false;
				for (var j = 0; j < 5; j++) {										//each basket other than own basket
					for (var k = 0; k < others[j].length; k++) {					//each item in the basket
						
						if (matchScienceFLR(moduleArray[i], others[j][k])) {
							if ((countArray[j] <= 1) ||((countArray[j] === 2) && (restrictTo1 === false))) {
								FLRArray.push(moduleArray[i]);
								if (countArray[j] === 0)
									basketCount++;
								countArray[j]++;
								if (countArray[j] === 2)
									restrictTo1 = true;
								break;
							}
						}
						if (matchedFLR === true)
							break;													//go to next basket
					}
					if (matchedFLR === true)
						break;														//go to next module					
				}
			}

			//if not enough modules found, check ownbasket
			if (basketCount <= 3) {
				var matchownbasket = false;
				for (var i = 0; i < moduleArray.length; i++) {
					for (var j = 0; j < ownBasket.length; j++) {
						if (matchScienceFLR(moduleArray[i], ownBasket[j])) {
							FLRArray.push(moduleArray[i]);
							basketCount++;
							matchownbasket = true;
							break;
						}
					}
					if (matchownbasket)
						break;
				}
			}
			// console.log(FLRArray);
			//if still not enough, optimise among baskets, targeted at "CZ","FST", and "PR"
			//Just too annoying, i don't want to do it now...
			// var annoyingArray = ["CZ","FST","PR"];
			// for (var i = 0; i < 3; i++) {
			// 	var annoyingTarget = annoyingArray[i];
			// }

			//tally
			while (FLRArray.length > 4) {
				FLRArray.splice(FLRArray.length-1, 1);
			}
			updatePackage.chosenList.push(FLRArray);
		}

		//Pre-2015 ULR
		if (programme.AY < 2015) {
			var SS = [];
			var GEM = [];
			var Breadth = [];
			for (var i = 0; i < moduleArray.length; i++) {
				if ((moduleArray[i].substring(0,2) === "SS") && (SS.length === 0)) {
					SS.push(moduleArray[i]);
					continue;
				}
				else if ((moduleArray[i].substring(0,2) === "GE") && (moduleArray[i].charAt(2) !== 1)  && (moduleArray[i].charAt(2) !== 2)  && (moduleArray[i].charAt(2) !== 3)  && (moduleArray[i].charAt(2) !== 4) && (GEM.length < 2)) {					
					if (GEM.length === 1) {
						if (GEM[0].charAt(4) === 9)
							GEM.push(moduleArray[i]);
						else if (GEM[0].charAt(4) !== moduleArray[i].charAt(4)) {
							GEM.push(moduleArray[i]);
						}
						continue;
					}
					else if (GEM.length === 0) {
						GEM.push(moduleArray[i]);
						continue;
					}
				}
				else if ((outsideSci(moduleArray[i])) && (Breadth.length < 2))
					Breadth.push(moduleArray[i]);
			}

			updatePackage.chosenList.push([]);
			updatePackage.chosenList[updatePackage.chosenList.length-1] = updatePackage.chosenList[updatePackage.chosenList.length-1].concat(SS);
			updatePackage.chosenList[updatePackage.chosenList.length-1] = updatePackage.chosenList[updatePackage.chosenList.length-1].concat(GEM);
			updatePackage.chosenList[updatePackage.chosenList.length-1] = updatePackage.chosenList[updatePackage.chosenList.length-1].concat(Breadth);
			// console.log(updatePackage);
		}

		//UE, basically, just clean up everything else
		var UEArray = [];
		for (var i = 0; i < moduleArray.length; i++) {
			if (moduleNodes[i] !== true)
				UEArray.push(moduleArray[i]);
		}
		updatePackage.chosenList.push(UEArray);


		return updatePackage;
	}
};



function buildTreeRecur(programmeTreeNodes, list) {
	if (list.hasOwnProperty("and")) {
		list.fulfilled = false;
		var array = list.and;
		for (var i = 0; i < array.length; i++) {
			if ((array[i].hasOwnProperty("and")) || (array[i].hasOwnProperty("or")))
				buildTreeRecur(programmeTreeNodes,array[i]);
			else {
				array[i].flag = false;
				if (orCount > 0) {
					array[i].orId = orId;
				}
				programmeTreeNodes.push(array[i]);
			}
		}
	}
	else if (list.hasOwnProperty("or")) {
		list.fulfilled = false;
		if (orCount === 0)
			orId++;
		orCount++;
		var array = list.or;
		for (var i = 0; i < array.length; i++) {
			if ((array[i].hasOwnProperty("and")) || (array[i].hasOwnProperty("or")))
				buildTreeRecur(programmeTreeNodes,array[i]);
			else {
				array[i].flag = false;
				if (orCount > 0) {
					array[i].orId = orId;
				}
				programmeTreeNodes.push(array[i]);
			}
		}
		orCount--;
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
	// console.log(updatePackage);
	for (var i = 0; i < updatePackage.nonRepeatList[index].length; i++) {
		if (updatePackage.nonRepeatList[index][i] === moduleCode) {
			return false;
		}
	}
	return true;
}


//This has to be improved because it does not support one way preclusion
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

function matchScienceFLR(moduleCode, targetCode) {
	if (targetCode.length <= 5) {
		if ((moduleCode.substring(0,targetCode.length) === targetCode) && (!isNaN(moduleCode.charAt(targetCode.length))))
			return true;
		else
			return false;
	}
	else if (moduleCode === targetCode)
		return true;
	else 
		return false;
}

function notOnTrackedOr(moduleNode) {
	if (moduleNode.hasOwnProperty("orId")) {
		var target = moduleNode.orId;
		for (var i = 0; i < trackedId.length; i++) {
			if (target === trackedId[i])
				return false;
		}
	}
	return true;
}

function outsideSci(moduleCode) {
	var target = "";
	var i = 0;
	while ((moduleCode.charAt(i)!=="0") && (moduleCode.charAt(i)!=="1") && (moduleCode.charAt(i)!=="2")&& (moduleCode.charAt(i)!=="3")&& (moduleCode.charAt(i)!=="4")&& (moduleCode.charAt(i)!=="5")&& (moduleCode.charAt(i)!=="6")&& (moduleCode.charAt(i)!=="7")&& (moduleCode.charAt(i)!=="8")&& (moduleCode.charAt(i)!=="9")) {
		target += moduleCode.charAt(i);
		i++;
	}

	var sci = ["MA","ST","CZ","ST","QF","DSA","QF","ZB","CM","FST","PR","LSM","PC","SP","FMS", "GEM", "GEK", "GET","GES","GEH","GER","SSA","SSS"]
	for (var j = 0; j < sci.length; j++) {
		if (target === sci[j]) {
			console.log("false!!!!!");
			return false;
		}
	}
	return true;
}

module.exports = checkProgress;