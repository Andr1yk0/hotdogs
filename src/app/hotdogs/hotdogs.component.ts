import {Component, OnInit} from '@angular/core';
import {HotdogsService} from '../hotdogs.service';
import {Hotdog} from '../hotdog.model';

@Component({
    selector: 'app-hotdogs',
    templateUrl: './hotdogs.component.html',
    styleUrls: ['./hotdogs.component.scss']
})
export class HotdogsComponent implements OnInit {

    hotdogs: Hotdog[];

    constructor(private $hotdogsService: HotdogsService) {
    }

    ngOnInit() {
        this.$hotdogsService.all().subscribe((hotdogs: Hotdog[]) => {
            this.hotdogs = hotdogs;
        });
    }

}
