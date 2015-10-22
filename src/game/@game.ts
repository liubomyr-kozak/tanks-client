import ng from 'angular';
import gameConfig from './config';
import {GameController} from './game-controller';
import {ViewportDirective} from './game-viewport-directive';
import {RenderService} from './render-service';
import {TankService} from './tank-service';

export var game = ng.module('game', [])
	.config(gameConfig)
	.controller(GameController.Name, GameController)
	.service(RenderService.Name, RenderService)
	.service(TankService.Name, TankService)
	.directive(ViewportDirective.Name, ViewportDirective)
	.value('config', {
		frameTime: 30
	});
