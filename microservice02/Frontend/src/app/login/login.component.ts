import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "@abacritt/angularx-social-login";
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { LoginService } from "./login.service";
import { PurchaseService } from "../diagrams/services/purchase.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public isSignedIn: boolean = false;
  private loginProcess: boolean = false;
  private Register: boolean = false;
  private Login: boolean = true;
  private defaultMSG: string = "Logging ...";
  private token: string = "";
  @ViewChild("logiingtag")
  logiingtag!: ElementRef;
  user!: SocialUser;
  loggedIn: boolean = false;
  constructor(
    private ngZone: NgZone,
    private authService: SocialAuthService,
    private loginSe: LoginService,
    private buy: PurchaseService
  ) {}
  getUser() {
    return { username: this.user.email };
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        //set cookie
        const token = this.user.idToken;
        this.token = token;
        localStorage.setItem("token", token); // set token in local storage
        this.loginProcess = true;
        this.loginSe.login().subscribe(
          (r: any) => {
            console.log(this.user);
            console.log(r);
            if (r?.["msg"] === "User is not Register") {
              this.Login = false;
              this.Register = true;
              console.log(user);
            } else {
              let t = r as { user: { token: string } };
              console.log(t);
              this.loginProcess = false;
              localStorage.setItem("token", t.user.token);
            }
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
      }
    });
  }
  ngAfterViewInit(): void {}

  show() {
    console.log(this.user);
  }
  getLoggingProcess(): boolean {
    return this.loginProcess;
  }
  getRegisterShow(): boolean {
    return this.Register;
  }
  getLoggingShow(): boolean {
    return this.Login;
  }
  onGoogleSignIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  getdefaultMSG(): string {
    return this.defaultMSG;
  }
  register() {
    this.loginProcess = true;
    this.Login = true;
    this.Register = false;
    this.defaultMSG = "Register ...";

    localStorage.setItem("token", this.token); // set token in local storage
    this.loginSe.register().subscribe(
      (r) => {
        let t = r as { user: { token: string } };
        console.log(t);
        this.loginProcess = false;
        localStorage.setItem("token", t.user.token);
      },
      (err) => {},
      () => {}
    );
  }
}
