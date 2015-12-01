import * as ng from 'angular';

import 'angular-route';
import 'angular-material';
import 'angular-material/angular-material.css!css';

ng.module('tanks.assets', ['ngRoute', 'ngMaterial']);

import "./root/@root";
import "./game/@game";

ng.module('tanks', ['tanks.assets', 'tanks.root', 'tanks.game']);
