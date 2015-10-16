import {service} from "../annotations";

@service('render', ['$injector'])
export class RenderService {
	public canvas:HTMLCanvasElement = document.createElement('canvas');

	private tank;
	private $rootScope;
	private $interval;
	private renderLoop:Promise;
	private tankImage:HTMLImageElement = document.createElement('img');
	private gunImage:HTMLImageElement = document.createElement('img');
	private context:CanvasRenderingContext2D = this.canvas.getContext('2d');
	
	private drawTank = (x:number, y:number, angle:number):void => {
		this.context.save();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.drawImage(this.tankImage, -(this.tankImage.width/2), -(this.tankImage.height/2));
		this.context.restore();
	};
	private drawGun = (x:number, y:number, angle:number):void => {
		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.drawImage(this.gunImage, -(this.gunImage.width/2), -(this.gunImage.height/2));
		this.context.restore();
	};


	constructor($injector) {
		// TODO: refactor all hardcode!
		this.$interval = $injector.get('$interval');
		this.$rootScope = $injector.get('$rootScope');
		this.tank = $injector.get('tank');

		this.canvas.width = 1500;
		this.canvas.height = 1000;
		this.tankImage.src = '../../img/platform.png';
		this.gunImage.src = '../../img/turret.png';

		this.renderLoop = this.$interval(() => {
			this.drawTank(
				this.tank.coordinates.x,
				this.tank.coordinates.y,
				this.tank.coordinates.angle
			);
			this.drawGun(
				this.tank.coordinates.x,
				this.tank.coordinates.y,
				this.tank.turret.angle
			);
		}, 24);
	}
}
