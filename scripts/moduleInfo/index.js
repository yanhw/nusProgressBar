'use strict';

var selectedModule = null;
var anuglar = require("angular");

//For controller, need to shift with the controller
var moduleList = require("../../data/moduleList.json");
// var modules = require("../../data/modules.json");
var index = -1;
var descriptionText;

//var moduleInfoController = require("./controller/moduleInfoController.js");

var moduleInfo = {

	//Add event listeners
	setup : function() {

		//Module search bar button
		$("#module-info").on("click", '#module-search-bar-select', function(){
			var AppBody = require("../common/index.js");
		    var moduleCode =  $('#module-search-bar-box').val().toUpperCase();
	       	console.log("select button triggered! " + moduleCode);
            //$('.typeahead').typeahead('close');
	       	AppBody.request("moduleSearchBox", "select", moduleCode);
		});
        
        //Button on the options in dropdown window
		$("#module-info").on("click", '.tt-suggestion', function(){
			var AppBody = require("../common/index.js");
		    var moduleCode =  $('#module-search-bar-box').val().toUpperCase();
	       	console.log("select button triggered! " + moduleCode);

	       	AppBody.request("moduleSearchBox", "select", moduleCode);
		});
        
        //Module search bar button triggered by Enter key
        $("#module-info").on("keydown","#module-search-bar-box",function(event){
		   if(event.keyCode == 13){
	           var AppBody = require("../common/index.js");
	           var moduleCode =  $('#module-search-bar-box').val().toUpperCase();
	       	   $('#module-search-bar-box').typeahead('close');
	       	   console.log("select button triggered! " + moduleCode);
	    	   AppBody.request("moduleSearchBox", "select", moduleCode);
        	}
       });

		//Add module button
		$("#module-info").on("click", "#add-module-button", function(){

			var AppBody = require("../common/index.js");
		    var moduleCode =  selectedModule;    
	       	console.log($(this).html() + " button triggered! " + moduleCode);
	       	var state = $(this).html();
	       	AppBody.request("addModuleButton", state, moduleCode);
		});

		//Display full module description
		$("#module-info").on("click", "#show-more", function(e){
			var AppBody = require("../common/index.js");
			AppBody.request("showMoreButton", e, selectedModule);
		});

		//Hide full module description
		$("#module-info").on("click", ".hide-description", function(e){
			var AppBody = require("../common/index.js");
			AppBody.request("hideFullDescription", e, selectedModule);
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
		for (var i = 0; i < moduleList.length; i++) {
			if (moduleCode === moduleList[i]){
				index = i;
				isValidCode = true;
			}
		}

		if (!isValidCode){
			alert("Not Valid Module Code!");
			return false;
		}

		selectedModule = moduleCode;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/data/modules/"+moduleCode+".json", false);
		xhr.send();
		var moduleObject = JSON.parse(xhr.responseText);

		$(".module-info-head").html("<STRONG>"+moduleObject.moduleCode+"</STRONG>");
		$(".MC").html("<STRONG>" + moduleObject.moduleCredit + "</STRONG> MCs");
		$(".module-title").html("<STRONG>Title:</STRONG> " + moduleObject.moduleTitle);
		descriptionText = moduleObject.moduleDescription;
		var displayedText = descriptionText.substring(0,100);
		var index2 = 100;
		while ((index2 < 115) && (displayedText.charAt(displayedText.length-1) != ' ')) {
			displayedText += descriptionText.substring(index2, index2+1);
			index2++;
		}
		$(".description").html("<STRONG>Description:</STRONG> " + displayedText);
		$(".pre-requisites").html("<STRONG>Prerequisites:</STRONG> " + moduleObject.prerequisite);
		$(".preclusion").html("<STRONG>Preclusion:</STRONG> " + moduleObject.preclusion);

		var historyArray = moduleObject.history;
		var count1;
		var count2;
		var count3;
		var count4;
		var addArray = [0,0,0,0,0];
		var resultArray = [0,0,0,0];
		var countArray = [0,0,0,0];
		for (var i = 1; i <= 5; i++) {				//OMG, what did i just write...
			if (historyArray[i][1] !== 0) {
				countArray[0]++;
				addArray[i-1]++;
			}
			if (historyArray[i][2] !== 0) {
				countArray[1]++;
				addArray[i-1]++;
			}
			if (historyArray[i][3] !== 0) {
				countArray[2]++;
				addArray[i-1]++;
			}
			if (historyArray[i][4] !== 0) {
				countArray[3]++;
				addArray[i-1]++;
			}
		}

		var record = 5;
		for (var i = 0; i < 5; i++) {
			if (addArray[i] === 0)
				record--;
			else
				break;
		}

		var newModule = false;
		if (record <= 2)
			newModule = true;

		for (var i = 0; i < 4; i++) {
			if (countArray[i] === record)		//offered regularly
				resultArray[i] = 1;
			else if (countArray[i] === 0)		//not offered
				resultArray[i] = 2;
			else								//offered irregularly
				resultArray[i] = 3;
		}

		var string = "<STRONG>History:</STRONG> This module is ";

		if (resultArray[0] === 1)
			string += "offered regularly in Semester 1; ";
		else if (resultArray[0] === 2)
			string += "not offered in Semester 1; ";
		else
			string += "offered irregularly in Semester 1; ";

		if (resultArray[1] === 1)
			string += "offered regularly in Semester 2; ";
		else if (resultArray[1] === 2)
			string += "not offered in Semester 2; ";
		else
			string += "offered irregularly in Semester 2; ";

		if (resultArray[2] === 1)
			string += "offered regularly in Special Term 1; ";
		else if (resultArray[2] === 2)
			string += "not offered in Special Term 1; ";
		else
			string += "offered irregularly in Special Term 1; ";

		if (resultArray[3] === 1)
			string += "offered regularly in Special Term 2; ";
		else if (resultArray[3] === 2)
			string += "not offered in Special Term 2; ";
		else
			string += "offered irregularly in Special Term 2; ";

		string += "according to record from past " + record + " years.";

		if (newModule)
			string += " This might be a new module."

		$(".history").html(string);
		return true;
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
	},

	//Display full module description for selected module
	showFullDescription: function(e) {
		$("#full-module-description").text(descriptionText);
		var targeted_popup_class = jQuery($("#show-more")).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
	},

	//Hide full module description
	hideFullDescription: function(e) {
		var targeted_popup_class = jQuery($("#hide-description-button")).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	}
};

module.exports = moduleInfo;