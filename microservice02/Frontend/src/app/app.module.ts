import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from "@abacritt/angularx-social-login";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { HttpIInterceptor } from "./http-i.interceptor";

import { AboutComponent } from "./about/about.component";
import { Page404Component } from "./page404/page404.component";
import { ServicedownComponent } from "./servicedown/servicedown.component";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    AboutComponent,
    Page404Component,
    ServicedownComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "855526253930-73m8nikoghv1ae980kqeho8qpn7q3oi5.apps.googleusercontent.com"
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    HttpIInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
