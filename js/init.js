/**
 * @author leonyu
 */
require.config({
	baseUrl : 'js'
});

require(['controllers/portfolio'], function(Controller){
	window.Page = {
		'Controller' : Controller
	};
});
