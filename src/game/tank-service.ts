import {service} from '../annotations';
import {Tank} from './tank';

interface MoveCoordinates {
	x: number;
	y: number;
}

@service('tank', ['$injector'])
export class TankService extends Tank {
	constructor($injector) {
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

		this.arms = {
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

		this.gun = {
			angle: 0,
			speed: 1
		};

		this.newGunAngle = this.gun.angle;

		this.$interval = $injector.get('$interval');
		this.rotate = this.$interval(() => {
			var stop = this.newGunAngle.toFixed(2),
				start = this.gun.angle.toFixed(2);

			if (stop != start) {
				console.log('stop: '+ stop + ' start: ' + start);
				this.newGunAngle > this.gun.angle ? this.gun.angle+= 0.01 : this.gun.angle-= 0.01
			}
		}, 50);
	}

	public forwardStart = () => {
		var c = this.calculateMove();
		this.coordinates.x += c.x;
		this.coordinates.y += c.y;
	};
	public forwardStop = () => {
		console.log(this.coordinates);
	};
	public backwardStart = () => {
		var c = this.calculateMove();
		this.coordinates.x -= c.x;
		this.coordinates.y -= c.y;
	};
	public backwardStop = () => {
		console.log(this.coordinates);
	};
	public leftStart = () => {
		this.coordinates.angle -= 3;
	};
	public leftStop = () => {
		console.log(this.coordinates);
	};
	public rightStart = () => {
		this.coordinates.angle += 3;
	};
	public rightStop = () => {
		console.log(this.coordinates);
	};
	public updateGunAngle = (x:number, y:number) => {
		var a = x - this.coordinates.x,
			b = y - this.coordinates.y;

		this.newGunAngle = Math.atan2(b, a); // get new angle

		//this.stopRotate();	// stops any running interval
		//this.startRotate();	// starting new interval
	};
	public smallShot = (e) => {
		console.log('smallShot');
	};
	public bigShot = (e) => {
		console.log('BOOM! bigShot');
	};

	private promise;

	private stopRotate = () => {
		console.log('stop rotate');
		this.$interval.cancel(this.promise);
	};
	private startRotate = () => {
		this.promise = this.$interval(() => {
			var stop = this.newGunAngle.toFixed(1),
				start = this.gun.angle.toFixed(1);

			if (stop != start) {
				console.log('rotate from: '+ start + ' to: ' + stop);
				this.newGunAngle > this.gun.angle ? this.gun.angle+= 0.1 : this.gun.angle-= 0.1;
			} else {
				this.stopRotate();
			}
		}, 50);
	};


	private calculateMove = ():MoveCoordinates => {
		return {
			x: Math.cos(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed,
			y: Math.sin(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed
		}
	};
}
