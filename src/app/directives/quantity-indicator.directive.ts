import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { INDICATOR_COLOR } from '../config/indicatorColor';

@Directive({
  selector: '[appQuantityIndicator]',
})
export class QuantityIndicatorDirective implements OnInit, OnChanges {
  @Input() public quantity = 0;

  @Input() public withOpacity = false;

  public constructor(private element: ElementRef<HTMLDivElement>) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.getElementColor();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['quantity']) {
      this.element.nativeElement.style.backgroundColor = this.getElementColor();
    }
  }

  private getElementColor(): string {
    if (this.quantity > 100) {
      return this.withOpacity ? INDICATOR_COLOR.yellowOpacity : INDICATOR_COLOR.yellow;
    }

    return this.withOpacity ? INDICATOR_COLOR.redOpacity : INDICATOR_COLOR.red;
  }
}
