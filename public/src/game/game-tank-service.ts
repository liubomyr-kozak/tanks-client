import * as ng from 'angular';
import {Tank} from './tank';
import {service} from '../annotations';

interface MoveCoordinates {
    x: number;
    y: number;
}

@service('game.tank', [
    '$interval',
    'game.config'
])
export class TankService extends Tank {
    constructor(private $interval:ng.IIntervalService,
                private config) {

        // TODO: hardcoded model
        this.coordinates = {
            x: 400,
            y: 300,
        };
        this.platform = {
            angle: 0,
            speed: 0.05,
            movementSpeed: 0,
            rotationSpeed: 0,
            movement: this.$interval(this.platformMovementStep, this.config.frameTime),
            rotation: this.$interval(this.platformRotationStep, this.config.frameTime)
        };
        this.turret = {
            angle: 0,
            speed: 0.05,
            targetAngle: 0,
            rotation: this.$interval(this.turretRotationStep, this.config.frameTime),
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

    public forward = ():void => {
        this.platform.movementSpeed += 1;
    };
    public backward = ():void => {
        this.platform.movementSpeed -= 1;
    };
    public turnLeft = ():void => {
        this.platform.rotationSpeed = -0.05;
    };
    public turnRight = ():void => {
        this.platform.rotationSpeed = 0.05;
    };
    public stopRotation = ():void => {
        this.platform.rotationSpeed = 0;
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
    private platformMovementStep = ():void => {
        var c = this.calculateMove();
        this.coordinates.x += c.x;
        this.coordinates.y += c.y;
    };
    private platformRotationStep = ():void => {
        this.platform.angle += this.platform.rotationSpeed;
    };
}
