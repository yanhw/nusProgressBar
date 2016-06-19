'use strict';

// var $ = require('jqurey')
var Handlebars = require('handlebars');
var fs = require('fs');

var drawDefaultModuleInfo = {
	draw : function() {
		//for debugging purpose
		$(".remove-me").remove();



		$('#module-info').load("./scripts/common/views/moduleInfo.html", function (){

			//Want to shift this call back function to moduleInfo/index.js
	    	var substringMatcher = function(strs) {
			  return function findMatches(q, cb) {
			    var matches, substringRegex;

			    // an array that will be populated with substring matches
			    matches = [];

			    // regex used to determine if a string contains the substring `q`
			    substringRegex = new RegExp(q, 'i');

			    // iterate through the pool of strings and for any string that
			    // contains the substring `q`, add it to the `matches` array
			    $.each(strs, function(i, str) {
			      if (substringRegex.test(str)) {
			        matches.push(str);
			      }
			    });

			    cb(matches);
			  };
			};

	    	$('#module-search-bar-box').typeahead({
			  hint: true,
			  highlight: true,
			  minLength: 1
			},
			{
			  name: 'moduleList',
			  source: substringMatcher(moduleList)
			});


		});

		//This block will be shifted to another js file

		var moduleList = require('../../../data/moduleList.json');


		var moduleInput = $('#module-search-bar-box');


	}
};

module.exports = drawDefaultModuleInfo;



