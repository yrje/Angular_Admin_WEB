import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MindReaderControlService} from "../../shared/service/mind-reader-control.service";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../shared/service/alert.service";
import {MrResultSheetRequest} from "../../shared/model/request/mr-result-sheet.request.model";
import {AuthService} from "../../shared/service/auth.service";
import {DataService} from "../../shared/service/data.service";
import {UserService} from "../../shared/service/user.service";
import {saveAs} from "@progress/kendo-drawing/pdf";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-fish-family-result',
  templateUrl: 'fish-family-result.component.html',
  styleUrls:['fish-family-result.component.scss']
})
export class FishFamilyResultComponent implements OnInit{
  public finalSelectEmail:any;
  // 회차별 오브젝트 데이터
  public objectData:any;

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
  public selectedTurn: string = '회차선택';
  // 회차별 물병
  public selectedBowl: string = '';
  // 회차별 물병 코드
  public selectedBowlCode: number = 0;
  // 이메일 입력후 확인 클릭 여부
  public inputEmailCheck: boolean = false;
  // 결과지 내용
  public selectDescription: string = '';
  public resultDescription: any[] = [];
  /** 오브젝트 순서 */
  public objectList: any[] = [];

  public answerList : any[]=[];
  /** 오브젝트 가족 순서 */
  public familySeq:any[]=[];

  /** 가족 리스트 데이터 */
  public familyList:any;
  /** 사이드에 띄울 데이터 */
  public sideNavData:any;

  /** 설문지 스타일 오브젝트 */
  public styleObject: any = {};
  /** 내담자 설문 데이터 */
  public patientInfo:any;
  /** 내담자 설문 결과 */
  public resultSheet: any;
  /** 설문 완료 여부 */
  public resultSheetCheck: boolean = true;
  /** 회차 리스트 disabled 여부 */
  public test:boolean=false;
  /** 전체 설문 답안 데이터 */
  public allAnswerList:any[]=[];
  /** 전체 유저 데이터 */
  public allUserData:any;
  /** 선택한 사용자 */
  public selectedUser:any;
  /** 평가 기준 */
  public resultSheetTitle:any[]= [
    {id:0,description:'평가 기준1 : 물의양'},
    {id:6,description:'평가 기준2 : 물고기 순서'},
    {id:17,description:'평가 기준3 : 어항 내부 구성물'},
    {id:25,description:'평가 기준4 : 어항 내부의 그림 내용'},
    {id:30,description:'평가 기준5 : 물고기의 모습I'},
    {id:35,description:'평가 기준6 : 물고기의 모습II'},
    {id:39,description:'평가 기준7 : 물고기의 모습III'},
    {id:46,description:'평가 기준8 : 물고기의 모습IV'},
    {id:60,description:'평가 기준9 : 물고기의 크기'},
    {id:67,description:'평가 기준10 : 기타 모습'}
  ];
  /** 선택한 Data Set */
  public selectDataSet:any;
  /** 선택한 회차 오브젝트 리스트 */
  public SelectSeqObjectList:any[]=[];
  /** canvas time out */
  public canvasTimeout : any ;
  /** 사용자 검색 시 이메일 */
  public searchEmail:any[]=[];
  /** 결과지 리스트 */
  public resultSheetList:string[]=[];
  /** nav에서 받은 데이터 */
  public userDataNav:any;

  /** canvas */
  @ViewChild('canvas', { static: false }) canvas !: DragAndDropComponent;

