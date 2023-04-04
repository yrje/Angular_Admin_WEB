import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LogoutConfirmComponent} from "../../component/dialogs/logout-confirm/logout-confirm.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  /**
   * 생성자
   * @param dialog
   * @param router
   */
  constructor(public dialog:MatDialog,private router: Router)
  {}

  @Output() sideNavToggled = new EventEmitter<void>();

  /**
   * 초기화
   */
  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  /**
   * 로그아웃 컨펀 다이얼로그 이벤트
   */
  openDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, {
      width: '300px',
    });
  }

  /**
   * 로그아웃 버튼 클릭시 로그인 페이지 이동 이벤트
   */
  loginPage() {
    this.router.navigate(['/login']);
  }

}
