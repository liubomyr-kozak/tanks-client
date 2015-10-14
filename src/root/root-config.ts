export default ($injector) => {
	$injector.get('$routeProvider').when('/', {
		templateUrl: './src/root/root-template.html'
	})
};