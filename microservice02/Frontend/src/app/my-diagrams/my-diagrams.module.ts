import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyDiagramsRoutingModule } from "./my-diagrams-routing.module";
import { MyDigramsComponent } from "./my-digrams/my-digrams.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { HighchartsChartModule } from "highcharts-angular";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { ServicedownComponent } from "./servicedown/servicedown.component";

@NgModule({
  declarations: [MyDigramsComponent, ServicedownComponent],
  imports: [
    CommonModule,
    MatCardModule,

    MyDiagramsRoutingModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
  ],
})
export class MyDiagramsModule {}
