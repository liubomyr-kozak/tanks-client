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

	private clearField = ():void => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	private drawTank = ():void => {
		this.context.save();
		this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
		this.context.rotate(this.tank.coordinates.angle);
		this.context.drawImage(this.tankImage, -(this.tankImage.width / 2), -(this.tankImage.height / 2));
		this.context.restore();
	};

	private drawGun = ():void => {
		this.context.save();
		this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
		this.context.rotate(this.tank.turret.angle);
		this.context.drawImage(this.gunImage, -(this.gunImage.width / 2), -(this.gunImage.height / 2));
		this.context.restore();
	};
	private drawTargetAngle = ():void => {
		var a = Math.cos(this.tank.turret.targetAngle);
		var	b = Math.sin(this.tank.turret.targetAngle);

		// TODO add firing range ration to (a, b)
		this.context.save();
		this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.setLineDash([5, 50]);
		this.context.strokeStyle = 'red';
		this.context.moveTo(0, 0);
		this.context.lineTo(a * 400, b * 400);
		this.context.stroke();
		this.context.restore();
	};
	private drawCurrentAngle = ():void => {
		// TODO: add firing range ration to (a, b) & gradient
		var gradient = this.context.createRadialGradient(0, 0, 400, 0, 0, 0);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(1, "red");

		this.context.save();
		this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
		this.context.rotate(this.tank.turret.angle);
		this.context.beginPath();
		this.context.lineWidth = 350;
		this.context.strokeStyle = gradient;
		this.context.arc(0, 0, 400, -0.05, 0.05);
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
			this.clearField();
			this.drawTank();
			this.drawCurrentAngle();
			this.drawTargetAngle();
			this.drawGun();
		}, 24);
	}
}
