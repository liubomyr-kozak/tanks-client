interface Coordinates {
	x: number;
	y: number;
}

interface Condition {
	health: number;
	armor: number;
}

interface Weapon {
	ammo: number;
	power: number;
}

interface Platform {
	angle: number;
	movementSpeed: number;
	rotationSpeed: number;
	movement: Promise;
	rotation: Promise;
}

interface Turret {
	angle: number;
	rotationAngle: number;
	primary: Weapon;
	secondary: Weapon;
	rotation: Promise;
}

interface GameObject {
	coordinates: Coordinates;
	condition: Condition;
}

interface MilitaryObject extends GameObject {
	platform: Platform;
	turret: Turret;
}

export class Tank implements MilitaryObject {
	public coordinates;
	public condition;
	public platform;
	public turret;
}