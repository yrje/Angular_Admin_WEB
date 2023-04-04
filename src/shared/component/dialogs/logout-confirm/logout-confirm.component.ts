import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.component.html',
  styleUrls:['logout-confirm.component.scss']
})
export class LogoutConfirmComponent {
  /**
   * 생성자
   * @param router
   * @param dialogRef
   */
  constructor(private readonly router: Router,public dialogRef: MatDialogRef<LogoutConfirmComponent>,)
  {}

  /**
   * 로그아웃 버튼 클릭시 로그인 페이지 이동 이벤트
   */
  onLoggedout() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  /**
   * 다이얼로그 닫기
   */
  close(){
    this.dialogRef.close();
  }

}
