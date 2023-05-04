import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class UploadService {
  private url: string = "/api_upload/upload";
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
    return this.http.post(`/api_Line/confirm`, { file: file });
  }
}
