'use strict';

var messgaeList = [];

var messageArea = {
	setup: function() {

	},

	add: function(message) {
		removeOnceOff();
		console.log("add message");
		$("#message-area").append(message.getHTML());
	},

	display: function(messages) {

	}
};

function removeOnceOff () {
	$(".once-off-message").each(function() {
		$(this).remove();
	});
}

module.exports = messageArea;