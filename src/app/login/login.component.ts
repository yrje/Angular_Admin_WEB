import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../shared/service/data.service";
import {NotificationService} from "@progress/kendo-angular-notification";
import {UserModel} from "../../shared/model/response/user.response.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/service/auth.service";
import {LoginRequestModel} from "../../shared/model/request/login.request.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent  {

  /**
   * 생성자
   * @param router
   * @param loginProvider
   * @param notificationService
   * @param alertService
   */
  constructor(
    private router: Router,
    private loginProvider: AuthService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) {}


  /**
   * 로그인 폼
   */
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]), // 이메일
    password: new FormControl('',[Validators.required]), // 비밀번호
  });

  /**
   * login
   */
  login(){
    const request: LoginRequestModel = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    // login
    this.loginProvider.login(request)
      .subscribe({
        next: async (response) => {
          if (response) {
            // 로그인 성공 시 튜토리얼로 이동
            this.dashboard();
          }
        },
        // http error message 출력
        error: (err: HttpErrorResponse) => {
          if(err.status == 401){
            this.alertService.openAlert('존재하지 않는 아이디입니다.')
          }
          else if (err.status == 400){
            this.alertService.openAlert('비밀번호를 다시 한 번 확인해주세요.')
          }
          else {
            this.alertService.openAlert(err.message)
          }


        }
      })
  }
  /**
   * 대시보드로 이동
   */
  dashboard() {
    this.router.navigateByUrl(`/dashboard`);
  }

}
