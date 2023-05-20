import { RequestBody } from '../services/flight-info.service';
import { IUserRequestInfo } from './IUserRequestInfo';

export enum LocalStorageKeyEnum {
  STEP_1 = 'step1',
  TOP_SUMMARY = 'top summary',
}

interface IStep1 {
  key: LocalStorageKeyEnum.STEP_1;
  value: RequestBody;
}

interface TopSummary {
  key: LocalStorageKeyEnum.TOP_SUMMARY;
  value: IUserRequestInfo;
}

export type LocalStorageValue = IStep1 | TopSummary;
