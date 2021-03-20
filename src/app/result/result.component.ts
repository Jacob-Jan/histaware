import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor() { }
  public fullscreen: boolean = false;
  public filters = [
    {}
  ]

  ngOnInit(): void {
  }
  fullscreentoggle() {
    this.fullscreen = !this.fullscreen;
  }
}
