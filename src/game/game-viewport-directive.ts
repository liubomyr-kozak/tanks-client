import * as ng from 'angular';
import {RenderService} from 'game-render-service'
import {directive} from '../annotations';
import pauseScreenTemplate from './game-pause-screen-template.html!text';

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
        var gameViewport, pauseScreen;
        gameViewport = iElem[0];
        pauseScreen = this.$window.document.createElement('div');
        pauseScreen.style.display = 'none';
        pauseScreen.classList.add('pause-screen');
        pauseScreen.innerHTML = pauseScreenTemplate;
        gameViewport.appendChild(this.render.canvas);
        gameViewport.appendChild(pauseScreen);
        gameViewport.focus();
        gameViewport.addEventListener('blur', () => {
            pauseScreen.style.display = 'block';
        });
        gameViewport.addEventListener('focus', () => {
            pauseScreen.style.display = 'none';
        });
        this.$window.addEventListener('resize', () => {
            this.render.canvas.width = this.$window.innerWidth;
            this.render.canvas.height = this.$window.innerHeight;
        });
    };
}
