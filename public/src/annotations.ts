// thanx to Valentyn Shybanov <olostan>
interface Function {
    (...any):any;
    $inject?: any;
    injectableType?: string;
    injectableName?: string;
}
function injector(type:string, name:string, values:string[]):any {
    return (target:Function) => {
        const directive:Function = (...args:any[]):Object => {
            return ((classConstructor:Function, args:any[], ctor:any):Object => {
                ctor.prototype = classConstructor.prototype;
                const child:Object = new ctor;
                const result:Object = classConstructor.apply(child, args);
                return typeof result === "object" ? result : child;
            })(target, args, () => {
                return null;
            });
        };
        directive.$inject = values;
        if (name) directive.injectableName = name;
        if (type) directive.injectableType = type;
        return directive;
    };
}

var inject = injector.bind(null, null, null);
var service = injector.bind(null, "service");
var factory = injector.bind(null, "factory");
var directive = injector.bind(null, "directive");
var controller = injector.bind(null, "controller");

function register(module:ng.IModule, o:Function) {
    var registrant = module[o.injectableType];
    if (!registrant) throw `Unknown injectable type '${o.injectableType}' for '${o.injectableName}'`;
    registrant.call(module, o.injectableName, o);
}

export {inject, service, factory, directive, controller, register};