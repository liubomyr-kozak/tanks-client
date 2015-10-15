import {service} from "../annotations";

@service('render', ['$injector'])
export class RenderService {
	public canvas:HTMLCanvasElement = document.createElement('canvas');
	public interval:Promise;

	private tankImage:HTMLImageElement = document.createElement('img');
	private context:CanvasRenderingContext2D = this.canvas.getContext('2d');
	private drawTank = (x:number, y:number, angle:number):void => {
		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.drawImage(this.tankImage, Number(this.tankImage.width), Number(this.tankImage.height));
		this.context.restore();
	};

	constructor($injector) {
		// TODO: refactor all hardcode!
		var $timeout = $injector.get('$timeout');
		var $rootScope = $injector.get('$rootScope');
		var tank = $injector.get('tank');

		this.canvas.width = 1500;
		this.canvas.height = 1000;
		this.tankImage.src = '../../img/tank.png';
		$rootScope.$on('appendCanvas', () => {
			this.drawTank(
				tank.coordinates.x,
				tank.coordinates.y,
				tank.coordinates.angle
			);
		});
	}
}
