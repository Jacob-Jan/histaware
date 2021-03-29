import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }
  public topicoptions = [
    { id: 1, term: "Gas" },
    { id: 2, term: "Coal" },
    { id: 3, term: "Oil" }
  ]
  ngOnInit(): void {
  }
  optionselected(ev) {
    if (typeof ev !== "string") {
      this._router.navigate(['/result', ev.id])
    }
  }
}
