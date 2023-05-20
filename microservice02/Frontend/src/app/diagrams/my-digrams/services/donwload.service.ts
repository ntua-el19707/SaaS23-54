import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DonwloadService {
  private urlPng: string = "/api_DonloadPng";
  private urlSvg: string = "/api_DonloadSvg";
  private urlHtml: string = "/api_DonloadHtml";
  private urlPdf: string = "/api_DonloadPdf";

  constructor(private http: HttpClient) {}
  /**
   * DownLoadPng
   * @params id String
   */
  public DownLoadPng(id: string) {
    console.log(id);
    let url = `${this.urlPng}/getPng/${id}`;
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
    let url = `${this.urlHtml}/getHtml/${id}`;
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
    let url = `${this.urlSvg}/getSvg/${id}`;
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
    let url = `${this.urlPdf}/getPdf/${id}`;
    return this.http.get(
      url,

      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
}
