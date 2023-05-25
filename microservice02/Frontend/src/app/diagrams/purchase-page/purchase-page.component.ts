import { Component, Input } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HC_sankey from "highcharts/modules/sankey";
import HC_depwheel from "highcharts/modules/dependency-wheel";
HighchartsMore(Highcharts);
HC_sankey(Highcharts);
HC_depwheel(Highcharts);
Highcharts.setOptions({
  exporting: {
    enabled: false,
  },
});
@Component({
  selector: "app-purchase-page",
  templateUrl: "./purchase-page.component.html",
  styleUrls: ["./purchase-page.component.css"],
})
export class PurchasePageComponent {
  @Input() diagram: { chart: any; type: string } = { chart: {}, type: "" };
  private highcharts = Highcharts;
  GetHigcharts() {
    return this.highcharts;
  }
}
