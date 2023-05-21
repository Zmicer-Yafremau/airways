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
}
