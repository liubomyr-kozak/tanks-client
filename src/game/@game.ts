import * as ng from 'angular';
import {register} from '../annotations';
import {gameConfig} from './game-config';

export var game = ng.module('tanks.game', [])
    .config(gameConfig);

import {ViewportDirective} from './game-viewport-directive';
register(game, ViewportDirective);
import {GameController} from './game-controller';
register(game, GameController);
import {RenderService} from './game-render-service';
register(game, RenderService);
import {TankService} from './game-tank-service';
register(game, TankService);
import {ConfigFactory} from './game-config-service';
register(game, ConfigFactory);