import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
   * json server에서 데이터 로드
   */
  getData(): Observable<any> {
    return this.http.get("http://localhost:3000/posts");
  }
}
