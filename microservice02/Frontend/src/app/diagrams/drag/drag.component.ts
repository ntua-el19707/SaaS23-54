import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
} from "@angular/core";
import { UploadService } from "../services/upload.service";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "drag",
  templateUrl: "./drag.component.html",
  styleUrls: ["./drag.component.css", "../../app.component.css"],
})
export class DragComponent implements OnInit, AfterViewInit {
  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string = "";
  private progress: number = 0;
  private fileName: string = "";
  private uploadin: boolean = false;
  @Input() api: string = "";
  @ViewChild("bar")
  barEl!: ElementRef;
  @ViewChild("upheader")
  upheadertEl!: ElementRef;
  constructor(private upploadService: UploadService) {}
  ngOnInit() {
    this.upploadService.setApi(this.api);
  }
  ngAfterViewInit(): void {
    //  this.setBar();
  }
  private setBar() {
    let el: ElementRef = this.barEl;
    el.nativeElement.setAttribute("style", `width:${this.progress}%`);
    el.nativeElement.textContent = `${this.progress}%`;
  }
  upload(e: any) {
    const fileListAsArray = Array.from(e);
    const item: any = fileListAsArray[0];

    const file = e as HTMLInputElement;
    console.log(item);
    this.uploadin = true;
    let filename = item.name;
    this.upheadertEl.nativeElement.textContent = `Uploading file ${filename} ...`;
    // this.setBar();
    this.upploadService.upload(item).subscribe(
      (r: any) => {
        if (r.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / r.total) * r.loaded);

          this.setBar();
        } else if (r.type === HttpEventType.Response) {
          let body: any = r.body;
          this.fileName = body["filename"];
          this.upheadertEl.nativeElement.textContent = `file ${filename} succefully uploaded`;
        }
      },
      (err) => {
        this.uploadin = false;
        console.log(err);
      },
      () => {}
    );

    // Set files form control
  }
  uploadTodb() {
    this.upploadService.confirm(this.fileName).subscribe(
      (r) => {
        console.log(r);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("one");
      }
    );
  }
  uploading(): Boolean {
    return this.uploadin;
  }
  remove() {
    this.uploadin = false;
    this.upheadertEl.nativeElement.textContent = `Please upload the csv file`;
  }
  // Clean Url
  sanitize(url: string) {}
}
