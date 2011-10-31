/**
 * @author leonyu
 */
define(['models/projects', 'views/portfolio'], function(Projects, Portfolio){
	var portfolio = new Portfolio({ model : new Projects(), el : '#portfolio' });
	portfolio.model.fetch();
	
	return { 'portfolio' : portfolio };
});
