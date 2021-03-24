import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor() { }
  public advanced: boolean = false;
  public fullscreen: boolean = false;
  public searchqueries = [
    {}
  ]
  public geographies = [
    { id: 0, term: "Drenthe" },
    { id: 1, term: "Flevoland" },
    { id: 2, term: "Friesland" },
    { id: 3, term: "Gelderland" },
    { id: 4, term: "Groningen" },
    { id: 5, term: "Limburg" },
    { id: 6, term: "Noord-Brabant" },
    { id: 7, term: "Noord-Holland" },
    { id: 8, term: "Overijssel" },
    { id: 9, term: "Utrecht" },
    { id: 10, term: "Zeeland" },
    { id: 11, term: "Zuid-Holland" }
  ]
  public topicoptions = [
    { id: 1, term: "Gas" },
    { id: 2, term: "Coal" },
    { id: 3, term: "Water" }
  ]
  public newspapers = [
    { id: 1, term: "AD" },
    { id: 2, term: "ND" },
    { id: 3, term: "FD" }
  ]
  ngOnInit(): void {
  }
  fullscreentoggle() {
    this.fullscreen = !this.fullscreen;
  }
  deletequery(index) {
    this.searchqueries.splice(index, 1);
  }
}

