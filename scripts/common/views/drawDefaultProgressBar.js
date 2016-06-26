'use strict';

var drawDefaultProgressBar = {
	draw: function () {
		$(".remove-me-progress-bar").remove();
		$('#progress-bar').load("./scripts/common/views/progressBar.html");
	}
};

module.exports = drawDefaultProgressBar;