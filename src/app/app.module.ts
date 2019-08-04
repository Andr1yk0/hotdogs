import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HotdogsComponent} from './hotdogs/hotdogs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import { EditHotdogsComponent } from './hotdogs/edit-hotdogs/edit-hotdogs.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DefaultImageDirective} from './default-image.directive';

@NgModule({
    declarations: [
        AppComponent,
        HotdogsComponent,
        EditHotdogsComponent,
        DefaultImageDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatListModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
