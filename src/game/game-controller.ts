import {controller} from "../annotations";

@controller('GameController', ['tank', '$scope'])
export class GameController {
	constructor(tank, $scope) {
		$scope.onKeypress = function ($event) {
			var key = $event.keyCode || $event.which;
			switch (key) {
				case 105:
					tank.forward();
					break;
				case 107:
					tank.backward();
					break;
				case 106:
					tank.left();
					break;
				case 108:
					tank.right();
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
