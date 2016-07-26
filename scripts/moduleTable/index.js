'use strict';

var standingByModule;					//module code of standing by module
var isStandingBy = false;				//flag for if there is any standing by module
var isSelected = false;					//flag for if module table is in selected mode
var selectedTile = null;				//tile for selected module
var selectedLockedTile = null;			//tile for selected locked module
var numCol = 5;							//number of module tiles displaced per semester

var SelectedModule = require("./view/selectedModule.js");
var KeepData = require("../localStorage.js");

var moduleTable = {
	setup: function() {
		//Add module to vacant module tile in module table
		$("#module-table").on("click", '.active-module-tile', function() {
			if (isStandingBy) {
				var AppBody = require("../common/index.js");
				AppBody.request("addModuleToTile", "#"+$(this).attr("id"), standingByModule);

			}
			else{		//This should not happen, debug if you see this!
				alert("active-module-tile is present without isStandingBy!");
			}
		});

		//Click on occupied module tile
		$("#module-table").on("click", ".occupied-module-tile", function() {
			// $("#message-area").append("<div class='messageBox'>Here we say something very important!</div> ");
			// setTimeout(function() {  
			// 	$('.messageBox').fadeOut('fast');  
			// }, 1000);
			var moduleCode = $(this).children(".tile-code").html();
			var AppBody = require("../common/index.js");
			AppBody.request("selectThisModule", "#"+$(this).attr("id"), moduleCode);
		});

		//Click on selected module tile
		$("#module-table").on("click", ".selected-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("removeSelection", null, "#"+$(this).attr("id"));

		});

		//Click on an empty tile that is able to swap with current tile
		$("#module-table").on("click", ".avaliable-to-replace-module-tile", function() {
		    var AppBody = require("../common/index.js");
			AppBody.request("swapToEmptyTile", selectedTile, "#"+$(this).attr("id"));
			
		});

		//Click on another occupied module tile that is able to swap with current tile
		$("#module-table").on("click", ".free-to-swap-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("swapToOccupiedTile", selectedTile, "#"+$(this).attr("id"));
		});

		//Click on locked module tile
		$("#module-table").on("click", ".locked-module-tile", function() {
			var moduleCode = $(this).html();
			var AppBody = require("../common/index.js");
			AppBody.request("selectLockedModule", moduleCode, this);
		});

		//Click on selected locked module tile
		$("#module-table").on("click", ".selected-locked-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("recoverLockedModule", $(selectedTile).children(".tile-code").html(), this);
		});

		
	},

	//Stand by to add a given module
	standby: function(moduleCode) {
		standingByModule = moduleCode;
		$(".empty-module-tile").each(function (){
			$(this).addClass("active-module-tile");
			$(this).removeClass("empty-module-tile");
		});
		isStandingBy = true;
	},

	//Convert empty tiles to normal state
	removeStandby: function() {
		$(".active-module-tile").each(function (){
			$(this).addClass("empty-module-tile");
			$(this).removeClass("active-module-tile");
		});
		isStandingBy = false;
	},

	//Select a module tile
	select: function(id, relatives) {
		// SelectedModule.select(targetTile, relatives);
		if (isSelected) {
			alert("some other tile is selected");  		//This should not happen
		}
		else {
			$(id).addClass("selected-module-tile");
			$(id).removeClass("occupied-module-tile");
			selectedTile = id;
			moduleTable.buildChildrenBlock(relatives);
			$(".empty-module-tile").each(function () {
				$(this).addClass("avaliable-to-replace-module-tile");
				$(this).removeClass("empty-module-tile");
			});
			$(".occupied-module-tile").each(function () {
				//This condition need to be modified!!
				if (true) {
					$(this).addClass("free-to-swap-module-tile");
					$(this).removeClass("occupied-module-tile");
				}
			});
			isSelected = true;
		}
	},

	//Check if there is any selected module
	hasSelected: function() {
		return isSelected;
	},

	//Returns selected tile
	getSelectedTile: function() {
		return selectedTile;
	},

	//Remove seleted status from target tile
	removeSelection: function(target) {
		$(".children-block").remove();
		$(target).addClass("occupied-module-tile");
		$(target).removeClass("selected-module-tile");
		$(".avaliable-to-replace-module-tile").each(function (){
			$(this).addClass("empty-module-tile");
			$(this).removeClass("avaliable-to-replace-module-tile");
		});
		$(".free-to-swap-module-tile").each(function (){
			$(this).addClass("occupied-module-tile");
			$(this).removeClass("free-to-swap-module-tile");
		});
		isSelected = false;
		selectedTile = null;
	},

	//Attach children block for a selected module
	//See scripts/modulePlan/relatives.js
	buildChildrenBlock: function(relatives) {
		var targetSem = $(selectedTile).parent(".semester");
		targetSem.after("<div class='children-block'></div>");
	    var lockedModules = relatives.getLockedModules();
		var MyPlan = require("../modulePlan/modulePlan.js");
		var countAlrAdded = 0;
		for (var i = 0; i < lockedModules.length; i++){
			if(MyPlan.isInsidePlan(lockedModules[i]))
				countAlrAdded++;
		}
		$(".children-block").css("height", ((lockedModules.length-countAlrAdded)/7+1)*60);
		for (var i = 0; i < lockedModules.length; i++) {
			if(!MyPlan.isInsidePlan(lockedModules[i])){
			    $(".children-block").append("<div class='locked-module-tile'>" + lockedModules[i] + "</div>");
			}
		}
	},

	//Select a locked module tile
	selectLockedModule: function(moduleCode, targetTile) {
		$(targetTile).addClass("selected-locked-module-tile");
		$(targetTile).removeClass("locked-module-tile");
	},

	//Remove selection on a locked module tile
	recoverLockedModule: function() {

		$(".selected-module-tile").each(function (){
			$(".selected-locked-module-tile").addClass("locked-module-tile");
			$(".selected-locked-module-tile").removeClass("selected-locked-module-tile");
		});
	},

	//Return module code of required tile
	getCodeByTile: function(target) {
		return $(target).children(".tile-code").html();
	},

	//Return module-tile that holds the module
	getTileByCode: function(moduleCode) {
		var target;
		$(".module-tile").each(function () {
			if ($(this).children(".tile-code").html() === moduleCode) {
				target = this;
				// return this;			This should works but it does not and I have no idea why
			}
		});
		return target;
	},

	//Return module-tile with id
	getTileById: function(id){
		return $(id);
	},

							    
	//Return semester that the tile is in
	getSemesterByTileId: function(id) {
		var targetSem = $(id).parent(".semester");
		var sem = targetSem.attr("id");
		return parseInt(sem.substring(1));
	},
	
	//This adds a module to target tile
	addModule: function(target, moduleCode) {
		
        KeepData.saveModuleToLocalStorage(moduleCode, target);
        $(target).addClass("occupied-module-tile");
		$(target).removeClass("empty-module-tile");
		$(target).append("<div class='tile-code'>"+moduleCode+"</div>");
	
	},

	//This removes a module from target tile
	removeModule: function(target) {
		//console.log($(target).html());
		var mod = moduleTable.getCodeByTile(target);
		$(target).addClass("empty-module-tile");
		$(target).removeClass("occupied-module-tile");
		$(target).children(".tile-code").remove();		
		KeepData.removeModuleFrLocalStorage(mod);
	},

	refresh: function () {
		var maxCount = 0;
		$(".semester").each(function() {
			var count = 0;
			$(this).children(".occupied-module-tile").each(function() {
				count++;
			});
			if (count > maxCount)
				maxCount = count;
		});

		if (maxCount === numCol) {  //">=" should work
			addCol();
			return;
		}

		var colFlag = true;
		while ((maxCount < numCol-1) && (numCol > 6) &&(colFlag === true)) {
			colFlag = false;
			var isFilled = false;
			var index = 0;
			$(".semester").each(function() {
				index = 0;
				$(this).children(".module-tile").each(function() {
					if ((index >= (numCol-2)) && ($(this).hasClass("occupied-module-tile")))
						isFilled = true;
					index++;
				});
			});
			if (!isFilled) {
				removeCol();
				colFlag = true;
			}
		}
	},

	refreshColour: function(updatePackage) {
		//Remove existing colours
		for (var i = 0; i < 8; i++) {
			var string = ".module-list-" + i.toString();
			$(string).each(function() {
				if ($(this).hasClass("module-tile"))
					$(this).removeClass(string.substring(1));
			});
		}

		//Add new colours
		$(".occupied-module-tile").each(function() {
			var code = $(this).children(".tile-code").html();
			var targetClass = "module-list-";
			var flag = false;
			for (var i = 0; i < updatePackage.chosenList.length; i++) {
				for (var j = 0; j < updatePackage.chosenList[i].length; j++) {
					if (updatePackage.chosenList[i][j] === code) {
						targetClass += (i+1).toString();
						flag = true;
						break;
					}
				}
				if (flag)
					break;
			}
			$(this).addClass(targetClass);
		});
	}
};



function addCol() {
	// $(".semester").each(function() {
	// $(".second-last-tile").each(function() {
	// 	$(this).removeClass("second-last-tile");
	// });
	$(".last-tile").each(function() {
		$(this).removeClass("last-tile");
		// $(this).addClass("second-last-tile");
	});
	$(".semester").append("<div class='module-tile last-tile empty-module-tile'>");
	numCol++;
	var i = 1;
	$(".last-tile").each(function() {
		$(this).attr("id", "s"+i+"t"+numCol);
		i++;
	})
	// });
	KeepData.updateColToLocalStorage('add');
	
}

function removeCol() {
	$(".last-tile").remove();
	$(".semester").each(function() {
		$(this).children().last().addClass("last-tile")
	});
	// $(".module-tile").each(function() {
	// 	if ($(this).is(":nth-last-child(2)"))
	// 		$(this.addClass("second-last-tile"));
	// });
	numCol--;

	KeepData.updateColToLocalStorage('remove');
}

module.exports = moduleTable;