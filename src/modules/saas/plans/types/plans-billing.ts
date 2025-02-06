export enum PlanFrequencyEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface IPlanBilling {
  price: number;
  frequency: PlanFrequencyEnum;
  trialPeriodDays?: number;
}