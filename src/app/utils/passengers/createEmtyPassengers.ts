import { PassengerType } from 'src/app/models/passenger-model';

export const createEmptyPassengers = (passengerType: PassengerType, quantity: number) => {
    const passengerMock = [];
        for (let i = 0; i < quantity + 1; i += 1) {
            passengerMock.push({
              id: i,
              passengerType,
              firstName: '',
              lastName: '',
              gender: 'male',
              dateOfBirth: '',
              needAssistance: false,
              formIsValid: false,
            });
          }
          return passengerMock as unknown as [PassengerType];
}