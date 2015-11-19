//noinspection TypeScriptCheckImport
import io from 'socketio';

import {game} from './@game';
import {Tank} from './tank';
import {service} from '../annotations';

@service('game.io', [])
export class IOService {
    constructor() {
    }
}