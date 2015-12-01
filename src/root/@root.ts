import * as ng from 'angular';
import {register} from '../annotations';

import {rootConfig} from './root-config';
export var root = ng.module('tanks.root', [])
    .config(rootConfig);

import {RootController} from './root-controller';
register(root, RootController);