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
			this.model.bind('error', function(){ this.renderError(); }, this);
		},

	       	tagName : 'div',
		className : 'portfolio',
		
		renderEmpty : function () {
			$(this.el).empty();
		},

		renderOne : function(project){
			var subsection = new Section({model: project});
			subsection.render();
			$(this.el).append(subsection.el);
		},

		// Render all of the elements in the collection
		renderContent : function () {
			$(this.el).empty();
			this.model.sort({silent: true}).each(function(project, i){ this.renderOne(project); }, this);
		}
	});
})
