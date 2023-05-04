import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DonwloadService {
  private url: string = "/api_Download";
  constructor(private http: HttpClient) {}
  /**
   * DownLoadPng
   * @params id String
   */
  public DownLoadPng(id: string) {
    console.log(id);
    let url = `${this.url}/getPng/${id}`;
    return this.http.get(
      url,

      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
  /**
   * DownLoadHtml
   * @params id String
   */
  public DownLoadHtml(id: string) {
    let url = `${this.url}/getHtml/${id}`;
    return this.http.get(
      url,

      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
  /**
   * DownLoadSvg
   * @params id String
   */
  public DownLoadSvg(id: string) {
    let url = `${this.url}/getSvg/${id}`;
    return this.http.get(
      url,

      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
  /**
   * DownLoadPdf
   * @params id String
   */
  public DownLoadPdf(id: string) {
    let url = `${this.url}/getPdf/${id}`;
    return this.http.get(
      url,

      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
}
