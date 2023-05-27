import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class UploadService {
  private url: string = "/api_upload/upload";
  private api: string = "";
  private type_param: string = "";
  private service: string = "";
  constructor(private http: HttpClient) {}
  upload(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.url}/${this.type_param}`,
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );
    return this.http.request(req);
  }
  confirm(file: string) {
    console.log("confirm");
    // Set the headers including the 'Connection' header

    return this.http.post(
      `/api_user/services/Diagrams/${this.service}/confirm`,
      {
        file: file,
      }
    );
  }
  setApi(api: string): void {
    this.api = `${api}`;
    this.findEndpoint();
  }

  findEndpoint() {
    switch (this.api) {
      case "api_Line":
        this.type_param = "line";
        this.service = "LineService";
        break;
      case "api_Pollar":
        this.type_param = "pollar";
        this.service = "PollarService";

        break;
      case "api_network":
        this.type_param = "network";
        this.service = "NetworkService";
        break;
      case "api_column":
        this.type_param = "collumn";
        this.service = `CollumnService`;
        break;
      case "api_LinewithAnnotations":
        this.type_param = "line_anotation";
        this.service = "LineAnnotationService";
        break;
      case "api_DependancyWheel":
        this.type_param = "dependency_wheel";
        this.service = "DepentancyWheelService";
        break;
    }
  }
}
