import {service} from '../annotations';
import * as ng from 'angular';

@service('config', [])
export class ConfigService {
    public frameTime = 24;
}