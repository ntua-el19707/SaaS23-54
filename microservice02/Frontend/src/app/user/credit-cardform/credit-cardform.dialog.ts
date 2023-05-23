import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";

import { Packet } from "../interfaces/packet";
import { AES, enc } from "crypto-js";
import { PurchaseService } from "../services/purchase.service";

//import { readFileSync } from "fs";
@Component({
  selector: "app-credit-cardform",
  templateUrl: "./credit-cardform.dialog.html",
  styleUrls: ["./credit-cardform.dialog.css"],
})
export class CreditCardformDialog implements OnInit {
  private creditCardForm: FormGroup = this.formBuilder.group({});
  private happening: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Packet,
    private dialogRef: MatDialogRef<CreditCardformDialog>,
    private formBuilder: FormBuilder,
    private PurchaseService: PurchaseService
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
  onSubmit() {
    if (!this.happening) {
      // /console.log(this.pubKey);
      this.happening = true;
      const creditCardNumber =
        this.creditCardForm.controls?.["cardNumber"].value;
      const expirationMonth =
        this.creditCardForm.controls?.["expirationMonth"].value;
      const expirationYear =
        this.creditCardForm.controls?.["expirationYear"].value;
      const cvv = this.creditCardForm.controls?.["cvv"].value;
      const creditCard: {
        creditCardNumber: number;
        expM: number;
        expY: number;
        cvv: number;
      } = {
        creditCardNumber: parseInt(creditCardNumber),
        expM: parseInt(expirationMonth),
        expY: parseInt(expirationYear),
        cvv: parseInt(cvv),
      };
      this.PurchaseService.PostOffer(this.data, creditCard).subscribe(
        (r) => {
          console.log(r);
          this.dialogRef.close(true);
        },
        (err) => {
          console.log(err);
          this.dialogRef.close(false);
        },
        () => {}
      );
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
