//noinspection TypeScriptCheckImport
import * as ng from 'angular';

import {factory} from '../annotations';

@factory('game.config', [])
export class ConfigFactory {
    constructor() {
        return {
            frameTime: 30
        }
    }
}