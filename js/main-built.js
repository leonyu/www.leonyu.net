define("models/project",[],function(){return Backbone.Model.extend({initialize:function(a){if(this.get("name")==null)throw new Error("Model has to be a project JSON.")},sync:function(a,b,c){c.error("Not Supported")}})}),define("models/projects",["models/project"],function(a){return Backbone.Collection.extend({model:a,url:"https://api.github.com/users/leonyu/repos?callback=?",comparator:function(a){return-parseInt(a.get("pushed_at").replace(/\D/g,""))},sync:function(a,b,c){return c.dataType="jsonp",Backbone.sync(a,b,c)},parse:function(a){var b=[];return $.each(a.data,function(a,c){c.name!=="leonyu.github.com"&&b.push($.extend({hasData:!0},c))}),b}})}),define("views/BaseView",[],function(){return Backbone.View.extend({setState:function(a){this._contentViewState=a},getState:function(){return this._contentViewState},renderContent:function(){$(this.el).text(JSON.stringify(this.model))},renderEmpty:function(){$(this.el).text("No Content")},renderError:function(a){$(this.el).text(JSON.stringify(a))},renderBusy:function(){$(this.el).text("Loading "+this.model.id+"…")},_renderModelWrapper:function(){this.renderModel(this.model)},_renderErrorWrapper:function(a){this.setState("error"),this.renderError(a)},bindEvents:function(a){arguments.length==0&&(a=this.model);if(a==null)return;if(a instanceof Backbone.Model)a.bind("change",this._renderModelWrapper,this).bind("error",this._renderErrorWrapper,this);else if(a instanceof Backbone.Collection)a.bind("reset",this._renderModelWrapper,this).bind("error",this._renderErrorWrapper,this);else throw new Error("Model must be a Backbone.Model or Backbone.Collection")},render:function(){this.renderModel(this.model),this.bindEvents(this.model)},renderModel:function(a){arguments.length==0&&(a=this.model);if(a==null)this.setState("empty"),this.renderEmpty();else if(a instanceof Backbone.Model)a.isNew()?(this.setState("busy"),this.renderBusy()):(this.setState("content"),this.renderContent());else if(a instanceof Backbone.Collection)a.length==0?(this.setState("empty"),this.renderEmpty()):(this.setState("content"),this.renderContent());else throw new Error("Model must be a Backbone.Model or Backbone.Collection")}})}),define("views/project-section",["models/project","views/BaseView"],function(a,b){return b.extend({initialize:function(){if(this.model instanceof a)this.render(),this.bind("change",this.render,this);else throw new Error("model must be an instance of Project")},tagName:"section",template:'<hgroup><h2 class="name"></h2><h3 class="platform"></h3><h3 class="links"></h3></hgroup><p></p>',renderContent:function(){this.setState("content");var a=this.model.toJSON();$(this.el).html(this.template),$(".name",this.el).text(a.name),$(".platform",this.el).text(a.language),a.homepage&&$(".links",this.el).append($('<a class="testLink">Demonstration</a>').attr({href:a.homepage})),a.html_url&&$(".links",this.el).append($('<a class="testLink">Source Code</a>').attr({href:a.html_url})),$("p",this.el).text(a.description)}})}),define("views/portfolio",["models/project","models/projects","views/project-section","views/BaseView"],function(a,b,c,d){return d.extend({initialize:function(a){if(this.model instanceof b)this.render(),this.model.bind("reset",function(){this.render()},this),this.model.bind("error",function(){this.renderError()},this);else throw new Error("model must be an instance of Projects")},tagName:"div",className:"portfolio",renderEmpty:function(){$(this.el).empty()},renderOne:function(a){var b=new c({model:a});b.render(),$(this.el).append(b.el)},renderContent:function(){$(this.el).empty().removeClass("busy"),this.model.sort({silent:!0}).each(function(a,b){this.renderOne(a)},this)}})}),define("controllers/portfolio",["models/projects","views/portfolio"],function(a,b){var c=new a,d=new b({model:c,el:"#portfolio"});return c.fetch(),{portfolio:d}}),require.config({baseUrl:"js"}),define("main",["controllers/portfolio"],function(a){return{Controller:a}})