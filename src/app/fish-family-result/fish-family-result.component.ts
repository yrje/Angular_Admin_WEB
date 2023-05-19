import {Component,OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";

@Component({
  selector: 'app-fish-family-result',
  templateUrl: 'fish-family-result.component.html'
})
export class FishFamilyResultComponent implements OnInit{

  constructor(
    private mindReaderControlService:MindReaderControlService
  ) {}
  public inputResult: FormGroup = new FormGroup({
    userEmail: new FormControl(''), // 사용자 이메일
  });

  ngOnInit(){

  }
  loadDataSet(){
    // 사용자 데이터 셋 조회
    this.mindReaderControlService.getDataSet(this.inputResult.controls['userEmail'].value)
      .subscribe({
        next: async (data) => {
          if (data){
          }
        }
      });
  }




}
