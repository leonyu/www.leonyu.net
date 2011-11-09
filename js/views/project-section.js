/**
 * @author leonyu
 */

define(['models/project', 'views/BaseView'], function(Project, BaseView){
	return BaseView.extend({
		initialize : function () {
			if (!(this.model instanceof Project)){
				throw new Error('model must be an instance of Project'); 
			}
			this.render();
			this.bind('change', this.render, this);
		},
		
		tagName : 'section',
		template : '<hgroup><h2 class="name"></h2><h3 class="platform"></h3><h3 class="links"></h3></hgroup><p></p>',
	
		renderContent : function(){
			this.setState('content');
			var model = this.model.toJSON();
			$(this.el).html(this.template);
			$('.name',this.el).text(model.name);
			$('.platform',this.el).text(model.language);
			
                        if (model.homepage) {
                                $('.links', this.el).append($('<a class="testLink">Demonstration</a>').attr({ 'href' : model.homepage }));
                        }

                        if (model.html_url) {
				$('.links', this.el).append($('<a class="testLink">Source Code</a>').attr({ 'href' : model.html_url}));
                        }

                        $('p',this.el).text(model.description);
		}
	
	});
})
