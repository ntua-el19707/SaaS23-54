import { Component, Input, OnInit, Renderer2 } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsExporting from "highcharts/modules/exporting";

HighchartsNetworkgraph(Highcharts);
HighchartsExporting(Highcharts);
@Component({
  selector: "preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"],
})
export class PreviewComponent implements OnInit {
  private highcharts = Highcharts;

  @Input() public chartOptions: Highcharts.Options = {
    title: {},

    subtitle: {},

    series: [],
  };
  /**GetHigcharts()
   * @returns highcharts
   */
  GetHigcharts() {
    return this.highcharts;
  }
  /**GetHigchartsoptions()
   * @returns chartOptions
   */
  GetHigchartsoptions(): Highcharts.Options {
    return this.chartOptions;
  }
  ngOnInit() {
    console.log(this.chartOptions);
  }
}
