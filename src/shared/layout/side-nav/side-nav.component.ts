import { Component } from '@angular/core';
import {DataService} from "../../service/data.service";
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  // 받아온 데이터
  public receivedData: any;

  // 데이터 null 여부
  public emptyData:boolean = false;

  // main page에서 데이터 불러오기
  constructor(private dataService: DataService) {
    this.dataService.sideData$.subscribe(data => {
      this.receivedData = data;
      this.emptyData = true;
    });
  }

}
