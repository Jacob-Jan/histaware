import { Component, OnInit } from '@angular/core';
import gasdata from "../../assets/gas.json";
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }
  public advanced: boolean = false;
  public fullscreen: boolean = false;
  public tabindex: number = 0;
  public searchqueries: { data?, topic?, geography?, newspaper?, chart?}[] = [];
  public mygasdata;
  public isMobileLayout = false;
  // public searchqueries = [
  //   {
  //     data: undefined,
  //     topic: undefined,
  //     geography: undefined,
  //     newspaper: undefined
  //   }
  // ]
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
    { id: 3, term: "Oil" }
  ]
  public newspapers = [
    { id: 1, term: "AD" },
    { id: 2, term: "ND" },
    { id: 3, term: "FD" }
  ]
  // public dataSource;
  public sentimentscores = {
    "VP": 2, "VN": -2, "PO": 1, "NG": -1, "NE": 0
  }
  ngOnInit(): void {
    let id = Number(this._route.snapshot.paramMap.get('id'));
    let topic = this.topicoptions.find(o => o.id === id);
    this.searchqueries.push({});
    if (window.innerWidth <= 767) {
      this.isMobileLayout = true;
    }
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 767;
    this.mygasdata = gasdata;
    this.mygasdata.forEach(element => {
      element['sentimentscore'] = this.sentimentscores[element.sentiment]
    });
    setTimeout(() => {
      this.topicselected(this.searchqueries[0], 0, topic)
    }, 0);
  }
  fullscreentoggle() {
    this.fullscreen = !this.fullscreen;
  }
  deletequery(index) {
    this.searchqueries.splice(index, 1);
  }
  // applyFilter(event) {
  //   let value = event.target.value
  //   console.log(value)
  //   this.dataSource.filter = value.trim().toLowerCase();
  // }
  topicselected(searchquery, index, event) {
    searchquery.topic = event;
    // console.log(event)
    if (event.id == 1) {
      searchquery.chartname = "chartdiv_" + index;
      searchquery.data = this.mygasdata;
      searchquery.plotdata = searchquery.data.filter(o => o.newspaper_date != "").map(o => ({ date: new Date(o.newspaper_date), value: o.sentimentscore })).sort((a, b) => a.date.getTime() - b.date.getTime());
      console.log(searchquery.data)
      setTimeout(() => {
        if (this.tabindex === 0) {
          this.lineplot(searchquery);
        }
      }, 0);

    } else {
      if (searchquery.chart) {
        searchquery.chart.dispose();
      }
    }
  }
  tabChanged(ev) {
    if (ev.index == 0) {
      this.searchqueries.forEach(searchquery => {
        this.lineplot(searchquery);
      });
    }
  }

  lineplot(searchquery) {
    searchquery.chart = am4core.create(searchquery.chartname, am4charts.XYChart);
    searchquery.chart.data = searchquery.plotdata;
    let dateAxis = searchquery.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = searchquery.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = searchquery.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "[bold]date:[/] {date}, [bold]sentiment:[/] {value}"

    series.tooltip.pointerOrientation = "vertical";

    searchquery.chart.cursor = new am4charts.XYCursor();
    searchquery.chart.cursor.behavior = "none"
    // searchquery.chart.cursor.snapToSeries = series;
    // searchquery.chart.cursor.xAxis = dateAxis;

    // searchquery.chart.scrollbarY = new am4core.Scrollbar();
    // searchquery.chart.scrollbarX = new am4core.Scrollbar();

  }
}

