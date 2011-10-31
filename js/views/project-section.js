/**
 * @author leonyu
 */

define(['models/project'], function(Project){
	return Backbone.View.extend({
		initialize : function () {
			if (!(this.model instanceof Project)){
				throw new Error('model must be an instance of Project'); 
			}
		},
		
		tagName : 'section',
		
		template : '<hgroup><h2 class="name">{{name}}</h2><h3 class="platform">{{platform}}</h3><h3 class="links"></h3></hgroup><p>{{description}}</p><div class="linkContainer"></div>',
		testLinkTemplate : '<a class="testLink" href="{{url}}">{{text}}</a>',
		
		render : function () {
			var $template = $(Mustache.to_html(this.template, this.model.attributes));
			$(this.el).empty().append($template);
			
			var url = this.model.get('url');
			if (url) {
				$('.linkContainer', this.el).append(Mustache.to_html(this.testLinkTemplate, { url : url, text : 'Test Drive'}));
			}

			var download = this.model.get('download');
			if (download) {
				$('.linkContainer', this.el).append(Mustache.to_html(this.testLinkTemplate, { url : download, text : 'Source Code'}));
			}
		}
	});
})
