import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data=['login-page','login-page2','login-page3']
  selectedStyle = 'login-page';

  sidemenu1=true;
  sidemenu2=false;
  sidemenu3=false;
  constructor(private router: Router) {}


  ngOnInit() {}
  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/dashboard']);
  }

}
