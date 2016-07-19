'use strict';

var ProgrammeList = require("../../data/ProgrammeList.json");
var facultyObject;
var departmentObject;
var programmeObject;

var hasAY = false;
var hasFaculty = false;
var block = false;

var AY;
var faculty;
var department;
var programme;
var specialisation;

var ChooseProgramme = {
	//Add event listeners
	setup : function() {

		//Load year of admission
		for (var i = 2012; i < 2017; i++) {
			var string = "<option class='AY-option' value='" + i.toString() + "'>" + i.toString() + "</option>";
			$("#AY-choice").append(string);
		}
		$("#AY-choice").prop("selectedIndex", -1);

		//Load faculty choices
		var facultyList = ["Science", "Computing"];
		for (var i = 0; i < facultyList.length; i++) {
			var string = "<option class='faculty-option' value='" + facultyList[i] + "'>" + facultyList[i] + "</option>";
			$("#faculty-choice").append(string);
		}
		$("#faculty-choice").prop("selectedIndex", -1);

		//Open popup
		$("#button-area").on("click", "#programme-selecter", function(e){
			var targeted_popup_class = jQuery($("#programme-selecter")).attr('data-popup-open');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

	        e.preventDefault();
		});

		//Close popup
		$("#button-area").on("click", ".hide-programme", function(e){
			var targeted_popup_class = jQuery($("#hide-programme-button")).attr('data-popup-close');
        	$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
		});
		
		//Choose AY
		$("#AY-choice").change(function(){
    		AY = parseInt($(this).children(":selected").html());
    		hasAY = true;
    		update("AY");
    		block = false;
		});

		//Choose your faculty
		$("#faculty-choice").change(function() {
			faculty = $(this).children(":selected").html();
			hasFaculty = true;
			update("faculty");
			block = false;
		});

		//Choose your department
		$("#department-choice").change(function() {
			department = $(this).children(":selected").html();
			update("department");
			block = false;
		});

		//Choose your programme
		$("#programme-choice").change(function() {
			programme = $(this).children(":selected").html();
			update("programme");
			block = false;
		});

		//Choose your specialisation
		$("#specialisation--option").change(function() {
			specialisation = $(this).children(":selected").html();
			update("specialisation");
		});

		//Save your programme
		$("#save-programme").on("click", function(){
			var AppBody = require("./index.js");			
			AppBody.request("saveProgramme", programmeObject, specialisation);

			//close window when click "Save Changes"
			var targeted_popup_class = jQuery($("#hide-programme-button")).attr('data-popup-close');
        	$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
		});
	}
};

function update(triger) {
	if (block)
		return;
	block = true;
	switch (triger) {
		case "AY" :
		case "faculty" :
			if (hasFaculty && hasAY) {
				$(".department-option").each(function() {
					$(this).remove();
				});
				$(".programme-option").each(function() {
					$(this).remove();
				});
				$(".specialisation-option").each(function() {
					$(this).remove();
				});
				for (var i = 0; i < ProgrammeList[AY-2012].length; i++) {
					if (ProgrammeList[AY-2012][i].facultyName === faculty) {
						facultyObject = ProgrammeList[AY-2012][i];
						break;
					}
				}
				// var departmentList = [];
				for (var i = 0; i < facultyObject.departments.length; i++) {
					var string = "<option class='department-option' value='" + facultyObject.departments[i].departmentName + "'>" + facultyObject.departments[i].departmentName + "</option>";
					$("#department-choice").append(string);
				}
				$("#department-choice").prop("selectedIndex", -1);
				$("#programme-choice").prop("selectedIndex", -1);
				$("#specialisation-choice").prop("selectedIndex", -1);
			}
			break;

		case "department" :
			$(".programme-option").each(function() {
				$(this).remove();
			});
			$(".specialisation-option").each(function() {
				$(this).remove();
			});
			for (var i = 0; i < facultyObject.departments.length; i++) {
				if (facultyObject.departments[i].departmentName === department) {
					departmentObject = facultyObject.departments[i];
					break;
				}
			}
			for (var i = 0; i < departmentObject.programmes.length; i++) {
				var string = "<option class='programme-option' value='" + departmentObject.programmes[i].name + "'>" + departmentObject.programmes[i].name + "</option>";
				$("#programme-choice").append(string);
				console.log(string);
			}
			$("#programme-choice").prop("selectedIndex", -1);
			$("#specialisation-choice").prop("selectedIndex", -1);
			break;

		case "programme" :
			$(".specialisation-option").each(function() {
				$(this).remove();
			});
			var address = "/data/programmes/" + AY.toString() + faculty + department + programme + ".json";
			var xhr = new XMLHttpRequest();
			xhr.open("GET", address, false);
			xhr.send();
			programmeObject = JSON.parse(xhr.responseText);

			$("#specialisation-choice").append("<option class='programme-option' value='nil'>nil</option>");
			for (var i = 0; i < programmeObject.specialisations.length; i++) {
				console.log("aaa");
				var string = "<option class='specialisation-option' value='" + programmeObject.specialisations[i].name + "'>" + programmeObject.specialisations[i].name + "</option>";
				$("#specialisation-choice").append(string);
			}
	}
}


module.exports = ChooseProgramme;
