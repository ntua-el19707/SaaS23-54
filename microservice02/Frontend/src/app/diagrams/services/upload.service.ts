import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class UploadService {
  private url: string = "/api_Pollar/upload";
  constructor(private http: HttpClient) {}
  upload(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest("POST", `${this.url}`, formData, {
      reportProgress: true,
      responseType: "json",
    });
    return this.http.request(req);
  }
  confirm(file: string) {
    return this.http.post(`/api_Pollar/confirm`, { file: file });
  }
  Download(file: string) {
    return this.http.post(
      `api/download`,
      {},
      {
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
}
