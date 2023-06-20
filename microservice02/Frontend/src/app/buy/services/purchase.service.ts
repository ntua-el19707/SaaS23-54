import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Packet } from "../interfaces/packet";

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
    return this.http.get(`/api_user/services/Purchase`);
  }

  PostOffer(
    plan: Packet,
    creditCard: {
      creditCardNumber: number;
      expM: number;
      expY: number;
      cvv: number;
    }
  ) {
    return this.http.post(`/api_user/services/Purchase`, { plan, creditCard });
  }
  up() {
    return this.http.get(`/api_user/services/Purchase/up`);
  }
}
