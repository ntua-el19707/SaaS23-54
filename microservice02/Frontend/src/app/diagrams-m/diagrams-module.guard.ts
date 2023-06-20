import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UploadService } from "./services/upload.service";

@Injectable({
  providedIn: "root",
})
export class DiagramsModuleGuard implements CanActivate {
  constructor(private router: Router, private upload: UploadService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      console.log("hi");
      const valid_Types: string[] = [
        "Lines",
        "Pollar",
        "network",
        "collumns",
        "LineAnotations",
        "DependencyWheel",
      ];
      let type: string | null = route.paramMap.get("type");
      if (type === null) {
        this.router.navigate([`/NotFound`]); //404 it does not exist
        reject(false);
      } else if (!valid_Types.includes(type)) {
        //wrong url
        this.router.navigate([`/${type}/NotFound`]); //404 it does not exist
        reject(false);
      } else {
        let api = this.getApi(type);
        this.upload.setApi(api);
        let testUploadConfirm: Promise<void> = new Promise(
          (resolve, reject) => {
            this.upload.testConfirm().subscribe(
              (r) => {
                console.log(r);
                resolve();
              },
              (err) => {
                console.log(err);
                reject(`Service ${type} is  down`);
              },
              () => {}
            );
          }
        );

        Promise.all([testUploadConfirm])
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            this.router.navigate(["/down"]);
            reject(false);
          });
      }
    });
  }
  private getApi(type: string): string {
    let api: string = "";
    switch (type) {
      case "Lines":
        api = "api_Line";

        break;
      case "Pollar":
        api = "api_Pollar";

        break;
      case "network":
        api = "api_network";

        break;
      case "collumns":
        api = "api_column";

        break;
      case "LineAnotations":
        api = "api_LinewithAnnotations";

        break;
      case "DependencyWheel":
        api = "api_DependancyWheel";

        break;
    }

    return api;
  }
}
