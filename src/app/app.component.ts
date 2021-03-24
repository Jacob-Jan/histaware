import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HistAware';
  public showlanguagemenu: boolean = false;
  public activelanguage: {id, term} = {id: 0, term: "NL"};
  public languages = [{id: 0, term: "NL"}, {id: 1, term: "EN"}]
  constructor(public router: Router) {}

  selectlanguage(language) {
    this.activelanguage = language;
  }
}
