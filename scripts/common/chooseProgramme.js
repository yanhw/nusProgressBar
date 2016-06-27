'use strict';


var ChooseProgramme = {
	//Add event listeners
	setup : function() {

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
