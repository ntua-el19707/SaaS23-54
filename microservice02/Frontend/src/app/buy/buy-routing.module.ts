import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuyCreditsComponent } from "./buy-credits/buy-credits.component";
import { BuyUpGuard } from "./buy-up.guard";

const routes: Routes = [
  { path: "", component: BuyCreditsComponent, canActivate: [BuyUpGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyRoutingModule {}
