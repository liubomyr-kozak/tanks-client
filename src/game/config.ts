export default ($injector) => {
	$injector.get('$routeProvider').when('/game', {
		templateUrl: './src/game/template.html'
	})
};