import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuyCreditsComponent } from "./buy-credits/buy-credits.component";
import { MyinfoComponent } from "./myinfo/myinfo.component";

const routes: Routes = [
  { path: "buy", component: BuyCreditsComponent },

  { path: "info", component: MyinfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
