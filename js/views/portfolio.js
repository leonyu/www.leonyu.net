/**
 * @author leonyu
 */
define(['models/project', 'models/projects', 'views/project-section'], function(Project, Projects, Section){
	return Backbone.View.extend({
		initialize : function (attr) {
			if (attr.el == null){
				throw new Error('Must specify an element'); 
			}
			if (!(attr.model instanceof Projects)){
				throw new Error('model must be an instance of Projects'); 
			}
			view = this;
			
			this.model.bind('reset', function(){
				view.render();
			});
		},
		
		className : 'portfolio',
		
		buildSubsections : function () {
		},
		
		render : function () {
			$(this.el).empty();
			this.model.each(function(project, i){
				var subsection = new Section({ model : project });
				subsection.render();
				$(this.el).append(subsection.el);
			}, this);
		}
	});
})
