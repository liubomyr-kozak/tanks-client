import {directive} from "../annotations";

@directive('gameViewport', ['$injector'])
export class ViewportDirective implements ng.IDirective {
	public restrict = 'E';
	public link = (scope, iElem) => {
		iElem[0].appendChild(this.render.canvas);
	};

	private render;
	constructor($injector) {
		this.render = $injector.get('render');
	}
}
