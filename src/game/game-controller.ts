import {controller} from "../annotations";

@controller('GameController', ['$scope', '$injector'])
export class GameController {
	constructor($scope, $injector) {
		var tank = $injector.get('tank');
		var hotkeys = $injector.get('hotkeys');

		hotkeys.add({
			combo: 'w',
			callback: ():void =>  {
				tank.forward();
			}
		});

		hotkeys.add({
			combo: 's',
			callback: ():void =>  {
				tank.backward();
			}
		});

		hotkeys.add({
			combo: 'a',
			action: 'keydown',
			callback: ():void =>  {
				tank.turnLeft();
			}
		});

		hotkeys.add({
			combo: 'a',
			action: 'keyup',
			callback: ():void =>  {
				tank.stopRotation();
			}
		});

		hotkeys.add({
			combo: 'd',
			action: 'keydown',
			callback: ():void =>  {
				tank.turnRight();
			}
		});

		hotkeys.add({
			combo: 'd',
			action: 'keyup',
			callback: ():void =>  {
				tank.stopRotation();
			}
		});

		$scope.onMouseMove = ($event):void => {
			tank.updateGunAngle($event.clientX, $event.clientY);
		};

		$scope.onMouseClick = ($event):void => {
			tank.smallShot($event);
		};

		$scope.onMouseDbClick = ($event):void => {
			tank.bigShot($event);
		}
	}
}
