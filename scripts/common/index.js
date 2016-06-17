'use strict';

var AppBody = {
	run: function(){
		$('#module-search-bar-select').click(function(){
	       	var toAdd =  $('input[name=moudle-search-bar-box]').val();
	       	console.log("triggered!");
	       	$('.module-table').append('<div class="item">' + toAdd + '</div>');
	    });	
		console.log("inside AppBody");
	},
	request: function(origin, type, data) {

	}
}


module.exports = AppBody;