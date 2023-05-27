import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  private url: string = "/api_user/user";
  constructor(private http: HttpClient) {}
  getuser() {
    return this.http.get(this.url);
  }
}
