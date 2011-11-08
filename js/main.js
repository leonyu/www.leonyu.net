/**
 * @author leonyu
 */
require.config({
	baseUrl : 'js'
});

define(['controllers/portfolio'], function(Controller){
	return {
		'Controller' : Controller
	};
});
