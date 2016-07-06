'use strict';

//Constructor for message
function Message (type, text, module) {
	this.type = type;
	this.text = text;
	this.module = module;

	this.getHTML = function getHTML () {
		var output = "<div class='message-tile'>" + text + "<\\div>"
		return output;
	}
}

module.exports = Message;