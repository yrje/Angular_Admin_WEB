import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedStyle = 'login-page';

  /**
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * 초기화
   */
  ngOnInit() {}

  /**
   * 로그인 시 대시보드로 이동 이벤트
   */
  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/dashboard']);
  }

}
