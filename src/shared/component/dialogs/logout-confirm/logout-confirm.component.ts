import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.component.html',
  styleUrls:['logout-confirm.component.scss']
})
export class LogoutConfirmComponent {

  constructor(private readonly router: Router,public dialog:MatDialog, public dialogRef: MatDialogRef<LogoutConfirmComponent>,)
  {}
  onLoggedout() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }

}
