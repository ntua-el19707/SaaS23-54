import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  private url: string = "/api_user";
  constructor(private http: HttpClient) {}
  purchase() {
    return this.http.post(`${this.url}/offers`, {});
  }
}
