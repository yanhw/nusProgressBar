'use strict';

// Meta settings here. To be added in the future.


var App = require('./app');

//define(function (require) {
//    var App = require('./app');

//    return function () {};
//});


App.start();

//show warning window
$(document).ready(function(){
	$('#warning-popup').show();
});
//Close popup
$("#warning-close").click(function(){
	$('#warning-popup').fadeOut(350);
});

console.log("I am at the end");
