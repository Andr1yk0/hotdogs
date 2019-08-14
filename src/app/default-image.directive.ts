import {Directive, HostListener} from '@angular/core';
import {environment} from '../environments/environment';

@Directive({
    selector: 'img[src], img[attr.src]'
})
export class DefaultImageDirective {
    public defaultImg = 'assets/images/default.png';
    constructor(){
      this.defaultImg = environment.production ? 'ng/'+this.defaultImg : this.defaultImg;
    }

    @HostListener('error', ['$event'])
    onError(event) {
        event.target.src = this.defaultImg;
    }
}
