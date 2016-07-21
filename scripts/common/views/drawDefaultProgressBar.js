'use strict';

var drawDefaultProgressBar = {
	draw: function () {
		$(".remove-me-progress-bar").remove();

		$("#progress-bar").append("<progress class='progress progress-striped progress-info' id='the-progress-bar' value='0' max='100'></progress>");
		$("#progress-bar").append("<div id='module-lists'> </div>");

		// $('#progress-bar').load("./scripts/common/views/progressBar.html");
	}
};

module.exports = drawDefaultProgressBar;