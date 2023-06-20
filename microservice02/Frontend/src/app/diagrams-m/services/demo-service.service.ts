import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DemoServiceService {
  private url: string = "/api_Demos";
  private service: string = "";
  constructor(private http: HttpClient) {}
  findEndpoint(api: string) {
    switch (api) {
      case "api_Line":
        this.service = `${this.url}/getLine`;
        break;
      case "api_Pollar":
        this.service = `${this.url}/getPolar`;
        break;
      case "api_network":
        this.service = `${this.url}/getNetwork`;
        break;
      case "api_column":
        this.service = `${this.url}/getColumn`;
        break;
      case "api_LinewithAnnotations":
        this.service = `${this.url}/getLinewithAnnotations`;
        break;
      case "api_DependancyWheel":
        this.service = `${this.url}/getDependancyWheel`;
        break;
    }
  }
  getDemos() {
    console.log(this.service);
    return this.http.get(this.service);
  }
  downloadFileName(file: string) {
    return this.http.get(`${this.url}/download/${file}`, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }
}
