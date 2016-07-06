'use strict';

var messgaeList = [];

var messageArea = {
	setup: function() {

	},

	add: function(message) {
		console.log("add message");
		$("#message-area").html(message.getHTML());
	},

	display: function(messages) {

	}
};

module.exports = messageArea;