'use strict';

var ProgrammeList = require("../../data/ProgrammeList.json");

var ChooseProgramme = {
	//Add event listeners
	setup : function() {

		//Load year of admission
		

		//Load faculty choices
		var facultyList = [];
		for (var i = 0; i < ProgrammeList.length; i++) {
			facultyList.push(ProgrammeList[i].facultyName);
		}
		for (var i = 0; i < facultyList.length; i++) {
			var string = "<option value='" + facultyList[i] + "'>" + facultyList[i] + "</option>";
			$("#faculty-choice").append(string);
		}

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

		//Choose your faculty
		
		//Choose your programme
		$("#save-programme").on("click", function(){
			var AppBody = require("./index.js");
			var sel = document.getElementById('programme-choice');
			var opt;
	        for ( var i = 0, len = sel.options.length; i < len; i++ ) {
	            opt = sel.options[i];
	            if ( opt.selected === true ) {
	                break;
	            }
	        }
			var programme = opt.value;
			console.log(programme);
			AppBody.request("saveProgramme", null, programme);
		});
	}
};

module.exports = ChooseProgramme;
