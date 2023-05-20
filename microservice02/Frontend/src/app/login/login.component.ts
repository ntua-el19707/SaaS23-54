import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "@abacritt/angularx-social-login";
import { Component, NgZone } from "@angular/core";
import { LoginService } from "./login.service";
import { PurchaseService } from "../diagrams/services/purchase.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public isSignedIn: boolean = false;
  user!: SocialUser;
  loggedIn: boolean = false;
  constructor(
    private ngZone: NgZone,
    private authService: SocialAuthService,
    private loginSe: LoginService,
    private buy: PurchaseService
  ) {}

  public ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        //set cookie
        const token = this.user.idToken;
        localStorage.setItem("token", token); // set token in local storage
        this.loginSe.login().subscribe(
          (r) => {
            console.log(r);
            let t = r as { user: { token: string } };
            console.log(t);
            localStorage.setItem("token", t.user.token);
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
      }
    });
  }

  show() {
    console.log(this.user);
  }
}
