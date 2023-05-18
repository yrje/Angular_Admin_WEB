import {Component, OnInit} from "@angular/core";

@Component({
  selector:'app-table',
  templateUrl:'table.component.html'
  }
)
export class TableComponent implements OnInit{
  public data: any; // API 에서 받아오는 데이터 객체


  /**
   * 초기화
   */
  ngOnInit():void {
  }


}
