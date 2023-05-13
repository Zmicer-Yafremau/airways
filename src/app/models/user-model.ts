export interface IUser {
  firtsName: string;
  lastName: string;
  email: string;
}
export interface IRegUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  countryCode: string;
  phone: string;
  citizenship: string;
}
export interface IToken {
  token: string;
}
