interface Coordinates {
    x: number;
    y: number;
}

interface Platform {
    angle: number;
    movementSpeed: number;
    rotationSpeed: number;
    movement: ng.IPromise;
    rotation: ng.IPromise;
}

interface Turret {
    angle: number;
    rotationAngle: number;
    rotation: ng.IPromise;
}

interface GameObject {
    coordinates: Coordinates;
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