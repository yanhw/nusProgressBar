'use strict';

var drawDefaultModuleInfo = {
	draw : function() {
		$( ".remove-me" ).remove();
		var searchBar=$('<div class="input-group moudle-search-bar"><input type="text" class="form-control" placeholder="Enter module code or module name"><span class="input-group-btn"><button class="btn btn-default" type="button">Select</button></span></div>');
		$('#module-info').html(searchBar);
	}
};

module.exports = drawDefaultModuleInfo;