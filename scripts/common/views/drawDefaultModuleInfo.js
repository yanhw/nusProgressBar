'use strict';

// var $ = require('jqurey')
var Handlebars = require('handlebars');
var fs = require('fs');



var drawDefaultModuleInfo = {
	draw : function() {
		//for debugging purpose
		$(".remove-me").remove();

		$('#module-info').load("/scripts/common/views/moduleInfo.html");

		//This block will be shifted to another js file

		var moduleList = require('../../../data/moduleList.json');


	//	$('#module-search-bar-box').typeahead({source: moduleList});
		console.log("I am still alive");

		$(document).ready(function() {
			$('#module-search-bar-select').click(function(){
	        	var toAdd =  $('input[name=moudle-search-bar-box]').val();
	        	console.log("triggered!");
	        	$('.module-table').append('<div class="item">' + toAdd + '</div>');
	        });	
		});

        console.log("end of function!");
		//End of block

	}
};

module.exports = drawDefaultModuleInfo;



