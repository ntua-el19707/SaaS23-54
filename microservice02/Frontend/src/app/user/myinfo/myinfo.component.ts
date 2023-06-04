import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { User } from "../interfaces/user";
import { UserInfoService } from "../services/user-info.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-myinfo",
  templateUrl: "./myinfo.component.html",
  styleUrls: ["./myinfo.component.css", "../../app.component.css"],
})
export class MyinfoComponent implements AfterViewInit, OnInit {
  private user: User = {
    username: "",
    credits: 0,
    total: 0,
    lastLogin: "",
  };
  private loading = true;
  @ViewChild("credits")
  creditsEl!: ElementRef;
  /**
   * constructor
   */
  constructor(private infoservice: UserInfoService, private router: Router) {}
  /**
   * function - getUser() 'get user'
   * @return User
   */
  /**
   * ngAfteViewInit()
   */
  ngAfterViewInit(): void {
    //? why i created a child  for #credits
    //& to change it color  easyly depeented of  his credits
    this.setColorForCredits();
  }
  ngOnInit(): void {
    this.infoservice.getuser().subscribe(
      (r: any) => {
        const user = r?.["user"] as {
          userName: string;
          credits: number;
          LastLogin: string;
          total: number;
        };
        this.loading = false;
        this.user = {
          username: user.userName,
          credits: user.credits,
          lastLogin: user.LastLogin,
          total: user.total,
        };
        setTimeout(() => {
          this.setColorForCredits();
        }, 10); // 1oms to wait so the credis will be createde n dom

        console.log(this.user);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
  getUser(): User {
    return this.user;
  }
  /**
   * function  - getFormattedLastLogin
   * @return d/m/y "of lastlogin"
   */
  getFormattedLastLogin(): string {
    let format = "";
    if (this.user.lastLogin) {
      format = this.user.lastLogin;
    }
    return format;
  }
  //& setColorForCredits
  private setColorForCredits(): void {
    this.creditsEl.nativeElement.textContent = this.user.credits;
    let color = "green";
    if (this.user.credits === 0) {
      color = "red";
    }
    this.creditsEl.nativeElement.style.color = color;
  }
  getLoading() {
    return this.loading;
  }
  newChart() {
    this.router.navigate(["/diagrams"]); //Home page whiil diplay the categories oh
  }
  buyCredits() {
    this.router.navigate(["/buy"]);
  }
  MyDiagrams() {
    this.router.navigate(["/MyDiagrams"]);
  }
}
