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
	movement;
}

interface Turret {
	angle: number;
	rotationAngle: number;
	primary: Weapon;
	secondary: Weapon;
	rotation;
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