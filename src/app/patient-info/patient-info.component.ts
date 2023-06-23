import {Component, OnInit} from "@angular/core";

@Component({
    selector:'app-patient-info',
    templateUrl:'patient-info.component.html',
  styleUrls:['patient-info.component.scss']
  }
)
export class PatientInfoComponent implements OnInit{
  public data: any; // API 에서 받아오는 데이터 객체


  /**
   * 초기화
   */
  ngOnInit():void {
  }


}
