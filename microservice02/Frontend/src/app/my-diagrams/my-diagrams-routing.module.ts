import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyDigramsComponent } from "./my-digrams/my-digrams.component";
import { UpserviceGuard } from "./upservice.guard";

const routes: Routes = [
  { path: "", component: MyDigramsComponent, canActivate: [UpserviceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDiagramsRoutingModule {}
