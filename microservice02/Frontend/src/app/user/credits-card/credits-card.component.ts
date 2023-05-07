import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Packet } from "../interfaces/packet";
import { MatDialog } from "@angular/material/dialog";
import { CreditCardformDialog } from "../credit-cardform/credit-cardform.dialog";

@Component({
  selector: "creditcardPacket",
  templateUrl: "./credits-card.component.html",
  styleUrls: ["./credits-card.component.css"],
})
export class CreditsCardComponent {
  @Input() packet: Packet = { name: "", credits: 0 }; // packet
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  constructor(private dialog: MatDialog) {}
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
    this.buttonClick.emit();
  }
}
