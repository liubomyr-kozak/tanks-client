import {service} from '../annotations';
import {Tank} from './tank';

interface MoveCoordinates {
	x: number;
	y: number;
}

@service('tank', ['$injector'])
export class TankService extends Tank {
	public forward = ():void => {
		this.platform.movementSpeed += 1;
	};
	public backward = ():void => {
		this.platform.movementSpeed -= 1;
	};
	public left = ():void => {
		this.platform.targetAngle -= this.platform.rotationSpeed;
	};
	public right = ():void => {
		this.platform.targetAngle += this.platform.rotationSpeed;
	};
	public updateGunAngle = (x:number, y:number):void => {
		var a = x - this.coordinates.x;
		var b = y - this.coordinates.y;
		this.turret.targetAngle = this.calculateTargetAngle(a, b);
	};
	public smallShot = ():void => {
		console.log('boom!');
	};
	public bigShot = ():void => {
		console.log('BOOOM!!');
	};

	private $interval;
	private calculateMove = ():MoveCoordinates => {
		return {
			x: Math.cos(this.platform.angle) * this.platform.movementSpeed,
			y: Math.sin(this.platform.angle) * this.platform.movementSpeed
		}
	};
	private calculateTargetAngle = (x:number, y:number):number => {
		return Math.atan2(y, x);
	};
	private normalizeAngle = (angle:number):number => {
		return angle + ((angle > Math.PI) ? -(2 * Math.PI) : (angle < -(Math.PI) ? 2 * Math.PI : 0));
	};
	private turretRotationStep = ():void => {
		var deltaAngle = this.normalizeAngle(this.turret.targetAngle - this.turret.angle);

		if (deltaAngle > 0.09 || deltaAngle < -(0.09)) {
			if (deltaAngle > 0) {
				this.turret.angle += this.turret.speed;
			} else {
				this.turret.angle -= this.turret.speed;
			}
		} else {
			this.turret.angle = this.turret.targetAngle;
		}
	};
	private platformRotationStep = ():void => {
		var deltaAngle = this.normalizeAngle(this.platform.targetAngle - this.platform.angle);

		if (deltaAngle > 0.09 || deltaAngle < -(0.09)) {
			if (deltaAngle > 0) {
				this.platform.angle += this.platform.speed;
			} else {
				this.platform.angle -= this.platform.speed;
			}
		} else {
			this.platform.angle = this.platform.targetAngle;
		}
	};
	private platformMovementStep = ():void => {
		var c = this.calculateMove();
		this.coordinates.x += c.x;
		this.coordinates.y += c.y;
	};

	constructor($injector) {
		this.$interval = $injector.get('$interval');

		// TODO: hardcoded model
		this.coordinates = {
			x: 400,
			y: 300,
		};

		this.condition = {
			health: 100,
			armor: 100
		};
		this.platform = {
			angle: 0,
			speed: 0.05,
			targetAngle: 0,
			movementSpeed: 0,
			rotationSpeed: 0.1,
			movement: this.$interval(this.platformMovementStep, 24),
			rotation: this.$interval(this.platformRotationStep, 24)
		};
		this.turret = {
			angle: 0,
			speed: 0.05,
			targetAngle: 0,
			rotation: this.$interval(this.turretRotationStep, 24),
			primary: {
				ammo: 20,
				power: 75,
				speed: 1
			},
			secondary: {
				ammo: 2000,
				power: 2,
				speed: 10
			}
		};
	}
}
