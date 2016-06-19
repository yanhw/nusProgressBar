'use strict';

var standingByModule;
var isStandingBy = false;

var moduleTable = {
	setup: function() {
		$("#module-table").on("click", '.active-module-tile', function(){
			console.log(isStandingBy);
			if (isStandingBy) {
				$(this).addClass("occupied-module-tile");
				$(this).removeClass("active-module-tile");
				$(this).text(standingByModule);

				$(".active-module-tile").each(function (){
					$(this).addClass("empty-module-tile");
					$(this).removeClass("active-module-tile");
				});
				isStandingBy = false;
			}
		});
	},

	standby: function(moduleCode) {
		standingByModule = moduleCode;
		console.log("standing by module table");
		$(".empty-module-tile").each(function (){
			$(this).addClass("active-module-tile");
			$(this).removeClass("empty-module-tile");
		});
		isStandingBy = true;
	}
};

module.exports = moduleTable;