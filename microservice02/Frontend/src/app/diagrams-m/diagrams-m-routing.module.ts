import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiagramsListComponent } from "./diagrams-list/diagrams-list.component";
import { DiagramBuilderComponent } from "./diagram-builder/diagram-builder.component";
import { DiagramsModuleGuard } from "./diagrams-module.guard";

const routes: Routes = [
  {
    path: "",
    component: DiagramsListComponent,
  },
  {
    path: "ChartBuild/:type",
    component: DiagramBuilderComponent,
    canActivate: [DiagramsModuleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagramsMRoutingModule {}
