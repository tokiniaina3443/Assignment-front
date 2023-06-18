import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonrendu]'
})
export class NonrenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.color = 'red';
/*
    el.nativeElement.style.backgroundColor = 'yellow';
    el.nativeElement.style.border = '5px dashed red';
    el.nativeElement.style.padding = '5px';*/
  }

}
