import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { INDICATOR_COLOR } from '../config/indicatorColor';

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
      return INDICATOR_COLOR.yellow;
    }

    return INDICATOR_COLOR.red;
  }
}
