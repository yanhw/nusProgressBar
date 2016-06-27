'use strict';

var moduleList1 =[];
var moduleList2;
var moduleList3;
var moduleList4;

var progressBar = {
	setup: function(lists) {
		moduleList1 = lists[0].moduleCodes;
		moduleList2 = lists[1].moduleCodes;
		moduleList3 = lists[2].moduleCodes;
		moduleList4 = lists[3].moduleCodes;
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
};

module.exports = progressBar;