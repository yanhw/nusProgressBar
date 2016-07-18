'use strict';

var moduleList1 =[];
var moduleList2;
var moduleList3;
var moduleList4;

var addedModuleList1 =[];
var addedModuleList2 =[];
var addedModuleList3 =[];
var addedModuleList4 =[];

var checkProgress = require("../modulePlan/checkProgress.js")

var progressBar = {
	setup: function(programme) {
		moduleList1 = programme.mainList[1].nonRepeatList;
		moduleList2 = programme.mainList[2].nonRepeatList;
		moduleList3 = programme.mainList[3].nonRepeatList;
		moduleList4 = programme.mainList[4].nonRepeatList;
        console.log('progressbar initialised');
        console.log(programme);
        $("#avaliable-1").append("hello");

		for (var i = 0; i < moduleList1.length; i++)
			console.log(moduleList1[i])
			$("#avaliable-1").append(moduleList1[i]);
		for (var i = 0; i < moduleList2.length; i++)
			$("#avaliable-2").append(moduleList2[i]);
		for (var i = 0; i < moduleList3.length; i++)
			$("#avaliable-3").append(moduleList3[i]);
		for (var i = 0; i < moduleList4.length; i++)
			$("#avaliable-4").append(moduleList4[i]);

		$("#progress-bar").on("click", '.module-item', function(){
			var code = $(this).html();
			console.log(code);
			var AppBody = require("../common/index.js");
			AppBody.request("moduleSearchBox", "select", code);
		});
	},

	update: function(updatePackage) {
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

		$("#the-progress-bar").val(update.count*100/40);

		var found = false;
	}
};

module.exports = progressBar;