'use strict';

var editProgramme = {
	edit: function(programme, specialisation) {

		//I have no idea why this part is needed...
		for (var i = 0; i < programme.specialisations.length; i++) {
			for (var j = 0; j < programme.mainList.length; j++) {
				if (programme.visibleLists[j] === programme.specialisations[i].listName) {
					programme.visibleLists.splice(j, 1);
					programme.mainList.splice(j, 1);
					break;
				}
			}
		}

		//Build specialisation to mainList
		if (specialisation !== "nil") {
			// console.log(specialisation);
			// console.log(programme.specialisations);
			for (var i = 0; i < programme.specialisations.length; i++) {
				if ((programme.specialisations[i].name === specialisation) && (programme.visibleLists[programme.mainList.length-1] !== specialisation)) {
					programme.mainList.push(programme.specialisations[i]);
					programme.visibleLists.push(programme.specialisations[i].listName);
				}
			}
		}
		return programme;
	}
};

module.exports = editProgramme;