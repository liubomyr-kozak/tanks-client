import {controller} from "../annotations";

@controller('GameController', ['$scope', '$injector'])
export class GameController {
	constructor($scope, $injector) {
		var tank = $injector.get('tank');
		var hotkeys = $injector.get('hotkeys');

		hotkeys.add({
			combo: 'w',
			callback: function() {
				tank.forward();
			}
		});

		hotkeys.add({
			combo: 's',
			callback: function() {
				tank.backward();
			}
		});

		hotkeys.add({
			combo: 'a',
			callback: function() {
				tank.left();
			}
		});

		hotkeys.add({
			combo: 'd',
			callback: function() {
				tank.right();
			}
		});

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
