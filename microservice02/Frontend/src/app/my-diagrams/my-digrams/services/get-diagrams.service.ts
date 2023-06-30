import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class GetDiagramsService {
  private url: string = "/api_user/services/MyDiagrams";
  constructor(private http: HttpClient) {}
  /**
   * getMyDiagrams() - return all of user purchased charts
   * @returns Observable<any>
   */
  public getMyDiagrams(): Observable<any> {
    let url: string = `${this.url}/`;
    return this.http.get(url); //get http request
  }
  /**
   * up() - return service is  up
   * @returns Observable<any>
   */
  public up(): Observable<any> {
    let url: string = `${this.url}/up`;
    return this.http.get(url); //get http request
  }
  /**
   * getADiagrams - return a build chart of id in json
   * @returns Observable<any>
   */
  public getADiagrams(id: string): Observable<any> {
    let url: string = `${this.url}/${id}`;
    return this.http.get(url); //get http request
  }
}
