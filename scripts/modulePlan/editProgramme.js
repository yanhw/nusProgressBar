'use strict';

//This script adds ULR to chosen programme
//Source: http://www.nus.edu.sg//registrar/general-education/pre2015/important-information-for-students.html
//        http://www.nus.edu.sg//registrar/general-education/pre2015/general-education-faqs.html
var editProgramme = {
	edit: function(programme) {
		if (programme.AY <= 2014) {
			switch (programme.faculty) {
				case "ENGINEERING":
				case "SCIENCE":
				case "SCHOOL OF COMPUTING":
					break;
				case "SCHOOL OF BUSINESS":
				case "ARTS & SOCIAL SCIENCES":
					break;
				case "SCHOOL OF DESIGN AND ENVIRONMENT":
					break;
			}
		}
		else if (programme.AY === 2014) {

		}
		else {

		}

		return programme;
	}
};

module.exports = editProgramme;