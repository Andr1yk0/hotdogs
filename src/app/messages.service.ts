import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment as env} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {filter, take} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _all: BehaviorSubject<any> = new BehaviorSubject(null);
  all = this._all.asObservable().pipe(filter(messages=>!isNullOrUndefined(messages)));

  constructor(private http: HttpClient){

  }

  loadAll(){
    this.http.get(env.apiUrl + 'messages').pipe(take(1))
      .subscribe((messages) => {
        this._all.next(messages);
      })
  }
}
