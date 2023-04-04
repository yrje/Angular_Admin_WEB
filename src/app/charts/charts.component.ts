import {Component, OnInit} from "@angular/core";

@Component({
    selector:'app-charts',
    templateUrl:'charts.component.html',
    styleUrls:['charts.component.scss']
  }
)
export class ChartsComponent implements OnInit{

  public chartData: number[] = [1, 2, 3, 4, 5];

  ngOnInit() {
  }
}
