import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {DataService} from "../../shared/service/data.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector:'app-table',
  templateUrl:'table.component.html'
  }
)
export class TableComponent implements OnInit{
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data=>{
      this.data=data;
      console.log(this.data[1])
    })
  }

}
