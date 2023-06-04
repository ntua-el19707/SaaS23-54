import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuyCreditsComponent } from "./buy-credits/buy-credits.component";

const routes: Routes = [{ path: "", component: BuyCreditsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyRoutingModule {}
