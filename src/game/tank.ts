interface Coordinates {
	x: number;
	y: number;
	angle: number;
	speed: number;
}

interface Condition {
	health: number;
	armor: number;
}

interface Weapon {
	ammo: number;
	power: number;
}

interface Turret {
	angle: number;
	primary: Weapon;
	secondary: Weapon;
}

interface GameObject {
	coordinates: Coordinates;
	condition: Condition;
}

interface MilitaryObject extends GameObject {
	turret: Turret;
}

export class Tank implements MilitaryObject {
	public coordinates;
	public condition;
	public turret;
}