import ng from 'angular';

import rootConfigFn from './root-config';
import {RootController} from './root-controller';

ng.module('root', [])
	.config(rootConfigFn)
	.controller(RootController.Name, RootController);