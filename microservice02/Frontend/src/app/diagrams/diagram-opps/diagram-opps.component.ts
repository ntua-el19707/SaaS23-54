import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "app-diagram-opps",
  templateUrl: "./diagram-opps.component.html",
  styleUrls: ["./diagram-opps.component.css"],
})
export class DiagramOppsComponent {
  private err_msg: string = "";
  /**
   * constructor
   *
   */
  constructor(
    private dialog: MatDialogRef<DiagramOppsComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.err_msg = data.err_msg;
  }
  /**
   * function geterr_msg() - return error msg
   * @return  string
   */
  geterr_msg(): string {
    return this.err_msg;
  }
}
