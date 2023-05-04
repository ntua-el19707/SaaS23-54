import { Component, Input } from "@angular/core";
import { Packet } from "../interfaces/packet";

@Component({
  selector: "creditcard",
  templateUrl: "./credits-card.component.html",
  styleUrls: ["./credits-card.component.css"],
})
export class CreditsCardComponent {
  @Input() packet: Packet = { type: "", tokens: 0 }; // packet
  /**
   * getPacket - get method for the packet that the card  is displaying
   * @returns packet
   */
  getPacket(): Packet {
    return this.packet;
  }
  /**
   * purchase - function 'handle the  event for purcase action   '
   */
  purchase(): void {
    console.log("nothing");
  }
}
