import { Component } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css', '../../app.component.css']
})
export class WelcomeComponent {
  private user: User = { username: 'vicgiandev0601@gmail.com' }
  /**
   * constructor
   */
  constructor() { }
  /**
   * function getUsername()
   * @return string "user username 'email'" 
   */
  getUsername(): string {
    return this.user.username
  }

}
