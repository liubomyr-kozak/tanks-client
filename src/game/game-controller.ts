import {controller} from "../annotations";

@controller('GameController', ['tank', '$scope'])
export class GameController {
	constructor(tank, $scope) {
		$scope.onKeypress = function ($event) {
			switch($event.keyCode) {
				case 105:
					tank.forwardStart();
					break;
				case 107:
					tank.backwardStart();
					break;
				case 106:
					tank.leftStart();
					break;
				case 108:
					tank.rightStart();
					break;
			}
		};

		$scope.onMouseMove = function ($event) {
			tank.updateGunAngle($event.clientX, $event.clientY);
		};

		$scope.onMouseClick = function ($event) {
			tank.smallShot($event);
		};

		$scope.onMouseDbClick = function ($event) {
			tank.bigShot($event);
		}
	}
}
