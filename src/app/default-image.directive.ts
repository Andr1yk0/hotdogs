import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: 'img[src], img[attr.src]'
})
export class DefaultImageDirective {
    public defaultImg = 'ng/assets/images/default.png';

    @HostListener('error', ['$event'])
    onError(event) {
        event.target.src = this.defaultImg;
    }
}
