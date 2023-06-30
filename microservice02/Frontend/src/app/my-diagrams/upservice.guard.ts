import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { GetDiagramsService } from "./my-digrams/services/get-diagrams.service";

@Injectable({
  providedIn: "root",
})
export class UpserviceGuard implements CanActivate {
  constructor(private mydiagrams: GetDiagramsService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let promise: Promise<boolean> = new Promise((resolve, reject) => {
      let rsp = true;
      this.mydiagrams.up().subscribe(
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
