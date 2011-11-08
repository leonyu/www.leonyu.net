/**
 * @author leonyu
 */
define(['models/project', 'models/projects', 'views/project-section', 'views/BaseView'], function(Project, Projects, Section, BaseView){
	return BaseView.extend({
		initialize : function (attr) {
			if (!(this.model instanceof Projects)){
				throw new Error('model must be an instance of Projects'); 
			}
			
			this.render();
                        this.model.bind('reset', function(){ this.render(); }, this);
		},
		
		className : 'portfolio',
		
		renderOne : function(project){
			console.log(project);
			var subsection = new Section({model: project});
			subsection.render();
			$(this.el).append(subsection.el);
		},

		// Render all of the elements in the collection
		renderAll : function () {
			$(this.el).empty();
			this.model.each(function(project, i){ this.renderOne(project); }, this);
		},
		
		render : function () {
			this.renderAll();
		}
	});
})
