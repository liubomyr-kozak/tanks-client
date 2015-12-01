import {controller, inject} from "../annotations";

@controller('RootController', ['$location'])
export class RootController {
    go:Function;

    constructor($location) {
        this.go = (path) => {
            $location.path(path);
        }
    }
}
