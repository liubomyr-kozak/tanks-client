export var gameConfig = ($injector) => {
    $injector.get('$routeProvider').when('/game', {
        templateUrl: './src/game/game-template.html'
    });
};