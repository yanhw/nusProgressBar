'use strict';



var progressBar = {
	setup: function(programme) {
		//Click on module-item to display module info. select the module if the module is inside module table
		$("#progress-bar").on("click", '.module-item', function(){
			var AppBody = require("../common/index.js");
		    var moduleCode =  $(this).html();
	       	console.log("select module from menu " + moduleCode);
	       	AppBody.request("moduleSearchBox", "select", moduleCode);
		});
	},


	update: function(updatePackage) {

		for(var i = 0; i < updatePackage.nonRepeatList.length; i++) {
			var chosenList = "#chosen-" + (i+1).toString();
			var avaliableList = "#avaliable-" + (i+1).toString();
			for (var j = 0; j < updatePackage.nonRepeatList[i].length; j++){
				$(avaliableList).append("<a class='dropdown-item module-item' href='#'>" + updatePackage.nonRepeatList[i][j] + "</a>");
			}
			for (var j = 0; j < updatePackage.chosenList[i].length; j++){
				$(chosenList).append("<a class='dropdown-item module-item' href='#'>" + updatePackage.chosenList[i][j] + "</a>");
			}
		}

		$("#the-progress-bar").val(updatePackage.count*100/40);

	}
};

module.exports = progressBar;