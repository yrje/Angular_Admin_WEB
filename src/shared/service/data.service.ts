import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * main page data -> side nav
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<any>();
  private dataTopSubject = new Subject<any>();
  sideData$ = this.dataSubject.asObservable();

  topData$ = this.dataTopSubject.asObservable();

  sendDataToSideNav(data: any) {
    this.dataSubject.next(data);
  }

  sendDataToTopNav(data: any) {
    this.dataTopSubject.next(data);
  }
}
