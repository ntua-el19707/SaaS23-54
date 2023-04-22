import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DonwloadService } from "./services/donwload.service";
import { saveAs } from "file-saver";
import { diagramFromMongoLight } from "../interfaces/digramid";
import { GetDiagramsService } from "./services/get-diagrams.service";
import HighchartsMore from "highcharts/highcharts-more";
import * as Highcharts from "highcharts";
HighchartsMore(Highcharts);
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
        this.diagramsList = r.charts;
        this.selectedChart = r.charts[0].data;
        this.hide = false;
        console.log(this.selectedChart);
      },
      (err) => {
        this.diagramsList = [];
      },
      () => {
        this.diagramsList.forEach((d) => {
          this.data.push({
            name: d.name,
            CreatedAt: d.createAt,
            Type: d.type,
            Download: { _id: d._id, name: d.name },
            Preview: d.data,
          });
        });

        console.log(this.data);
        this.dataSource = new MatTableDataSource<ChartElements>(this.data);
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
  DownloadPng(Download: download) {
    console.log(Download);
    this.download.DownLoadPng(Download._id).subscribe(
      (r) => {
        saveAs(r, `line-${Download.name}.png`);
      },
      (err) => {},
      () => {}
    );
  }
  /**DownloadHtml - download  png of chart id
   * @params id
   *
   */
  DownloadHtml(Download: download) {
    this.download.DownLoadHtml(Download._id).subscribe(
      (r) => {
        saveAs(r, `line-${Download.name}.html`);
      },
      (err) => {},
      () => {}
    );
  }
  /**DownloadSvg - download  png of chart id
   * @params id
   *
   */
  DownloadSvg(Download: download) {
    this.download.DownLoadSvg(Download._id).subscribe(
      (r) => {
        saveAs(r, `line-${Download.name}.svg`);
      },
      (err) => {},
      () => {}
    );
  }
  /**DownloadPdf - download  png of chart id
   * @params id
   *
   */
  DownloadPdf(Download: download) {
    this.download.DownLoadPdf(Download._id).subscribe(
      (r) => {
        saveAs(r, `line-${Download.name}.pdf`);
      },
      (err) => {},
      () => {}
    );
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
  /**ViewChart */
  ViewChart(d: any) {
    // this.hide = true;
    // this.renderer.removeChild(
    // this.host.nativeElement,
    //  this.ChartPreview.nativeElement
    //  );
    this.hide = true;
    this.selectedChart = d;
    setInterval(() => {
      this.hide = false; //element want 10ms  to be destoyed  so wait 100ms
    }, 100);
    // this.renderer.createElement(ViewChild("this.ChartPreview"));
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
}
