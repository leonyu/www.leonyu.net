/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.Collection.extend({
		model : Project,
		url : 'https://api.github.com/users/leonyu/repos?callback=?',
	       	sync : function (method, model, options) {
			options.dataType = 'jsonp';
		},
		parse : function (result) {
			var projects = $.map(result.data,function(repo){
				repo.hasData = true;
				return repo;
			});
			return projects;
		}
	});
});
