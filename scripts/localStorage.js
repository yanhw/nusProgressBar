'use strict';

var keepData = {
/*
	Storage.prototype.setObj: function(key, obj) {
        return this.setItem(key, JSON.stringify(obj));
    },

    Storage.prototype.getObj: function(key) {
        return JSON.parse(this.getItem(key));
    },
*/
	saveModuleToLocalStorage: function(mod, tile) {
		var tiles = tile.outerHTML;
		var modObj = {"mod": mod, "tile": tiles};
		//console.log("tile");
		//console.log(tile);
		//console.log(tiles);
		var modules = [];
		console.log(localStorage.getItem('modules'));
		if(localStorage.getItem('modules')!=null){
		    modules = JSON.parse(localStorage.getItem('modules'));
		    //console.log("stored modules");
		    //console.log(modules);
		    
		}
		modules.push(modObj);
		localStorage.setItem('modules',JSON.stringify(modules));
		var nowMod = JSON.parse(localStorage.getItem('modules'));
		console.log("saved");
		console.log(nowMod);
	},


	removeModuleFrLocalStorage: function(data){
		var modules = JSON.parse(localStorage.getItem("modules"));
	    var rem;
	    for (var i=0; i< modules.length; i++){
	    	rem = modules[i];
	        if (rem.mod == data) {
	        	console.log("removed!");
	        	modules.splice(i,1);
	        	break;
	        }
	    }
	    localStorage["modules"] = JSON.stringify(modules);
	    console.log('module removed');
	    console.log(modules);
	},

	retreiveModules: function(){
		//localStorage.clear();
		console.log("retriving last moduleTable");
		var modules = [];
		if(localStorage.length!=0){
	        modules = JSON.parse(localStorage.getItem('modules'));
	        console.log(modules);
            var AppBody = require("./common/index.js");
            var ModuleTable = require("./moduleTable/index.js");

	        for(var i=0; i<modules.length; i++){
	        	var moduleCode = modules[i].mod;
	        	console.log(moduleCode + "retreived");
	        	var elements = modules[i].tile;
                
	        	var target = ModuleTable.getTileByHtml(elements);
	        	console.log("tile retreived");
                console.log(elements);
                //AppBody.request("addModuleToTile", elements, moduleCode);
				AppBody.request("addModuleToTile", target, moduleCode);
			}
	    }
	}

}

module.exports = keepData;