import {TanksService} from './game-tanks-service';
import {controller} from "../annotations";

@controller('GameController', [
    '$scope',
    'tanks'
])
export class GameController {
    constructor($scope,
                tanks:TanksService) {

        $scope.onMouseMove = ($event):void => {
            tanks.updateTargetAngle($event.clientX, $event.clientY);
        };

        $scope.onKeypress = ($event, isDown) => {
            var key = $event.keyCode || $event.charCode;

            if (key === 87 && isDown) {
                tanks.startGas();
            }
            if (key === 87 && !isDown) {
                tanks.stopGas();
            }

            if (key === 83 && isDown) {
                tanks.startBreak();
            }
            if (key === 83 && !isDown) {
                tanks.stopBreak();
            }

            if (key === 65 && isDown) {
                tanks.startTurnLeft();
            }
            if (key === 65 && !isDown) {
                tanks.stopTurnLeft();
            }

            if (key === 68 && isDown) {
                tanks.startTurnRight();
            }
            if (key === 68 && !isDown) {
                tanks.stopTurnRight();
            }
        };

        $scope.onMouseClick = ($event):void => {
            tanks.gunShot();
        };
    }
}
