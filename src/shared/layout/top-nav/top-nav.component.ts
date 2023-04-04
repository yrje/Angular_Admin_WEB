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


  constructor(public dialog:MatDialog,private router: Router)
  {}
  @Output() sideNavToggled = new EventEmitter<void>();
  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }
  openDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, {
      width: '300px',
    });
  }
  loginPage() {
    this.router.navigate(['/login']);
  }

}
