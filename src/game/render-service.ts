import {service} from "../annotations";

@service('render', ['$injector'])
export class RenderService {
	public canvas:HTMLCanvasElement = document.createElement('canvas');

	private tank;
	private $rootScope;
	private $interval;
	private renderLoop:Promise;
	private tankImage:HTMLImageElement = document.createElement('img');
	private context:CanvasRenderingContext2D = this.canvas.getContext('2d');
	private drawTank = (x:number, y:number, angle:number):void => {

		console.log('draw tank');

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.drawImage(this.tankImage, Number(this.tankImage.width), Number(this.tankImage.height));
		this.context.restore();
	};

	constructor($injector) {
		// TODO: refactor all hardcode!
		this.$interval = $injector.get('$interval');
		this.$rootScope = $injector.get('$rootScope');
		this.tank = $injector.get('tank');

		this.canvas.width = 1500;
		this.canvas.height = 1000;
		this.tankImage.src = '../../img/tank.png';
		this.renderLoop = this.$interval(() => {
			this.drawTank(
				this.tank.coordinates.x,
				this.tank.coordinates.y,
				this.tank.coordinates.angle
			)
		}, 24);
	}
}
