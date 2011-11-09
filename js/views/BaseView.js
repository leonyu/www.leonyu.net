
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
			$(this.el).text('No Content');
		},

		renderError : function (error) {
			$(this.el).text(JSON.stringify(error));
		},

		renderBusy : function () {
			$(this.el).text('Loading ' + this.model.id + '\u2026');
		},

		_renderModelWrapper : function() {
			this.renderModel(this.model);
		},

		_renderErrorWrapper : function(error){
			this.setState('error');
			this.renderError(error);
		},

		// Watch a model for change until something happens
		bindEvents : function (model) {
			if (arguments.length == 0) {
				model = this.model;
			}
			if (model == null) {
				return;
			}
			if (model instanceof Backbone.Model) {
				model.bind('change', this._renderModelWrapper, this).bind('error', this._renderErrorWrapper, this);
			}
			else if (model instanceof Backbone.Collection) {
				model.bind('reset', this._renderModelWrapper, this).bind('error', this._renderErrorWrapper, this);
			}
			else {
				throw new Error('Model must be a Backbone.Model or Backbone.Collection');
			}
		},

		render : function () {
			this.renderModel(this.model);
			this.bindEvents(this.model);
		},
			
		renderModel: function(model){
			if (arguments.length == 0) {
				model = this.model;
			}

			if (model == null) {
				this.setState('empty');
				this.renderEmpty();
			}
			else if (model instanceof Backbone.Model) {
				if (model.isNew()) {
					this.setState('busy');
					this.renderBusy();
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

