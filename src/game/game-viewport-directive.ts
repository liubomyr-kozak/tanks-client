import * as ng from 'angular';
import {RenderService} from 'game-render-service'
import {directive} from '../annotations';

@directive('gameViewport', [
    '$window',
    'render'
])
export class ViewportDirective implements ng.IDirective {
    constructor(private $window:ng.IWindowService,
                private render:RenderService) {
    }

    public restrict = 'E';
    public link = (scope, iElem) => {
        iElem[0].appendChild(this.render.canvas);

        this.$window.addEventListener('resize', () => {
            this.render.canvas.width = this.$window.innerWidth;
            this.render.canvas.height = this.$window.innerHeight;
        });
    };
}
