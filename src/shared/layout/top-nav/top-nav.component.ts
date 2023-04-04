import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  textSelectColor:string='';
  @Output() sideNavToggled = new EventEmitter<void>();

  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

}
