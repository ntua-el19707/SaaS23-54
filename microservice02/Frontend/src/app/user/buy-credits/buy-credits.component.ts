import { Component } from "@angular/core";
import { Packet } from "../interfaces/packet";

@Component({
  selector: "app-buy-credits",
  templateUrl: "./buy-credits.component.html",
  styleUrls: ["./buy-credits.component.css"],
})
export class BuyCreditsComponent {
  private packets: Packet[] = [{ type: "Standard", tokens: 3 }];

  /**
   * getpackets - get method for packets
   */
  getpackets(): Packet[] {
    return this.packets;
  }
}
