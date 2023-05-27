import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
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
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  @Output() errorOccurs: EventEmitter<any> = new EventEmitter();
  @ViewChild("cancelButton")
  cancelBTN!: ElementRef;
  @ViewChild("uploadinText")
  uploadText!: ElementRef;
  @ViewChild("uploadButton")
  uploadBTN!: ElementRef;
  @ViewChild("bar")
  barEl!: ElementRef;
  @ViewChild("upheader")
  upheadertEl!: ElementRef;
  private showSpinner: boolean = false;
  constructor(private upploadService: UploadService) {}
  ngOnInit() {
    this.upploadService.setApi(this.api);
  }
  ngAfterViewInit(): void {
    //  this.setBar();
    this.uploadBTN.nativeElement.disabled = true;
    this.uploadBTN.nativeElement.classList.add(
      "bg-gray-400",
      "cursor-not-allowed",
      "opacity-50"
    );
    this.cancelBTN.nativeElement.disabled = true;
    this.cancelBTN.nativeElement.classList.add(
      "bg-gray-400",
      "cursor-not-allowed",
      "opacity-50"
    );
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
          this.uploadBTN.nativeElement.disabled = false;

          this.uploadBTN.nativeElement.classList.remove(
            "bg-gray-400",
            "cursor-not-allowed",
            "opacity-50"
          );
          this.cancelBTN.nativeElement.disabled = false;

          this.cancelBTN.nativeElement.classList.remove(
            "bg-gray-400",
            "cursor-not-allowed",
            "opacity-50"
          );
        }
      },
      (err) => {
        this.uploadin = false;
        this.upheadertEl.nativeElement.textContent =
          "Please upload the csv file";
        this.errorOccurs.emit("failed  to upload file");
        console.log(err);
      },
      () => {}
    );

    // Set files form control
  }
  uploadTodb() {
    this.showSpinner = true;
    this.uploadText.nativeElement.innerText = "building diagram";
    this.upploadService.confirm(this.fileName).subscribe(
      (r) => {
        console.log(r);
        this.buttonClick.emit(r);
      },
      (err) => {
        console.log("failed");
        this.errorOccurs.emit("invalid Format");
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
  getshowSpinner() {
    return this.showSpinner;
  }
  cancel() {
    this.uploadin = false;
    //remo file from uploadlist
  }
  // Clean Url
  sanitize(url: string) {}
}
