import {Component, OnInit} from '@angular/core';
import {HotdogsService} from '../hotdogs.service';
import {Hotdog} from '../hotdog.model';
import {environment} from '../../environments/environment';
import {config} from 'rxjs';

@Component({
    selector: 'app-hotdogs',
    templateUrl: './hotdogs.component.html',
    styleUrls: ['./hotdogs.component.scss']
})
export class HotdogsComponent implements OnInit {

    hotdogs: Hotdog[];
    imgPath: string = environment.imagePath;

    constructor(private hotdogsService: HotdogsService) {
    }

    ngOnInit() {
        this.hotdogsService.all.subscribe((hotdogs: Hotdog[]) => {
            this.hotdogs = hotdogs;
        });
        this.hotdogsService.loadAll();
    }

    onDelete(id) {
        if (confirm('Delete hotdog?')) {
            this.hotdogsService.delete(id).subscribe();
        }
    }

    onEdit(hotdog: Hotdog) {
        this.hotdogsService.updateSelected(hotdog);
    }

}
