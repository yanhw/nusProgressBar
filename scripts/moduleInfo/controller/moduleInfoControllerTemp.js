'use strict';

// var modules = require("../../../data/modules.json");

var app = angular.module("myApp", []);

app.controller('moduleInfoController',['$scope',function($scope) {

	$scope.moduleCode = modules[index].ModuleCode;
	$scope.mc = "4";
	console.log(modules[index].ModuleCode);
    $scope.plusOne = function(index) {
    	$scope.products[index].likes += 1;
	};

}]);
