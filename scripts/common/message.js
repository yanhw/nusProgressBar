'use strict';

//Constructor for message
function Message (type, content) {
	this.type = type;
	this.content = content;

	this.getType = function getType () {
		return type;
	}

	this.getContent = function getContent () {
		return content;
	}
}

module.exports = Message;