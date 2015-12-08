import {service} from '../annotations';
import * as ng from 'angular';
import * as io from 'socket.io-client';

@service('io', [])
export class IOService {
    public io = io;
    public socket = io.connect('http://localhost:8888/');
}