import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { Page404Component } from "./page404/page404.component";
import { ServicedownComponent } from "./servicedown/servicedown.component";
import { AuthGuard } from "./auth.guard";
import { GeneralGuard } from "./general.guard";

const routes: Routes = [
  {
    path: "buy",
    loadChildren: () => import("./buy/buy.module").then((m) => m.BuyModule),
    canActivate: [GeneralGuard],
  },
  {
    path: "info",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
    canActivate: [GeneralGuard],
  },
  {
    path: "diagrams",
    loadChildren: () =>
      import("./diagrams-m/diagrams-m.module").then((m) => m.DiagramsMModule),
    canActivate: [GeneralGuard],
  },

  {
    path: "MyDiagrams",
    loadChildren: () =>
      import("./my-diagrams/my-diagrams.module").then(
        (m) => m.MyDiagramsModule
      ),
    canActivate: [GeneralGuard],
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login-user/login-user.module").then((m) => m.LoginUserModule),
    canActivate: [AuthGuard],
  },
  { path: "About", component: AboutComponent },
  { path: "down", component: ServicedownComponent },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
