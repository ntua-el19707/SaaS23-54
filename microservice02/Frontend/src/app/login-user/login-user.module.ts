import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
} from "@abacritt/angularx-social-login";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from "./login/login.component";

import { WelcomeComponent } from "./welcome/welcome.component";
import { UserLoginRoutingModule } from "./login-user-routing.module";

@NgModule({
  declarations: [LoginComponent, WelcomeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    UserLoginRoutingModule,
    HttpClientModule,

    GoogleSigninButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginUserModule {}
