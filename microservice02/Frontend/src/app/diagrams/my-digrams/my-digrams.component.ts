import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DonwloadService } from "./services/donwload.service";
import { saveAs } from "file-saver";
import { diagramFromMongoLight } from "../interfaces/digramid";
import { GetDiagramsService } from "./services/get-diagrams.service";
import HighchartsMore from "highcharts/highcharts-more";
import * as Highcharts from "highcharts";
HighchartsMore(Highcharts);
Highcharts.setOptions({
  exporting: {
    enabled: false,
  },
});
@Component({
  selector: "app-my-digrams",
  templateUrl: "./my-digrams.component.html",
  styleUrls: ["./my-digrams.component.css"],
})
export class MyDigramsComponent implements OnInit {
  @ViewChild("ChartPreview")
  ChartPreview!: ElementRef;
  private diagramsList: diagramFromMongoLight[] = [];
  private displayedColumns: string[] = [
    "Type",
    "name",
    "CreatedAt",
    "Download",
    "Preview",
  ];
  private highcharts = Highcharts;
  hide = true;
  toggle() {
    this.hide = !this.hide;
  }
  public selectedChart: Highcharts.Options = {};
  private dataSource: MatTableDataSource<ChartElements> =
    new MatTableDataSource<ChartElements>([]);

  private data: ChartElements[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  private loadDiagrams: boolean = false;
  private fetchingDiagram: boolean = false;
  constructor(
    private download: DonwloadService,
    private getDiagrams: GetDiagramsService,

    private renderer: Renderer2,
    private host: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getDiagrams.getMyDiagrams().subscribe(
      (r) => {
        console.log(r);
        this.diagramsList = r.charts;
        this.selectedChart = r.charts[0].data;
      },
      (err) => {
        this.diagramsList = [];
      },
      () => {
        this.diagramsList.forEach((d) => {
          this.data.push({
            name: d.name,
            CreatedAt: d.createAT,
            Type: d.Type,
            Download: {
              _id: d._id,
              name: d.name,
              happenhtml: false,
              happenpdf: false,
              happenpng: false,
              happensvg: false,
            },
            Preview: d._id,
          });
        });
        this.loadDiagrams = true;
        console.log(this.data);
        this.dataSource = new MatTableDataSource<ChartElements>(this.data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /**
   * function getdataSource
   * @return dataSource
   */
  getdataSource() {
    return this.dataSource;
  }
  /**
   * function getDisplayColumns
   * @return displayedColumns
   */
  getDisplayColumns() {
    return this.displayedColumns;
  }

  /**DownloadPng - download  png of chart id
   * @params id
   *
   */
  DownloadPng(ele: ChartElements) {
    if (!ele.Download.happenpng) {
      const indx = this.data.indexOf(ele);
      if (indx !== -1) {
        this.data[indx].Download.happenpng = true;
        this.download.DownLoadPng(ele.Download._id).subscribe(
          (r) => {
            console.log(r);
            saveAs(r, `${ele.Type}-${ele.Download.name}.png`);
            this.data[indx].Download.happenpng = false;
          },
          (err) => {
            console.log(err);
            this.data[indx].Download.happenpng = false;
          },
          () => {}
        );
      }
    }
  }
  /**DownloadHtml - download  png of chart id
   * @params id
   *
   */
  DownloadHtml(el: ChartElements) {
    if (!el.Download.happenhtml) {
      const indx = this.data.indexOf(el);
      if (indx !== -1) {
        this.data[indx].Download.happenhtml = true;
        this.download.DownLoadHtml(el.Download._id).subscribe(
          (r) => {
            saveAs(r, `${el.Type}-${el.Download.name}.html`);
            this.data[indx].Download.happenhtml = false;
          },
          (err) => {
            this.data[indx].Download.happenhtml = false;
          },
          () => {}
        );
      }
    }
  }
  /**DownloadSvg - download  png of chart id
   * @params id
   *
   */
  DownloadSvg(el: ChartElements) {
    if (!el.Download.happensvg) {
      const indx = this.data.indexOf(el);
      if (indx !== -1) {
        this.data[indx].Download.happensvg = true;
        this.download.DownLoadSvg(el.Download._id).subscribe(
          (r) => {
            console.log(r);
            try {
              saveAs(r, `${el.Type}-${el.Download.name}.svg`);
            } catch (err) {}
          },
          (err) => {},
          () => {
            this.data[indx].Download.happensvg = false;
          }
        );
      }
    }
  }
  /**DownloadPdf - download  png of chart id
   * @params id
   *
   */
  DownloadPdf(el: ChartElements) {
    if (!el.Download.happenpdf) {
      const indx = this.data.indexOf(el);
      if (indx !== -1) {
        this.data[indx].Download.happenpdf = true;
        this.download.DownLoadPdf(el.Download._id).subscribe(
          (r) => {
            saveAs(r, `${el.Type}-${el.Download.name}.pdf`);
          },
          (err) => {},
          () => {
            this.data[indx].Download.happenpdf = false;
          }
        );
      }
    }
  }
  getLoading(): boolean {
    return !this.loadDiagrams;
  }
  /**getSelectedChart
   * @returns selectedChart
   */
  getSelectedChart() {
    return this.selectedChart;
  }
  /**GetHigcharts()
   * @returns highcharts
   */
  GetHigcharts() {
    return this.highcharts;
  }
  private preview = "";
  /**ViewChart */
  ViewChart(Preview: string) {
    // this.hide = true;
    // this.renderer.removeChild(
    // this.host.nativeElement,
    //  this.ChartPreview.nativeElement
    //  );
    if (!this.fetchingDiagram) {
      this.hide = true;
      this.fetchingDiagram = true;
      this.preview = Preview;
      this.getDiagrams.getADiagrams(Preview).subscribe(
        (r) => {
          this.selectedChart = r.chart;

          this.hide = false;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.fetchingDiagram = false;
        }
      );
    }
    // setInterval(() => {
    // this.hide = false; //element want 10ms  to be destoyed  so wait 100ms
    // }, 100);
    // this.renderer.createElement(ViewChild("this.ChartPreview"));
  }
  getFetchDiagram(el: ChartElements) {
    return this.fetchingDiagram && this.preview === el.Preview;
  }
}

interface ChartElements {
  name: string;
  Type: string;
  CreatedAt: Date;
  Download: download;
  Preview?: any;
}
interface download {
  _id: string;
  name: string;
  happenpng: boolean;
  happenhtml: boolean;
  happensvg: boolean;
  happenpdf: boolean;
}
