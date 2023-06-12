import {Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';
import {LogoutConfirmComponent} from "../../component/dialogs/logout-confirm/logout-confirm.component";
import {Data, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "@progress/kendo-angular-dialog";
import {AuthService} from "../../service/auth.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public userName:string='';
  public userAge:number=0;
  public userGender:string='';

  public dataEmptyCheck: boolean = false;
  /**
   * 생성자
   * @param dialog
   * @param router
   * @param dialogService
   */
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private loginService:AuthService,
    private dataService: DataService,

  )  {
    this.dataService.topData$.subscribe(data => {
      this.userName=data.userName;
      this.userAge=data.age;
      if(data.genderId==0){
        this.userGender='남'
      }
      else if(data.genderId==1){
        this.userGender='여'
      }
      else{
        this.userGender='기타'
      }
      this.dataEmptyCheck = true;
      //this.topReceiveData = data.userName;
    });
  }


  @Output() sideNavToggled = new EventEmitter<void>();

  /** 다이얼로그 생성 컨테이너 지정 */
  @ViewChild('dialog', {read: ViewContainerRef})
  public dialogRef!: ViewContainerRef;

  /**
   * 초기화
   */
  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }


  /**
   * 로그아웃 컨펌 다이얼로그 이벤트
   */
  public openDialog(): void {
    const dialog = this.dialogService.open({
      title: "로그아웃하시겠습니까?",
      content: LogoutConfirmComponent,
      appendTo: this.dialogRef,
      width: 450,
      height: 185,
      minWidth: 250,
      cssClass: 'custom-css-class',
    });
    dialog.content.instance.text = `정말로 로그아웃하시겠습니까?`;

    dialog.result.subscribe((result: any) => {
      console.log(result)
      if (result.text === 'logout') {
        this.loginService.removeSessionStorage();
        // 페이지 새로고침
        window.location.reload();
      } else {
        console.log("close");
      }
    });
  }

  /**
   * 로그아웃 버튼 클릭시 로그인 페이지 이동 이벤트
   */
  loginPage() {
    this.router.navigate(['/login']);
  }

  // 받아온 데이터
  public receivedData: any;

  // 데이터 null 여부
  public emptyData:boolean = false;

}
