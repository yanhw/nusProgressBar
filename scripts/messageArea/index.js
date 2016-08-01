'use strict';

var messageList = [];

var messageArea = {
	setup: function() {

	},

	// add: function(message) {
	// 	removeOnceOff();
	// 	console.log("add message");
	// 	$("#message-area").append(message.getHTML());
	// },

	display: function(messages) {
		$(".message-item").remove();
		messageList = messages;
		for (var i = 0; i < messageList.length; i++) {
			var string = "";
			switch (messageList[i].type) {
				case "prerequisite" :
					string = "<div class='message-item prerequisite-item alert alert-danger' role='alert' id='m"+i+"'>You have not fulfilled prerequisites of " + messageList[i].content + "</div>";
					break;
				case "preclusion" :
					string = "<div class='message-item preclusion-item alert alert-danger' role='alert' id='m"+i+"'>You cannot take "+messageList[i].content[0]+"because it is precluded by "+messageList[i].content[0]+"</div>";
					break;
				case "fulfillment" :
					break;
				case "specialisation" :
					break;
				case "heavyOverload" :
			}
			$("#message-area").append(string);
		}
	}
};

function removeOnceOff () {
	$(".once-off-message").each(function() {
		$(this).remove();
	});
}

module.exports = messageArea;