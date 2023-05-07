import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  private api: string = "/api_user";
  constructor(private http: HttpClient) {}
  /**
   * offers - get the offers
   */
  offers() {
    return this.http.get(`${this.api}/offers`);
  }
}
