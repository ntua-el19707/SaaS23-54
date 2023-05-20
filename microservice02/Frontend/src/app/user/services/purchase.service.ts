import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Packet } from "../interfaces/packet";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  private api: string = "/api_purchase";
  constructor(private http: HttpClient) {}
  /**
   * offers - get the offers
   */
  offers() {
    return this.http.get(`${this.api}/offers`);
  }

  PostOffer(plan: Packet) {
    return this.http.post(`/api_purchase/offers`, { plan });
  }
}