  /**
   * 생성자
   * @param mindReaderControlService
   * @param alertService
   * @param authService
   * @param userService
   * @param dataService
   * @param route
   * @param router
   */
  constructor(
    private mindReaderControlService:MindReaderControlService,
    private alertService: AlertService,
    private authService: AuthService,
    private dataService: DataService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * 초기화
   */
  ngOnInit(){
    this.onWindowResize(null); // 초기화 시에도 스타일 적용을 위해 호출
    // 윈도우 리사이즈 이벤트를 감지하여 onWindowResize 메서드 호출
    window.addEventListener('resize', this.onWindowResize.bind(this));
    // 전체 사용자 조회
    this.userService.getAllUser()
      .subscribe({
        next: async (data) => {
          if (data){

            this.allUserData=data;
          }
        }
      });
    // 선택한 회차 오브젝트 데이터 조회
    this.mindReaderControlService.getObjectData()
      .subscribe({
        next: async (data) => {
          if (data){

            this.SelectSeqObjectList=data
          }
        }
      });

    // 설문지 문항 조회
    this.mindReaderControlService.getQuestion()
      .subscribe({
        next: async (data) => {
          if (data){
            this.questionData = data;
            //this.getAnswer(this.questionData.length);
            this.questionTitle = data.filter((item, index, array) => {
              return (
                index === array.findIndex(
                  (obj) => obj.titleId === item.titleId && obj.title === item.title
                )
              );
            });

          }
        }
      });

    // 설문지 답안 조회
      this.mindReaderControlService.getAnswer()
        .subscribe({
          next: async (data) => {
            if (data) {
              this.answerList=data
            }
          }
        });
    this.route.queryParams.subscribe(params => {
      this.userDataNav=params;
      if(this.userDataNav.userEmail==undefined){
        this.inputEmailCheck = false;
        this.sideNavData=undefined;

      }else{
        this.inputEmailCheck = true;
        this.finalSelectEmail=this.userDataNav
        this.loadDataSet(this.userDataNav.userEmail);
        this.finalSelectEmail=this.userDataNav.userEmail;
      }

    });

  }

  /**
   * object to csv download
   */
  downloadFile() {
    const csvData = this.convertToCSV(this.objectData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(data: any): string {
    const csvRows = [];

    // Header row creation
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Data rows creation
    data.forEach((item: Record<string, any>) => {
      const values = headers.map((header) => item[header]);
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n')
  }

  private convertToCsv(data: any[]): string {
    const csvRows = [];

    // CSV 헤더 추가
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // 데이터 행 추가
    data.forEach(item => {
      const values = headers.map(header => item[header]);
      csvRows.push(values.join(','));
    });

    // CSV 데이터 반환
    return csvRows.join('\n');
  }
  /**
   * 사용자 조회하기 버튼 event
   */
  onRefresh() {
    this.router.navigateByUrl('/fish-family-result')
    // page refresh
    window.location.reload();

  }

  /**
   * 설문지에 체크한 문항 저장
   * @param description
   */
  changeResultSheet(answer:any){
    this.resultDescription.push(answer)
  }


  /**
   * 해상도에 따른 설문지 크기 변경
   * @param event
   */
  onWindowResize(event: any) {
    this.styleObject = {
      width: `${window.innerWidth - 1400}px`,
    };
  }

  /**
   * 데이터셋 로드
   */
  loadDataSet(email:string){
    this.answerList = this.answerList.reduce((acc, current) => {
      return acc.concat(current);
    }, []);
    // 사용자 데이터 셋 조회
    this.mindReaderControlService.getDataSet(email)

      .subscribe({
        next: async (data) => {
          if (data){
            this.dataSet = data
            this.dataSet=this.dataSet.filter(i=>i.deleted===false)
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
          }
        }
      });
    // 가족 리스트 조회
    this.mindReaderControlService.getFamily()
      .subscribe({
        next: async (data) =>{
          if(data){
            this.familyList = data;
          }
        }
      })
    // 내담자 추가 입력 정보 조회
    this.mindReaderControlService.getInfo(email)
      .subscribe({
        next: async (data) => {
          if (data){
            this.patientInfo = data;
            this.dataService.sendDataToTopNav(this.patientInfo);
          }
        }
      });

    // 이메일 확인 체크
    this.inputEmailCheck = true;
    this.allAnswerList = this.allAnswerList.flat().sort((a, b) => a.id - b.id);
  }

  /**
   * dropdownlist eamil 검색 이벤트
   * @param value
   */
  handleFilter(value:any) {
    this.searchEmail = this.allUserData.filter(
      (s: { email: string; }) => s.email.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  emailChange(value:any){
    this.finalSelectEmail=this.selectedUser.email
  }
  /**
   * 회차별 데이터 조회
   */
  loadDataTurn(){
    this.resultDescription=[];
    this.objectData=[];
    this.resultSheetCheck=true;
    let selectedTurn: number = 0;
    selectedTurn = Number(this.selectedTurn.replace('회차',''));
    // 내담자 설문 결과 조회
    this.mindReaderControlService.getResultSheet(this.dataSet[selectedTurn-1].id)
      .subscribe({
        next: async (data) => {
          if (data){
            this.resultSheet = data;
            this.resultSheetList=this.resultSheet.description.split('.,')
            if(data.length!=0){
            this.resultSheetCheck=false;
            }
          }
        }
      });
    this.objectId = this.dataSet[selectedTurn-1].id
    this.selectedBowl=this.objectImage[this.dataSet[selectedTurn-1].fishbowlCode].path
    this.selectedBowlCode=this.dataSet[selectedTurn-1].fishbowlCode
    // 회차별 사용자 오브젝트 조회
    this.mindReaderControlService.getSeqObject(this.dataSet[selectedTurn-1].seq,this.finalSelectEmail)
      .subscribe({
        next: async (data) => {
          if (data){
            // 오브젝트 가족 관계 순서 데이터 생성
            this.objectData=data;
            let i= 0;
            for (let obj1 of this.familyList) {
              for (let obj2 of this.objectData) {
                this.familySeq[i]=null;
                if (obj1.id === obj2.name) {
                  obj2.name = obj1.description;
                }
              }i=i+1;
            }
            this.familySeq=this.objectData;
            this.selectDataSet=this.familySeq
            this.objectData=data;
            // 회차별 오브젝트 코드
            for (let i = 0; i < this.selectDataSet.length; i++) {
              this.mindReaderControlService.getObjectCode(this.selectDataSet[i].objectCodeId)
                .subscribe({
                  next: async (data) => {
                    if (data){
                      let objectData:any;
                      objectData=data
                      this.objectList.splice(i, 0, objectData.description);
                    }
                  }
                });
            }

            this.familySeq= this.familySeq.map(item => item.name);


          }
        }
      });

  }

  /**
   * 시간차 오브젝트 띄우기
   */
  objectResult(){
    clearTimeout(this.canvasTimeout);
    // 회차 데이터 조회
    this.loadDataTurn();

    // 캔버스 초기화
    this.canvas.canvas.clear();
    // 어항 세팅
    this.canvas.setWater(this.selectedBowl,this.selectedBowlCode);


    // 시간차를 두고 캔버스에 오브젝트 띄우기
    setTimeout(()=>{
      //side nav에 띄울 data 생성
      this.sideNavData = this.objectList.map((description,index)=>({description,family:this.familySeq[index]}))
      this.dataService.sendDataToSideNav(this.sideNavData);
      for (let i = 0; i < this.selectDataSet.length; i++) {

        let pathUrl=this.SelectSeqObjectList.find(obj => obj.objectCodeId ===this.selectDataSet[i].objectCodeId ).path;
        this.canvasTimeout = setTimeout(() => {
          this.canvas.timeObjectResult(this.objectData[i].x, this.objectData[i].y, this.objectData[i].width, this.objectData[i].height, this.objectData[i].angle,this.objectData[i].flip, pathUrl);
        }, 1000 * (i + 1));

      }
      },500);
    this.objectList=[];

  }


  /**
   * 예외 처리
   */
/*  exception(){
    let selectAnswer: number[] = [];
    let resultDescription: any[] = [];
    let resultAnswer = this.resultDescription.map(str => +str);

    // 1/2이상 동시 체크되면 questionId = 1 삭제
    let exception1: number[] = [7,8,9,10,11,16,18,19,20,23,25,29,34,36,37,38,39,40,41,42,43,44];
    if(resultAnswer.includes(1)){
      let includedCount: number = 0;
      exception1.forEach(number => {
        if (resultAnswer.includes(number) || exception1.includes(number)) {
          includedCount++;
        }
      });
      let inclusionRatio: number = includedCount / exception1.length;
      if (inclusionRatio>=0.5){
        resultAnswer = resultAnswer.filter(number => number !== 1);
      }
    }
    resultAnswer=[1,7,8,9,10,11,16,18,20,23,25,29,32,34,36,37]
    // 물고기 순서 : 모두 해당하는 번호가 있다면 현재 그 번호의 내용으로 해석 / 모두 아니면 10 - 2
    let exception2_1: number[] = [32,34,37] // 10 - 1
    let exception2_2: number[] = [17,24,35,40] // 10 - 3
    let exception2_3: number[] = [17,29,35,40] // 13 - 2
    if (resultAnswer.includes(10)){
      let includedCount1: number = 0;
      exception2_1.forEach(number => {
        if (resultAnswer.includes(number) || exception2_1.includes(number)) {
          includedCount1++;
        }
      });
      let inclusionRatio: number = includedCount1 / exception2_1.length;
      if (inclusionRatio==1){
        selectAnswer.push(0)
      }
      else{
        let includedCount2: number = 0;
        exception2_2.forEach(number => {
          if (resultAnswer.includes(number) || exception2_2.includes(number)) {
            includedCount1++;
          }
        });
        let inclusionRatio2: number = includedCount2 / exception2_2.length;
        if (inclusionRatio2==1){
          selectAnswer.push(1)

        }
        else{
          selectAnswer.push(2)
        }
      }
    }
    if(resultAnswer.includes(13)){
      let includedCount3: number = 0;
      exception2_3.forEach(number=>{
        if(resultAnswer.includes(number) || exception2_3.includes(number)){
          includedCount3++;
        }
      })
      let inclusionRatio: number = includedCount3 / exception2_3.length;
      if(inclusionRatio==1){
        selectAnswer.push(1)
      }
      else{
        selectAnswer.push(0)
      }
    }

    // 2/3이상이 체크되면 현재 그 번호의 내용으로 해석된다.
    let exception3: number[] = [3,5,6,7,8,9,10,20,22,24,25,26,31];
    ///////////////////////////////////////
    if(resultAnswer.includes(18)){
      let includedCount: number = 0;
      exception3.forEach(number => {
        if (resultAnswer.includes(number) || exception3.includes(number)) {
          includedCount++;
        }
      });
      let inclusionRatio: number = includedCount / exception3.length;
      if (inclusionRatio>=0.66){
        selectAnswer.push(1)
      }else{
        selectAnswer.push(0)
      }
    }
    ///////////////////////////////////////
    if(resultAnswer.includes(27)){
      let includedCount: number = 0;
      exception3.forEach(number => {
        if (resultAnswer.includes(number) || exception3.includes(number)) {
          includedCount++;
        }
      });
      let inclusionRatio: number = includedCount / exception3.length;
      if (inclusionRatio>=0.66){
        selectAnswer.push(2)
      }else{
        selectAnswer.push(0)
      }
    }

    // 안의 번호가 모두 체크 되면 현재 그 번호의 내용으로 해석
    let exception4: number[] = [1,10,16,49]
    if(resultAnswer.includes(45)){
      let includedCount: number = 0;
      exception4.forEach(number => {
        if (resultAnswer.includes(number) || exception4.includes(number)) {
          includedCount++;
        }
      });
      let inclusionRatio: number = includedCount / exception4.length;
      if (inclusionRatio>=1){
        selectAnswer.push(1)
      }else{
        selectAnswer.push(0)
      }
    }
    resultAnswer = this.resultDescription.map(str => +str);


    for (let i = 0; i < this.resultDescription.length; i++) {
      let j = 0;
      this.mindReaderControlService.getAnswer(resultAnswer[i])
        .subscribe({
          next: async (data) => {
            if (data) {
              if (data.length>1){
                resultDescription.push(data[selectAnswer[j]].description)
                j=j+1;
              }else{
                resultDescription.push(data[0].description)
              }
            }
          }
        });
    }
    this.resultDescription=resultDescription;
  }*/
  /**
   * 설문 데이터 저장
   */
  saveResultSheet() {
    //예외처리
    //this.exception();
      const request: MrResultSheetRequest = {
        answerIds: '',
        counselor: String(this.authService.getUserEmail()),
        createDate: new Date(),
        dataSetId: Number(this.objectId),
        description: String( this.resultDescription),
        id: 0,
        questionIds: '',
        userEmail: this.finalSelectEmail,
      }
      // 설문 데이터 저장하기
      this.mindReaderControlService.postResultSheet(request)
        .subscribe({
          next: async (data) => {
            if (data) {
              this.alertService.openAlert('설문 저장이 완료되었습니다.')
              this.mindReaderControlService.getResultSheet(Number(this.objectId))
                .subscribe({
                  next: async (data) => {
                    if (data){
                      this.resultSheet = data;
                      if(data.length!=0){
                        this.resultSheetCheck=false;
                        this.resultSheetList=this.resultSheet.description.split('.,')
                      }
                    }
                  }
                });
            }
          },
          error: (err: HttpErrorResponse) => this.alertService.openAlert(err.message)
        });

    // 저장시 결과지 보이기
    this.resultSheetCheck = false;

  }


}
