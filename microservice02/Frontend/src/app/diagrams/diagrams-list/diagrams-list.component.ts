import { Component, OnInit } from "@angular/core";
import { Diagram } from "../interfaces/diagram";
import { NgOptimizedImage } from "@angular/common";
import * as Highcharts from "highcharts";
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

  chartOptions: Highcharts.Options = {
    title: {
      text: "U.S Solar Employment Growth by Job Category, 2010-2020",
      align: "left",
    },

    subtitle: {
      text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
      align: "left",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: "Tokyo",
        data: [
          [24916, 1],
          37941,
          29742,
          29851,
          32490,
          30282,
          38121,
          36885,
          33726,
          34243,
          31050,
        ],
        type: "line",
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {},
        },
      ],
    },
  };

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.Diagrams.push({
        title: "a",
        imgpath: "",
        disc: "This is description",
      });
    }
  }

  ngOnInit(): void {}
  /**
   * function - getDiagrams
   * @return Diagram []
   * "return all currently available digrams "
   */
  getDiagrams(): Diagram[] {
    return this.Diagrams;
  }
}
