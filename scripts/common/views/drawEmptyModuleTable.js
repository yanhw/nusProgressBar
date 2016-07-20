'use strict';

var drawEmptyModuleTable = {
	draw: function() {
		//for debugging purpose
		$(".remove-me-module-table").remove();

		$("#module-table").load("./scripts/common/views/moduletable.html", function(){
	        var count= 1;
			$("#s1").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem1-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s2").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem2-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s3").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem3-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s4").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem4-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s5").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem5-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s6").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem6-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s7").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem7-id-" + count);
					count++;
				}
			});
			var count= 1;
			$("#s8").children().each(function(){
				if($(this).hasClass("module-tile")){
					$(this).attr("id","sem8-id-" + count);
					count++;
				}
			});
		});
	},
};

module.exports = drawEmptyModuleTable;