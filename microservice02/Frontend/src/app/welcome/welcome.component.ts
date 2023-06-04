import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../user/interfaces/user";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css", "../../app.component.css"],
})
export class WelcomeComponent {
  @Input() user: { username: string } = { username: "" };
  @Output() buttonRegisterClick: EventEmitter<any> = new EventEmitter();
  /**
   * constructor
   */
  constructor() {}
  /**
   * function getUsername()
   * @return string "user username 'email'"
   */
  getUsername(): string {
    return this.user.username;
  }
  register(): void {
    this.buttonRegisterClick.emit();
  }
  cancel(): void {
    window.location.reload();
  }
}
