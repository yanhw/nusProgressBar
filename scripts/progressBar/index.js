'use strict';

var moduleList1 =[];
var moduleList2;
var moduleList3;
var moduleList4;

var addedModuleList1 =[];
var addedModuleList2 =[];
var addedModuleList3 =[];
var addedModuleList4 =[];


var progressBar = {
	setup: function(programme) {
		moduleList1 = programme.mainList[0].nonRepeatList;
		moduleList2 = programme.mainList[2].nonRepeatList;
		moduleList3 = programme.mainList[3].nonRepeatList;
		moduleList4 = programme.mainList[4].nonRepeatList;

		for (var i = 0; i < moduleList1.length; i++)
			$("#avaliable-1").append("<a class='dropdown-item module-item' href='#'>" + moduleList1[i] + "</a>");
		for (var i = 0; i < moduleList2.length; i++)
			$("#avaliable-2").append("<a class='dropdown-item module-item' href='#'>" + moduleList2[i] + "</a>");
		for (var i = 0; i < moduleList3.length; i++)
			$("#avaliable-3").append("<a class='dropdown-item module-item' href='#'>" + moduleList3[i] + "</a>");
		for (var i = 0; i < moduleList4.length; i++)
			$("#avaliable-4").append("<a class='dropdown-item module-item' href='#'>" + moduleList4[i] + "</a>");

		$("#progress-bar").on("click", '.module-item', function(){
			var code = $(this).html();
			console.log(code);
			var AppBody = require("../common/index.js");
			AppBody.request("moduleSearchBox", "select", code);
		});
	}

	update: function(moduleCode, listNumber) {
		var targetList;
		var targetAddedList;
		switch (listNumber) {
			case "Level 1000": 
				targetList = moduleList1;
				targetAddedList = addedModuleList1;
				break;
			case "Level 2000": 
				targetList = moduleList2;
				targetAddedList = addedModuleList2;
				break;
			case "Level 3000": 
				targetList = moduleList3;
				targetAddedList = addedModuleList3;
				break;
			case "Level 4000": 
				targetList = moduleList4;
				targetAddedList = addedModuleList4;
				break;
		}

		var found = false;
		for ()
	}
};

module.exports = progressBar;