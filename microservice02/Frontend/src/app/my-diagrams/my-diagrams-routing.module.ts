import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyDigramsComponent } from "./my-digrams/my-digrams.component";

const routes: Routes = [{ path: "MyDiagrams", component: MyDigramsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDiagramsRoutingModule {}
