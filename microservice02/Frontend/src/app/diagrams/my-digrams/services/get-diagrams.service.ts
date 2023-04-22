import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class GetDiagramsService {
  private url: string = "/api_Pollar";
  constructor(private http: HttpClient) {}
  /**
   * getMyDiagrams() - return all of user purchased charts
   * @returns Observable<any>
   */
  public getMyDiagrams(): Observable<any> {
    let url: string = `${this.url}/getDiagrams`;
    return this.http.get(url); //get http request
  }
}
