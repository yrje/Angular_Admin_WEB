import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../shared/service/data.service";
import {NotificationService} from "@progress/kendo-angular-notification";
import {UserResponseModel} from "../../shared/model/response/user.response.model";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public loginData: UserResponseModel[] = [];

  public email:string='';
  public passWord:string='';

  public horizontal: HorizontalPosition = "center";
  public vertical: VerticalPosition = "top";

  selectedStyle = 'login-page-wrap';

  /**
   * @param router
   * @param dataService
   * @param notificationService
   */
  constructor(
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  /**
   * 초기화
   */
  ngOnInit() {
    this.dataService.getUserData().subscribe(data => {
      this.loginData = data;
    })
  }

  /**
   * 로그인 시 대시보드로 이동 이벤트
   */
  onLogin() {
    this.loginData.forEach(item => {
        if(item.email === this.email ){
          if(item.password === this.passWord){
            this.router.navigateByUrl(`/dashboard`);
            return
          }
          else{
            this.openAlert('비밀번호를 확인해주세요.');
          }
        }
        else{
          this.openAlert('존재하지 않는 Email입니다.');
        }
      });
  }


  openAlert(message: string) {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      animation: { type: "fade", duration: 500 },
      type: { style: "info", icon: true },
      position: { horizontal: this.horizontal, vertical: this.vertical },
      width: 500,
      height: 50,
      hideAfter: 2000,
    });
  }

}
