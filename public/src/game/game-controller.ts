import {TankService} from './game-tank-service';
import {controller} from "../annotations";

interface GameControllerScope extends ng.IScope {
    onMouseMove:Function,
    onMouseClick:Function,
    onMouseDbClick:Function
}

@controller('GameController', [
    '$scope',
    'hotkeys',
    'game.tank'
])
export class GameController {
    constructor($scope:GameControllerScope,
                hotkeys:ng.hotkeys.HotkeysProvider,
                tank:TankService) {

        hotkeys.add({
            combo: 'w',
            callback: ():void => {
                tank.forward();
            }
        });

        hotkeys.add({
            combo: 's',
            callback: ():void => {
                tank.backward();
            }
        });

        hotkeys.add({
            combo: 'a',
            action: 'keydown',
            callback: ():void => {
                tank.turnLeft();
            }
        });

        hotkeys.add({
            combo: 'a',
            action: 'keyup',
            callback: ():void => {
                tank.stopRotation();
            }
        });

        hotkeys.add({
            combo: 'd',
            action: 'keydown',
            callback: ():void => {
                tank.turnRight();
            }
        });

        hotkeys.add({
            combo: 'd',
            action: 'keyup',
            callback: ():void => {
                tank.stopRotation();
            }
        });

        $scope.onMouseMove = ($event):void => {
            tank.updateGunAngle($event.clientX, $event.clientY);
        };

        $scope.onMouseClick = ():void => {
            tank.smallShot();
        };

        $scope.onMouseDbClick = ():void => {
            tank.bigShot();
        }
    }
}
