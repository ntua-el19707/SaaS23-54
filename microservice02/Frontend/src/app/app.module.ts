import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

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
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { PreviewComponent } from './diagrams/preview/preview.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
