import {directive} from "../annotations";

@directive('gameViewport', ['$injector'])
export class ViewportDirective implements ng.IDirective {
	public restrict = 'E';
	public link = {
		pre: (scope, iElem) => {
			iElem[0].appendChild(this.render.canvas);

			// TODO: remove this ughly timeout
			this.$timeout(() => {
				this.$rootScope.$emit('appendCanvas');
			}, 100);
		}
	};

	private $q;
	private $rootScope;
	private render;
	private $timeout;
	constructor($injector) {
		this.render = $injector.get('render');
		this.$rootScope = $injector.get('$rootScope');
		this.$q = $injector.get('$q');
		this.$timeout = $injector.get('$timeout');
	}
}
