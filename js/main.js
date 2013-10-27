/**
 * @author leonyu
 */
require.config({
	baseUrl : ''
});

define(['controllers/portfolio'], function(Controller){
	return {
		'Controller' : Controller
	};
});
