
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
			$(this.el).text(JSON.stringify(this.model));
		},
		renderEmpty : function () {
			$(this.el).empty();
		},

		renderError : function (error) {
			$(this.el).text(error);
		},

		renderBusy : function () {
			$(this.el).text('loading ' + this.model.id + '\u2026');
		},
		
		// Watch a model for change until something happens
		asyncRender : function (modelToBind) {
			var callOnceSuccess = function(model) {
				this.setState('content');
				this.renderContent();
			};
			var callOnceError = function(model, xhr, options) {
				this.setState('error');
				this.renderError(xhr.responseText);
			};
			modelToBind.bind('change', callOnceSuccess, this).bind('error', callOnceError, this);
		},

		render : function () {
			this.renderModel(this.model);
		},
			
		renderModel: function(model){
			if (model == null) {
				this.setState('empty');
				this.renderEmpty();
			}
			else if (model instanceof Backbone.Model) {
				if (model.isNew()) {
					this.setState('busy');
					this.renderBusy();
					this.asyncRender(model);
				}
				else {
					this.setState('content');
					this.renderContent();
				}
			}
			else if (model instanceof Backbone.Collection) {
				if (model.length == 0) {
	                                this.setState('empty');
        	                        this.renderEmpty();
				}
				else {
                                	this.setState('content');
					this.renderContent();
				}
			}
			else {
				throw new Error('Model must be a Backbone.Model or Backbone.Collection');
				//this.setState('content');
				//this.renderContent();
			}
		}
	});
});

