/**
 * @author leonyu
 */

define([], function(){
	return Backbone.Model.extend({
		initialize : function (attr) {
			if (attr == null || attr.name == null) {
				throw new Error('Model has to be a project JSON.');
			}
		},
		sync : function(method, model, options){
			options.error('Not Supported');
		}
	});
});
