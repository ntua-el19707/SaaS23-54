import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Packet } from "../interfaces/packet";
import { PurchaseService } from "../services/purchase.service";
import { MatDialog } from "@angular/material/dialog";
import { CreditCardformDialog } from "../credit-cardform/credit-cardform.dialog";

@Component({
  selector: "app-buy-credits",
  templateUrl: "./buy-credits.component.html",
  styleUrls: ["./buy-credits.component.css"],
})
export class BuyCreditsComponent implements OnInit, AfterViewInit {
  private packets: Packet[] = [];

  @ViewChild("box")
  box!: ElementRef;
  private collumns = 1;
  constructor(private purchase: PurchaseService, private dialog: MatDialog) {}
  ngAfterViewInit(): void {
    this.resize(); //resize  box according to openning
  }
  ngOnInit(): void {
    // this.purchase.PostOffer({ credits: 3, name: "Standard" }).subscribe(
    //    (r) => {
    //      console.log("ok");
    //    },
    //    (err) => {},
    //    () => {}
    //   );
    this.purchase.offers().subscribe(
      (r: any) => {
        if (r.plans) this.packets = r.plans;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
  /**
   * getpackets - get method for packets
   */
  getpackets(): Packet[] {
    return this.packets;
  }
  /**
   * resize()
   */
  resize() {
    this.collumns = 4;
    if (this.box.nativeElement.clientWidth >= 1000) {
      this.collumns = 4;
    } else if (this.box.nativeElement.clientWidth >= 600) {
      this.collumns = 2;
    } else {
      this.collumns = 1;
    }
    const dialogRef = this.dialog.getDialogById("credit-card-dialog");
    if (dialogRef) {
      const width = `${this.box.nativeElement.clientWidth / 2}px`;
      dialogRef.updateSize(width, "max-content");
    }
  }
  getCollums() {
    return this.collumns;
  }
  purchaseController(p: Packet): void {
    let width = "";
    if (this.box.nativeElement.clientWidth >= 400) {
      width = `${this.box.nativeElement.clientWidth / 2}px`;
    } else {
      width = `${this.box.nativeElement.clientWidth * 0.9}px`;
    }

    const dialogRef = this.dialog.open(CreditCardformDialog, {
      width: width,
      height: "max-content",
      data: p,
      id: "credit-card-dialog",
      disableClose: true,
    });
  }
}
