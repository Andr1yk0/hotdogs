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

    constructor(private hotdogsService: HotdogsService) {
    }

    ngOnInit() {
        this.hotdogsService.all.subscribe((hotdogs: Hotdog[]) => {
            this.hotdogs = hotdogs;
        });
        this.hotdogsService.loadAll();
    }

    onDelete(id){
        this.hotdogsService.delete(id).subscribe();
    }

    onEdit(hotdog: Hotdog) {
        this.hotdogsService.updateSelected(hotdog);
    }

}
