import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent{
  // 받아온 데이터
  public receivedData: any;

  // 데이터 null 여부
  public emptyData:boolean = false;

  // main page에서 데이터 불러오기
  constructor(private router: Router,
              private dataService: DataService) {
    this.dataService.sideData$.subscribe(data => {
      if(data==undefined){
        this.emptyData = false;
      }else{
        this.receivedData = data;
        this.emptyData = true;
      }
    });
  }

}
