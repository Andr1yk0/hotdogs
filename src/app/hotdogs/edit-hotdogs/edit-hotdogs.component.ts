import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HotdogsService} from '../../hotdogs.service';
import {Hotdog} from '../../hotdog.model';
import {take} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MessagesService} from '../../messages.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-edit-hotdogs',
    templateUrl: './edit-hotdogs.component.html',
    styleUrls: ['./edit-hotdogs.component.scss']
})
export class EditHotdogsComponent implements OnInit {

    form: FormGroup;
    hotdog: Hotdog = null;
    btnText = 'Create';
    imagePreview;
    messages: Observable<any>;

    @ViewChild('imageInput')
    imageInput: ElementRef;

    constructor(private hotdogsService: HotdogsService,
                private messagesService: MessagesService
                ) {
    }

    ngOnInit() {
        this.messagesService.loadAll();
        this.initForm();
        this.hotdogsService.selected.subscribe((hotdog: Hotdog) => {
            this.hotdog = hotdog;
            this.imagePreview = environment.imagePath + (hotdog ? hotdog.img : null);
            this.initForm();
        });
        this.messages = this.messagesService.all;

    }

    initForm() {
        const data = {
            title: this.hotdog ? this.hotdog.title : null,
            img: this.hotdog ? this.hotdog.img : null
        };
        this.form = new FormGroup({
            title: new FormControl(data.title, Validators.required),
            img: new FormControl(data.img)
        });
        this.btnText = this.hotdog ? 'Update' : 'Create';
    }

    onImageSelected() {
        const reader = new FileReader();
        const file = this.imageInput.nativeElement.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            // @ts-ignore
            this.form.controls.img.patchValue(reader.result);
            this.imagePreview = reader.result;
            this.form.markAsDirty();
        };
    }

    onClear() {
        this.hotdogsService.updateSelected(null);
        this.imageInput.nativeElement.value = '';
    }

    onSubmit() {
        if(!this.form.valid){
          return;
        }
        if (this.hotdog) {
            this.hotdogsService.update(this.hotdog.id, this.form.value)
                .subscribe();
        } else {
            this.hotdogsService.create(this.form.value)
                .subscribe();
        }
    }

}
