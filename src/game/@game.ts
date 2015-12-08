import * as ng from 'angular';
import {register} from '../annotations';
import {gameConfig} from './game-config';
import './game.css!css';

export var game = ng.module('tanks.game', [])
    .config(gameConfig);

import {ViewportDirective} from './game-viewport-directive';
register(game, ViewportDirective);
import {GameController} from './game-controller';
register(game, GameController);
import {IOService} from './game-io-service';
register(game, IOService);
import {RenderService} from './game-render-service';
register(game, RenderService);
import {TanksService} from './game-tanks-service';
register(game, TanksService);
import {ConfigService} from './game-config-service';
register(game, ConfigService);