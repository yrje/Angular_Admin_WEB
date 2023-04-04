import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {DataService} from "../../shared/service/data.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector:'app-table',
  templateUrl:'table.component.html'
  }
)
export class TableComponent implements OnInit{
  public data: any; // API 에서 받아오는 데이터 객체

  /**
   *
   * @param dataService
   */
  constructor(private dataService: DataService) {}

  /**
   * 초기화
   */
  ngOnInit() {
    // 데이터 로드
    this.dataService.getData().subscribe(data=>{
      this.data=data;
      console.log(this.data[1])
    })
  }

}
