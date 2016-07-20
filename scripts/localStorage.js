'use strict';

var keepData{

	function saveModuleToLocalStorage(data) {
		var modules = [];
		modules = JSON.parse(localStorage.getItem('modules'));
		modules.push(data);
		localStorage.setItem('modules',JSON.stringify(modules))
	},


	function removeModuleFrLocalStorage(data){
		var modules = JSON.parse(localStorage.getItem("modules");
	    for (i=0; i< modules.length; i++)
	        if (modules[i].id == data) modules.splice(i,1);
	    localStorage["modules"] = JSON.stringify(modules);
	},

	function updateModuleToLocalStorage(oldData,newData){
		var modules = JSON.parse(localStorage.getItem("modules");
	    for (i=0; i< modules.length; i++)
	        if (modules[i].id == data) modules.splice(i,1);
	    modules.push(newData);
	    localStorage['modules'] = JSON.stringify(modules);
	},

	function retreive(){}

}

