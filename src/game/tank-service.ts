import {service} from '../annotations';
import {Tank} from './tank';

@service('tank')
export class TankService extends Tank {
	public forwardStart = () => {
		this.coordinates.x += 10;
	};
	public forwardStop = () => {
		console.log(this.coordinates);
	};

	public backwardStart = () => {
		this.coordinates.x -= 10;
	};
	public backwardStop = () => {
		console.log(this.coordinates);
	};

	public leftStart = () => {
		this.coordinates.angle -= 1;
	};
	public leftStop = () => {
		console.log(this.coordinates);
	};

	public rightStart = () => {
		this.coordinates.angle += 1;
	};
	public rightStop = () => {
		console.log(this.coordinates);
	};

	constructor() {
		this.coordinates = {
			x: 30,
			y: 30,
			angle: 10,
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
