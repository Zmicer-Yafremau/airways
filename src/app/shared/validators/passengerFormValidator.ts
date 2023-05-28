import * as _ from 'lodash';
import { IPassengerContacts, IPassengers } from 'src/app/models/passenger-model';

export function passengerFormsAreValid(passengers: IPassengers, contacts: IPassengerContacts) {
  const passClone = _.cloneDeep(passengers);
  let passengerFormsStatus = false;
  if (Object.values(passClone).filter((el) => el).length) {
    passengerFormsStatus = Object.values(passClone)
      .filter((el) => el)
      .flat(Infinity)
      .map((pasArr) => pasArr.formIsValid)
      .every((isValid) => isValid);
  }
  const passengerContactFormStatus = contacts.formIsValid;
  return passengerFormsStatus && passengerContactFormStatus;
}
