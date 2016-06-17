'use strict';

// Meta settings here. To be added in the future.


var App = require('./app');

//define(function (require) {
//    var App = require('./app');

//    return function () {};
//});


App.start();

console.log("I am at the end");

$(document).ready(function() {
	console.log("not triggered!");
		$('#module-search-bar-select').click(function(){
	        var toAdd =  $('input[name=moudle-search-bar-box]').val();
	        console.log("triggered!");
	 	$('.module-table').append('<div class="item">' + toAdd + '</div>');
	});	

	$('#module-search-bar-select').on('click', function() {
    	// TODO event handler logic
    	console.log("aaaaaa");
	});
});