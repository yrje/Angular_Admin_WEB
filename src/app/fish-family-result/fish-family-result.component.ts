import {Component, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {interval} from "rxjs";
import {DrawerPosition} from "@progress/kendo-angular-layout";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";
import {MrResultSheetRequest} from "../../shared/model/request/mr-result-sheet.request.model";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-fish-family-result',
  templateUrl: 'fish-family-result.component.html',
  styleUrls:['fish-family-result.component.scss']
})
export class FishFamilyResultComponent implements OnInit{

  // 회차별 오브젝트 데이터
  public objectData: any;

  // 사용자 데이터 셋
  public dataSet: any[]=[];

  // 오브젝트 이미지 데이터
  public objectImage: any;

  // 회차별 사용자 오브젝트 순서 목록
  public objectSeq: any;
  // 사용자 회차별 id
  public objectId: number = 0;

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

  /** canvas */
  @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

  /**
   * 생성자
   * @param mindReaderControlService
   * @param alertService
   * @param authService
   */
  constructor(
    private mindReaderControlService:MindReaderControlService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}
  public inputResult: FormGroup = new FormGroup({
    userEmail: new FormControl(''), // 사용자 이메일
  });

  /**
   * 초기화
   */
  ngOnInit(){
    // 로그인 데이터 조회
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

  /**
   * 데이터셋 로드
   */
  loadDataSet(){
    // 사용자 데이터 셋 조회
    this.mindReaderControlService.getDataSet(this.inputResult.controls['userEmail'].value)
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

    selectedTurn = Number(this.selectedTurn.replace('회차',''));
    this.objectId = this.dataSet.find(obj => obj.seq === selectedTurn).id;
    console.log(selectedTurn)
    console.log(this.objectId)
    this.selectedBowl=this.objectImage[this.dataSet[selectedTurn-1].fishbowlCode].path
    this.selectedBowlCode=this.dataSet[selectedTurn-1].fishbowlCode
    // 회차별 사용자 오브젝트 조회
    this.mindReaderControlService.getSeqObject(selectedTurn,this.inputResult.controls['userEmail'].value)
      .subscribe({
        next: async (data) => {
          if (data){
            this.objectData=data;
            console.log(data)
          }
        }
      });
    // 회차별 사용자 오브젝트 순서 목록 조회
    this.mindReaderControlService.getObjectCodeSeq(selectedTurn,this.inputResult.controls['userEmail'].value)
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

  /**
   * 설문 데이터 저장
   */
  saveResultSheet() {
    let resultAnswer = this.resultDescription.map(str => +str);
/*    this.resultDescription = [];
    console.log(resultAnswer)
    for (let i = 0; i < resultAnswer.length; i++) {
      this.mindReaderControlService.getAnswer(resultAnswer[i])
        .subscribe({
          next: async (data) => {
            if (data) {
              this.resultDescription.push(data[0].description)
            }
          }
        });

    }*/
      if (this.resultDescription.length == 10) {
        const request: MrResultSheetRequest = {
          answerIds: '',
          counselor: String(this.authService.getUserEmail()),
          createDate: new Date(),
          dataSetId: Number(this.objectId),
          description: String(resultAnswer),
          id: 0,
          questionIds: '',
          userEmail: this.inputResult.controls['userEmail'].value,
        }
        console.log(request)
        this.mindReaderControlService.postResultSheet(request)
          .subscribe({
            next: async (data) => {
              if (data) {
              }
            },
            error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
          });
      } else {
        this.alertService.openAlert('모든 문항을 체크하지 않았습니다.')
      }

  }

}
