import {service} from '../annotations';
import {Tank} from './tank';

interface MoveCoordinates {
	x: number;
	y: number;
}

@service('tank')
export class TankService extends Tank {
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

	private calculateMove = ():MoveCoordinates => {
		return {
			x: Math.cos(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed,
			y: Math.sin(this.coordinates.angle * Math.PI / 180) * this.coordinates.speed
		}
	};

	constructor() {
		this.coordinates = {
			x: 400,
			y: 300,
			angle: 50,
			speed: 10
		};

		this.condition = {
			health: 100,
			armor: 100
		};

		this.arms = {
			angle: 50,
			primary: {
				ammo: 20,
				power: 75,
			},
			secondary: {
				ammo: 2000,
				power: 2
			}
		}
	}
}
