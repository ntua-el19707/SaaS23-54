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
import { Router } from "@angular/router";

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
  private jwt: string = "";
  @ViewChild("logiingtag")
  logiingtag!: ElementRef;
  user!: SocialUser;
  loggedIn: boolean = false;
  constructor(
    private authService: SocialAuthService,
    private loginSe: LoginService,
    private router: Router
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
        this.loginProcess = true;
        this.loginSe.login(this.token).subscribe(
          (r: any) => {
            console.log(this.user);
            console.log(r);
            if (r?.["msg"] === "User is not Register") {
              this.Login = false;
              this.Register = true;
              console.log(user);
            } else {
              let t = r as { user: { token: string; expires: string } };
              console.log(t);

              this.loginProcess = false;
              const expiration = this.parseDurationInSeconds(t.user.expires);
              const DateofExpiration = Date.now() + expiration * 1000;
              const token: {
                token: string;
                expires: number;
              } = {
                token: t.user.token,
                expires: DateofExpiration,
              };
              localStorage.setItem("token", token.token);
              localStorage.setItem("tokenexpires", `${token.expires}`);

              this.router.navigate(["/info"]);
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

    this.loginSe.register(this.token).subscribe(
      (r) => {
        let t = r as { user: { token: string; expires: string } };
        console.log(t);
        this.loginProcess = false;
        this.token = t.user.token;
        const expiration = this.parseDurationInSeconds(t.user.expires);
        const DateofExpiration = Date.now() + expiration * 1000;
        const token: {
          token: string;
          expires: number;
        } = {
          token: t.user.token,
          expires: DateofExpiration,
        };
        localStorage.setItem("token", token.token);
        localStorage.setItem("tokenexpires", `${token.expires}`);
        this.router.navigate(["/info"]);
      },
      (err) => {},
      () => {}
    );
  }
  private parseDurationInSeconds(durationString: string): number {
    const duration = parseInt(durationString, 10);
    const unit = durationString.charAt(durationString.length - 1);

    switch (unit) {
      case "h":
        return duration * 60 * 60; // Convert hours to seconds
      case "m":
        return duration * 60; // Convert minutes to seconds
      case "d":
        return duration * 24 * 60 * 60; // Convert days to seconds
      default:
        return 0; // Invalid duration format
    }
  }
}
