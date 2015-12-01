import {service} from '../annotations';
import * as ng from 'angular';
import * as io from 'socket.io';

interface ICoordinates {
    x: number;
    y: number;
}

interface IPlatform {
    angle: number;
}

interface ITurret {
    angle: number;
    speed: number;
    targetAngle: number;
}

export interface ITank {
    coordinates: ICoordinates;
    platform: IPlatform;
    turret: ITurret;
}

@service('tank', ['$interval', 'config'])
export class TankService implements ITank {
    constructor(private $interval:ng.IIntervalService,
                private config:Object) {
    }

    public coordinates = {
        x: 300,
        y: 300
    };
    public platform = {
        angle: 0
    };
    public turret = {
        angle: 0,
        targetAngle: 0,
        speed: 1
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

    public startGas = ():void => {
        console.log('startGas');
    };
    public stopGas = ():void => {
        console.log('stopGas');
    };
    public startBreak = ():void => {
        console.log('startBreak');
    };
    public stopBreak = ():void => {
        console.log('stopBreak');
    };
    public startTurnLeft = ():void => {
        console.log('startTurnLeft');
    };
    public stopTurnLeft = ():void => {
        console.log('stopTurnLeft');
    };
    public startTurnRight = ():void => {
        console.log('startTurnRight');
    };
    public stopTurnRight = ():void => {
        console.log('stopTurnRight');
    };

    private calculateTargetAngle = (x:number, y:number):number => {
        return Math.atan2(y, x);
    };
}
