import {service} from '../annotations';
import * as ng from 'angular';
import {IOService} from "./game-io-service";


export interface ITank {
    x: number,
    y: number,
    platformAngle: number,
    turretAngle: number
}

interface IOwnTank extends ITank {
    targetAngle: number;
}

@service('tanks', ['io', '$interval', 'config'])
export class TanksService {
    constructor(private io:IOService,
                private $interval:ng.IIntervalService,
                private config:Object) {

        this.socket.on('tanksData', (data) => {
            this.own.x = data.own.x;
            this.own.y = data.own.y;
            this.own.platformAngle = data.own.platformAngle;
            this.own.turretAngle = data.own.turretAngle;
            this.others = data.others;
        });
    }

    public own:IOwnTank = {
        x: 0,
        y: 0,
        platformAngle: 0,
        turretAngle: 0,
        targetAngle: 0
    };

    public others:ITank[] = [];

    public updateTargetAngle = (x:number, y:number):void => {
        var a = x - this.own.x;
        var b = y - this.own.y;
        this.own.targetAngle = this.calculateTargetAngle(a, b);
        this.socket.emit('updateTargetAngle', this.own.targetAngle);
    };

    private calculateTargetAngle = (x:number, y:number):number => {
        return Math.atan2(y, x);
    };

    //public smallShot = ():void => {
    //    console.log('boom!');
    //};
    //public bigShot = ():void => {
    //    console.log('BOOOM!!');
    //};

    public startGas = ():void => {
        //console.log('startGas');
        this.socket.emit('startGas');
    };
    //public stopGas = ():void => {
    //    console.log('stopGas');
    //};
    public startBreak = ():void => {
        //console.log('startBreak');
        this.socket.emit('startBreak');
    };
    //public stopBreak = ():void => {
    //    console.log('stopBreak');
    //};
    public startTurnLeft = ():void => {
        //console.log('startTurnLeft');
        this.socket.emit('startTurnLeft');
    };
    public stopTurnLeft = ():void => {
        //console.log('stopTurnLeft');
        this.socket.emit('stopTurnLeft');
    };
    public startTurnRight = ():void => {
        //console.log('startTurnRight');
        this.socket.emit('startTurnRight');
    };
    public stopTurnRight = ():void => {
        //console.log('stopTurnRight');
        this.socket.emit('stopTurnRight');
    };

    private socket = this.io.socket;
}
