import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HotdogsService {

    constructor(private http: HttpClient) {
    }

    all() {
        return this.http.get(env.apiUrl + 'hotdogs');
    }
}
