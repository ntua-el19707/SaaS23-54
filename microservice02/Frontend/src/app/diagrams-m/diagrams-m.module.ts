import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiagramsMRoutingModule } from "./diagrams-m-routing.module";
import { DragDirective } from "./drag.directive";
import { DragComponent } from "./drag/drag.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DiagramBuilderComponent } from "./diagram-builder/diagram-builder.component";
import { DiagramsListComponent } from "./diagrams-list/diagrams-list.component";
import { HighchartsChartModule } from "highcharts-angular";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { DiagramOppsComponent } from "./diagram-opps/diagram-opps.component";
import { PreviewComponent } from "./preview/preview.component";
import { PurchasePageComponent } from "./purchase-page/purchase-page.component";

@NgModule({
  declarations: [
    DiagramsListComponent,
    DragComponent,
    DragDirective,
    DiagramBuilderComponent,
    DiagramOppsComponent,
    PreviewComponent,

    PurchasePageComponent,
  ],
  imports: [
    CommonModule,
    DiagramsMRoutingModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class DiagramsMModule {}
