import { IUserFlightInfo, RequestBody } from './IFlightInfo';
import { IUserRequestInfo } from './IUserRequestInfo';

export enum LocalStorageKeyEnum {
  STEP_1 = 'step1',
  TOP_SUMMARY = 'top summary',
  USER_FLIGHT_INFO = 'user flight info',
}

interface IStep1 {
  key: LocalStorageKeyEnum.STEP_1;
  value: RequestBody;
}

interface TopSummary {
  key: LocalStorageKeyEnum.TOP_SUMMARY;
  value: IUserRequestInfo;
}

interface UserFlightInfo {
  key: LocalStorageKeyEnum.USER_FLIGHT_INFO;
  value: IUserFlightInfo;
}

export type LocalStorageValue = IStep1 | TopSummary | UserFlightInfo;
