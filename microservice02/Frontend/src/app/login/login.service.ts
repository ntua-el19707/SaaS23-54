import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private url: string = "/api_user";
  constructor(private http: HttpClient) {}
  login() {
    return this.http.post(`${this.url}/login`, {});
  }
  register() {
    return this.http.post(`${this.url}/register`, {});
  }
}
//docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER="p" -e RABBITMQ_DEFAULT_PASS="p" -docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER="v" -e RABBITMQ_DEFAULT_PASS="123456" -p 5672:5672 -p 15672:15672  rabbitmq:3-management rabbitmq:3-management
