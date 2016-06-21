'use strict';

var selectedModule = null;
var anuglar = require("angular");

//For controller, need to shift with the controller
var moduleList = require("../../data/moduleList.json");
var modules = require("../../data/modules.json");
var index = -1;

//var moduleInfoController = require("./controller/moduleInfoController.js");

var moduleInfo = {

	//Add event listeners
	setup : function() {

		//Module search bar button
		$("#module-info").on("click", '#module-search-bar-select', function(){
			var AppBody = require("../common/index.js");
		    var moduleCode =  $('#module-search-bar-box').val();
	       	console.log("select button triggered! " + moduleCode);

	       	AppBody.request("moduleSearchBox", "select", moduleCode);
		});


		//Add module button
		$("#module-info").on("click", "#add-module-button", function(){

			var AppBody = require("../common/index.js");
		    var moduleCode =  selectedModule;    
	       	console.log($(this).html() + " button triggered! " + moduleCode);
	       	var state = $(this).html();
	       	AppBody.request("addModuleButton", state, moduleCode);
		});


		// //Module info display controller
		// var app = angular.module("myApp", []);

		// //moduleInfoController(app);

		// //-----------This part will be shifted to moduleInfoController.js---------------------------(temp abandended anjularjs)
		// app.controller('moduleInfoController',['$scope',function($scope) {

		// 	$scope.moduleCode = modules[index].ModuleCode;
		// 	$scope.mc = "4";
		// 	console.log(modules[index].ModuleCode);

		// }]);
		// //---------------------End of Controller---------------------------------------
	},

	//Display information for selected module (hard coded!)
	display : function(moduleCode) {
		var isValidCode = false;
		for (var i = 0; i < modules.length; i++) {
			if (moduleCode === moduleList[i]){
				index = i;
				isValidCode = true;
			}
		}

		if (!isValidCode){
			alert("Not Valid Module Code!");
			return;
		}

		selectedModule = moduleCode;
		$(".module-info-head").text(modules[index].moduleCode);
		$(".MC").text(modules[index].moduleCredit + " MCs");
		$(".module-title").text("Title: " + modules[index].moduleTitle);
		$(".description").text("Description: " + modules[index].moduleDescription);
		$(".preclusion").text("Preclusion: " + modules[index].preclusion);


	},

	//Check if there is any module in display
	hasModule: function() {
		if (selectedModule === null)
			return false;
		else
			return true;
	},

	//Set text for add module button
	setButton: function(state) {
			$("#add-module-button").text(state);
	}
};

module.exports = moduleInfo;