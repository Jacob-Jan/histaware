import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  public topicoptions = [
    { id: 1, term: "Gas" },
    { id: 2, term: "Coal" },
    { id: 3, term: "Water" }
  ]
  ngOnInit(): void {
  }

}
