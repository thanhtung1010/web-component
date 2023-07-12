import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { state } from '@angular/animations';
import { style } from '@angular/animations';
import { trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

const flyInTransition = transition(':enter', [style({
  opacity: 0,
  transform: 'translate(50%, 50%)'
}), animate('2s ease', style({
  opacity: 1,
  transform: 'unset'
}))]);
const flyOutTransition = transition(':leave', [style({
  opacity: 1,
}), animate('2s ease', style({
  opacity: 0,
  transform: 'translate(50%, 50%)'
}))]);

const flyIn = trigger('flyIn', [flyInTransition]);
const flyOut = trigger('flyOut', [flyOutTransition]);

// const fadeInInOut = trigger('flyInOut', [
//   state('open', style({opacity: 1})),
//   state('close', style({opacity: 0})),
//   transition('close => open', [animate('500ms ease')]),
//   transition('open => close', [animate('500ms ease')]),
// ]);

@Component({
  selector: 'popup-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [flyIn, flyOut]
  // animations: [fadeInOut]
})
export class AppComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter(false);

  @ViewChild('webComponentContent') contentTemplate!: ElementRef<HTMLDivElement>;
  @ViewChild('webComponentBackground') backgroundTemplate!: ElementRef<HTMLDivElement>;

  title: string = 'popup-component';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      if (this.contentTemplate&& !this.contentTemplate.nativeElement.onclick) {
        this.contentTemplate.nativeElement.onclick = this.contentEvent;
      }

      if (this.backgroundTemplate && !this.backgroundTemplate.nativeElement.onclick) {
        this.backgroundTemplate.nativeElement.onclick = this.backgroundEvent;
      }
    }
  }

  backgroundEvent = (event: Event) => {
    this.onToggleVisible(false);
  }

  contentEvent = (event: Event) => {
  }

  onToggleVisible(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(this.visible);
  }
}
