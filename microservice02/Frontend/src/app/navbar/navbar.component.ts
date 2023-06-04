import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Routes } from "./routes";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  private routes: Routes[] = []; // routes table
  private title: string = "charti"; //title
  private loginRoutes: Routes[] = [
    { display: "Home", path: "/diagrams" },
    { display: "My Diagrams", path: "/MyDiagrams" },
    { display: "buy", path: "/buy" },
    { display: "info", path: "/info" },
    { display: "About", path: "/About" },
  ];
  private NonloginRoutes: Routes[] = [
    { display: "Login", path: "/login" },
    { display: "About", path: "/About" },
  ];
  /**
   * constructor
   * @param breakpointObserver
   */

  constructor(
    private breakpointObserver: BreakpointObserver,
    private login: LoginService,
    private router: Router
  ) {}
  /**
   * function - ngOnInit()
   */
  ngOnInit(): void {
    this.routes = [{ display: "Home", path: "/diagrams" }];
  }
  //* get Routes
  /**
   * function - getRoutes()
   * @return array of Routes
   */
  public getRoutes(): Routes[] {
    if (this.logedIN()) {
      return this.loginRoutes;
    } else {
      return this.NonloginRoutes;
    }
  }
  //* get Title
  /**
   * function - getTitle()
   * @return title string
   */
  public getTitle(): string {
    return this.title;
  }
  public logout(): void {
    this.login.logOut();

    this.router.navigate(["/login"]);
  }
  public logedIN() {
    return this.login.authentcated();
  }
}
