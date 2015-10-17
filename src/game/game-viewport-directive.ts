import ng from 'angular';
import {directive} from "../annotations";

@directive('gameViewport', ['$injector'])
export class ViewportDirective implements ng.IDirective {
	public restrict = 'E';
	public link = (scope, iElem) => {
		iElem[0].appendChild(this.render.canvas);

		this.$window.addEventListener('resize', () => {
			this.render.canvas.width = this.$window.innerWidth;
			this.render.canvas.height = this.$window.innerHeight;
		});
	};

	private render;
	private $window;

	constructor($injector) {
		this.render = $injector.get('render');
		this.$window = $injector.get('$window');
	}
}
