import {
  AfterContentInit,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { Location } from "@angular/common";

import { Diagram } from "../interfaces/diagram";
import * as Highcharts from "highcharts";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DiagramOppsComponent } from "../diagram-opps/diagram-opps.component";
import { ActivatedRoute, Router } from "@angular/router";
import { saveAs } from "file-saver";
import {
  DependencyWheelDiagram,
  LineAnotations,
  LineDiagram,
  NetworkDiagram,
  PollarDiagram,
  collumn,
} from "src/assets/DemosTS/diafram";
import { DemoServiceService } from "../services/demo-service.service";

@Component({
  selector: "diagramBuilder",
  templateUrl: "./diagram-builder.component.html",
  styleUrls: ["./diagram-builder.component.css", "../../app.component.css"],
})
export class DiagramBuilderComponent implements OnInit {
  public showfiller = false;
  private type: any = "";
  private Diagrams: Diagram[] = [];
  private loadingDemos: Boolean = true;
  private demoServiceDown: boolean = false;
  highcharts = Highcharts;
  private chartOptions: any = {};
  private showHighChart = false;
  private step: boolean = false; //this will be double  binded
  private Diagram: { chart: any; type: string } = { chart: {}, type: "" };
  private demo: { jsonChart: any; filename: string; csvData: string[][] } = {
    jsonChart: {},
    filename: "",
    csvData: [],
  };
  private displayDemo: boolean = false;

  private demos: { jsonChart: any; filename: string; csvData: string[][] }[] =
    [];
  private counterDemo = 0;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private demoService: DemoServiceService
  ) {}
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
    const valid_Types: string[] = [
      "Lines",
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
    } else {
      this.demoService.findEndpoint(this.getApi());
      this.demoService.getDemos().subscribe(
        (r: any) => {
          console.log(r.demoArray);
          console.log(r);
          if (r.demoArray) {
            this.demos = r.demoArray;
            if (this.demos.length !== 0) {
              this.demo = this.demos[0];

              this.counterDemo = 0;
              this.displayDemo = true;

              console.log(this.demo);
            }
          }
        },
        (err) => {
          console.log(err);
          if (err.status === 504) {
            this.demoServiceDown = true;
          }
        },
        () => {
          this.loadingDemos = false;
          //set configurations  for mat dialog
        }
      );
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
  call_error_dialog(event: any): void {
    const err_msg = event;
    console.log(event);
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
        this.chartOptions = LineDiagram.chart;
        break;
      case "Pollar":
        api = "api_Pollar";
        this.chartOptions = PollarDiagram.chart;
        break;
      case "network":
        api = "api_network";
        this.chartOptions = NetworkDiagram.chart;
        break;
      case "collumns":
        api = "api_column";
        this.chartOptions = collumn.chart;
        break;
      case "LineAnotations":
        api = "api_LinewithAnnotations";
        this.chartOptions = LineAnotations.chart;
        break;
      case "DependencyWheel":
        api = "api_DependancyWheel";
        this.chartOptions = DependencyWheelDiagram.chart;
        break;
    }
    this.showHighChart = true;
    return api;
  }
  showHighChar() {
    return this.showHighChart;
  }
  getChartOptions() {
    return this.chartOptions;
  }
  navigate(d: Diagram) {
    this.chartOptions = d.options;
    console.log(this.chartOptions);
    this.router.navigate([`/diagrams/ChartBuild/${d.redirect}`]).then(() => {
      window.location.reload();
    });
  }
  getStep() {
    //false  building proccess ; true purchased process ;
    return this.step;
  }
  handlePurchase(event: any) {
    console.log(event);
    this.Diagram = event.res.rsp;
    this.step = true;
  }
  getDiagram(): { chart: any; type: string } {
    return this.Diagram;
  }
  showHighdemo(): boolean {
    return this.displayDemo;
  }
  getDemoChart() {
    console.log(this.demo.jsonChart);
    return this.demo.jsonChart;
  }

  nextDemo() {
    console.log("hey");
    ++this.counterDemo;
    if (this.counterDemo >= this.demos.length) {
      this.counterDemo = 0;
      console.log("right  overflow");
    }
    if (this.demos.length !== 0) {
      this.demo = this.demos[this.counterDemo];
      this.displayDemo = false;
      setTimeout(() => {
        this.displayDemo = true;
      }, 10);
    }
  }
  previousDemo() {
    --this.counterDemo;

    if (this.counterDemo < 0) {
      this.counterDemo = this.demos.length - 1;
      if (this.counterDemo < 0) {
        this.counterDemo = 0;
      }
      console.log("left  overflow");
    }
    if (this.demos.length !== 0) {
      this.demo = this.demos[this.counterDemo];
      this.displayDemo = false;
      setTimeout(() => {
        this.displayDemo = true;
      }, 10);
    }
  }
  /**DownloadCsv - download  csv of chart id
   *
   *
   */
  DownloadCsv() {
    this.demoService.downloadFileName(this.demo.filename).subscribe(
      (r) => {
        console.log(r);
        try {
          saveAs(r, `demo.csv`);
        } catch (err) {}
      },
      (err) => {},
      () => {}
    );
  }

  gteCsv() {
    return this.demo.csvData;
  }
  getDemoLoadingStatus(): Boolean {
    return this.loadingDemos;
  }
  getDemoServiceDown(): boolean {
    return this.demoServiceDown;
  }
}
