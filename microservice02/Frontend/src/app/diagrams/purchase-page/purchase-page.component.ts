import { Component } from "@angular/core";

@Component({
  selector: "app-purchase-page",
  templateUrl: "./purchase-page.component.html",
  styleUrls: ["./purchase-page.component.css"],
})
export class PurchasePageComponent {
  private type: string = "";

  getType(): string {
    return this.type;
  }
}
