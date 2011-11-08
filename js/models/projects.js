/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.Collection.extend({
		model : Project,
		url : 'portfolio.json',
		parse : function (result) {
			var projects = result.projects;
			for(var i = 0; i < projects.length; i++) {
				projects[i].hasData = true;
			}
			return projects;
		}
	});
});
