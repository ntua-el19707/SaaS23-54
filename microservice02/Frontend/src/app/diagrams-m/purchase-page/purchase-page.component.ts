import { Component, Input } from "@angular/core";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HC_sankey from "highcharts/modules/sankey";
import HC_depwheel from "highcharts/modules/dependency-wheel";
import { Router } from "@angular/router";
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
  constructor(private router: Router) {}
  GetHigcharts() {
    return this.highcharts;
  }
  toMyDiagrams() {
    this.router.navigate(["/MyDiagrams"]);
  }
}
