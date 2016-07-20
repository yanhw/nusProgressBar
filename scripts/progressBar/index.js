'use strict';

// <li class="nav-item dropdown visible-list module-list-1">
//     <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Lvl 1000</a>
//     <div class="dropdown-menu scrollable-menu" role="menu">
//       	<a class="dropdown-item fixed-item" id="chosen-1" href="#">Chosen Modules:</a>
//       	<div class="dropdown-divider"></div>
//       	<a class="dropdown-item fixed-item" id="avaliable-1" href="#">Avaliable Modules:</a>
//     </div>
// </li>

var progressBar = {
	setup: function(programme) {
		//Click on module-item to display module info. select the module if the module is inside module table

		for (var i = 0; i < programme.mainList.length; i++) {
			var string = "<li class='nav-item dropdown visible-list module-list-" + (i+1).toString() + "'>";
			string += "<a class='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>" + programme.mainList[i].listName +"</a>";
			string += "<div class='dropdown-menu scrollable-menu' role='menu'>";
			string += "<a class='dropdown-item fixed-item' id='chosen-" + (i+1).toString() + "' href='#'>Chosen Modules:</a>";
			string += "<div class='dropdown-divider'></div>";
			string += "<a class='dropdown-item fixed-item' id='avaliable-" + (i+1).toString() +"' href='#'>Avaliable Modules:</a>";
			string += "</div>";
			string += "</li>";
			$("#module-lists").append(string);
		}


		$("#progress-bar").on("click", '.module-item', function(){
			var AppBody = require("../common/index.js");
		    var moduleCode =  $(this).html();
	       	console.log("select module from menu " + moduleCode);
	       	AppBody.request("moduleSearchBox", "select", moduleCode);
		});
	},


	update: function(updatePackage) {
		$(".module-item").each(function() {
			$(this).remove();
		})

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