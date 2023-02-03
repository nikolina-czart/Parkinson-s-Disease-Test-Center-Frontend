import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private _shouldDisplaySubj$ = new BehaviorSubject<boolean>(false);
  private _shouldDisplay$ = this._shouldDisplaySubj$.asObservable();
  constructor() { }

  get shouldDisplay$(): Observable<boolean>{
    return this._shouldDisplay$
  }

  display() {
    this._shouldDisplaySubj$.next(true)
  }

  hide() {
    this._shouldDisplaySubj$.next(false)
  }
}
