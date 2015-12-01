import * as ng from 'angular';
import {service} from '../annotations';

interface IConfig {
    frameTime: number;
}

@service('config', [])
export class ConfigFactory implements IConfig {
    public frameTime = 300;
}