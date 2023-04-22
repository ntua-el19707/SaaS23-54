import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css', '../../app.component.css']
})
export class MyinfoComponent implements AfterViewInit {
  private user: User = { username: 'vicgianndev0601@gmail.com', credits: 0, total: 0, lastLogin: new Date() };
  @ViewChild("credits")
  creditsEl!: ElementRef;
  /**
   * constructor
   */
  constructor() { };
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
  getUser(): User {
    return this.user;
  }
  /**
   * function  - getFormattedLastLogin
   * @return d/m/y "of lastlogin"
   */
  getFormattedLastLogin(): string {
    let format = ""
    if(this.user.lastLogin){
    format = this.user.lastLogin.toLocaleDateString();}
    return format;
  }
  //& setColorForCredits
  private setColorForCredits(): void {
    this.creditsEl.nativeElement.textContent = this.user.credits;
    let color = 'green';
    if (this.user.credits === 0) {
      color = 'red';
    }
    this.creditsEl.nativeElement.style.color = color;
  }

}
