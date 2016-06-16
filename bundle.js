(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ApplicationView = require ("./common/views/applicationView");

var App = {
	start: function(){
		ApplicationView.initialise();
	}
};

module.exports = App;
},{"./common/views/applicationView":2}],2:[function(require,module,exports){
'use strict';

var drawDefaultProgressBar = require('./drawDefaultProgressBar');
var drawEmptyModuleTable = require('./drawEmptyModuleTable');
var drawDefaultModuleInfo = require('./drawDefaultModuleInfo');

var ApplicationView = {
	//Build default view for the enitre app
	initialise: function() {
		drawDefaultModuleInfo.draw();
	}
};

module.exports = ApplicationView;
},{"./drawDefaultModuleInfo":3,"./drawDefaultProgressBar":4,"./drawEmptyModuleTable":5}],3:[function(require,module,exports){
'use strict';

var drawDefaultModuleInfo = {
	draw : function() {
		$( ".remove-me" ).remove();
		var searchBar=$('<div class="input-group moudle-search-bar"><input type="text" class="form-control" placeholder="Enter module code or module name"><span class="input-group-btn"><button class="btn btn-default" type="button">Select</button></span></div>');
		$('#module-info').html(searchBar);
	}
};

module.exports = drawDefaultModuleInfo;
},{}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],6:[function(require,module,exports){
'use strict';

// Meta settings here. To be added in the future.


var App = require('./app');

//define(function (require) {
//    var App = require('./app');

//    return function () {};
//});


App.start();

},{"./app":1}]},{},[6]);
