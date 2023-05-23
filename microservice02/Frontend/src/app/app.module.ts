import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
} from "@abacritt/angularx-social-login";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { DemoComponent } from "./demo/demo.component";
import { DiagramsListComponent } from "./diagrams/diagrams-list/diagrams-list.component";
import { HighchartsChartModule } from "highcharts-angular";
import { UserModule } from "./user/user.module";
import { DragComponent } from "./diagrams/drag/drag.component";
import { DragDirective } from "./diagrams/drag.directive";
import { DiagramBuilderComponent } from "./diagrams/diagram-builder/diagram-builder.component";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { DiagramOppsComponent } from "./diagrams/diagram-opps/diagram-opps.component";

import { MatDialogModule } from "@angular/material/dialog";
import { MyDigramsComponent } from "./diagrams/my-digrams/my-digrams.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { PreviewComponent } from "./diagrams/preview/preview.component";
import { LoginComponent } from "./login/login.component";
import { HttpIInterceptor } from "./http-i.interceptor";
import { PurchasePageComponent } from "./diagrams/purchase-page/purchase-page.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DemoComponent,
    DiagramsListComponent,
    DragComponent,
    DragDirective,
    DiagramBuilderComponent,
    DiagramOppsComponent,
    MyDigramsComponent,
    PreviewComponent,
    LoginComponent,
    PurchasePageComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HighchartsChartModule,
    UserModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatProgressSpinnerModule,
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
