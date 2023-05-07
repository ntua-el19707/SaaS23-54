import {
  AfterContentInit,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { Diagram } from "../interfaces/diagram";
import * as Highcharts from "highcharts";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DiagramOppsComponent } from "../diagram-opps/diagram-opps.component";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "diagramBuilder",
  templateUrl: "./diagram-builder.component.html",
  styleUrls: ["./diagram-builder.component.css", "../../app.component.css"],
})
export class DiagramBuilderComponent implements OnInit {
  public showfiller = false;
  private type: any = "";
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
          24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243,
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
  //TODO later fix digrams to private
  /**
   * constructor
   *
   */
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    for (let i = 0; i < 10; i++) {
      this.Diagrams.push({
        title: "a",
        imgpath: "",
        disc: "This is description",
      });
    }
  }
  ngOnInit(): void {
    const valid_Types: string[] = [
      "Line",
      "Pollar",
      "network",
      "collumns",
      "LineAnotations",
      "DependencyWheel",
    ];
    this.type = this.route.snapshot.paramMap.get("type");
    if (!valid_Types.includes(this.type)) {
      //wrong url
      console.log("Wrong url");
    }
  }
  /**
   * function  getDiagrams  choices
   * @return Diargam []
   *
   */
  getDiagrams(): Diagram[] {
    return this.Diagrams;
  }
  /**
   * funcion call_error_dialog() "call error dialog"
   *  @param err_msg string
   */
  call_error_dialog(err_msg: string): void {
    //set configurations  for mat dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "320px";
    dialogConfig.height = "max-contend";
    dialogConfig.data = {
      err_msg: err_msg,
    };
    //open dialog
    this.dialog.open(DiagramOppsComponent, dialogConfig);
  }
  getApi(): string {
    let api: string = "";
    switch (this.type) {
      case "Lines":
        api = "api_Line";
        break;
      case "Pollar":
        api = "api_Pollar";
        break;
      case "network":
        api = "api_network";
        break;
      case "collumns":
        api = "api_column";
        break;
      case "LineAnotations":
        api = "api_LinewithAnnotations";
        break;
      case "DependencyWheel":
        api = "api_DependancyWheel";
        break;
    }
    return api;
  }
}
