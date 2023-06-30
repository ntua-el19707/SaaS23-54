import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-servicedown",
  templateUrl: "./servicedown.component.html",
  styleUrls: ["./servicedown.component.css"],
})
export class ServicedownComponent {
  constructor(private dialog: MatDialogRef<ServicedownComponent>) {}
}
