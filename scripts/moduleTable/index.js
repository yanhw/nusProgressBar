'use strict';

var standingByModule;
var isStandingBy = false;
var isSelected = false;
var selectedTile = null;
var SelectedModule = require("./view/selectedModule.js");

var moduleTable = {
	setup: function() {
		//Add module to vacant module tile in module table
		$("#module-table").on("click", '.active-module-tile', function() {
			if (isStandingBy) {
				var AppBody = require("../common/index.js");
				AppBody.request("addModuleToTile", this, standingByModule);
			}
			else{		//This should not happen
				alert("active-module-tile is present without isStandingBy!");
			}
		});

		//Click on occupied module tile
		$("#module-table").on("click", ".occupied-module-tile", function() {
			var moduleCode = $(this).html();
			var AppBody = require("../common/index.js");
			AppBody.request("selectThisModule", this, moduleCode);
		});

		//Click on selected module tile
		$("#module-table").on("click", ".selected-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("removeSelection", null, this);
		});

		//Click on an empty tile that is able to swap with current tile
		$("#module-table").on("click", ".avaliable-to-replace-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("swapToEmptyTile", selectedTile, this);
		});

		//Click on another occupied module tile that is able to swap with current tile
		$("#module-table").on("click", ".free-to-swap-module-tile", function() {
			var AppBody = require("../common/index.js");
			AppBody.request("swapToOccupiedTile", selectedTile, this);
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
	select: function(targetTile, relatives) {
		// SelectedModule.select(targetTile, relatives);
		if (isSelected) {
			alert("some other tile is selected");  		//This should not happen
		}
		else {
			$(targetTile).addClass("selected-module-tile");
			$(targetTile).removeClass("occupied-module-tile");
			selectedTile = targetTile;
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
	buildChildrenBlock: function(relatives) {
		var targetSem = $(selectedTile).parent(".semester");
		targetSem.after("<div class='children-block'></div>");
		$(".children-block").text(relatives);
	},

	//Return module code of required tile
	getCodeByTile: function(target) {
		return $(target).html();
	},

	//Return module-tile that holds the module
	getTileByCode: function(moduleCode) {
		var target;
		$(".module-tile").each(function () {
			if ($(this).html() === moduleCode) {
				target = this;
				// return this;			This should works but it does not and I have no idea why
			}
		});
		return target;
	},

	//Return semester that the tile is in
	getSemesterByTile: function(target) {
		var targetSem = $(target).parent(".semester");
		return targetSem.attr("id");
	},
	
	//This adds a module to target tile
	addModule: function(target, moduleCode) {
		$(target).addClass("occupied-module-tile");
		$(target).removeClass("empty-module-tile");
		$(target).text(moduleCode);
	},

	//This removes a module from target tile
	removeModule: function(target) {
		console.log($(target).html());
		$(target).addClass("empty-module-tile");
		$(target).removeClass("occupied-module-tile");
		$(target).text("");
	}
};

module.exports = moduleTable;