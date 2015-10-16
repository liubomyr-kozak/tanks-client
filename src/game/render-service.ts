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
		this.context.drawImage(this.tankImage, -(this.tankImage.width / 2), -(this.tankImage.height / 2));
		this.context.restore();
	};
	private drawGun = (x:number, y:number, angle:number):void => {
		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.drawImage(this.gunImage, -(this.gunImage.width / 2), -(this.gunImage.height / 2));
		this.context.restore();
	};
	private drawSight = (x:number, y:number, targetAngle:number, currentAngle:number):void => {
		var a = Math.cos(targetAngle * Math.PI / 180),
		    b = Math.sin(targetAngle * Math.PI / 180);
		var currentX = Math.cos(currentAngle * Math.PI / 180),
			currentY = Math.sin(currentAngle * Math.PI / 180);

		// TODO add firing range ration to (a, b) & (currentX, currentY)
		this.context.save();
		this.context.translate(x, y);
		this.context.lineWidth = 1;
		this.context.setLineDash([5, 15]);

		this.context.beginPath();
		this.context.strokeStyle = 'green';
		this.context.moveTo(0, 0);
		this.context.lineTo(a * 400, b * 400);
		this.context.stroke();

		this.context.beginPath();
		this.context.strokeStyle = 'red';
		this.context.moveTo(0, 0);
		this.context.lineTo(currentX * 400, currentY * 400);
		this.context.stroke();

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
			this.drawSight(
				this.tank.coordinates.x,
				this.tank.coordinates.y,
				this.tank.turret.targetAngle,
				this.tank.turret.angle
			);
		}, 24);
	}
}
