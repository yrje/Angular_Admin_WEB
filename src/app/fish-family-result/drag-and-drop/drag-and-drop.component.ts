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


    public waterUrl: string = '';

    public url: string | ArrayBuffer = '';
    public size: any = {
        width: 1200,
        height: 900
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
      console.log(opt);
        this.waterUrl = opt;
        this.fishbowlCode = fishbowlCode;
        this.canvas.setBackgroundImage(this.waterUrl, this.canvas.renderAll.bind(this.canvas), {
          top:40,
          left: 40,
          scaleX:0.5,
          scaleY: 0.5
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

    timeObjectResult(x:number,y:number,width:number,height:number,angle:number,imgUrl:string) {
      const imageUrl = './../../' + imgUrl;

      fabric.loadSVGFromURL(imageUrl, (objects, options) => {

        const image = fabric.util.groupSVGElements(objects, options);
        image.set({
          top: y - (height/2),
          left: x - (width/2),
          angle: angle
        });
        let originWidthScale : number = image.width? image.width : 1;
        image.scale(width/originWidthScale);
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }

    selectItemAfterAdded(obj:any){
      this.canvas.discardActiveObject().renderAll();
      this.canvas.setActiveObject(obj);
    }
}

