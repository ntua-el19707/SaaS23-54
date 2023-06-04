import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MyinfoComponent } from "./myinfo/myinfo.component";

const routes: Routes = [{ path: "", component: MyinfoComponent }];

@NgModule({
  /*  */ imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
