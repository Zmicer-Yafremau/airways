import { IPassengers } from '../models/passenger-model';
import { IUserFlightInfo, RequestBody } from './IFlightInfo';
import { IUserRequestInfo } from './IUserRequestInfo';
import { ISummary } from './Summary';

export enum LocalStorageKeyEnum {
  STEP_1 = 'step1',
  TOP_SUMMARY = 'top summary',
  USER_FLIGHT_INFO = 'user flight info',
  PASSENGERS = 'passengersInfo',
  SUMMARY_INFO = 'summary info',
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

interface PassengersInfo {
  key: LocalStorageKeyEnum.PASSENGERS;
  value: IPassengers;
}

interface ISummaryInfo {
  key: LocalStorageKeyEnum.SUMMARY_INFO;
  value: ISummary;
}

export type LocalStorageValue =
  | IStep1
  | TopSummary
  | UserFlightInfo
  | PassengersInfo
  | ISummaryInfo;
