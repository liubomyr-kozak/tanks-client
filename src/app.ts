import ng from 'angular';

import 'angular-route';
import 'angular-material';
import 'angular-hotkeys';
import 'angular-material/angular-material.css!css';

ng.module('assets', ['ngRoute', 'ngMaterial', 'cfp.hotkeys']);

import "./root/@root";
import "./game/@game";

ng.module('app', ['assets', 'root', 'game']);
