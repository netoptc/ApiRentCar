export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hous: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}
