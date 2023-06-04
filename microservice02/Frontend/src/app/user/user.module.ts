import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyinfoComponent } from "./myinfo/myinfo.component";
import { MatCardModule } from "@angular/material/card";

import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";

import { ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

//TODO: later create a componet for buying credits.

@NgModule({
  declarations: [MyinfoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class UserModule {}
