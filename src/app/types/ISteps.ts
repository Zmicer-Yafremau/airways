export interface ISteps {
  flights: StepCondition;
  passengers: StepCondition;
  review: StepCondition;
}

export type StepCondition = 'inactive' | 'active' | 'done';
