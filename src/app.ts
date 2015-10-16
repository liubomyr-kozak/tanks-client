import ng from 'angular';

import 'angular-route';
import 'angular-material';
import 'angular-material/angular-material.css!css';

ng.module('assets', ['ngRoute', 'ngMaterial']);

import "./root/@root";
import "./game/@game";

ng.module('app', ['assets', 'root', 'game']);
