import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[appDragDropFileUpload]',
})
export class DragDirective {

  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('class.HoverUpload') private fileupoadd = false;
  @HostBinding('class.Upload') private upload = true;


  @HostListener('dragover', ['$event']) public dragOver(event: Event) {

    event.preventDefault();
    event.stopPropagation();
    this.upload = false;
    this.fileupoadd = true





  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.fileupoadd = false
    this.upload = true;

    //    this.background = '#ffffff';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // this.background = '#ffffff';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }


}
