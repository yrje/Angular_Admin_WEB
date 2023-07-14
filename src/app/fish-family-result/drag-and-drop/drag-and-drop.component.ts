import {
    AfterViewInit,
    Component,
    ElementRef,
    Injectable,
    Input,
    ViewChild
} from "@angular/core";
import { fabric } from 'fabric';
import {MindReaderControlService} from "../../../shared/service/mind-reader-control.service";
import {AlertService} from "../../../shared/service/alert.service";

@Component({
    selector: 'app-drag-and-drop',
    templateUrl: 'drag-and-drop.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class DragAndDropComponent implements AfterViewInit{

    @ViewChild('htmlCanvas', {read: ElementRef})
    public htmlCanvasElement!: ElementRef;

    @Input() userEmail:string | null = '';

    public canvas: fabric.Canvas;

    /** 어항 코드 */
    public fishbowlCode: number = 0;

  showTooltip: boolean = false;
  tooltipText: string = '';
    public waterUrl: string = '';

    public url: string | ArrayBuffer = '';
    public size: any = {
        width: 1000,
        height: 570
    };

    public json: any;
    public moved: any;

    /**
     * 생성자
     * @param mindReaderControlService
     * @param alertService
     */
    constructor(
        public mindReaderControlService: MindReaderControlService,
        private alertService: AlertService,
    ) {
        this.canvas = new fabric.Canvas('canvas');
    }

    ngAfterViewInit(): void {
      // setup front side canvas
      this.canvas = new fabric.Canvas(this.htmlCanvasElement.nativeElement, {
        hoverCursor: 'pointer',
        selection: false,
        skipTargetFind: true,
        selectionBorderColor: 'blue',
        isDrawingMode: false,
      });
      this.canvas.setWidth(this.size.width);
      this.canvas.setHeight(this.size.height);

    }


    /**
     * 어항 설정
     * @param opt
     * @param fishbowlCode
     */
    setWater(opt: string, fishbowlCode: number){
        this.waterUrl = opt;
        this.fishbowlCode = fishbowlCode;
        this.canvas.setBackgroundImage(this.waterUrl, this.canvas.renderAll.bind(this.canvas), {
          top: 100 ,
          left: 200 ,
          scaleX:0.35 ,
          scaleY: 0.35
        });

    }

  /**
   * 시간차 오브젝트 띄우기
   * @param x
   * @param y
   * @param width
   * @param height
   * @param angle
   * @param imgUrl
   */

    timeObjectResult(x:number,y:number,width:number,height:number,angle:number,flip:boolean,imgUrl:string) {
      const imageUrl = './../../' + imgUrl;

       const el = imageUrl;
     const imageElement = document.createElement('img');
     const image = new fabric.Image(imageElement);
     fabric.Image.fromURL(el, (img) => {
       image.setElement(img.getElement());
       image.set({
         top: y - (height/2),
         left: x - (width/2),
         angle: angle,
         flipX: flip,
         selectable:false
       })

       let originWidthScale : number = image.width? image.width : 1;
       image.scale(width/originWidthScale);

       this.canvas.add(image);
       this.selectItemAfterAdded(image);
     })




  }


  /**
   * 캔버스에 이미지 추가
   * @param obj
   */
  selectItemAfterAdded(obj:any){
      this.canvas.discardActiveObject().renderAll();
      this.canvas.setActiveObject(obj);
    }
    test(){
      this.canvas.on('mouse:over',function (e){
        console.log(e)
      })
    }
}

