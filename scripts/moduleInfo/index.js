'use strict';

var moduleInfo = {
	setup : function() {

		//Module search bar button
		$("#module-info").on("click", '#module-search-bar-select', function(){
		    var toAdd =  $('#module-search-bar-box').val();
	       	console.log("select button triggered!");
	      	$('.module-table').append('<div class="item">' + toAdd + '</div>');
		});

		// $("module-info").on("")
	}
};

module.exports = moduleInfo;