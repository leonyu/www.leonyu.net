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
		template : '<hgroup><h2 class="name"></h2><h3 class="platform"></h3><ul class="links"></ul></hgroup><p></p>',
	
		renderContent : function(){
			this.setState('content');
			var model = this.model.toJSON();
			$(this.el).html(this.template);
			$('.name',this.el).text(model.name);
			$('.platform',this.el).text(model.language);
			
                        if (model.homepage) {
				var $a = $('<a class="testLink">Demonstration</a>').attr({ 'href' : model.homepage });
                                $('.links', this.el).append($('<li/>').append($a));
                        }

                        if (model.html_url) {
				var $a = $('<a class="testLink">Source Code</a>').attr({ 'href' : model.html_url});
                                $('.links', this.el).append($('<li/>').append($a));
                        }

                        $('p',this.el).text(model.description);
		}
	
	});
})
