/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.Collection.extend({
		model : Project,
		url : 'https://api.github.com/users/leonyu/repos?callback=?',
		comparator : function(project) {
			return -parseInt(project.get('pushed_at').replace(/\D/g,''));
		},
	       	sync : function (method, model, options) {
			options.dataType = 'jsonp';
			return Backbone.sync(method, model, options);
		},
		parse : function (result) {
			var projects = [];
			$.each(result.data,function(i, repo){
				switch(repo.name) {
					case 'leonyu.github.com':
					case 'leonyu.net':
						break;
					default:
						projects.push($.extend({'hasData' : true }, repo));
						break;
				}
			});
			return projects;
		}
	});
});
