import { Component } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { saveAs } from "file-saver";
@Component({
  selector: "drag",
  templateUrl: "./drag.component.html",
  styleUrls: ["./drag.component.css", "../../app.component.css"],
})
export class DragComponent {
  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string = "";
  progress: number = 0;
  private fileName: string = "";

  constructor(private upploadService: UploadService) {}
  ngOnInit() {}
  upload(e: any) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = e as HTMLInputElement;
      console.log(item);

      this.upploadService.upload(item).subscribe(
        (r) => {
          if (r.type === HttpEventType.Response) {
            let body: any = r.body;
            this.fileName = body["filename"];
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
    });

    // Set files form control
  }
  uploadTodb() {
    this.upploadService.confirm(this.fileName).subscribe(
      (r) => {
        /**this.upploadService.Download(this.fileName).subscribe(
          (data) => {
            saveAs(data, "line.png");
          },
          (err) => {},
          () => {}
        );*/
      },
      (err) => {},
      () => {}
    );
  }
  // Clean Url
  sanitize(url: string) {}
}
