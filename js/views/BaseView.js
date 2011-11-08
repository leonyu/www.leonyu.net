
define([], function() {
	'use strict';

	return Backbone.View.extend({
		setState : function (state) {
			this._contentViewState = state;
		},

		getState : function () {
			return this._contentViewState;
		},

		renderContent : function () {
			this.setState('content');
			$(this.el).text(JSON.stringify(this.model));
		},
		renderEmpty : function () {
			this.setState('empty');
			$(this.el).empty();
		},

		renderError : function (error) {
			this.setState('error');
			$(this.el).text(error);
		},

		renderBusy : function () {
			this.setState('busy');
			$(this.el).text('loading ' + this.model.id + '\u2026');
		},
		
		// Watch a model for change until something happens
		asyncRender : function (modelToBind) {
			var view = this;
			var callOnceSuccess = function(model) {
				this.unbind('change', callOnceSuccess).unbind('error', callOnceError);
				view.renderContent();
			};
			var callOnceError = function(model, xhr, options) {
				this.unbind('change', callOnceSuccess).unbind('error', callOnceError);
				view.renderError(xhr.responseText);
			};
			modelToBind.bind('change', callOnceSuccess).bind('error', callOnceError);
		},

		render : function () {
			this.renderModel(this.model);
		},
			
		renderModel: function(model){
			if (model == null) {
				this.renderEmpty();
			}
			else if (model instanceof Backbone.Model) {
				if (!model.get('hasData')) {
					this.renderBusy();
					this.asyncRender(model);
				}
				else {
					this.renderContent();
				}
			}
			else {
				this.renderContent();
			}
		}
	});
});

