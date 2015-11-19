export var rootConfig = ($injector) => {
    $injector.get('$routeProvider').when('/', {
        templateUrl: './src/root/root-template.html'
    });
};