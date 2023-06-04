import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BuyRoutingModule } from "./buy-routing.module";
import { MatCardModule } from "@angular/material/card";

import { BuyCreditsComponent } from "./buy-credits/buy-credits.component";
import { CreditsCardComponent } from "./credits-card/credits-card.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreditCardformDialog } from "./credit-cardform/credit-cardform.dialog";

import { ReactiveFormsModule } from "@angular/forms";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    BuyCreditsComponent,
    CreditsCardComponent,

    CreditCardformDialog,
  ],
  imports: [
    CommonModule,
    BuyRoutingModule,
    MatCardModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class BuyModule {}
