'use strict';

var editProgramme = {
	edit: function(programme, specialisation) {

		//I have no idea why this part is needed...
		for (var i = 0; i < programme.specialisations.length; i++) {
			for (var j = 0; j < programme.visibleLists.length; j++) {
				if ((programme.visibleLists[j] === programme.specialisations[i].listName) || (programme.visibleLists[j] === "UE") || (programme.visibleLists[j] === "FLR") || ((programme.visibleLists[j] === "ULR") && (programme.AY < 2015))) {
					programme.visibleLists.splice(j, 1);
					// if ((programme.visibleLists[j] === programme.specialisations[i].listName))
					// 	programme.mainList.splice(j, 1);
				}
			}
		}

		//Build specialisation to mainList
		if (specialisation !== "nil") {
			// console.log(specialisation);
			// console.log(programme.specialisations);
			for (var i = 0; i < programme.specialisations.length; i++) {
				if ((programme.specialisations[i].name === specialisation) && (programme.visibleLists[programme.mainList.length-1] !== specialisation)) {
					// programme.mainList.push(programme.specialisations[i]);
					programme.visibleLists.push(programme.specialisations[i].listName);
				}
			}
		}
		
		if (programme.faculty === "SCIENCE") {
			programme.visibleLists.push("FLR");
		}

		//Add ULR for 2014 and before
		if (programme.AY <= 2014) {
			programme.visibleLists.push("ULR")
		}
		//Add UE
		programme.visibleLists.push("UE");

		// console.log(programme.visibleLists);
		return programme;
	}
};

module.exports = editProgramme;