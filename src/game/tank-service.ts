import {service} from '../annotations';
import {Tank} from './tank';

interface MoveCoordinates {
	x: number;
	y: number;
}

@service('tank', ['$injector'])
export class TankService extends Tank {
	public forwardStart = () => {
		var c = this.calculateMove();
		this.coordinates.x += c.x;
		this.coordinates.y += c.y;
	};
	public forwardStop = () => {
	};
	public backwardStart = () => {
		var c = this.calculateMove();
		this.coordinates.x -= c.x;
		this.coordinates.y -= c.y;
	};
	public backwardStop = () => {
	};
	public leftStart = () => {
		this.coordinates.angle -= 3 * Math.PI / 180;
	};
	public leftStop = () => {
	};
	public rightStart = () => {
		this.coordinates.angle += 3 * Math.PI / 180;
	};
	public rightStop = () => {
	};
	public updateGunAngle = (x:number, y:number) => {
		var a = x - this.coordinates.x;
		var b = y - this.coordinates.y;
		this.turret.targetAngle = this.calculateTargetAngle(a, b);
	};
	public smallShot = () => {
		console.log('boom!');
	};
	public bigShot = () => {
		console.log('BOOOM!!');
	};

	private $interval;
	private calculateMove = ():MoveCoordinates => {
		return {
			x: Math.cos(this.coordinates.angle) * this.coordinates.speed,
			y: Math.sin(this.coordinates.angle) * this.coordinates.speed
		}
	};
	private calculateTargetAngle = (x:number, y:number):number => {
		return Math.atan2(y, x);
	};

	constructor($injector) {
		this.$interval = $injector.get('$interval');

		// TODO: hardcoded model
		this.coordinates = {
			x: 400,
			y: 300,
			angle: 0,
			speed: 10
		};
		this.condition = {
			health: 100,
			armor: 100
		};
		this.turret = {
			angle: 1,
			speed: 0.05,
			turret: {
				angle: 15
			},
			targetAngle: 1,

			rotate: this.$interval(() => {
				var stop = this.turret.targetAngle;
				var start = this.turret.angle;

				if (stop - start > 0.1 || start - stop > 0.1) {
					if (this.turret.targetAngle > this.turret.angle) {
						this.turret.angle += this.turret.speed;
					} else {
						this.turret.angle -= this.turret.speed;
					}
				} else {
					this.turret.angle = this.turret.targetAngle;
				}
			}, 50),
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
