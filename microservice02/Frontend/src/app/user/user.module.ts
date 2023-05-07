import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyinfoComponent } from "./myinfo/myinfo.component";
import { MatCardModule } from "@angular/material/card";
import { WelcomeComponent } from "./welcome/welcome.component";
import { BuyCreditsComponent } from "./buy-credits/buy-credits.component";
import { CreditsCardComponent } from "./credits-card/credits-card.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreditCardformDialog } from "./credit-cardform/credit-cardform.dialog";

import { ReactiveFormsModule } from "@angular/forms";

//TODO: later create a componet for buying credits.

@NgModule({
  declarations: [
    MyinfoComponent,
    WelcomeComponent,
    BuyCreditsComponent,
    CreditsCardComponent,

    CreditCardformDialog,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
