import {service} from '../annotations';
import {Tank} from './tank';

interface MoveCoordinates {
	x: number;
	y: number;
}

@service('tank')
export class TankService extends Tank {
	constructor() {
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
	public rotate = (x:number, y:number) => {
		var a = x - this.coordinates.x,
			b = y - this.coordinates.y;

		this.gun.angle = Math.atan2(b, a);
	};
	public shot = (e) => {
		console.log('BOOM!');
	};

	private calculateMove = ():MoveCoordinates => {
		return {
			x: Math.cos(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed,
			y: Math.sin(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed
		}
	};
}
