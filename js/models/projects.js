/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.Collection.extend({
		model : Project,
		url : 'portfolio.json',
		parse : function (result) {
			return result.projects;
		}
	});
});
