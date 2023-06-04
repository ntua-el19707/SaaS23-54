import { Component, OnInit } from "@angular/core";
import { Diagram } from "../interfaces/diagram";
import { NgOptimizedImage } from "@angular/common";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HC_sankey from "highcharts/modules/sankey";
import HC_depwheel from "highcharts/modules/dependency-wheel";
HighchartsMore(Highcharts);
HC_sankey(Highcharts);
HC_depwheel(Highcharts);
import {
  DependencyWheelDiagram,
  LineAnotations,
  LineDiagram,
  NetworkDiagram,
  PollarDiagram,
  collumn,
} from "src/assets/DemosTS/diafram";
import { Router } from "@angular/router";
Highcharts.setOptions({
  exporting: {
    enabled: false,
  },
});
@Component({
  selector: "app-diagrams-list",
  templateUrl: "./diagrams-list.component.html",
  styleUrls: ["./diagrams-list.component.css"],
})
export class DiagramsListComponent implements OnInit {
  private Diagrams: Diagram[] = [];
  highcharts = Highcharts;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const diagrams = [
      LineDiagram,
      PollarDiagram,
      NetworkDiagram,
      collumn,
      LineAnotations,
      DependencyWheelDiagram,
    ];
    diagrams.forEach((d) => {
      const title = d.name;
      this.Diagrams = [
        ...this.Diagrams,
        {
          title: title,
          disc: d.path,
          options: d.chart,
          redirect: d.path,
        },
      ];
    });
    console.log(this.Diagrams);
  }
  /**
   * function - getDiagrams
   * @return Diagram []
   * "return all currently available digrams "
   */
  getDiagrams(): Diagram[] {
    return this.Diagrams;
  }
  navigate(d: Diagram) {
    console.log(d);
    this.router.navigate(["/diagrams/ChartBuild", d.redirect]);
  }
}
