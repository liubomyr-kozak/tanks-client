import {controller} from "../annotations";

@controller('GameController', ['$scope', '$injector'])
export class GameController {
	constructor($scope, $injector) {
		var tank = $injector.get('tank');
		var hotkeys = $injector.get('hotkeys');

		hotkeys.add({
			combo: 'w',
			callback: function() {
				tank.up();
			}
		});

		hotkeys.add({
			combo: 's',
			callback: function() {
				tank.down();
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

		hotkeys.add({
			combo: 'e',
			callback: function() {
				tank.forward();
			}
		});

		hotkeys.add({
			combo: 'q',
			callback: function() {
				tank.backward();
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
