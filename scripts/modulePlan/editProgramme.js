'use strict';

var editProgramme = {
	edit: function(programme, specialisation) {

		//Build specialisation to mainList
		if (specialisation !== "nil") {
			console.log(specialisation);
			console.log(programme.specialisations);
			for (var i = 0; i < programme.specialisations.length; i++) {
				if (programme.specialisations[i].name === specialisation) {
					programme.mainList.push(programme.specialisations[i]);
					programme.visibleLists.push(programme.specialisations[i].listName);
				}
			}
		}
		return programme;
	}
};

module.exports = editProgramme;