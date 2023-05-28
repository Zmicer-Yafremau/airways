import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ISummary } from '../types/Summary';
import { LocalStorageKeyEnum } from '../types/LocalStorageValue';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private summaryInfo$ = new BehaviorSubject<null | ISummary>(null);

  private summaryInfo: null | ISummary = null;

  public constructor(private ls: LocalStorageService) {}

  public getSummaryInfo() {
    if (!this.summaryInfo) {
      const summaryInfo = this.ls.getValue(LocalStorageKeyEnum.SUMMARY_INFO);
      if (summaryInfo) {
        this.summaryInfo = JSON.parse(summaryInfo);
        this.summaryInfo$.next(this.summaryInfo);
      }
    }

    return this.summaryInfo$.asObservable();
  }

  public setSummaryInfo(value: ISummary) {
    this.summaryInfo = value;

    this.ls.setValue({ key: LocalStorageKeyEnum.SUMMARY_INFO, value });

    this.summaryInfo$.next(value);
  }
}
