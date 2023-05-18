import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public SEVER_URL = 'http://localhost:8080/user';

  /**
   * 생성자
   * @param http
   */
  constructor(private http: HttpClient) { }


  /**
   * 사용자 생성
   */
  signUp(request: UserModel):Observable<UserModel> {
    return this.http.post<UserModel>(`${this.SEVER_URL}`,request);
  }

  /**
   * 모든 사용자 조회
   */
  getAllUser():Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.SEVER_URL}/userList`);
  }


  /**
   * 사용자 조회
   * @param email
   */
  getUserData(email: string): Observable<UserModel> {
    const param={
      email: email
    }
    return this.http.get<UserModel>(`${this.SEVER_URL}/email`,{params: param});
  }
}
