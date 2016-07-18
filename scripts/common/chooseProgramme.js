'use strict';

var ProgrammeList = require("../../data/ProgrammeList.json");

var hasAY = false;
var hasFaculty = false;
var AY;

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
		var facultyList = [];
		for (var i = 0; i < ProgrammeList.length; i++) {
			facultyList.push(ProgrammeList[i].facultyName);
		}
		for (var i = 0; i < facultyList.length; i++) {
			var string = "<option value='" + facultyList[i] + "'>" + facultyList[i] + "</option>";
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
		$("#button-area").on("click", ".AY-option", function() {
			AY = $(this).html();
			hasAY = true;
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

			//close window when click "Save Changes"
			var targeted_popup_class = jQuery($("#hide-programme-button")).attr('data-popup-close');
        	$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
		});
	}
};

module.exports = ChooseProgramme;
