'use strict';

//Constructor for message
function Message (type, text, module) {
	this.type = type;
	this.text = text;
	this.module = module;

	this.getHTML = function getHTML () {
		var output = "<div class='message-tile once-off-message'>" + text;
		return output;
	}

	this.getType = function getType () {
		return type;
	}

	this.getText = function getText () {
		return getText;
	}

	this.getModule = function getModule () {
		return getModule;
	}
}

module.exports = Message;