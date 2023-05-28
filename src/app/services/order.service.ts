import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISummary } from '../types/Summary';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeyEnum } from '../types/LocalStorageValue';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private paid$ = new BehaviorSubject<null | ISummary[]>(null);

  private paid: ISummary[] = [];

  private unpaid$ = new BehaviorSubject<null | ISummary[]>(null);

  private unpaid: ISummary[] = [];

  public constructor(private ls: LocalStorageService) {}

  public setPaidOrder(value: ISummary) {
    this.paid = [...this.paid, value];

    this.ls.setValue({ key: LocalStorageKeyEnum.PAID_ORDERS, value: this.paid });

    this.paid$.next(this.paid);
  }

  public setUnpaidOrder(value: ISummary) {
    this.unpaid = [...this.unpaid, value];

    this.ls.setValue({ key: LocalStorageKeyEnum.UNPAID_ORDERS, value: this.unpaid });

    this.unpaid$.next(this.unpaid);
  }

  public getPaidOrders() {
    if (!this.paid.length) {
      const paidOrders = this.ls.getValue(LocalStorageKeyEnum.PAID_ORDERS);
      if (paidOrders) {
        this.paid = JSON.parse(paidOrders);
        this.paid$.next(this.paid);
      }
    }

    return this.paid$.asObservable();
  }

  public getUnpaidOrders() {
    if (!this.unpaid.length) {
      const unpaidOrders = this.ls.getValue(LocalStorageKeyEnum.UNPAID_ORDERS);
      if (unpaidOrders) {
        this.unpaid = JSON.parse(unpaidOrders);
        this.unpaid$.next(this.unpaid);
      }
    }

    return this.unpaid$.asObservable();
  }
}
