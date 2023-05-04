import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DemoComponent } from "./demo/demo.component";
import { DiagramBuilderComponent } from "./diagrams/diagram-builder/diagram-builder.component";

import { DiagramsListComponent } from "./diagrams/diagrams-list/diagrams-list.component";
import { DragComponent } from "./diagrams/drag/drag.component";
import { MyDigramsComponent } from "./diagrams/my-digrams/my-digrams.component";
import { MyinfoComponent } from "./user/myinfo/myinfo.component";
import { WelcomeComponent } from "./user/welcome/welcome.component";

const routes: Routes = [
  { path: "", component: DiagramsListComponent },
  { path: "demo", component: WelcomeComponent },
  { path: "ChartBuild/:type", component: DiagramBuilderComponent },
  { path: "a", component: MyDigramsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
