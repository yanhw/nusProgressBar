'use strict';

var drawEmptyModuleTable = {
	draw: function() {
		//for debugging purpose
		$(".remove-me-module-table").remove();

		$("#module-table").load("./scripts/common/views/moduletable.html");
	}
};

module.exports = drawEmptyModuleTable;