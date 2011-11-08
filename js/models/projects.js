/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.Collection.extend({
		model : Project,
		url : 'https://api.github.com/users/leonyu/repos?callback=?',
	       	sync : function (method, model, options) {
			options.dataType = 'jsonp';
			return Backbone.sync(method, model, options);
		},
		parse : function (result) {
			var projects = [];
			$.each(result.data,function(i, repo){
				if (repo.name !== 'leonyu.github.com') {
					projects.push($.extend({'hasData' : true }, repo));
				}
			});
			return projects.sort(function(a, b){ return Array.prototype.sort(b.updated_at, a.updated_at); });
		}
	});
});
