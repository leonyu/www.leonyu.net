/**
 * @author leonyu
 */
define(['models/projects', 'views/portfolio'], function(Projects, Portfolio){
	var projects = new Projects();
	var portfolio = new Portfolio({ 'model' : projects, 'el' : '#portfolio' });
	projects.fetch();
	
	return { 'portfolio' : portfolio };
});
