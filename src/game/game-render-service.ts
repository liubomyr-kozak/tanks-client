//noinspection TypeScriptCheckImport
import * as ng from 'angular';

import {game} from './@game';
import {ITank} from './game-tank-service';
import {service} from '../annotations';

@service('render', [
    '$interval',
    '$rootScope',
    '$window',
    'tank',
    'config'
])
export class RenderService {
    constructor(private $interval:ng.IIntervalService,
                private $rootScope:ng.IRootScopeService,
                private $window:ng.IWindowService,
                private tank:ITank,
                private config) {
        // TODO: refactor all hardcode!
        this.canvas.width = this.$window.innerWidth;
        this.canvas.height = this.$window.innerHeight;
        this.tankImage.src = '../../img/platform.png';
        this.gunImage.src = '../../img/turret.png';
        this.renderLoop = this.$interval(this.renderStep, this.config.frameTime);
    }

    public canvas:HTMLCanvasElement = document.createElement('canvas');

    private renderLoop:ng.IPromise;
    private tankImage:HTMLImageElement = document.createElement('img');
    private gunImage:HTMLImageElement = document.createElement('img');
    private context:CanvasRenderingContext2D = this.canvas.getContext('2d');

    private renderStep = () => {
        this.clearField();
        this.drawTank();
        this.drawTarget();
        this.drawAim();
        this.drawTurret();
    };

    private clearField = ():void => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    private drawTank = ():void => {
        this.context.save();
        this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
        this.context.rotate(this.tank.platform.angle);
        this.context.drawImage(this.tankImage, -(this.tankImage.width / 2), -(this.tankImage.height / 2));
        this.context.restore();
    };

    private drawTurret = ():void => {
        this.context.save();
        this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
        this.context.rotate(this.tank.turret.angle);
        this.context.drawImage(this.gunImage, -(this.gunImage.width / 2), -(this.gunImage.height / 2));
        this.context.restore();
    };

    private drawAim = ():void => {
        // TODO add firing range ration to (a, b)
        var a = Math.cos(this.tank.turret.targetAngle);
        var b = Math.sin(this.tank.turret.targetAngle);
        this.context.save();
        this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.setLineDash([5, 50]);
        this.context.strokeStyle = 'red';
        this.context.moveTo(0, 0);
        this.context.lineTo(a * 400, b * 400);
        this.context.stroke();
        this.context.restore();
    };

    private drawTarget = ():void => {
        // TODO: add firing range ration to (a, b) & gradient
        var gradient;
        gradient = this.context.createRadialGradient(0, 0, 400, 0, 0, 0);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "red");
        this.context.save();
        this.context.translate(this.tank.coordinates.x, this.tank.coordinates.y);
        this.context.rotate(this.tank.turret.angle);
        this.context.beginPath();
        this.context.lineWidth = 350;
        this.context.strokeStyle = gradient;
        this.context.arc(0, 0, 400, -0.05, 0.05);
        this.context.stroke();
        this.context.restore();
    };
}
