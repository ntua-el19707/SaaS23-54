import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { PurchaseService } from "./services/purchase.service";

@Injectable({
  providedIn: "root",
})
export class BuyUpGuard implements CanActivate {
  constructor(private router: Router, private buy: PurchaseService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let rsp: boolean = true;
    let promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.buy.up().subscribe(
        (r) => {},
        (err) => {
          console.log(err);
          rsp = false;
          this.router.navigate(["/down"]);
        },
        () => {
          resolve(rsp);
        }
      );
    });
    return promise;
  }
}
