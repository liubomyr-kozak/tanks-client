interface Function  {
	Name?:String;
}
export function directive(name:string, values:string[]):any {
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
		directive.Name = name;
		return directive;
	};
}

export function inject(...values:string[]):any {
	return (target:Function) => {
		const inject:Function = (...args:any[]):Object => {
			return ((classConstructor:Function, args:any[], ctor:any):Object => {
				ctor.prototype = classConstructor.prototype;
				const child:Object = new ctor;
				const result:Object = classConstructor.apply(child, args);
				return typeof result === "object" ? result : child;
			})(target, args, () => {
				return null;
			});
		};
		inject.$inject = values;
		return inject;
	};
}

export function controller(name:string, values:string[]):any {
	return (target:Function) => {
		const controller:Function = (...args:any[]):Object => {
			return ((classConstructor:Function, args:any[], ctor:any):Object => {
				ctor.prototype = classConstructor.prototype;
				const child:Object = new ctor;
				const result:Object = classConstructor.apply(child, args);
				return typeof result === "object" ? result : child;
			})(target, args, () => {
				return null;
			});
		};
		controller.$inject = values;
		controller.Name = name;
		return controller;
	};
}

export function service(name:string, values:string[]):any {
	return (target:Function) => {
		const service:Function = (...args:any[]):Object => {
			return ((classConstructor:Function, args:any[], ctor:any):Object => {
				ctor.prototype = classConstructor.prototype;
				const child:Object = new ctor;
				const result:Object = classConstructor.apply(child, args);
				return typeof result === "object" ? result : child;
			})(target, args, () => {
				return null;
			});
		};
		service.$inject = values;
		service.Name = name;
		return service;
	};
}