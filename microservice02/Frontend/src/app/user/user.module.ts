import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { MatCardModule } from '@angular/material/card';
import { WelcomeComponent } from './welcome/welcome.component';

//TODO: later create a componet for buying credits.

@NgModule({
  declarations: [
    MyinfoComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule, MatCardModule
  ]
})
export class UserModule { }
