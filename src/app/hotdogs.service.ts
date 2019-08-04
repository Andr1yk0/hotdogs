import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Hotdog} from './hotdog.model';
import {take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HotdogsService {

    private _selected: BehaviorSubject<Hotdog> = new BehaviorSubject(null);
    selected: Observable<Hotdog> = this._selected.asObservable();

    private _all: BehaviorSubject<Hotdog[]> = new BehaviorSubject([]);
    all: Observable<Hotdog[]> = this._all.asObservable();

    constructor(private http: HttpClient) {
    }

    loadAll() {
        return this.http.get(env.apiUrl + 'hotdogs').pipe(take(1))
            .subscribe((hotdogs: Hotdog[]) => {
                this._all.next(hotdogs);
            });
    }


    update(id: number, data: {}) {
        return this.http.patch(env.apiUrl + 'hotdogs/' + id, data)
            .pipe(tap(
                (hotdogs: Hotdog[]) => {
                    this._all.next(hotdogs);
                }
            ), take(1));
    }

    delete(id: number) {
        return this.http.delete(env.apiUrl + 'hotdogs/' + id)
            .pipe(tap(
                (hotdogs: Hotdog[]) => {
                    this._all.next(hotdogs);
                }
            ), take(1));
    }

    create(data: {}) {
        return this.http.post(env.apiUrl + 'hotdogs', data)
            .pipe(tap(
                (hotdogs: Hotdog[]) => {
                    this._all.next(hotdogs);
                }
            ), take(1));
    }

    updateSelected(hotdog: Hotdog) {
        this._selected.next(hotdog);
    }
}
