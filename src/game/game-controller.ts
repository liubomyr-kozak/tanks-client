import {TankService} from './game-tank-service';
import {controller} from "../annotations";

@controller('GameController', [
    '$scope',
    'tank'
])
export class GameController {
    constructor($scope,
                tank:TankService) {

        $scope.onMouseMove = ($event):void => {
            tank.updateGunAngle($event.clientX, $event.clientY);
        };

        $scope.onMouseClick = ():void => {
            tank.smallShot();
        };

        $scope.onMouseDbClick = ():void => {
            tank.bigShot();
        };
    }
}
