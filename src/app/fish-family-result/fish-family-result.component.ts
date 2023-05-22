import {Component,OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";

@Component({
  selector: 'app-fish-family-result',
  templateUrl: 'fish-family-result.component.html'
})
export class FishFamilyResultComponent implements OnInit{

  // 회차별 오브젝트 데이터
  public objectData: any;

  // 사용자 데이터 셋
  public dataSet: any;

  // 오브젝트 이미지 데이터
  public objectImage: any;

  // 회차별 사용자 오브젝트 순서 목록
  public objectSeq: any;

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
            this.dataSet = data
          }
        }
      });
    // 회차별 사용자 오브젝트 조회
    this.mindReaderControlService.getSeqObject(10,this.inputResult.controls['userEmail'].value)
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectData=data;
          }
        }
      });
    // 회차별 사용자 오브젝트 순서 목록 조회
    this.mindReaderControlService.getObjectCodeSeq(10,this.inputResult.controls['userEmail'].value)
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectSeq = data;
          }
        }
      });
    // 오브젝트 이미지 조회
    this.mindReaderControlService.getObjectData()
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectImage = data;
          }
        }
      });
  }




}
