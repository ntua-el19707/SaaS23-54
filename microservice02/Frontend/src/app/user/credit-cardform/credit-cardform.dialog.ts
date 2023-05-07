import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Packet } from "../interfaces/packet";

@Component({
  selector: "app-credit-cardform",
  templateUrl: "./credit-cardform.dialog.html",
  styleUrls: ["./credit-cardform.dialog.css"],
})
export class CreditCardformDialog implements OnInit {
  private creditCardForm: FormGroup = this.formBuilder.group({});

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Packet,
    private dialogRef: MatDialogRef<CreditCardformDialog>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{16}$/), //16 numbers
        ]),
      ],
      expirationMonth: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(0?[1-9]|1[0-2])$/),
        ]),
      ],
      expirationYear: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{4}$/), //valid values fater this year
          (control: AbstractControl) => {
            const currentYear = new Date().getFullYear();
            const year = parseInt(control.value);
            if (year && year < currentYear) {
              return { expiredYear: true };
            }
            return null;
          },
        ]),
      ],
      cvv: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{3}$/),
        ]),
      ],
    });
  }
  getForm(): FormGroup {
    return this.creditCardForm;
  }
  getPacket(): Packet {
    return this.data;
  }
  onSubmit() {}

  onCancel() {
    this.dialogRef.close(false);
  }
}
