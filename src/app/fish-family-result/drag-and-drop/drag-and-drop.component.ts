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
        selectionBorderColor: 'blue',
        isDrawingMode: false,
        backgroundColor: '#ffffff'
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
          top: 150,
          left: 70,
          scaleX:0.58,
          scaleY: 0.58
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

      const imageElement = document.createElement('img');
      const imageUrl = './../../' + imgUrl;
      const image = new fabric.Image(imageElement);

      fabric.Image.fromURL(imageUrl, (img) => {
        image.setElement(img.getElement());
        image.set({
          top: y-50,
          left: x-60,
          scaleX: width,
          scaleY: height,
          angle: angle
        });
        this.canvas.add(image);
      });
    }
}

