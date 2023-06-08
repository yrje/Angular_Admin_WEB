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
  data$ = this.dataSubject.asObservable();

  sendDataToSideNav(data: any) {
    this.dataSubject.next(data);
  }
}
