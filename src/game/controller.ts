import {controller} from "../annotations";

@controller('GameController', ['hotkeys', 'tank'])
export class GameController {
	private addHotkey: Function;

	constructor(hotkeys, tank) {
		/**
		 * @method addHotkey
		 *
		 * If `upFunc` parameter is not given it will use
		 * built in engine to pick the most suitable option automatically
		 *
		 * @param key Binding key
		 * @param downFunc Callback function on key down
		 * @param upFunc Callback function on key up
		 */
		this.addHotkey = (key:string, downFunc:Function, upFunc?:Function) => {
			if (typeof downFunc === 'function' && typeof upFunc !== 'function') {
				hotkeys.add({
					combo: key,
					callback: downFunc
				});
			} else if (typeof downFunc === 'function' && typeof upFunc === 'function') {
				hotkeys.add({
					combo: key,
					action: 'keydown',
					callback: downFunc
				});
				hotkeys.add({
					combo: key,
					action: 'keyup',
					callback: upFunc
				});
			}
		};

		this.addHotkey('i', () => {
			tank.forwardStart();
		}, () => {
			tank.forwardStop();
		});
	}
}
