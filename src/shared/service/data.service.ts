import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * json-server data provider
 */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * sample data load
   */
  getData(): Observable<any> {
    return this.http.get("http://localhost:3000/posts");
  }
}
