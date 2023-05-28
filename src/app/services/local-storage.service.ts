import { Injectable } from '@angular/core';
import { LocalStorageKeyEnum, LocalStorageValue } from '../types/LocalStorageValue';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setValue({ key, value }: LocalStorageValue) {
    const lsValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, lsValue);
  }

  public getValue(key: LocalStorageKeyEnum) {
    return localStorage.getItem(key);
  }

  public clearLocalStorage() {
    Object.values(LocalStorageKeyEnum)
      .filter((el) => el !== LocalStorageKeyEnum.PAID_ORDERS && LocalStorageKeyEnum.UNPAID_ORDERS)
      .forEach((el) => localStorage.removeItem(el));
  }
}
