import {controller} from "../annotations";

@controller('GameController', ['$scope', '$injector'])
export class GameController {
	constructor($scope, $injector) {
		var tank = $injector.get('tank');
		var hotkeys = $injector.get('hotkeys');

		hotkeys.add({
			combo: 'i',
			callback: function() {
				tank.forward();
			}
		});

		hotkeys.add({
			combo: 'k',
			callback: function() {
				tank.backward();
			}
		});

		hotkeys.add({
			combo: 'j',
			callback: function() {
				tank.left();
			}
		});

		hotkeys.add({
			combo: 'l',
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
