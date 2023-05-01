import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { COLOR } from '../config/COLOR';

@Directive({
  selector: '[appQuantityIndicator]',
})
export class QuantityIndicatorDirective implements OnInit {
  @Input() public quantity = 0;

  public constructor(private element: ElementRef<HTMLDivElement>) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.getElementColor();
  }

  private getElementColor(): string {
    if (this.quantity > 10) {
      return COLOR.yellow;
    }

    return COLOR.red;
  }
}
