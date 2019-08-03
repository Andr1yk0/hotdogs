import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-edit-hotdogs',
    templateUrl: './edit-hotdogs.component.html',
    styleUrls: ['./edit-hotdogs.component.scss']
})
export class EditHotdogsComponent implements OnInit {

    form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null),
            img: new FormControl(null)
        });
    }

}
