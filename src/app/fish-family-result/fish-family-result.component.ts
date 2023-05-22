import {Component, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {interval} from "rxjs";
import {DrawerPosition} from "@progress/kendo-angular-layout";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";
import {MrResultSheetRequest} from "../../shared/model/request/mr-result-sheet.request.model";

@Component({
  selector: 'app-fish-family-result',
  templateUrl: 'fish-family-result.component.html',
  styleUrls:['fish-family-result.component.scss']
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

  // 설문지 데이터
  public questionData: any;
  // 설문지 타이틀
  public questionTitle: any;

  // 사용자 회차 수
  public countTurnList: string[] = [];
  // 선택한 회차
  public selectedTurn: string = '';
  // 회차별 물병
  public selectedBowl: string = '';
  // 회차별 물병 코드
  public selectedBowlCode: number = 0;
  // 이메일 입력후 확인 클릭 여부
  public inputEmailCheck: boolean = false;
  // 결과지 내용
  public selectDescription: string = '';
  public resultDescription: string[] = [];
  /** 결과지 슬라이더 열기 */
  public expanded = false;
  /** 결과지 슬라이더 위치 */
  public position: DrawerPosition = "end";

  /** 결과지 슬라이더 mocks */
  public items = [
    {text:'결과지', icon: "k-i-arrow-seek-right", content:'수고하셨습니다! 어항 속 모습을 통해 해석된 당신의 심리는 아래와 같습니다.'}
  ];


  /** canvas */
  @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

  /**
   * 생성자
   * @param mindReaderControlService
   */
  constructor(
    private mindReaderControlService:MindReaderControlService,
    private alertService: AlertService,
  ) {}
  public inputResult: FormGroup = new FormGroup({
    userEmail: new FormControl(''), // 사용자 이메일
  });

  /**
   * 초기화
   */
  ngOnInit(){
      // 사용자 데이터 셋 조회
      this.mindReaderControlService.getQuestion()
        .subscribe({
          next: async (data) => {
            if (data){
              this.questionData = data;
              console.log(data)
              this.questionTitle = data.filter((item, index, array) => {
                return (
                  index === array.findIndex(
                    (obj) => obj.titleId === item.titleId && obj.title === item.title
                  )
                );
              });

              console.log(this.questionTitle)
            }
          }
        });
  }
  loadDataSet(){
    // 사용자 데이터 셋 조회
    this.mindReaderControlService.getDataSet('test0522@naver.com')
      .subscribe({
        next: async (data) => {
          if (data){
            this.dataSet = data
            console.log(data)
            this.countTurnList = Array.from({ length: this.dataSet.length }, (_, index) => index + 1).map(item => item + '회차');
          }
        }
      });
    // 오브젝트 이미지 조회
    this.mindReaderControlService.getObjectData()
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectImage = data;
            console.log(data)
          }
        }
      });
    this.inputEmailCheck = true;
  }

  /**
   * 회차별 데이터 조회
   */
  loadDataTurn(){
    let selectedTurn: number = 0;
    selectedTurn = Number(this.selectedTurn.replace('회차',''))-1;
    console.log(selectedTurn);
    this.selectedBowl=this.objectImage[this.dataSet[selectedTurn].fishbowlCode].path
    this.selectedBowlCode=this.dataSet[selectedTurn].fishbowlCode
    // 회차별 사용자 오브젝트 조회
    this.mindReaderControlService.getSeqObject(selectedTurn+1,'test0522@naver.com')
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectData=data;
            console.log(data)
          }
        }
      });
    // 회차별 사용자 오브젝트 순서 목록 조회
    this.mindReaderControlService.getObjectCodeSeq(selectedTurn+1,'test0522@naver.com')
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectSeq = data;
            console.log(data)
          }
        }
      });
  }

  /**
   * 시간차 오브젝트 띄우기
   */
  objectResult(){
    this.loadDataTurn();

    // 캔버스 초기화
    this.canvas.canvas.clear();
    setTimeout(()=>{
      for(let i=0;i<=this.objectData.length-1;i++){
        let pathUrl=this.objectImage[this.objectSeq[i].id].path
        this.canvas.timeObjectResult(this.objectData[i].x, this.objectData[i].y, this.objectData[i].width, this.objectData[i].height, this.objectData[i].angle, pathUrl);

         }},100);
    // 어항 세팅
    this.canvas.setWater(this.selectedBowl,this.selectedBowlCode);
    }

    saveResultSheet(){
      const resultDescription = this.resultDescription.join('');
      const request:MrResultSheetRequest={
        answerIds:'',
        counselor:'',
        createDate:new Date(),
        dataSetId:0,
        description:resultDescription,
        id:0,
        questionIds:'',
        userEmail:'',
      }
      console.log(request)
      if (this.resultDescription.length==10){
        this.mindReaderControlService.postResultSheet(request)
          .subscribe({
            next: async(data) => {
              if(data){
              }
            },
            error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
          });
      }
      else{
        this.alertService.openAlert('모든 문항을 체크하지 않았습니다.')
      }
    }

}
